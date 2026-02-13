---
title: Proxy URL (bypassing Firewall)
deprecated: false
hidden: false
metadata:
  robots: index
---
The VWO Dotnet SDK includes support for **custom proxy URLs**, enabling you to route all SDK network traffic through your own proxy server. This feature provides enhanced control over request routing, offering significant benefits in environments where direct network access to VWO endpoints may be restricted or blocked.

## Why Use a Custom Proxy URL?

In modern server environments, many organizations utilize network firewalls, security policies, or compliance requirements that restrict direct access to external services. Since the VWO Dotnet SDK communicates with VWO services via the default domain (`dev.visualwebsiteoptimizer.com`), requests to this endpoint may be **blocked or restricted**.

When this occurs, it can lead to partial or complete SDK failure, resulting in:

* **Feature flag loading failures** – Targeted feature variations may not be served correctly to end users.
* **Experiment tracking disruptions** – Data collection for A/B tests and multivariate experiments may be incomplete or missing.
* **Settings fetch issues** – SDK initialization can fail if configuration settings cannot be retrieved.
* **Inconsistent user experience** – Variability in network configurations can cause different servers to experience different application behavior, leading to reliability concerns.

To address these issues, VWO provides the ability to configure a **proxy URL**, allowing organizations to **self-host a relay** for SDK traffic. This enables better control over network access, enhanced observability, and improved compatibility with restrictive network environments.

## How It Works: Request Routing Logic

The request flow when using a custom proxy is as follows:

1. **SDK → Proxy Server**  
   The VWO SDK sends all API and data collection requests to the proxy server, using the `proxyUrl` specified during SDK initialization.
2. **Proxy Server → VWO Backend**  
   Your proxy server receives the SDK request and forwards it to the appropriate VWO endpoint.
3. **VWO Backend → Proxy Server**  
   VWO processes the incoming request, generates a response (e.g., flag configuration, experiment data), and sends it back to your proxy.
4. **Proxy Server → SDK**  
   Your proxy server relays the response from VWO back to the SDK, completing the round trip.

```mermaid
flowchart TD
    A["Dotnet SDK"] --> B{"Proxy URL Set?"}
    B -- Yes --> C["Rewrite URL with Proxy"]
    B -- No --> D["Direct to VWO Servers"]
    C --> E["Request via Proxy Server"]
    E --> G["Proxy Forwards to VWO"]
    D --> F["Direct Request to VWO"]
    G --> H["VWO Processes Request"]
    F --> H
    H --> I["VWO Response"]
    I --> J["SDK Processes Response"]
    C -. Bypasses Network Restrictions .-> E
```

## Benefits of Using a Proxy

* **Bypass network restrictions**: Since the proxy URL is under your control (e.g., proxy.yourdomain.com), it can be whitelisted in your network policies.
* **Improved reliability**: Ensures SDK functionality even in restricted network environments.
* **Custom logging and analytics**: Enables logging, monitoring, or transformation of SDK requests for internal analytics or debugging.
* **Security and compliance**: Offers an opportunity to inspect or validate outbound and inbound traffic to meet organizational policies.

## Configuration Example

```python
from vwo import init

options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # VWO Account ID
    'proxy_url': 'https://proxy.yourdomain.com',
    # other configuration options
}

vwo_client = init(options)
```

> Ensure your proxy server is properly configured to forward requests to `dev.visualwebsiteoptimizer.com`, handle request/response headers appropriately, and support both GET and POST methods used by the SDK.

## Performance and Latency Considerations

Using a proxy introduces an additional network hop between the SDK and VWO servers. While this offers flexibility and control, it can affect performance if not optimized properly.

**Key considerations:**

* **Minimize Latency**: Host your proxy server geographically close to your application servers or leverage edge locations via a CDN.
* **Connection Reuse**: Enable `keep-alive` connections to reduce TCP handshake overhead.
* **Caching**: Use caching headers for SDK configuration responses (when appropriate) to reduce redundant API calls.
* **Compression**: Enable gzip or Brotli compression on your proxy server to reduce response size and speed up transfers.
* **Timeouts**: Configure reasonable timeouts to prevent long request queues or blocked SDK functionality.

> Tip: Monitor response times at both the proxy and SDK levels to detect bottlenecks.

## Security Considerations

Proxying SDK traffic gives you more control, but also introduces potential risks. Proper security practices help prevent misuse or data leaks.

**Recommendations:**

* **Use HTTPS**: Always serve your proxy over HTTPS to ensure encrypted data transmission.
* **Restrict Origins**: Limit access to your proxy to specific IP addresses or networks to prevent abuse.
* **Input Validation**: Sanitize and validate incoming requests to avoid injection or spoofing attacks.
* **Rate Limiting**: Implement rate limiting to protect your proxy from DDoS or high-traffic abuse.
* **Authorization (_Optional_)**: For internal or sensitive use cases, add token-based or header-based authentication.
* **Audit Logs**: Log incoming and outgoing proxy traffic (with PII masked) for observability and compliance.

## Sample Proxy Implementations

Below is a basic proxy implementation.

### Dotnet

```csharp
using System.Net;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient("proxy")
    .ConfigureHttpClient(client =>
    {
        client.Timeout = TimeSpan.FromSeconds(30);
    });

var app = builder.Build();

const string VWO_BASE_URL = "https://dev.visualwebsiteoptimizer.com";

app.MapMethods("/{**path}", new[] { "GET", "POST", "PUT", "DELETE", "PATCH" },
async (HttpContext context, IHttpClientFactory httpClientFactory, string? path) =>
{
    var client = httpClientFactory.CreateClient("proxy");

    var targetUrl = $"{VWO_BASE_URL}/{path ?? ""}{context.Request.QueryString}";

    var requestMessage = new HttpRequestMessage
    {
        Method = new HttpMethod(context.Request.Method),
        RequestUri = new Uri(targetUrl)
    };

    // Copy headers (excluding restricted ones)
    foreach (var header in context.Request.Headers)
    {
        if (!WebHeaderCollection.IsRestricted(header.Key))
        {
            requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
        }
    }

    // Copy body if present
    if (context.Request.ContentLength > 0)
    {
        requestMessage.Content = new StreamContent(context.Request.Body);

        foreach (var header in context.Request.Headers)
        {
            if (header.Key.StartsWith("Content-", StringComparison.OrdinalIgnoreCase))
            {
                requestMessage.Content.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
            }
        }
    }

    try
    {
        var responseMessage = await client.SendAsync(
            requestMessage,
            HttpCompletionOption.ResponseHeadersRead,
            context.RequestAborted);

        context.Response.StatusCode = (int)responseMessage.StatusCode;

        foreach (var header in responseMessage.Headers)
        {
            context.Response.Headers[header.Key] = header.Value.ToArray();
        }

        foreach (var header in responseMessage.Content.Headers)
        {
            context.Response.Headers[header.Key] = header.Value.ToArray();
        }

        context.Response.Headers.Remove("transfer-encoding");

        await responseMessage.Content.CopyToAsync(context.Response.Body);

    }
    catch (TaskCanceledException)
    {
        context.Response.StatusCode = 504;
        await context.Response.WriteAsJsonAsync(new
        {
            error = "Gateway Timeout"
        });
    }
    catch (HttpRequestException ex)
    {
        context.Response.StatusCode = 502;
        await context.Response.WriteAsJsonAsync(new
        {
            error = "Bad Gateway",
            details = ex.Message
        });
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new
        {
            error = "Proxy Error",
            details = ex.Message
        });
    }
});

app.Run();

```

### NGINX Config Snippet

```nginx
server {
  listen 443 ssl;
  server_name proxy.yourdomain.com;

  location / {
    proxy_pass https://dev.visualwebsiteoptimizer.com/;
    proxy_set_header Host dev.visualwebsiteoptimizer.com;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

### Serverless (AWS Lambda + API Gateway)

For lightweight, scalable deployments, you can set up a proxy using AWS Lambda with API Gateway acting as the HTTP interface. This is useful for pay-as-you-go usage with minimal infrastructure overhead.

## Testing Your Proxy

After setting up your proxy, test it with a simple Dotnet script:

```csharp
using VWOFmeSdk;
using VWOFmeSdk.Models;
using VWOFmeSdk.Models.User;

var vwoInitOptions = new VWOInitOptions
{
  SdkKey = "a925e1e411809d05444795a82cda149c",
  AccountId = 1188493,
  ProxyUrl = "http://localhost:8000",
};
            return VWO.Init(vwoInitOptions);
```
