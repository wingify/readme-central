---
title: User ID
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
You can identify a user in the VWO SDK using a string which identifies that user.
User Id can be set in the VWO Launch config.

User Id helps VWO identify a user across multiple devices, it allows us to serve the same variation to a user thus keeping the experience consistent.

For example, you may run a campaign on both iPhone and iPad. If a user uses both the iPhone app and iPad app, setting the user id will allow us to serve the same variation for a campaign.
[block:code]
{
  "codes": [
    {
      "code": "String id = \"<uuid-for-the-user>\";\nVWOConfig vwoConfig = new VWOConfig.Builder().userID(id).build();\n\nVWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null);",
      "language": "java"
    },
    {
      "code": "val id = \"<uuid-for-the-user>\"\nval vwoConfig = VWOConfig.Builder().userID(id).build()\n\nVWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null)",
      "language": "kotlin",
      "name": null
    }
  ]
}
[/block]
Please note that altering the traffic allocation among variations or total campaign traffic can break this. Also, changing targetting while the campaign is running is also not advisable.
[block:callout]
{
  "type": "info",
  "title": "Please note",
  "body": "User ID is used as hash and is not stored anywhere on the device or server."
}
[/block]