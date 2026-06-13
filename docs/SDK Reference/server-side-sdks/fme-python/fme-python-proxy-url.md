---
title: Proxy URL (bypassing Firewall)
deprecated: false
hidden: false
metadata:
  robots: index
---
The Wingify Python SDK includes support for **custom proxy URLs**, enabling you to route all SDK network traffic through your own proxy server. This feature provides enhanced control over request routing, offering significant benefits in environments where direct network access to Wingify endpoints may be restricted or blocked.

## Why Use a Custom Proxy URL?

In modern server environments, many organizations utilize network firewalls, security policies, or compliance requirements that restrict direct access to external services. Since the Wingify Python SDK communicates with Wingify services via the default domain (`dev.visualwebsiteoptimizer.com`), requests to this endpoint may be **blocked or restricted**.

When this occurs, it can lead to partial or complete SDK failure, resulting in:

- **Feature flag loading failures** – Targeted feature variations may not be served correctly to end users.
- **Experiment tracking disruptions** – Data collection for A/B tests and multivariate experiments may be incomplete or missing.
- **Settings fetch issues** – SDK initialization can fail if configuration settings cannot be retrieved.
- **Inconsistent user experience** – Variability in network configurations can cause different servers to experience different application behavior, leading to reliability concerns.

To address these issues, Wingify provides the ability to configure a **proxy URL**, allowing organizations to **self-host a relay** for SDK traffic. This enables better control over network access, enhanced observability, and improved compatibility with restrictive network environments.

## How It Works: Request Routing Logic

The request flow when using a custom proxy is as follows:

1. **SDK → Proxy Server**<br />The Wingify SDK sends all API and data collection requests to the proxy server, using the `proxy_url` specified during SDK initialization.
2. **Proxy Server → Wingify Backend**<br />Your proxy server receives the SDK request and forwards it to the appropriate Wingify endpoint.
3. **Wingify Backend → Proxy Server**<br />Wingify processes the incoming request, generates a response (e.g., flag configuration, experiment data), and sends it back to your proxy.
4. **Proxy Server → SDK**<br />Your proxy server relays the response from Wingify back to the SDK, completing the round trip.

```mermaid
flowchart TD
    A["Python SDK"] --> B{"Proxy URL Set?"}
    B -- Yes --> C["Rewrite URL with Proxy"]
    B -- No --> D["Direct to Wingify Servers"]
    C --> E["Request via Proxy Server"]
    E --> G["Proxy Forwards to"]
    D --> F["Direct Request to"]
    G --> H["Wingify Processes Request"]
    F --> H
    H --> I["Wingify Response"]
    I --> J["SDK Processes Response"]
    C -. Bypasses Network Restrictions .-> E
```

## Benefits of Using a Proxy

- **Bypass network restrictions**: Since the proxy URL is under your control (e.g., proxy.yourdomain.com), it can be whitelisted in your network policies.
- **Improved reliability**: Ensures SDK functionality even in restricted network environments.
- **Custom logging and analytics**: Enables logging, monitoring, or transformation of SDK requests for internal analytics or debugging.
- **Security and compliance**: Offers an opportunity to inspect or validate outbound and inbound traffic to meet organizational policies.

## Configuration Example

```python
from wingify import init

options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # Wingify Account ID
    'proxy_url': 'https://proxy.yourdomain.com',
    # other configuration options
}

Wingify_client = init(options)
```

> Ensure your proxy server is properly configured to forward requests to `dev.visualwebsiteoptimizer.com`, handle request/response headers appropriately, and support both GET and POST methods used by the SDK.

## Performance and Latency Considerations

Using a proxy introduces an additional network hop between the SDK and Wingify servers. While this offers flexibility and control, it can affect performance if not optimized properly.

**Key considerations:**

- **Minimize Latency**: Host your proxy server geographically close to your application servers or leverage edge locations via a CDN.
- **Connection Reuse**: Enable `keep-alive` connections to reduce TCP handshake overhead.
- **Caching**: Use caching headers for SDK configuration responses (when appropriate) to reduce redundant API calls.
- **Compression**: Enable gzip or Brotli compression on your proxy server to reduce response size and speed up transfers.
- **Timeouts**: Configure reasonable timeouts to prevent long request queues or blocked SDK functionality.

> Tip: Monitor response times at both the proxy and SDK levels to detect bottlenecks.

## Security Considerations

Proxying SDK traffic gives you more control, but also introduces potential risks. Proper security practices help prevent misuse or data leaks.

**Recommendations:**

- **Use HTTPS**: Always serve your proxy over HTTPS to ensure encrypted data transmission.
- **Restrict Origins**: Limit access to your proxy to specific IP addresses or networks to prevent abuse.
- **Input Validation**: Sanitize and validate incoming requests to avoid injection or spoofing attacks.
- **Rate Limiting**: Implement rate limiting to protect your proxy from DDoS or high-traffic abuse.
- **Authorization (_Optional_)**: For internal or sensitive use cases, add token-based or header-based authentication.
- **Audit Logs**: Log incoming and outgoing proxy traffic (with PII masked) for observability and compliance.

## Sample Proxy Implementations

Below is a basic proxy implementation using FastAPI.

### Python (FastAPI)

```python
from fastapi import FastAPI, Request
from fastapi.responses import Response, JSONResponse
import httpx
from urllib.parse import urljoin
from typing import Optional

app = FastAPI()

WINGIFY_BASE_URL = 'https://dev.visualwebsiteoptimizer.com'

@app.api_route('/{path:path}', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
async def proxy(request: Request, path: str):
    # Construct the target URL
    target_url = urljoin(WINGIFY_BASE_URL, '/' + path if path else '/')
    
    # Get query parameters
    params = dict(request.query_params)
    
    # Get request body if present
    body: Optional[bytes] = None
    json_body: Optional[dict] = None
    
    if request.method in ['POST', 'PUT', 'PATCH']:
        content_type = request.headers.get('content-type', '').lower()
        if 'application/json' in content_type:
            try:
                json_body = await request.json()
            except (ValueError, TypeError):
                body = await request.body()
        else:
            body = await request.body()
    
    # Forward headers (excluding host, connection, and content-length)
    headers = {}
    excluded_headers = {'host', 'connection', 'content-length'}
    
    for k, v in request.headers.items():
        if k.lower() not in excluded_headers:
            headers[k] = v
    
    async with httpx.AsyncClient(timeout=httpx.Timeout(30.0)) as client:
        try:
            # Prepare request kwargs
            request_kwargs = {
                'method': request.method,
                'url': target_url,
                'params': params if params else None,
                'headers': headers,
            }
            
            # Add body or json based on content type
            if json_body is not None:
                request_kwargs['json'] = json_body
            elif body is not None:
                request_kwargs['content'] = body
            
            # Make the request
            response = await client.request(**request_kwargs)
            
            # Prepare response headers (exclude headers that shouldn't be forwarded)
            response_headers = {}
            excluded_response_headers = {
                'content-encoding', 
                'transfer-encoding', 
                'connection',
                'content-length'  # Let FastAPI calculate this automatically
            }
            
            for k, v in response.headers.items():
                if k.lower() not in excluded_response_headers:
                    response_headers[k] = v
            
            # Return response with appropriate status code and headers
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=response_headers,
                media_type=response.headers.get('content-type')
            )
        except httpx.TimeoutException as e:
            return JSONResponse(
                status_code=504,
                content={"error": "Gateway Timeout", "details": str(e)}
            )
        except httpx.ConnectError as e:
            return JSONResponse(
                status_code=502,
                content={"error": "Bad Gateway", "details": str(e)}
            )
        except httpx.RequestError as e:
            return JSONResponse(
                status_code=500,
                content={"error": "Proxy Error", "details": str(e)}
            )

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=3300, ssl_keyfile='key.pem', ssl_certfile='cert.pem')
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

After setting up your proxy, test it with a simple Python script:

```python
from wingify import init

# Test with proxy
options = {
    'sdk_key': 'your-sdk-key',
    'account_id': 'your-account-id',
    'proxy_url': 'https://proxy.yourdomain.com',
    'logger': {
        'level': 'DEBUG'  # Enable debug logging to see requests
    }
}

wingify_client = init(options)

# Test a simple operation
user_context = {'id': 'test-user-123'}
flag = wingify_client.get_flag('your-feature-key', user_context)
print(f"Flag enabled: {flag.is_enabled()}")
```

<br />
