---
title: Impression Events
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
An **impression** event signifies that you want to track a visitor inside our VWO application.
You can view the results in the reports section of the campaign. Visitors count help VWO in calculating various statistics along with the most commonly used metric - *conversion rate*.
Also, impression events are used for billing. Your pricing plan includes visitor quota which gets consumed with every visitor impression.

Since everything is on FullStack, our SDK can not manage user session, unlike client-side testing where we use cookies for session management.
Session management has to be done on your side when using FullStack SDK. That's why we expose two similar API methods.

*For example:*

A user visits a page. The browser makes a call to your server. All browser cookies for that domain are sent in every HTTP request made to your server by the browser. You can check whether it's a returning visitor based on the cookie data. This is how session management generally gets handled on FullStack. Based on the data, you have to figure out whether to track that visitor inside the VWO application or not.
So, if you want to track the visitor, you need to use *activate* API, otherwise, *getVariationName* API method.

[block:callout]
{
  "type": "warning",
  "body": "**Note**: Impression event is not sent to the VWO server in case of *activate* API only when a user is not eligible to be a part of the campaign.",
  "title": "Impression event"
}
[/block]

[block:api-header]
{
  "title": "Manage Impression Events"
}
[/block]

**When to use *activate* API?**

  * When you want to get variation and track visitors inside the VWO application. It is used for showing various metrics like conversion rate, improvement rate, etc.
  * When you want to track a visitor even if he visited the site before.
 
**When to use *getVariationName* API?**

  * You simply want to know only the variation being assigned to the user. This information can be used later for making further client-side decisions.
  * You want to test out something at your end. Maybe playing around with the SDK or unit testing your app components.