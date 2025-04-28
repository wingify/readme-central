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
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/docs/javascript-activate), [getVariationName](https://developers.vwo.com/docs/javascript-get-variation-name) and [track](https://developers.vwo.com/docs/javascript-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/docs/javascript-get-settings-file). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/docs/javascript-get-settings-file).

## API Description

SDK provides a method to instantiate a VWO client as an instance. The method accepts an object to configure the VWO client.

The only required parameter for instantiating the SDK is *settings file*. There are other optional parameters, which you could provide for overriding the default behavior or setting environment.

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
      </td>
    </tr>

    <tr>
      <td>
        **returnPromiseFor**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        Pass this option to return promise instead of value from the APIs. You can also select which APIs to return promise and which not.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

An instance of the VWO class, which can be referenced later for calling out different API methods.

## Usage

```javascript JavaScript
vwoSdk.getSettingsFile(accountId, sdkKey).then(function (settingsFile) {
  // ...launch SDK and call APIs
  var vwoClientInstance = vwoSDK.launch({
  	settingsFile: settingsFile
	});
});
```

## Promises and async

If your application uses promises for asynchronous operations, you can configure the SDK to manage asynchronous operations. VWO SDK is capable of returning a value as well as promise depending on the use case.\
When returning a value, API response time is faster (\< 50ms) as it does not wait for the asynchronous tracking call to get completed. in the case of returning a promise, API will wait for both the decision as well as the asynchronous tracking call to get completed, and thereby, the response time of the API will include the round-trip time of the network call.

Since the async/await syntax is based on Promises, all APIs will also work with it.

**Configuring the SDK**

You can pass ***returnPromiseFor*** option at the time of instantiating the SDK i.e. while using *launch* API.\
The ***returnPromiseFor*** option is an object and you can use it either to enable promise-based response from all the APIs or select the required API(s).

```javascript JavaScript
const vwoInstance = vwoSdk.launch({
  settingsFile,
  returnPromiseFor: {
    all: true
  }
});

// Or just for activate API

const vwoInstance = vwoSdk.launch({
  settingsFile,
  returnPromiseFor: {
    activate: true
  }
});
```

**Example** 

```javascript JavaScript
// Using the .then() method to add a handler for a Promise
vwoClientInstance.activate(campaignKey, userId).then(variationName => {
  // use variationName in your application code
});

// Using "await" instead, within an async function
const variationName = await vwoClientInstance.activate(campaignKey, userId);
```
