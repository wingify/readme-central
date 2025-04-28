---
title: Preview Mode
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
The preview functionality is helpful while you make changes in your app code for a campaign. It is used to verify that a campaign is set up correctly.


###Enabling the preview mode

Add the following dependency to your build.gradle file:
[block:code]
{
  "codes": [
    {
      "code": "dependencies {\n\t    ...\n        compile ('io.socket:socket.io-client:1.0.0') {\n            // excluding org.json which is provided by Android\n            exclude group: 'org.json', module: 'json'\n        }\n\t    ...\n}",
      "language": "groovy",
      "name": "build.gradle"
    }
  ]
}
[/block]
The preview option is automatically enabled when the application is running in debugging mode, either on a device or a simulator. To enable the debugging in release mode, with the application open, **shake the device for three or four times**. The preview button appears on the VARIATIONS and GOALS step of campaign creation.
As you can have multiple apps added to your account, make sure to select the app which you want to A/B test.

###Disabling the preview mode

Preview mode can be disabled by removing the above dependency from your `build.gradle` file.
OR 
You can disable the preview mode by creating `VWOConfig` object and pass that `VWOConfig` object during SDK Launch.
[block:code]
{
  "codes": [
    {
      "code": "VWOConfig vwoConfig = new VWOConfig.Builder()\n                             .disablePreview()     // To disable preview mode\n                             .build();\n                             \nVWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null);",
      "language": "java",
      "name": null
    },
    {
      "code": "val vwoConfig = VWOConfig.Builder()\n                .disablePreview()    // To disable preview mode\n                .build()\n\nVWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null)",
      "language": "kotlin",
      "name": "kotlin"
    }
  ]
}
[/block]