---
title: Gateway Service
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
## Overview

The VWO FME Gateway Service is a critical component for VWO's Feature Management and Experimentation (FME) SDKs, particularly essential for pre-segmentation based on user location and user agent (UA). It's designed to be deployed within your infrastructure, ensuring minimal latency and enhanced security for FME operations.

## When is Gateway Service Needed?

The Gateway Service is required in the following scenarios:

1. When using pre-segmentation features based on user location or user agent.
2. For applications requiring advanced targeting capabilities.
3. It's mandatory when using any thin-client SDK (e.g., Go and Ruby).

## Architecture and Deployment

The Gateway Service is designed to be deployed within your backend infrastructure. This architectural decision offers several key advantages:

1. **Minimal Latency**: Communication between your application servers (where the FME SDKs are implemented) and the Gateway Service occurs internally, ensuring quick response times.
2. **Enhanced Security**: By keeping all communication within your network, you maintain greater control over data flow and can implement your security measures.
3. **Scalability**: You can scale the Gateway Service according to your needs and traffic patterns.
4. **Network Efficiency**: The internal communication reduces external network calls, potentially lowering bandwidth usage and associated costs.

Your application calls the VWO FME SDK, which communicates with the locally deployed Gateway Service. The Gateway Service handles complex logic and data management required for feature management and experimentation.

<Image align="center" src="https://files.readme.io/f983ba3e8432b9bc7e203f76372310430473131856b354b494c6f0930238fa9b-FME_Gateway.drawio.png" />

## Key Features

* Handles location and user agent information requests
* Provides a unified interface for VWO SDK operations
* Supports caching for improved response times
* Offers configurable polling for VWO campaign settings updates
* Enables low-latency, internal communication with FME SDKs

## Deployment

VWO FME Gateway Service is available on the docker hub.\
Docker Image: [https://hub.docker.com/r/wingifysoftware/vwo-fme-gateway-service](https://hub.docker.com/r/wingifysoftware/vwo-fme-gateway-service)

### Prerequisites

* Docker and Docker Compose
* VWO Account ID and SDK Key
* (Optional) MaxMind GeoIP database credentials

### Setup

Choose the appropriate setup based on your Redis configuration:

#### Without Existing Redis Instance

Create a `docker-compose.yaml` file:

```yaml
services:
  app:
    image: wingifysoftware/vwo-fme-gateway-service:latest
    ports:
      - "8000:8000"
    volumes:
      - {your_redis_certs_folder}:/certs
    environment:
      - ACCOUNT_ID=your_account_id
      - SDK_KEY=your_sdk_key
      - POLLING_TIME=60000
      - MAXMIND_USER_ID=
      - MAXMIND_LICENSE_KEY=
      - CORS_CONFIG_REQUIRED=false
      - DECISION_REQUIRED=false
      - LOG_LEVEL=ERROR
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - REDIS_ENABLE_TLS=false
      - REDIS_TLS_CA_PATH=
      - REDIS_TLS_KEY_PATH=
      - REDIS_TLS_CERT_PATH=
      - REDIS_TLS_REJECT_UNAUTHORIZED=false
    depends_on:
      - redis
  redis:
    image: redis/redis-stack-server:latest
    ports:
      - "6379:6379"

 
```

<br />

#### With Existing Redis Instance

Modify the `docker-compose.yaml`:

```yaml
services:
  app:
    image: wingifysoftware/vwo-fme-gateway-service:latest
    ports:
      - "8000:8000"
    environment:
      - ACCOUNT_ID=your_account_id
      - SDK_KEY=your_sdk_key
      - POLLING_TIME=60000
      - MAXMIND_USER_ID=
      - MAXMIND_LICENSE_KEY=
      - CORS_CONFIG_REQUIRED=false
      - DECISION_REQUIRED=false
      - LOG_LEVEL=ERROR
      - REDIS_HOST=
      - REDIS_PORT=
      - REDIS_PASSWORD=
      - REDIS_ENABLE_TLS=false
      - REDIS_TLS_CA_PATH=
      - REDIS_TLS_KEY_PATH=
      - REDIS_TLS_CERT_PATH=
      - REDIS_TLS_REJECT_UNAUTHORIZED=false
    networks:
      - your_network

networks:
  your_network:
    external: true
```

### Configuration Options

* `ACCOUNT_ID` (required): Your VWO account ID. This uniquely identifies your VWO account.

* `SDK_KEY` (required): Your VWO SDK key. This is used to identify the environment you're running and for authentication.

* `POLLING_TIME` (optional, default: 60000): The interval in milliseconds at which the Gateway Service polls VWO servers for updates to campaign settings. Adjust this based on how frequently you update your VWO campaigns.

* `MAXMIND_USER_ID` and `MAXMIND_LICENSE_KEY` (optional): Credentials for MaxMind GeoIP database. This is mandatory if you want to leverage accurate geolocation-based targeting and segmentation in FME.

* `CORS_CONFIG_REQUIRED` (optional, default: false): Set to true if requests are being sent from the client-side (e.g., browser-based applications). This enables Cross-Origin Resource Sharing (CORS) headers.

* `DECISION_REQUIRED` (optional, default: false): Set to true if you want the Gateway Service to make decisions about feature flags and experiments. If false, the SDK will make these decisions.

* `LOG_LEVEL` (optional, default: ERROR): Sets the logging verbosity. Options are:
  * ERROR: Only log errors
  * INFO: Log informational messages and errors
  * DEBUG: Log detailed debug information, informational messages, and errors

* `REDIS_HOST` (required if using Redis): The hostname of your Redis server.

* `REDIS_PORT` (required if using Redis): The port number on which your Redis server is running.

* `REDIS_PASSWORD` (optional): The password for your Redis server, if authentication is enabled.

* `REDIS_ENABLE_TLS` (optional, default: false): Set to true if your Redis server uses TLS encryption.

* `REDIS_TLS_CA_PATH` (optional): The path to the CA certificate file for Redis TLS connection.

* `REDIS_TLS_KEY_PATH` (optional): The path to the client key file for Redis TLS connection.

* `REDIS_TLS_CERT_PATH` (optional): The path to the client certificate file for Redis TLS connection.

* `REDIS_TLS_REJECT_UNAUTHORIZED` (optional, default: false): Set to true to reject unauthorized Redis TLS connections.

Additional environment variables can be set for fine-tuning the Gateway Service:

* `PORT` (optional, default: 8000): The port on which the Gateway Service will run.

* `MAX_EVENTS_PER_REQUEST` (optional, default: 5000): The maximum number of events that can be sent in a single batch request.

* `FLUSH_EVENTS_INTERVAL` (optional, default: 600): The interval in seconds at which events are flushed to VWO servers.

* `EVENTS_PER_REQUEST` (optional, default: 100): The number of events to be sent in each request during event flushing.

* `SOCKET_TIMEOUT` (optional, default: 5): The timeout in seconds for socket connections.

These configuration options allow you to customize the Gateway Service to fit your specific needs, from basic setup to advanced configurations involving security, caching, and performance optimization.

## API Endpoints

The Gateway Service exposes these main endpoints. These endpoints should be used when you're directly accessing the Gateway Service without using any of VWO's SDKs:

### 1. GetFlag

* **Endpoint**: `POST /server-side/getFlag`
* **Purpose**: Retrieve feature flag status and variables
* **Usage**: Use this endpoint to check if a feature is enabled for a user and retrieve associated variables.

**Request Example:**

```curl
curl --location 'localhost:8000/server-side/getFlag' \
--header 'Content-Type: application/json' \
--data '{
    "featureKey": "your_feature_key",
    "userId": "user_id",
    "ipAddress": "visitor_ip_address",
    "userAgent": "visitor_user_agent",
    "customVariables": {
        "key": "value"
    }
}'
```

**Response Example:**

```json
{
    "isEnabled": true,
    "variables": [
        {
            "value": "variable_value",
            "type": "variable_data_type",
            "key": "variable_key",
            "id": 1
        }
    ]
}
```

Note: `featureKey` and `userId` are required parameters.

### 2. TrackEvent

* **Endpoint**: `POST /server-side/trackEvent`
* **Purpose**: Track custom events
* **Usage**: Use this endpoint to record user actions or conversions.

**Request Example:**

```curl
curl --location 'localhost:8000/server-side/trackEvent' \
--header 'Content-Type: application/json' \
--data '{
    "eventName": "event_name",
    "userId": "user_id",
    "eventProperties": {
        "event_property_key": "event_property_value"
    }
}'
```

**Response Example:**

```json
{
    "event_name": true
}
```

Note: `eventName` and `userId` are required parameters.

### 3. SetAttribute

* **Endpoint**: `POST /server-side/setAttribute`
* **Purpose**: Set custom user attributes
* **Usage**: Use this endpoint to update user properties that may affect feature flag evaluations.

**Request Example:**

```curl
curl --location 'localhost:8000/server-side/setAttribute' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user_id",
    "attributeKey": "attribute_key",
    "attributeValue": "attribute_value"
}'
```

Note: All three parameters are required. The setAttribute API always returns a 200 status code and an empty response.

### Conclusion

The VWO FME Gateway Service enhances VWO SDK capabilities by providing advanced pre-segmentation, consistent cross-platform behaviour, and improved performance within your infrastructure. It ensures fast, efficient, and secure feature management and experimentation processes, making it an essential component for applications leveraging VWO's FME capabilities, especially for thin clients and scenarios requiring advanced targeting or segmentation.

.
