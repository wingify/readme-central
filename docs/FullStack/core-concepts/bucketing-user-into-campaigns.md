---
title: Bucketing User into Campaigns
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
Once a user is [identified](https://developers.vwo.com/docs/identify-users) and assigned a unique identifier, that identifier should be used throughout the user's journey to experience a consistent behavior of an application.

APIs exposed by different VWO SDKs accept the User Identifier along with the unique campaign key for determining the decision for that user. As long as the user ID is the same, VWO SDKs will output the same decision every time on all the platforms.

> 📘 Similar Campaigns
>
> When traffic distribution, number of variations, and their respective weights of two or more campaigns are the same, they are referred to as *similar campaigns*. Pre-segmentation, whitelisting, or other things could vary.

VWO SDKs bucket the same user differently into different campaigns to prevent the same user from getting the same variation in all the similar campaigns.\
But there could also be scenarios when you would like to bucket the same user to bucket into the same variation in different similar campaigns. To achieve this, you can toggle the option in the campaign settings. Please check this [doc](https://developers.vwo.com/docs/campaign-bucketing-seed) for more details.
