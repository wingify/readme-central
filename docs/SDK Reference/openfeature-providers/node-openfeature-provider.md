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

| Resource              | Link                                                                     |
| :-------------------- | :----------------------------------------------------------------------- |
| GitHub repository     | <https://github.com/wingify/vwo-openfeature-provider-node>               |
| Published on          | <https://www.npmjs.com/package/vwo-openfeature-provider-node>            |
| Openfeature Node docs | <https://openfeature.dev/docs/reference/technologies/server/javascript/> |

> 🚧 Please Note
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

```node Node.js
const OpenFeature = require('@openfeature/server-sdk').OpenFeature;
const VWOProvider = require('vwo-openfeature-provider-node').VWOProvider;
const vwo = require('vwo-fme-node-sdk');

async function start() {
  const vwoClient = await vwo.init({
    sdkKey: '<enter-vwo-sdk-key-here>',
    accountId: '<vwo-account-id>'
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

[block:parameters]
{
  "data": {
    "h-0": "API",
    "h-1": "Arguments",
    "h-2": "Argument Description",
    "h-3": "API Description",
    "0-0": "`new VWOProvider(vwoClient)`",
    "0-1": "`vwoClient` (VWO SDK instance)",
    "0-2": "**vwoClient**: The initialized VWO SDK client instance.",
    "0-3": "Creates a new instance of `VWOProvider`, which integrates VWO with OpenFeature.",
    "1-0": "`OpenFeature.setProvider(provider)`",
    "1-1": "`provider` (Instance of `VWOProvider`)",
    "1-2": "**provider**: The VWO provider instance that will handle feature flag evaluations.",
    "1-3": "Sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.",
    "2-0": "`client.setContext(context)`",
    "2-1": "`context: object`",
    "2-2": "**context**: Contains user details (e.g., `{ user: { id: 'unique-user-id' } }`).",
    "2-3": "Sets the evaluation context for feature flag evaluations, helping with user-based targeting.",
    "3-0": "`client.getBooleanValue`",
    "3-1": "`featureKey: string,\ndefaultValue: boolean, context: object`",
    "3-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback boolean value if the flag evaluation fails.<br>**context**: The evaluation context containing user details and an optional `key` to fetch a specific variable.",
    "3-3": "Fetches the boolean value of a feature flag. If `key` is present in `context`, it retrieves a specific variable; otherwise, it returns whether the feature is enabled.",
    "4-0": "`client.getStringValue`",
    "4-1": "`featureKey: string, defaultValue: string, context: object`",
    "4-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback string value if the flag evaluation fails.<br>**context**: The evaluation context with user details and optional `key` to fetch a specific variable.",
    "4-3": "Fetches the string value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.",
    "5-0": "`client.getNumberValue`",
    "5-1": "`featureKey: string, defaultValue: number, context: object`",
    "5-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback numeric value if the flag evaluation fails.<br>**context**: The evaluation context with user details and optional `key` to fetch a specific variable.",
    "5-3": "Fetches the numeric value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.",
    "6-0": "`client.getObjectValue`",
    "6-1": "`featureKey: string, defaultValue: object, context: object`",
    "6-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback JSON object if the flag evaluation fails.<br>**context**: The evaluation context with user details and optional `key` to fetch a specific variable.",
    "6-3": "Fetches the JSON object value of a feature flag. If `key` is provided in `context`, it retrieves a specific variable value; otherwise, it returns all JSON variables."
  },
  "cols": 4,
  "rows": 7,
  "align": [
    null,
    null,
    null,
    null
  ]
}
[/block]