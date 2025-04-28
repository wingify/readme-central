---
title: Storage Service
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: fme-java-integrations
      title: Integrations
---
The SDK operates in a stateless mode by default, meaning each get_flag call triggers a fresh evaluation of the flag against the current user context.

To optimize performance and maintain consistency, you can implement a custom storage mechanism by passing a storage parameter during initialization. This allows you to persist feature flag decisions in your preferred database system (like Redis, MongoDB, or any other data store).

Key benefits of implementing storage:

1. Improved performance by caching decisions
2. Consistent user experience across sessions
3. Reduced load on your application

The storage mechanism ensures that once a decision is made for a user, it remains consistent even if campaign settings are modified in the VWO Application. This is particularly useful for maintaining a stable user experience during A/B tests and feature rollouts.

## How to Implement a Storage Service

Storage Service is optional while [instantiating](https://developers.vwo.com/v2/docs/fme-java-initialization) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing it.

### Usage

```java
import com.vwo.packages.storage.Connector;
import java.util.HashMap;
import java.util.Map;
public class StorageTest extends Connector {

private final Map<String, Map<String, Object>> storage = new HashMap<>();

  @Override
  public void set(Map<String, Object> data) throws Exception {
      String key = data.get("featureKey") + "_" + data.get("user");

      // Create a map to store the data
      Map<String, Object> value = new HashMap<>();
      value.put("rolloutKey", data.get("rolloutKey"));
      value.put("rolloutVariationId", data.get("rolloutVariationId"));
      value.put("experimentKey", data.get("experimentKey"));
      value.put("experimentVariationId", data.get("experimentVariationId"));

      // Store the value in the storage
      storage.put(key, value);
  }

  @Override
  public Object get(String featureKey, String userId) throws Exception {
      String key = featureKey + "_" + userId;

      // Check if the key exists in the storage
      if (storage.containsKey(key)) {
          return storage.get(key);
      }
      return null;
  }
}
```

Storage Service should expose two methods: _get_ and _set_. VWO uses these methods whenever there is a need to read or write from the storage service.

| Method Name | Params    | Description                                 | Returns                                                                       |
| :---------- | :-------- | :------------------------------------------ | :---------------------------------------------------------------------------- |
| get         | key       | Retrieve stored data                        | Returns a matching user-campaign data mapping corresponding to the key passed |
| set         | key, data | Store user-campaign-variation data mapping. | null                                                                          |