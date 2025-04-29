---
title: Node Provider
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

This VWO Openfeature Provider for Node helps you integrate feature management and experimentation systems within your Node.js based server applications.

| Resource              | Link                                                                                                                                             |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub repository     | [https://github.com/wingify/vwo-openfeature-provider-node](https://github.com/wingify/vwo-openfeature-provider-node)                             |
| Published on          | [https://www.npmjs.com/package/vwo-openfeature-provider-node](https://www.npmjs.com/package/vwo-openfeature-provider-node)                       |
| Openfeature Node docs | [https://openfeature.dev/docs/reference/technologies/server/javascript/](https://openfeature.dev/docs/reference/technologies/server/javascript/) |

> 🚧 **Warning**
>
> Please Note
>
> This library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.

## Requirements

Node.js 10+

## SDK Installation

```shell
# via npm

npm install vwo-openfeature-provider-node --save

# via yarn

yarn add vwo-openfeature-provider-node
```

## Usage

```javascript
const OpenFeature = require('@openfeature/server-sdk').OpenFeature;
const VWOProvider = require('vwo-openfeature-provider-node').VWOProvider;
const vwo = require('vwo-fme-node-sdk');

async function start() {
  const vwoClient = await vwo.init({
    sdkKey: '',
    accountId: ''
  });
  const context = {
    user: {
      id: 'unique-user-id',
    },
  };

  const provider = new VWOProvider(vwoClient);
  OpenFeature.setProvider(provider);

  const newClient = OpenFeature.getClient();
  newClient.setContext(context);

  console.log(
    'BOOLEAN',
    await newClient.getBooleanValue(
      'unique-feature-key',
      false,
      Object.assign({}, context, { key: 'boolean_variable' }),
    ),
  ); //pass 'key' if you want to fetch value of a specific variable. Otherwise it will return feature on/off
  console.log(
    'STRING',
    await newClient.getStringValue('unique-feature-key', '', Object.assign({}, context, { key: 'string-variable' })),
  ); //will return undefined without key
  console.log(
    'NUMERIC',
    await newClient.getNumberValue('unique-feature-key', 10, Object.assign({}, context, { key: 'number-variable' })),
  ); //will return undefined without key
  console.log(
    'FLOAT',
    await newClient.getNumberValue('unique-feature-key', 10.0, Object.assign({}, context, { key: 'float-variable' })),
  ); //will return undefined without key
  console.log(
    'JSON',
    await newClient.getObjectValue('unique-feature-key', {}, Object.assign({}, context, { key: 'json-variable' })),
  ); //pass 'key' if you want to fetch value of a specific variable of type JSON. Otherwise it will return all the variables.
}

start();
```

## API Details

<Table align={["left","left","left","left"]}>
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
        `new VWOProvider(vwoClient)`
      </td>

      <td>
        `vwoClient` (VWO SDK instance)
      </td>

      <td>
        **vwoClient**: The initialized VWO SDK client instance.
      </td>

      <td>
        Creates a new instance of `VWOProvider`, which integrates VWO with OpenFeature.
      </td>
    </tr>

    <tr>
      <td>
        `OpenFeature.setProvider(provider)`
      </td>

      <td>
        `provider` (Instance of `VWOProvider`)
      </td>

      <td>
        **provider**: The VWO provider instance that will handle feature flag evaluations.
      </td>

      <td>
        Sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.
      </td>
    </tr>

    <tr>
      <td>
        `client.setContext(context)`
      </td>

      <td>
        `context: object`
      </td>

      <td>
        **context**: Contains user details (e.g., `{ user: { id: 'unique-user-id' } }`).
      </td>

      <td>
        Sets the evaluation context for feature flag evaluations, helping with user-based targeting.
      </td>
    </tr>

    <tr>
      <td>
        `client.getBooleanValue`
      </td>

      <td>
        ```
        featureKey: string,
        defaultValue: boolean, context: object
        ```
      </td>

      <td>
        **featureKey**: The unique key representing the feature flag.<br />\
        **defaultValue**: The fallback boolean value if the flag evaluation fails.<br />
        **context**: The evaluation context containing user details and an optional `key` to fetch a specific variable.
      </td>

      <td>
        Fetches the boolean value of a feature flag. If `key` is present in `context`, it retrieves a specific variable; otherwise, it returns whether the feature is enabled.
      </td>
    </tr>

    <tr>
      <td>
        `client.getStringValue`
      </td>

      <td>
        `featureKey: string, defaultValue: string, context: object`
      </td>

      <td>
        **featureKey**: The unique key representing the feature flag.<br />\
        **defaultValue**: The fallback string value if the flag evaluation fails.<br />
        **context**: The evaluation context with user details and optional `key` to fetch a specific variable.
      </td>

      <td>
        Fetches the string value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.
      </td>
    </tr>

    <tr>
      <td>
        `client.getNumberValue`
      </td>

      <td>
        `featureKey: string, defaultValue: number, context: object`
      </td>

      <td>
        **featureKey**: The unique key representing the feature flag.<br />\
        **defaultValue**: The fallback numeric value if the flag evaluation fails.<br />
        **context**: The evaluation context with user details and optional `key` to fetch a specific variable.
      </td>

      <td>
        Fetches the numeric value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.
      </td>
    </tr>

    <tr>
      <td>
        `client.getObjectValue`
      </td>

      <td>
        `featureKey: string, defaultValue: object, context: object`
      </td>

      <td>
        **featureKey**: The unique key representing the feature flag.<br />\
        **defaultValue**: The fallback JSON object if the flag evaluation fails.<br />
        **context**: The evaluation context with user details and optional `key` to fetch a specific variable.
      </td>

      <td>
        Fetches the JSON object value of a feature flag. If `key` is provided in `context`, it retrieves a specific variable value; otherwise, it returns all JSON variables.
      </td>
    </tr>
  </tbody>
</Table>