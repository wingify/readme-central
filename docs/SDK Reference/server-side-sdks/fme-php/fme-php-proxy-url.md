---
title: Proxy URL (bypassing Firewall)
deprecated: false
hidden: false
metadata:
  robots: index
---
The Wingify PHP SDK includes support for **custom proxy URLs**, enabling you to route all SDK network traffic through your own proxy server. This feature provides enhanced control over request routing, offering significant benefits in environments where direct network access to Wingify endpoints may be restricted or blocked.

## Why Use a Custom Proxy URL?

In modern server environments, many organizations utilize network firewalls, security policies, or compliance requirements that restrict direct access to external services. Since the Wingify PHP SDK communicates with Wingify services via the default domain (`dev.visualwebsiteoptimizer.com`), requests to this endpoint may be **blocked or restricted**.

When this occurs, it can lead to partial or complete SDK failure, resulting in:

- **Feature flag loading failures** – Targeted feature variations may not be served correctly to end users.
- **Experiment tracking disruptions** – Data collection for A/B tests and multivariate experiments may be incomplete or missing.
- **Settings fetch issues** – SDK initialization can fail if configuration settings cannot be retrieved.
- **Inconsistent user experience** – Variability in network configurations can cause different servers to experience different application behavior, leading to reliability concerns.

To address these issues, Wingify provides the ability to configure a **proxy URL**, allowing organizations to **self-host a relay** for SDK traffic. This enables better control over network access, enhanced observability, and improved compatibility with restrictive network environments.

## How It Works: Request Routing Logic

The request flow when using a custom proxy is as follows:

1. **SDK → Proxy Server**<br />The Wingify SDK sends all API and data collection requests to the proxy server, using the `proxy` specified during SDK initialization.
2. **Proxy Server → Wingify Backend**<br />Your proxy server receives the SDK request and forwards it to the appropriate Wingify endpoint.
3. **Wingify Backend → Proxy Server**<br />Wingify processes the incoming request, generates a response (e.g., flag configuration, experiment data), and sends it back to your proxy.
4. **Proxy Server → SDK**<br />Your proxy server relays the response from Wingify back to the SDK, completing the round trip.

```mermaid
flowchart TD
    A["PHP SDK"] --> B{"Proxy URL Set?"}
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

```php

$wingifyClient = Wingify::init([
    'sdkKey' => '32-alpha-numeric-sdk-key',
    'accountId' => 123456,
    'proxy' => [
        'url' => 'http://custom.proxy.com',
        'isUrlNotSecure' => true // Set to true to allow non-HTTPS (insecure) proxy URLs; false by default for security
    ],
]);
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

Below is a basic proxy implementation.

### PHP

```php
<?php

// Base URL to proxy to
$VWO_BASE_URL = 'https://dev.visualwebsiteoptimizer.com';

// Get requested path
$path = $_SERVER['REQUEST_URI'];
$targetUrl = rtrim($VWO_BASE_URL, '/') . $path;

// Get HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Get request headers
$headers = getallheaders();
$forwardHeaders = [];

// Exclude specific headers
$excludedHeaders = ['Host', 'Connection', 'Content-Length'];

foreach ($headers as $key => $value) {
    if (!in_array($key, $excludedHeaders)) {
        $forwardHeaders[] = "$key: $value";
    }
}

// Get request body
$body = file_get_contents('php://input');

// Initialize cURL
$ch = curl_init($targetUrl);

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $forwardHeaders);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

// Set body for POST, PUT, PATCH
if (in_array($method, ['POST', 'PUT', 'PATCH'])) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

// Execute request
$response = curl_exec($ch);

if ($response === false) {
    $error = curl_error($ch);
    curl_close($ch);

    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Bad Gateway',
        'details' => $error
    ]);
    exit;
}

// Separate headers and body
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$responseHeadersRaw = substr($response, 0, $headerSize);
$responseBody = substr($response, $headerSize);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

// Set response status
http_response_code($statusCode);

// Forward response headers (excluding some)
$excludedResponseHeaders = [
    'Transfer-Encoding',
    'Content-Length',
    'Connection',
    'Content-Encoding'
];

$responseHeaders = explode("\r\n", $responseHeadersRaw);

foreach ($responseHeaders as $headerLine) {
    if (strpos($headerLine, ':') !== false) {
        list($key, $value) = explode(':', $headerLine, 2);
        $key = trim($key);
        $value = trim($value);

        if (!in_array($key, $excludedResponseHeaders)) {
            header("$key: $value", false);
        }
    }
}

// Output body
echo $responseBody;

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

After setting up your proxy, test it with a simple PHP script:

```php
$options = [
        'sdkKey' => '11a566590bc297ded6581a38a64685bc',
        'accountId' => '1193611',
        'logger' => [
            'level' => 'DEBUG',
            'prefix' => 'Instance 1',
            'isAnsiColorEnabled' => true
        ],
       
        'proxy' => [
            'url' => 'https://proxy.yourdomain.com',
        ],
];

$wingifyClient = Wingify::init($options);

# Test a simple operation
$userContext = [ 'id' => 'unique_user_id' ];
$flag = $wingifyClient->getFlag('feature-key', $userContext);

echo "Flag enabled: " . $flag['isEnabled'];

```

<br />
