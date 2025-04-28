---
title: Python Provider
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

This VWO Openfeature Provider for Python helps you integrate feature management and experimentation systems within your Python-based server applications.

| Resource                | Link                                                                                                                                   |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub repository       | [https://github.com/wingify/vwo-openfeature-provider-python](https://github.com/wingify/vwo-openfeature-provider-python)               |
| Published on            | [https://pypi.org/project/vwo-openfeature-provider-python/](https://pypi.org/project/vwo-openfeature-provider-python/)                 |
| Openfeature Python docs | [https://openfeature.dev/docs/reference/technologies/server/python](https://openfeature.dev/docs/reference/technologies/server/python) |

> 🚧 Please Note
>
> This library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.

## Requirements

Python: 3.8+

## SDK Installation

It's recommended you use [virtualenv](https://virtualenv.pypa.io/en/latest/) to create isolated Python environments.

```shell Shell
pip install vwo-openfeature-provider-python
```

## Usage

```python Python
from openfeature import api
from vwo_provider import VWOProvider
from openfeature.evaluation_context import EvaluationContext
from vwo import init

options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456' # VWO Account ID
}

# Initialize the VWO client
vwo_client = init(options)

# Initialize the VWO provider
vwo_provider = VWOProvider(vwo_client)

# Registering the default provider
api.set_provider(vwo_provider)

# A client bound to the default provider
default_client = api.get_client()

def start():
    print('BOOL', default_client.get_boolean_value('unique_feature_key', False, EvaluationContext(attributes={'id': 'user_id', 'key': 'boolean_variable'})))
    print('STRING', default_client.get_string_value('unique_feature_key', '', EvaluationContext(attributes={'id': 'user_id', 'key': 'string_variable'})))
    print('INTEGER', default_client.get_integer_value('unique_feature_key', 10, EvaluationContext(attributes={'id': 'user_id', 'key': 'number_variable'})))
    print('FLOAT', default_client.get_float_value('unique_feature_key', 10.0, EvaluationContext(attributes={'id': 'user_id', 'key': 'float_variable'})))
    print('OBJECT', default_client.get_object_value('unique_feature_key', {}, EvaluationContext(attributes={'id': 'user_id', 'key': 'json-variable'})))

start()
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
        `new VWOProvider(vwo_client)`
      </td>
      <td>
        `vwo_client` (VWO SDK instance)
      </td>
      <td>
        * *vwo_client*: The initialized VWO SDK client instance.
      </td>
      <td>
        Creates a new instance of `VWOProvider`, which integrates VWO with OpenFeature.
      </td>
    </tr>
    <tr>
      <td>
        OpenFeature.setProvider(vwo_provider)
      </td>
      <td>
        `provider` (Instance of `VWOProvider`)
      </td>
      <td>
        * *provider*: The VWO provider instance that will handle feature flag evaluations.
      </td>
      <td>
        Sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.
      </td>
    </tr>
    <tr>
      <td>
        `client.set_context(context)`
      </td>
      <td>
        `context: object`
      </td>
      <td>
        * *context*: Contains user details (e.g., `{ user: { id: 'unique-user-id' } }`).
      </td>
      <td>
        Sets the evaluation context for feature flag evaluations, helping with user-based targeting.
      </td>
    </tr>
    <tr>
      <td>
        `client.get_boolean_value`
      </td>
      <td>
        `feature_key: string, default_value: boolean, context: object`
      </td>
      <td>
        * *feature_key*: The unique key representing the feature flag.<br>* *default_value*: The fallback boolean value if the flag evaluation fails.<br>* *context*: The evaluation context containing user details and an optional `key` to fetch a specific variable.
      </td>
      <td>
        Fetches the boolean value of a feature flag. If `key` is present in `context`, it retrieves a specific variable; otherwise, it returns whether the feature is enabled.
      </td>
    </tr>
    <tr>
      <td>
        `client.get_string_value`
      </td>
      <td>
        `feature_key: string, default_value: string, context: object`
      </td>
      <td>
        * *feature_key*: The unique key representing the feature flag.<br>* *default_value*: The fallback string value if the flag evaluation fails.<br>* *context*: The evaluation context with user details and optional `key` to fetch a specific variable.
      </td>
      <td>
        Fetches the string value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.
      </td>
    </tr>
    <tr>
      <td>
        `client.get_number_value`
      </td>
      <td>
        `feature_key: string, default_value: number, context: object`
      </td>
      <td>
        * *feature_key*: The unique key representing the feature flag.<br>* *default_value*: The fallback numeric value if the flag evaluation fails.<br>* *context*: The evaluation context with user details and optional `key` to fetch a specific variable.
      </td>
      <td>
        Fetches the numeric value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.
      </td>
    </tr>
    <tr>
      <td>
        `client.get_object_value`
      </td>
      <td>
        `feature_key: string, default_value: object, context: object`
      </td>
      <td>
        * *feature_key*: The unique key representing the feature flag.<br>* *default_value*: The fallback JSON object if the flag evaluation fails.<br>* *context*: The evaluation context with user details and optional `key` to fetch a specific variable.
      </td>
      <td>
        Fetches the JSON object value of a feature flag. If `key` is provided in `context`, it retrieves a specific variable value; otherwise, it returns all JSON variables.
      </td>
    </tr>
  </tbody>
</Table>