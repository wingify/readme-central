---
title: Storage Service
deprecated: false
hidden: false
metadata:
  robots: index
next:
  pages:
    - slug: fme-node-integrations
      title: Integrations
      type: basic
---
The SDK operates in a stateless mode by default, meaning each get\_flag call triggers a fresh evaluation of the flag against the current user context.

To optimize performance and maintain consistency, you can implement a custom storage mechanism by passing a storage parameter during initialization. This allows you to persist feature flag decisions in your preferred database system (like Redis, MongoDB, or any other data store).

Key benefits of implementing storage:

1. Improved performance by caching decisions
2. Consistent user experience across sessions
3. Reduced load on your application

The storage mechanism ensures that once a decision is made for a user, it remains consistent even if campaign settings are modified in the Wingify Application. This is particularly useful for maintaining a stable user experience during A/B tests and feature rollouts.

## How to Implement a Storage Service

Storage Service is optional while [instantiating](https://developers.wingify.com/v2/docs/fme-go-initialization) the Wingify SDK. However, to ensure sticky variation assignments, we recommend implementing it.

### Usage

```go
// CustomStorageConnector implements the storage.Connector interface
type CustomStorageConnector struct {
	data map[string]map[string]interface{}
}

// NewCustomStorageConnector creates a new custom storage connector
func NewCustomStorageConnector() *CustomStorageConnector {
	return &CustomStorageConnector{
		data: make(map[string]map[string]interface{}),
	}
}

// Set stores data in the custom storage
func (c *CustomStorageConnector) Set(data map[string]interface{}) error {
  // example implementation of Set method
	featureKey, _ := data["featureKey"].(string)
	userID, _ := data["userId"].(string)

	key := featureKey + ":" + userID
	c.data[key] = data
	return nil
}

// Get retrieves data from the custom storage
func (c *CustomStorageConnector) Get(featureKey string, userID string) (interface{}, error) {
  // example implementation of Get method
	key := featureKey + ":" + userID
	if data, exists := c.data[key]; exists {
		return data, nil
	}
	return nil, nil
}

func main {
  customStorage := NewCustomStorageConnector()
  options := map[string]interface{}{
      "sdkKey":    "32-alpha-numeric-sdk-key",
      "accountId": "123456",
      "storage":   customStorage
    }
  wingifyInstance, err := wingify.Init(options)
}
```

Storage Service should expose two methods: _Get_ and _Set_. These methods are used by Wingify whenever there is a need to read or write from the storage service.

| Method Name | Params             | Description                                                 | Returns                                                                                    |
| :---------- | :----------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| Get         | featureKey, userId | Retrieve stored data corresponding to featureKey and userId | Returns a matching user-feature data mapping corresponding to featureKey and userId passed |
| Set         | data               | Store user-feature data mapping                             | null                                                                                       |

<br />
