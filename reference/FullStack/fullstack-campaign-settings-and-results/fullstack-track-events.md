---
title: Track Events
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
Since SDK relies on User ID being provided by you, it ensures that a visitor will get consistent behavior.

Track API works 
*For example:*
If the user ID provided by you doesn't become part of the campaign. Unless you change the campaign settings, that user will never become a part of the campaign and is ensured by our SDK.
Keeping this in mind, Track API uses the same logic as [activate](https://developers.vwo.com/reference#fullstack-sdk-activate) and [getVariationName](https://developers.vwo.com/reference#fullstack-sdk-get-variation) methods. So, the user who didn't become part of the campaign, using track API for the same user, will not trigger any conversion impression.

But the order of using the API methods does matter.

*For example:*
If you provide user ID which is eligible to be a part of the campaign, calling [track](https://developers.vwo.com/reference#fullstack-sdk-track) API before [activate](https://developers.vwo.com/reference#fullstack-sdk-activate) method will show more conversions than visitors inside VWO application.

So, please ensure track API is used after [activate](https://developers.vwo.com/reference#fullstack-sdk-activate) API only for the tracking visitor. 
[block:callout]
{
  "type": "danger",
  "body": "VWO does not ignore invalid track requests based on the given campaign & user. if you use only [track](https://developers.vwo.com/reference#fullstack-sdk-track) API for the users and but do not trigger [activate](https://developers.vwo.com/reference#fullstack-sdk-activate) API, it will result in more conversions than visitors. It will skew your results in VWO campaign report.",
  "title": "Track Visitors and Conversions"
}
[/block]