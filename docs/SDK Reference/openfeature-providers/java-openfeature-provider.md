---
title: Java Provider
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
## Get Started

An **OpenFeature Provider** is a **pluggable integration layer** that connects the **OpenFeature SDK** to a specific **feature flag management system** (e.g., VWO or custom in-house solutions). OpenFeature is an open-source standard for feature flagging, designed to provide a **vendor-agnostic** approach, enabling organizations to switch between feature flagging tools without rewriting application code.

This VWO OpenFeature Provider for Java helps you integrate feature management and experimentation systems within your Java-based server applications.

<Cards columns={4}>
  <Card title="GitHub Repo" icon="fa-code-commit">
    Check <a href="https://github.com/wingify/vwo-openfeature-provider-java" target="_blank">this</a> out
  </Card>

  <Card title="OpenFeature Ecosystem" icon="fa-globe-pointer">
    Check <a href="https://openfeature.dev/ecosystem?instant_search%5Bquery%5D=vwo%20java%20server" target="_blank">this</a> out
  </Card>

  <Card title="OpenFeature Docs" icon="fa-book-open">
    Check <a href="https://openfeature.dev/docs/reference/technologies/server/java" target="_blank">this</a> out
  </Card>
</Cards>

> 🚧 **Warning**
>
> **Note:** This library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.

## Requirements

The Java SDK supports:

* Open JDK - 8 onwards
* Oracle JDK - 8 onwards

## SDK Installation

Install dependencies using `mvn install`

Add below Maven dependency in your project.

```xml
<dependency>
    <groupId>com.vwo.sdk</groupId>
    <artifactId>vwo-openfeature-provider-java</artifactId>
    <version>LATEST</version>
</dependency>
```

## Usage

```java
import dev.openfeature.sdk.*;
import com.vwo.VWOProvider;
import java.util.Map;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();

Map<String, Object> options = new HashMap<>();
options.put("accountId", 1234);
options.put("sdkKey", "32-alpha-numeric-sdk-key");

api.setProvider(new VWOProvider(vwoClient));

EvaluationContext context = new ImmutableContext(new HashMap() {
       {
           put("userId", new Value("user1")); // userId
           put("key", new Value("variableKey")); // variable key
           put("customVariables", new Value(new ImmutableContext(new HashMap() {
               {
                   put("key", new Value("value"));
               }
           })));
       }
});

Client vwoClient = api.getClient("vwo-openfeature-provider-java-provider");
apiClient.getStringValue("featureKey", "defaultValue", context)
```

<br />## API Details

| API                                 | Arguments                                                    | Argument Description                                                                                                                                                                                                                                               | API Description                                                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `new VWOProvider(vwoClient)`        | `vwoClient` (VWO SDK instance)                               | **vwoClient**: The initialized VWO SDK client instance.                                                                                                                                                                                                            | Creates a new instance of `VWOProvider`, which integrates VWO with OpenFeature.                                                                                        |
| `OpenFeature.setProvider(provider)` | `provider` (Instance of `VWOProvider`)                       | **provider**: The VWO provider instance that will handle feature flag evaluations.                                                                                                                                                                                 | Sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.                                                                                    |
| `client.setContext(context)`        | `context: object`                                            | **context**: Contains user details (e.g., `{ user: { id: 'unique-user-id' } }`).                                                                                                                                                                                   | Sets the evaluation context for feature flag evaluations, helping with user-based targeting.                                                                           |
| `client.getBooleanValue`            | `featureKey: string, defaultValue: boolean, context: object` | **featureKey**: The unique key representing the feature flag.<br />**defaultValue**: The fallback boolean value if the flag evaluation fails.<br />**context**: The evaluation context containing user details and an optional `key` to fetch a specific variable. | Fetches the boolean value of a feature flag. If `key` is present in `context`, it retrieves a specific variable; otherwise, it returns whether the feature is enabled. |
| `client.getStringValue`             | `featureKey: string, defaultValue: string, context: object`  | **featureKey**: The unique key representing the feature flag.<br />**defaultValue**: The fallback string value if the flag evaluation fails.<br />**context**: The evaluation context with user details and optional `key` to fetch a specific variable.           | Fetches the string value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.                         |
| `client.getNumberValue`             | `featureKey: string, defaultValue: number, context: object`  | **featureKey**: The unique key representing the feature flag.<br />**defaultValue**: The fallback numeric value if the flag evaluation fails.<br />**context**: The evaluation context with user details and optional `key` to fetch a specific variable.          | Fetches the numeric value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.                        |
| `client.getObjectValue`             | `featureKey: string, defaultValue: object, context: object`  | **featureKey**: The unique key representing the feature flag.<br />**defaultValue**: The fallback JSON object if the flag evaluation fails.<br />**context**: The evaluation context with user details and optional `key` to fetch a specific variable.            | Fetches the JSON object value of a feature flag. If `key` is provided in `context`, it retrieves a specific variable value; otherwise, it returns all JSON variables.  |