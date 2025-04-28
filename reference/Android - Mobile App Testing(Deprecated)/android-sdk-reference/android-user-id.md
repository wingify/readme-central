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
You can identify a user in the VWO SDK using a string which identifies that user.\
User Id can be set in the VWO Launch config.

User Id helps VWO identify a user across multiple devices, it allows us to serve the same variation to a user thus keeping the experience consistent.

For example, you may run a campaign on both iPhone and iPad. If a user uses both the iPhone app and iPad app, setting the user id will allow us to serve the same variation for a campaign.

```java
String id = "<uuid-for-the-user>";
VWOConfig vwoConfig = new VWOConfig.Builder().userID(id).build();

VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null);
```
```kotlin
val id = "<uuid-for-the-user>"
val vwoConfig = VWOConfig.Builder().userID(id).build()

VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null)
```

Please note that altering the traffic allocation among variations or total campaign traffic can break this. Also, changing targetting while the campaign is running is also not advisable.

> 📘 Please note
>
> User ID is used as hash and is not stored anywhere on the device or server.
