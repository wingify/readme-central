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
```mdx
## Get Started

An **OpenFeature Provider** is a **pluggable integration layer** that connects the **OpenFeature SDK** to a specific **feature flag management system** (e.g., VWO or custom in-house solutions). OpenFeature is an open-source standard for feature flagging, designed to provide a **vendor-agnostic** approach, enabling organizations to switch between feature flagging tools without rewriting application code.

This VWO Openfeature Provider for PHP helps you integrate feature management and experimentation systems within your PHP-based server applications.

| Resource             | Link                                                                                                                                |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| GitHub repository    | [https://github.com/wingify/vwo-openfeature-provider-php](https://github.com/wingify/vwo-openfeature-provider-php)                  |
| Published on         | [https://pypi.org/project/vwo-openfeature-provider-php/](https://pypi.org/project/vwo-openfeature-provider-php/)                    |
| Openfeature PHP docs | [&lt;https://openfeature.dev/docs/reference/technologies/server/php&gt;](https://openfeature.dev/docs/reference/technologies/server/php) |

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

<Table>
  <thead>
    <tr>
      <th>
        API
      </th>

      <th>
        Arguments
      </th>

      <th>
        Argument Description
      </th>

      <th>
        API Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `VWO::init`
      </td>

      <td>
        `$vwoInitOptions: array`
      </td>

      <td>
        * \*sdkKey\*\*: Unique key for authentication with VWO.<br>**accountId\*\*: VWO account identifier.
      </td>

      <td>
        Initializes the VWO client with the provided SDK key and account ID. Returns a VWO client instance or `null` if initialization fails.
      </td>
    </tr>

    <tr>
      <td>
        `new VWOProvider($vwoClient)`
      </td>

      <td>
        `$vwoClient: VWO`
      </td>

      <td>
        * \*vwoClient\*\*: The initialized VWO SDK client instance.
      </td>

      <td>
        Creates a new instance of `VWOProvider`, integrating VWO with OpenFeature.
      </td>
    </tr>

    <tr>
      <td>
        `OpenFeatureAPI::getInstance()`
      </td>

      <td>
        None
      </td>

      <td>
        *
      </td>

      <td>
        Returns a singleton instance of OpenFeatureAPI for managing feature flag evaluations.
      </td>
    </tr>

    <tr>
      <td>
        `$api->setProvider($vwoProvider)`
      </td>

      <td>
        `$vwoProvider: VWOProvider`
      </td>

      <td>
        * \*vwoProvider\*\*: The VWO provider instance that will handle feature flag evaluations.
      </td>

      <td>
        Sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.
      </td>
    </tr>

    <tr>
      <td>
        `new EvaluationContext($targetingKey, $attributes)`
      </td>

      <td>
        `$targetingKey: string, $attributes: Attributes`
      </td>

      <td>
        * \*targetingKey\*\*: Unique identifier for the user.<br>**attributes\*\*: Object containing additional attributes (e.g., `key`, `customVariables`).
      </td>

      <td>
        Creates an evaluation context with user-specific details and attributes for feature flag evaluation.
      </td>
    </tr>

    <tr>
      <td>
        `new Attributes($attributeArray)`
      </td>

      <td>
        `$attributeArray: array`
      </td>

      <td>
        * \*attributeArray\*\*: Key-value pairs of attributes (e.g., `['key' => 'variable-key', 'customVariables' => ['name' => 'Ashley']]`).
      </td>

      <td>
        Initializes attributes for evaluation context, containing user-specific details.
      </td>
    </tr>

    <tr>
      <td>
        `$api->getClient()`
      </td>

      <td>
        None
      </td>

      <td>
        *
      </td>

      <td>
        Returns a client instance from OpenFeature API for evaluating feature flags.
      </td>
    </tr>

    <tr>
      <td>
        `$client->getObjectValue($featureKey, $defaultValue, $context)`
      </td>

      <td>
        `$featureKey: string, $defaultValue: mixed, $context: EvaluationContext`
      </td>

      <td>
        * \*featureKey\*\*: The unique key representing the feature flag.<br>**defaultValue\*\*: The fallback value if the flag evaluation fails.<br>**context\*\*: The evaluation context containing user details and attributes.
      </td>

      <td>
        Fetches the object value of a feature flag. Uses `context` to retrieve user-specific values.
      </td>
    </tr>
  </tbody>
</Table>
```