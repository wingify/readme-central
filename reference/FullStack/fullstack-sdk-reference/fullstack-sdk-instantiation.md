---
title: Launch
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
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/reference), [getVariationName](https://developers.vwo.com/reference#fullstack-sdk-get-variation) and [track](https://developers.vwo.com/reference#fullstack-sdk-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/reference#v-get-settings). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/reference#fullstack-get-settings).

## API Description

SDK provides a method to instantiate a VWO client as an instance. The method accepts an object to configure the VWO client.

The only required parameter for instantiating the SDK is *settingsFile*. There are other optional parameters, which you could provide for overriding the default behavior or setting environment. Refer to [Customize an SDK](https://developers.vwo.com/reference#fullstack-sdk-customization) for more information.

## Parameter Definitions

Below is the list of all parameters that can be used for configuring the VWO SDK.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
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
        **settingsFile**
        *Required*
      </td>

      <td>
        Object
      </td>

      <td>
        The JSON representing your project and the campaign settings.
      </td>
    </tr>

    <tr>
      <td>
        **isDevelopmentMode**\
        *Optional*
      </td>

      <td>
        Boolean
      </td>

      <td>
        Flag for experimenting the SDK on test-app/staging so that no impression is sent to the VWO server for tracking.
      </td>
    </tr>

    <tr>
      <td>
        **userStorageService**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        The JSON representing the User Campaign Data Map. Used for sticky bucketing and deciding when to call Activate API vs. getVariationName API.
      </td>
    </tr>

    <tr>
      <td>
        **logging**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        Override default logger behaviour. Customise log-level, and implement your own log message.
      </td>
    </tr>

    <tr>
      <td>
        **goalTypeToTrack**\
        *Optional*
      </td>

      <td>
        String
      </td>

      <td>
        If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.

        * \*Note\*\*: This is currently supported in Node.js, Python, Java, and .NET SDKs only from v1.8.0+ onwards
      </td>
    </tr>

    <tr>
      <td>
        **shouldTrackReturningUser**\
        *Optional*
      </td>

      <td>
        Boolean
      </td>

      <td>
        Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) at your end.

        * \*Note\*\*: This is currently supported in NodeJs, Python, Java, and .NET SDKs only from v1.8.0+ onwards
      </td>
    </tr>
  </tbody>
</Table>

## Returns

Instantiates an instance of the VWO class, which can be referenced later for calling out different API methods.

## Usage

```javascript Node.js
var vwoSDK = require('vwo-node-sdk');

var vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile
});
```
```php
<?php

require_once('vendor/autoload.php');

use vwo\VWO;

$vwoClientInstance = new VWO($config);
```
```python
import vwo

settings_file = vwo.get_settings_file(account_id, sdk_key)
vwo_client_instance = vwo.launch(settings_file)
```
```csharp .NET
using VWOSdk;

Settings settingsFile = VWO.GetSettings(accountId, sdkKey);
IVWOClient vwoClientInstance = VWO.Launch(settingsFile);
```
```java
import com.vwo.VWO;

String settingsFile = VWO.getSettingsFile(accountId, sdkKey);
VWO vwoClientInstance = VWO.launch(settingsFile).build();
```
```ruby
require 'vwo'

vwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false)
```
```go
import vwo "github.com/wingify/vwo-go-sdk"
import "github.com/wingify/vwo-go-sdk/pkg/api"

// Get SettingsFile
settingsFile := vwo.GetSettingsFile("accountID", "SDKKey")

// Default instance of VwoInstance
vwoClientInstance, err := vwo.Launch(settingsFile)
if err != nil {
	//handle err
}

// Instance with custom options
vwoClientInstance, err := vwo.Launch(settingsFile, api.WithDevelopmentMode())
if err != nil {
	//handle err
}
```
