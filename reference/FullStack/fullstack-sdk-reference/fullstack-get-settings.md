---
title: Get Settings File
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Each VWO SDK client corresponds to the *settingsFile* representing the current state of the campaign settings, that is, a list of FullStack running campaign settings. See [Review core concepts](https://developers.vwo.com/reference#fullstack-core-concepts) and [Instantiate a client](https://developers.vwo.com/reference#fullstack-sdk-instantiation) for more information.

## Description

VWO SDK is a helper for executing various FullStack capabilities. It requires a certain set of settings for its work. These settings are related to your FullStack campaigns you create or update in the VWO application.\
So, before [instantiating](https://developers.vwo.com/reference#fullstack-sdk-instantiation) the VWO SDK, *settingsFile* needs to be fetched.

The method accepts two parameters:

* **accountId** - account-id associated with your VWO account.
* **sdkKey** - generated inside the respective *Project* under the ***FullStack Testing***.

## Parameter Definitions

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Paramter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **accountId**
        *Required*
      </td>

      <td>
        Number
      </td>

      <td>
        Your VWO application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **sdkKey**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Unique environment-key provided to you inside the Projects section in VWO application..
      </td>
    </tr>
  </tbody>
</Table>

## Returns

Returns a Promise which on success returns the *settingsFile* which helps in [Instantiating](https://developers.vwo.com/reference#fullstack-sdk-instantiation) the VWO SDK. This method handles any error in fetching the settings file. Please follow the [best practices](https://developers.vwo.com/reference#fullstack-best-practices) to ensure that your app is prevented from crashing.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Value
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Settings File
      </td>

      <td>
        Object | String
      </td>

      <td>
        The settings representing the current state of the running VWO FullStack campaings.
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```javascript Node.js
var vwoSDK = require('vwo-node-sdk');

var settingsFile;
vwoSDK.getSettingsFile(accountId, sdkKey).then(function (data) {
	settingsFile = data;
  // ...launch SDK and call APIs
});
```
```php
<?php

require_once('vendor/autoload.php');

use vwo\VWO;

$settingsFile = VWO::getSettingsFile($accountId, $sdkKey);
```
```python
import vwo

settings_file = vwo.get_settings_file(account_id, sdk_key)
```
```csharp .NET
using VWOSdk;

Settings settingsFile = VWO.GetSettingsFile(accountId, sdkKey);
```
```java
import com.vwo.VWO;

String settingsFile = VWO.getSettingsFile(accountId, sdkKey);
```
```ruby
require 'vwo'

// after instantiating also, settings file can be fetched
vwo_client_instance.get_settings(accountId, sdkKey)
```
```go
import vwo "github.com/wingify/vwo-go-sdk"
import "github.com/wingify/vwo-go-sdk/pkg/api"

settingsFile := vwo.GetSettingsFile("accountId", "sdkKey")
```

## Syncing changes in Settings File

You can use [polling](https://developers.vwo.com/reference#fullstack-configure-polling) or [webhooks](https://developers.vwo.com/reference#fullstack-configure-webhooks) to keep your settings-file up-to-date with the VWO Application(changes you made in FullSTack campaigns).
