---
title: Opt Out
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
To opt out of tracking by VWO, use the following code:
[block:code]
{
  "codes": [
    {
      "code": "VWOConfig vwoConfig = new VWOConfig.Builder()\n                             .setOptOut(true)     // set your opt out flag here\n                             .build();\n                             \nVWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null);",
      "language": "java"
    },
    {
      "code": "val vwoConfig = VWOConfig.Builder()\n                .setOptOut(true)     // set your opt out flag here\n                .build()\n\nVWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null)",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]
If you disable tracking for a user, and later decided to enable tracking for him, please use:
[block:code]
{
  "codes": [
    {
      "code": "VWOConfig vwoConfig = new VWOConfig.Builder()\n                             .setOptOut(false)     // set your opt out flag here\n                             .build();\n                             \nVWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null);",
      "language": "java"
    },
    {
      "code": "val vwoConfig = VWOConfig.Builder()\n                .setOptOut(false)     // set your opt out flag here\n                .build()\n\nVWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null)",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]
A user by default will be tracked by VWO.