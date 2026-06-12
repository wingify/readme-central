---
title: Proxy URL (bypassing Firewall)
deprecated: false
hidden: false
metadata:
  robots: index
---
The VWO GO SDK includes support for **custom proxy URLs**, enabling you to route all SDK network traffic through your own proxy server. This feature provides enhanced control over request routing, offering significant benefits in environments where direct network access to VWO endpoints may be restricted or blocked.

## Why Use a Custom Proxy URL?

In modern server environments, many organizations utilize network firewalls, security policies, or compliance requirements that restrict direct access to external services. Since the VWO GO SDK communicates with VWO services via the default domain (`dev.visualwebsiteoptimizer.com`), requests to this endpoint may be **blocked or restricted**.

When this occurs, it can lead to partial or complete SDK failure, resulting in:

- **Feature flag loading failures** – Targeted feature variations may not be served correctly to end users.
- **Experiment tracking disruptions** – Data collection for A/B tests and multivariate experiments may be incomplete or missing.
- **Settings fetch issues** – SDK initialization can fail if configuration settings cannot be retrieved.
- **Inconsistent user experience** – Variability in network configurations can cause different servers to experience different application behavior, leading to reliability concerns.

To address these issues, VWO provides the ability to configure a **proxy URL**, allowing organizations to **self-host a relay** for SDK traffic. This enables better control over network access, enhanced observability, and improved compatibility with restrictive network environments.

## How It Works: Request Routing Logic

The request flow when using a custom proxy is as follows:

1. **SDK → Proxy Server**<br />The VWO SDK sends all API and data collection requests to the proxy server, using the `proxy_url` specified during SDK initialization.
2. **Proxy Server → VWO Backend**<br />Your proxy server receives the SDK request and forwards it to the appropriate VWO endpoint.
3. **VWO Backend → Proxy Server**<br />VWO processes the incoming request, generates a response (e.g., flag configuration, experiment data), and sends it back to your proxy.
4. **Proxy Server → SDK**<br />Your proxy server relays the response from VWO back to the SDK, completing the round trip.

```mermaid
flowchart TD
    A["GO SDK"] --> B{"Proxy URL Set?"}
    B -- Yes --> C["Rewrite URL with Proxy"]
    B -- No --> D["Direct to Wingify Servers"]
    C --> E["Request via Proxy Server"]
    E --> G["Proxy Forwards to Wingify"]
    D --> F["Direct Request to Wingify"]
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

```go
options := map[string]interface{}{
    "sdkKey":    "32-alpha-numeric-sdk-key", // Replace with your SDK key
    "accountId": "123456",                   // Replace with your account ID
    "proxyUrl": "https://custom.proxy.com"   // Replace with your custom proxy url
}

// Initialize Wingify instance
wingifyInstance, err := wingify.Init(options)
```

> Ensure your proxy server is properly configured to forward requests to `dev.visualwebsiteoptimizer.com`, handle request/response headers appropriately, and support both GET and POST methods used by the SDK.

## Performance and Latency Considerations

Using a proxy introduces an additional network hop between the SDK and VWO servers. While this offers flexibility and control, it can affect performance if not optimized properly.

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

Below is a basic proxy implementation

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func main() {
	targetURL, err := url.Parse("https://dev.visualwebsiteoptimizer.com")
	if err != nil {
		log.Fatalf("invalid target URL: %v", err)
	}

	// Create a reverse proxy to the Wingify dev environment
	proxy := httputil.NewSingleHostReverseProxy(targetURL)

	// Optionally tweak the request before it goes out
	originalDirector := proxy.Director
	proxy.Director = func(req *http.Request) {
		originalDirector(req)

		// "Change origin" like http-proxy-middleware: set Host to target
		req.Host = targetURL.Host
	}

	// Handle errors in a JSON format similar to the Node example
	proxy.ErrorHandler = func(rw http.ResponseWriter, req *http.Request, err error) {
		rw.Header().Set("Content-Type", "application/json")
		rw.WriteHeader(http.StatusInternalServerError)

		_ = json.NewEncoder(rw).Encode(map[string]string{
			"error":   "Proxy error",
			"details": err.Error(),
		})
	}

	// Proxy all requests on /
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		proxy.ServeHTTP(w, r)
	})

	log.Println("Proxy server running on http://localhost:3300")
	if err := http.ListenAndServe(":3300", nil); err != nil && err != http.ErrServerClosed {
		log.Fatalf("server error: %v", err)
	}
}

```

<br />
