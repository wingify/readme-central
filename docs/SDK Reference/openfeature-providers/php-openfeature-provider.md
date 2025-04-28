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
| GitHub repository    | <https://github.com/wingify/vwo-openfeature-provider-php>                                                                           |
| Published on         | <https://pypi.org/project/vwo-openfeature-provider-php/>                                                                            |
| Openfeature PHP docs | [\<https://openfeature.dev/docs/reference/technologies/server/php>](https://openfeature.dev/docs/reference/technologies/server/php) |

> 🚧 Please Note
> 
> This library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.

## Requirements

PHP: 7.4+

## SDK Installation

It's recommended you use [composer](https://getcomposer.org/) to install dependencies

```shell Shell
composer require vwo/vwo-openfeature-provider-php
```

## Usage

```php Python
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

[block:parameters]
{
  "data": {
    "h-0": "API",
    "h-1": "Arguments",
    "h-2": "Argument Description",
    "h-3": "API Description",
    "0-0": "`VWO::init`",
    "0-1": "`$vwoInitOptions: array`",
    "0-2": "**sdkKey**: Unique key for authentication with VWO.<br>**accountId**: VWO account identifier.",
    "0-3": "Initializes the VWO client with the provided SDK key and account ID. Returns a VWO client instance or `null` if initialization fails.",
    "1-0": "`new VWOProvider($vwoClient)`",
    "1-1": "`$vwoClient: VWO`",
    "1-2": "**vwoClient**: The initialized VWO SDK client instance.",
    "1-3": "Creates a new instance of `VWOProvider`, integrating VWO with OpenFeature.",
    "2-0": "`OpenFeatureAPI::getInstance()`",
    "2-1": "None",
    "2-2": "-",
    "2-3": "Returns a singleton instance of OpenFeatureAPI for managing feature flag evaluations.",
    "3-0": "`$api->setProvider($vwoProvider)`",
    "3-1": "`$vwoProvider: VWOProvider`",
    "3-2": "**vwoProvider**: The VWO provider instance that will handle feature flag evaluations.",
    "3-3": "Sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.",
    "4-0": "`new EvaluationContext($targetingKey, $attributes)`",
    "4-1": "`$targetingKey: string, $attributes: Attributes`",
    "4-2": "**targetingKey**: Unique identifier for the user.<br>**attributes**: Object containing additional attributes (e.g., `key`, `customVariables`).",
    "4-3": "Creates an evaluation context with user-specific details and attributes for feature flag evaluation.",
    "5-0": "`new Attributes($attributeArray)`",
    "5-1": "`$attributeArray: array`",
    "5-2": "**attributeArray**: Key-value pairs of attributes (e.g., `['key' => 'variable-key', 'customVariables' => ['name' => 'Ashley']]`).",
    "5-3": "Initializes attributes for evaluation context, containing user-specific details.",
    "6-0": "`$api->getClient()`",
    "6-1": "None",
    "6-2": "-",
    "6-3": "Returns a client instance from OpenFeature API for evaluating feature flags.",
    "7-0": "`$client->getObjectValue($featureKey, $defaultValue, $context)`",
    "7-1": "`$featureKey: string, $defaultValue: mixed, $context: EvaluationContext`",
    "7-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback value if the flag evaluation fails.<br>**context**: The evaluation context containing user details and attributes.",
    "7-3": "Fetches the object value of a feature flag. Uses `context` to retrieve user-specific values."
  },
  "cols": 4,
  "rows": 8,
  "align": [
    null,
    null,
    null,
    null
  ]
}
[/block]