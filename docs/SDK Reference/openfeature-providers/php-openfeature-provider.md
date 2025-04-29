---
title: PHP Provider
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

This VWO Openfeature Provider for PHP helps you integrate feature management and experimentation systems within your PHP-based server applications.

| Resource             | Link                                                                                                                                |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| GitHub repository    | [https://github.com/wingify/vwo-openfeature-provider-php](https://github.com/wingify/vwo-openfeature-provider-php)                  |
| Published on         | [https://pypi.org/project/vwo-openfeature-provider-php/](https://pypi.org/project/vwo-openfeature-provider-php/)                    |
| Openfeature PHP docs | [\<https://openfeature.dev/docs/reference/technologies/server/php>](https://openfeature.dev/docs/reference/technologies/server/php) |

> 🚧 Please Note
>
> This library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.

## Requirements

PHP: 7.4+

## SDK Installation

It's recommended you use [composer](https://getcomposer.org/) to install dependencies

```shell
composer require vwo/vwo-openfeature-provider-php
```

## Usage

```php
use OpenFeature\OpenFeatureAPI;
use OpenFeature\implementation\flags\EvaluationContext;
use VWOOpenFeatureProvider\VWOProvider;
use vwo\VWO;

class OpenFeatureTest {
  public static function main() {
    // Initialize the VWO client options
    $vwoInitOptions = [
        'sdkKey' => 'your-sdk-key-here',     // Replace with your SDK Key
        'accountId' => 123456,               // Replace with your VWO Account ID
    ];

    // Initialize VWO Client
    $vwoClient = VWO::init($vwoInitOptions);
    if ($vwoClient === null) {
        echo "Failed to initialize VWO Client\n";
        return;
    }

    // Initialize the VWO provider
    $vwoProvider = new VWOProvider($vwoClient);

    // Set the provider using OpenFeature API
    $api = OpenFeatureAPI::getInstance();
    $api->setProvider($vwoProvider);

    // Call the test flags method to evaluate different flag types
    self::testFlags($api);
  }

  public static function testFlags(OpenFeatureAPI $api) {
    // Create custom variables for the context
    $customVariables = [
        'name' => 'Ashley'
    ];

    // Manually creating EvaluationContext with targetingKey and additional attributes
    $attributes = new OpenFeature\implementation\flags\Attributes([
        'key' => 'variable-key',
        'customVariables' => $customVariables, // Custom variables
    ]);

    $context = new EvaluationContext('userId1', $attributes);

    // Get the client from OpenFeature API
    $client = $api->getClient();

    // Test object flag
    $objectResult = $client->getObjectValue('f1',$customVariables, $context);
    echo "OBJECT result: " . json_encode($objectResult) . "\n";
  }
}

// Run the OpenFeatureTest script
OpenFeatureTest::main();
```

## API Details

| API                                                             | Arguments                                                                | Argument Description                                                                                                                                                                                                   | API Description                                                                                                                       |
| :-------------------------------------------------------------- | :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `VWO::init`                                                     | `$vwoInitOptions: array`                                                 | **sdkKey**: Unique key for authentication with VWO.<br />**accountId**: VWO account identifier.                                                                                                                        | Initializes the VWO client with the provided SDK key and account ID. Returns a VWO client instance or `null` if initialization fails. |
| `new VWOProvider($vwoClient)`                                   | `$vwoClient: VWO`                                                        | **vwoClient**: The initialized VWO SDK client instance.                                                                                                                                                                | Creates a new instance of `VWOProvider`, integrating VWO with OpenFeature.                                                            |
| `OpenFeatureAPI::getInstance()`                                 | None                                                                     |                                                                                                                                                                                                                        | Returns a singleton instance of OpenFeatureAPI for managing feature flag evaluations.                                                 |
| `$api->setProvider($vwoProvider)`                               | `$vwoProvider: VWOProvider`                                              | **vwoProvider**: The VWO provider instance that will handle feature flag evaluations.                                                                                                                                  | Sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.                                                   |
| `new EvaluationContext($targetingKey, $attributes)`             | `$targetingKey: string, $attributes: Attributes`                         | **targetingKey**: Unique identifier for the user.<br />**attributes**: Object containing additional attributes (e.g., `key`, `customVariables`).                                                                       | Creates an evaluation context with user-specific details and attributes for feature flag evaluation.                                  |
| `new Attributes($attributeArray)`                               | `$attributeArray: array`                                                 | **attributeArray**: Key-value pairs of attributes (e.g., `['key' => 'variable-key', 'customVariables' => ['name' => 'Ashley']]`).                                                                                      | Initializes attributes for evaluation context, containing user-specific details.                                                      |
| `$api->getClient()`                                             | None                                                                     |                                                                                                                                                                                                                        | Returns a client instance from OpenFeature API for evaluating feature flags.                                                          |
| `$client->getObjectValue($featureKey, $defaultValue, $context)` | `$featureKey: string, $defaultValue: mixed, $context: EvaluationContext` | **featureKey**: The unique key representing the feature flag.<br />**defaultValue**: The fallback value if the flag evaluation fails.<br />**context**: The evaluation context containing user details and attributes. | Fetches the object value of a feature flag. Uses `context` to retrieve user-specific values.                                          |