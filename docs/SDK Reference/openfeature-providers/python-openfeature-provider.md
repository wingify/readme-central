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

An **OpenFeature Provider** is a **pluggable integration layer** that connects the **OpenFeature SDK** to a specific **feature flag management system** (e.g., Wingify or custom in-house solutions). OpenFeature is an open-source standard for feature flagging, designed to provide a **vendor-agnostic** approach, enabling organizations to switch between feature flagging tools without rewriting application code.

This Wingify OpenFeature Provider for Python helps you integrate Feature Experimentation systems into your Python-based server applications.

<Cards columns="4">
  <Card title="GitHub Repo" icon="fa-code-commit">
    Check <a href="https://github.com/wingify/vwo-openfeature-provider-python" target="_blank">this</a> out
  </Card>

  <Card title="Published on PyPi" icon="fa-download">
    Check <a href="https://pypi.org/project/vwo-openfeature-provider-python/" target="_blank">this</a> out
  </Card>

  <Card title="OpenFeature Ecosystem" icon="fa-globe-pointer">
    Check <a href="https://openfeature.dev/ecosystem?instant_search%5Bquery%5D=vwo%20python" target="_blank">this</a> out
  </Card>

  <Card title="OpenFeature Docs" icon="fa-book-open">
    Check <a href="https://openfeature.dev/docs/reference/technologies/server/python" target="_blank">this</a> out
  </Card>
</Cards>

<Callout icon="🚧" theme="warn">
  ### **Note**

  This library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.
</Callout>

## Requirements

Python: 3.8+

## SDK Installation

It's recommended you use [virtualenv](https://virtualenv.pypa.io/en/latest/) to create isolated Python environments.

```shell
pip install vwo-openfeature-provider-python
```

## Usage

```python
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

| API                                     | Arguments                                                      | Argument Description                                                                                                                                                                                                                                                             | API Description                                                                                                                                                        |
| :-------------------------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `new VWOProvider(vwo_client)`           | `vwo_client` (VWO SDK instance)                                | **vwo_client**: The initialized VWO SDK client instance.                                                                                                                                                                                                                         | Creates a new instance of `VWOProvider`, which integrates VWO with OpenFeature.                                                                                        |
| `OpenFeature.setProvider(vwo_provider)` | `provider` (Instance of `VWOProvider`)                         | **provider**: The VWO provider instance that will handle feature flag evaluations.                                                                                                                                                                                               | Sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.                                                                                    |
| `client.set_context(context)`           | `context: object`                                              | **context**: Contains user details (e.g., `{ user: { id: 'unique-user-id' } }`).                                                                                                                                                                                                 | Sets the evaluation context for feature flag evaluations, helping with user-based targeting.                                                                           |
| `client.get_boolean_value`              | `feature_key: string, default_value: boolean, context: object` | **feature_key**: The unique key representing the feature flag.<br /><br />**default_value**: The fallback boolean value if the flag evaluation fails.<br /><br />**context**: The evaluation context containing user details and an optional `key` to fetch a specific variable. | Fetches the boolean value of a feature flag. If `key` is present in `context`, it retrieves a specific variable; otherwise, it returns whether the feature is enabled. |
| `client.get_string_value`               | `feature_key: string, default_value: string, context: object`  | **feature_key**: The unique key representing the feature flag.<br /><br />**default_value**: The fallback string value if the flag evaluation fails.<br /><br />**context**: The evaluation context with user details and optional `key` to fetch a specific variable.           | Fetches the string value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.                         |
| `client.get_number_value`               | `feature_key: string, default_value: number, context: object`  | **feature_key**: The unique key representing the feature flag.<br /><br />**default_value**: The fallback numeric value if the flag evaluation fails.<br /><br />**context**: The evaluation context with user details and optional `key` to fetch a specific variable.          | Fetches the numeric value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.                        |
| `client.get_object_value`               | `feature_key: string, default_value: object, context: object`  | **feature_key**: The unique key representing the feature flag.<br /><br />**default_value**: The fallback JSON object if the flag evaluation fails.<br /><br />**context**: The evaluation context with user details and optional `key` to fetch a specific variable.            | Fetches the JSON object value of a feature flag. If `key` is provided in `context`, it retrieves a specific variable value; otherwise, it returns all JSON variables.  |
