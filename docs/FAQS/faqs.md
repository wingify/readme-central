---
title: List of Questions
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
List of Frequently Asked Questions:

* [What should be considered as the User ID?](https://developers.vwo.com/docs/faqs#what-should-be-considered-as-the-user-id)
* [How does VWO affect my application speed?](https://developers.vwo.com/docs/faqs#how-does-vwo-affect-my-application-speed)
* [How does VWO bucket users across SDKs?](https://developers.vwo.com/docs/faqs#how-does-vwo-bucket-users-across-sdks)
* [How does VWO bucket the same users across platforms?](https://developers.vwo.com/docs/faqs#how-does-vwo-bucket-the-same-users-across-platforms)
* [What's the minimum version supported by each VWO SDK?](https://developers.vwo.com/docs/faqs#whats-the-minimum-version-supported-by-each-vwo-sdk)
* [Which programming languages are supported by VWO FullStack SDKs?](https://developers.vwo.com/docs/faqs#which-programming-languages-are-supported-by-vwo-fullstack-sdks)
* [Are there any repercussions of changing campaign settings mid-campaign?](https://developers.vwo.com/docs/faqs#are-there-any-repercussions-of-changing-campaign-settings-mid-campaign)
* [Can we track a goal with the same identifier in multiple campaigns at once?](https://developers.vwo.com/docs/faqs#can-we-track-a-goal-with-the-same-identifier-in-multiple-campaigns-at-once)
* [Is there any list of features in different SDKs?](https://developers.vwo.com/docs/faqs#is-there-any-list-of-features-in-different-sdks)
* [Can we batch impression events?](https://developers.vwo.com/docs/faqs#can-we-batch-impression-events)
* [Is there any history of changes that went live in different SDKs?](https://developers.vwo.com/docs/faqs#is-there-any-history-of-changes-that-went-live-in-different-sdks)
* [Why data is not reflecting in the campaign report?](https://developers.vwo.com/docs/faqs#why-data-is-not-reflecting-in-the-campaign-report)
* [Why use Webhooks for updating settings-file and not Polling?](https://developers.vwo.com/docs/faqs#why-use-webhooks-for-updating-settings-file-and-not-polling)
* [How to make sure you are running the latest version of the SDK?](https://developers.vwo.com/docs/faqs#how-to-make-sure-you-are-running-the-latest-version-of-the-sdk)
* [Why is it important to use Persistent Storage when deploying to Production?](https://developers.vwo.com/docs/faqs#why-is-it-important-to-use-persistent-storage-when-deploying-to-production)
* [What SDK calls are local and which ones send data to VWO?](https://developers.vwo.com/docs/faqs#what-sdk-calls-are-local-and-which-ones-send-data-to-vwo)
* [What latency do activate and track API calls add to my backend?](https://developers.vwo.com/docs/faqs#what-latency-do-activate-isfeatureenabled-and-track-api-calls-add-to-my-backend)
* [Does VWO support User aliasing?](https://developers.vwo.com/docs/faqs#does-vwo-support-user-aliasing)
* [Do I need to modify my firewall when using VWO FullStack?](https://developers.vwo.com/docs/faqs#do-i-need-to-modify-my-firewall-when-using-vwo-fullstack)
[block:api-header]
{
  "title": "What should be considered as the User ID?"
}
[/block]
User Identifier, also abbreviated as User ID, is a way to uniquely identify a user. Since campaigns are directly associated with users, our SDK relies on a User ID that you provide. User ID is simply a string and can have any value as per your business requirements.

You can use a client-side first-party cookie which will be available when any request to your server is made or device ID or use universal user identifier (UUID) to identify each user. But make sure, if you want a consistent behavior for a user, the same User ID should be provided each time.

For example, a user comes on the website for the first time and you assigned a User ID as ***f34c3d91-a66e-4389-92fb-595fa9874725*** to that user. Let's assume our SDK buckets the user into *Variation-1*. Now, if the same user comes back, please make sure to provide the same User ID for getting the consistent result from the VWO SDKs.

Choosing an IP address is not recommended as the IP address of a user might change over a period of time and thus, VWO SDKs will operate the same user differently as the User ID you would pass in different APIs will keep on changing. Following are the cases where IP address does not fit:

* You want to show consistent behavior to the same user across different platforms. The IP address of the user might vary across different devices.
* The user might change the networks, thereby getting a different IP address.
* The user might be using a VPN, thereby chances of getting a different IP address time-to-time.
[block:api-header]
{
  "title": "How does VWO affect my application speed?"
}
[/block]
The benefits of using FullStack campaigns are that these are lightning-fast. With the help of our SDKs, you can get the variation assignment without making any blocking requests to VWO servers. All the computation like deciding user eligibility for a campaign and assigning variation to a user is carried out by our smart SDKs. We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to carry out our [bucketing logic](https://developers.vwo.com/reference#section-how-bucketing-works).

The only thing that could be blocking is fetching settings-file. The VWO SDK requires *settings file* for its instantiation. Either you can cache it or fetch it just after the server is up, if possible.

As there is no client-side custom code execution, using a FullStack campaign is much faster.
[block:api-header]
{
  "title": "How does VWO bucket users across SDKs?"
}
[/block]
All the computations like deciding user eligibility for a campaign and variation assignment to a user are carried out by smart SDKs. We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to carry out our [bucketing logic](https://developers.vwo.com/docs/core-concepts#how-bucketing-works).

VWO also ensures that all of our SDKs give the same output. The bucketing user is language-agnostic.
[block:api-header]
{
  "title": "How does VWO bucket the same users across platforms?"
}
[/block]
We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to get the hash value. This algorithm always returns the same hash value for the same User ID provided. So, even if your visitor comes from any platform, as long as you identify the user and provide us the same userId, we will provide him the same experience across platforms.
[block:api-header]
{
  "title": "Why is it important to use Persistent Storage when deploying to Production?"
}
[/block]
VWO FullStack testing offers multi-platform testing i.e. you can run omnichannel tests to track and boost conversions. For this, VWO SDKs only require a unique identifier for the user using your application. As long as the identifier is the same, SDKs will provide consistent results without any need for storing anything either at your end or VWO's end.

We recommend using a Persistent Storage Service at your end in the following scenarios:

* If your campaign's traffic distribution is changing from time to time. 
* If the campaign's variation distribution is changing from time to time.
* You want to track only unique visitors and conversions.

In all the above-mentioned scenarios, VWO SDKs may not provide consistent results for the users that became part of the campaign. In order to show your users' consistent behavior throughout the journey, use a persistent data store and connect it with the VWO SDK.
[block:api-header]
{
  "title": "Why data is not reflecting in the campaign report?"
}
[/block]
Please check the following:

* The development flag should **not** be ON(while launching the SDK).
* The settings-file on your server is up-to-date. For real-time updates, use Webhooks or Polling.  
* The tracking calls are not reaching the VWO server because of some firewall settings at your end. 

For detailed information on how SDK is working, please check the logs by enabling them or writing a custom logger.
[block:api-header]
{
  "title": "What SDK calls are local and which ones send data to VWO?"
}
[/block]
Following calls are responsible for tracking data from the server where SDK is implemented to the VWO server:

* **activate** API sends a visitor-tracking call to the VWO server so that the same could be reflected in the respective server-side running A/B campaigns' report along with providing the variation assigned for a particular user. 

* **isFeatureEnabled** API sends a visitor-tracking call to the VWO server so that the same could be reflected in the respective server-side running Feature Test campaigns report along with providing the decision whether the feature is enabled for a particular user. 

* **track** API sends a conversion-tracking call to the VWO server so that the same could be reflected in the respective server-side running campaigns report. This API is applicable for A/B and Feature Test both.
[block:api-header]
{
  "title": "Are there any repercussions of changing campaign settings mid-campaign?"
}
[/block]
Changing the campaign settings like changing the campaign traffic or changing the traffic distribution of the variations might result in an inconsistent experience for the already tracked users if no persistent user storage service system is integrated with the VWO SDK. This will result in the same user being tracked into multiple variations and the same would be reflected in the respective campaign reports.

Changing campaign settings without impacting the tracked users, please refer to the section. Please check how to implement a persistent Storage Service and the FAQ - Why is it important to use Persistent Storage when deploying to Production?
[block:api-header]
{
  "title": "What latency do activate, isFeatureEnabled and track API calls add to my backend?"
}
[/block]
For **asynchronous languages** like Node.js, Java, .NET, and Go, the tracking calls are asynchronous. Thereby, there's no significant impact on the latency when using such APIs.

For **synchronous languages** like PHP, Python, and Ruby, ~150 ms of latency is added to each such API call as these APIs send tracking calls from your server to the VWO server.

Note: For PHP, we have [optimized our tracking approach](https://vwo.com/product-updates/improvements-in-vwo-fullstack/) for sending the calls which reduced the overall latency by one-third.
[block:api-header]
{
  "title": "Which programming languages are supported by VWO FullStack SDKs?"
}
[/block]
We support the following programming languages:

[block:parameters]
{
  "data": {
    "h-0": "SDK",
    "h-1": "Source Code",
    "0-0": ".NET",
    "1-0": "Go",
    "2-0": "Java",
    "7-0": "Ruby",
    "6-0": "Python",
    "5-0": "PHP",
    "4-0": "Node.js",
    "3-0": "JavaScript (client-side)",
    "0-1": "https://github.com/wingify/vwo-dotnet-sdk",
    "1-1": "https://github.com/wingify/vwo-go-sdk",
    "2-1": "https://github.com/wingify/vwo-java-sdk",
    "3-1": "https://github.com/wingify/vwo-node-sdk\n(Same as Node.js SDK, shares the common code, build and packaged differently.)",
    "4-1": "https://github.com/wingify/vwo-node-sdk",
    "5-1": "https://github.com/wingify/vwo-php-sdk",
    "6-1": "https://github.com/wingify/vwo-python-sdk",
    "7-1": "https://github.com/wingify/vwo-ruby-sdk"
  },
  "cols": 2,
  "rows": 8
}
[/block]

[block:api-header]
{
  "title": "What's the minimum version supported by each VWO SDK?"
}
[/block]
Here is the list of various languages we offer which SDKs and the minimum version required for each kind of SDK.
[block:parameters]
{
  "data": {
    "h-0": "SDK",
    "h-1": "Requirements",
    "0-0": ".NET",
    "1-0": "Go",
    "2-0": "Java",
    "3-0": "JavaScript (client-side)",
    "4-0": "Node.js",
    "5-0": "PHP",
    "6-0": "Python",
    "7-0": "Ruby",
    "0-1": "**NetStandard2.0 onwards**",
    "1-1": "**1.11 onwards**",
    "2-1": "**Open JDK 8, 9, 11, 12\nOracle JDK 8, 9, 11, 12**",
    "3-1": "Latest browsers:\n\n**Chrome >= 60.0, Firefox >= 60.0, Safari >= 10.1, Edge >= 12, Opera >= 50**",
    "5-1": "**5.6.0 onwards**",
    "6-1": "**2.7+, Python 3+**",
    "4-1": "**6.10.0 onwards**",
    "7-1": "**2.3.0+**"
  },
  "cols": 2,
  "rows": 8
}
[/block]

[block:api-header]
{
  "title": "Is there any history of changes that went live in different SDKs?"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "SDK",
    "h-1": "Changelog",
    "0-0": ".NET",
    "1-0": "Go",
    "2-0": "Java",
    "3-0": "Node.js / JavaScript",
    "4-0": "PHP",
    "5-0": "Python",
    "6-0": "Ruby",
    "0-1": "[https://github.com/wingify/vwo-dotnet-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-dotnet-sdk/blob/master/CHANGELOG.md)",
    "1-1": "[https://github.com/wingify/vwo-go-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-go-sdk/blob/master/CHANGELOG.md)",
    "2-1": "[https://github.com/wingify/vwo-java-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-java-sdk/blob/master/CHANGELOG.md)",
    "3-1": "[https://github.com/wingify/vwo-node-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-node-sdk/blob/master/CHANGELOG.md)",
    "4-1": "[https://github.com/wingify/vwo-php-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-php-sdk/blob/master/CHANGELOG.md)",
    "5-1": "[https://github.com/wingify/vwo-python-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-python-sdk/blob/master/CHANGELOG.md)",
    "6-1": "[https://github.com/wingify/vwo-ruby-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-ruby-sdk/blob/master/CHANGELOG.md)"
  },
  "cols": 2,
  "rows": 7
}
[/block]

[block:api-header]
{
  "title": "Can we track a goal with the same identifier in multiple campaigns at once?"
}
[/block]
VWO SDKs provide an API to track a particular goal of a campaign or the same goal across multiple campaigns. Please refer to **track** API.
[block:api-header]
{
  "title": "Can we batch impression events?"
}
[/block]
Yes, it is possible. Please refer to Configure Event Batching in [SDK Reference](https://developers.vwo.com/docs/sdk-quickstart).
[block:api-header]
{
  "title": "Is there any list of features in different SDKs?"
}
[/block]
The below list displays the list of all features different VWO SDKs support, along with the version in which they are supported.

[block:parameters]
{
  "data": {
    "h-1": "Node.js",
    "h-2": "Python",
    "h-3": "PHP",
    "h-4": "Java",
    "h-5": ".NET",
    "h-6": "Ruby",
    "h-7": "JavaScript (client-side)",
    "h-8": "Go",
    "0-0": "**A/B Test**",
    "1-0": "**Tracking Conversions**",
    "2-0": "**Feature Rollout**",
    "3-0": "**Feature Test**",
    "4-0": "**Pre-segmentation / Targeting**",
    "5-0": "**Custom Dimension / Post-segmentation**",
    "6-0": "**Forced Variation / Whitelisting**",
    "7-0": "**Client-side Capabilities** ",
    "8-0": "**Same goal tracking in multiple campaigns**",
    "9-0": "**Tracking Duplicate conversions**",
    "10-0": "**Event Batching**",
    "11-0": "**Webhooks** ",
    "12-0": "**Environment-level Reporting** ",
    "13-0": "**Prevent duplicates of visitors** ",
    "14-0": "**Integrations** ",
    "0-1": "Supported\n**v1.3.0**",
    "1-1": "Supported\n**v1.3.0**",
    "2-1": "Supported\n**v1.4+**",
    "3-1": "Supported\n**v1.4+**",
    "4-1": "Supported\n**v1.5+**",
    "5-1": "Supported\n**v1.5+**",
    "6-1": "Supported\n**v1.6+**",
    "7-1": "Supported\nSame SDK can be used on client-side and get all capabilities of server-side on client-side\n**v1.7+**",
    "8-1": "Supported\n**v1.8+**",
    "9-1": "Supported\n**v1.8+**",
    "10-1": "Supported\n**v1.9+**",
    "11-1": "Supported\n**v1.10+**",
    "12-1": "Supported\n**v1.12+**",
    "13-1": "Supported\n**v1.13+**",
    "14-1": "Supported\n**v1.14+**",
    "0-2": "Supported\n**v1.3.0**",
    "0-3": "Supported\n**v1.3.0**",
    "1-2": "Supported\n**v1.3.0**",
    "1-3": "Supported\n**v1.3.0**",
    "2-2": "Supported\n**v1.4+**",
    "2-3": "Supported\n**v1.4+**",
    "3-2": "Supported\n**v1.4+**",
    "3-3": "Supported\n**v1.4+**",
    "4-2": "Supported\n**v1.5+**",
    "5-2": "Supported\n**v1.5+**",
    "4-3": "Supported\n**v1.5+**",
    "5-3": "Supported\n**v1.5+**",
    "6-2": "Supported\n**v1.6+**",
    "6-3": "Supported\n**v1.6+**",
    "7-2": "Not applicable",
    "7-3": "Not applicable",
    "8-3": "Supported\n**v1.13+**",
    "8-2": "Supported\n**v1.8+**",
    "9-2": "Supported\n**v1.8+**",
    "10-2": "Supported\n**v1.11+**",
    "10-3": "Not applicable",
    "9-3": "Supported\n**v1.13+**",
    "11-2": "Supported\n**v1.10+**",
    "11-3": "Supported\n**v1.10+**",
    "12-2": "Supported\n**v1.12+**",
    "12-3": "Supported\n**v1.13+**",
    "13-2": "Supported\n**v1.12+**",
    "14-2": "Supported\n**v1.13+**",
    "13-3": "Supported\n**v1.13+**",
    "14-3": "Supported\n**v1.14+**",
    "0-4": "Supported\n**v1.3.0**",
    "0-5": "Supported\n**v1.3.0**",
    "1-4": "Supported\n**v1.3.0**",
    "1-5": "Supported\n**v1.3.0**",
    "0-6": "Supported\n**v1.3.0**",
    "1-6": "Supported\n**v1.3.0**",
    "2-4": "Supported\n**v1.4+**",
    "3-4": "Supported\n**v1.4+**",
    "2-5": "Supported\n**v1.5+**",
    "3-5": "Supported\n**v1.5+**",
    "2-6": "Supported\n**v1.5+**",
    "3-6": "Supported\n**v1.5+**",
    "4-4": "Supported\n**v1.5+**",
    "5-4": "Supported\n**v1.5+**",
    "6-4": "Supported\n**v1.6+**",
    "6-5": "Supported\n**v1.6+**",
    "6-6": "Supported\n**v1.6+**",
    "4-5": "Supported\n**v1.5+**",
    "5-5": "Supported\n**v1.5+**",
    "4-6": "Supported\n**v1.5+**",
    "5-6": "Supported\n**v1.5+**",
    "7-4": "Not applicable",
    "7-5": "Not applicable",
    "7-6": "Not applicable",
    "8-4": "Supported\n**v1.8+**",
    "8-5": "Supported\n**v1.8+**",
    "8-6": "Supported\n**v1.14+**",
    "9-4": "Supported\n**v1.8+**",
    "9-5": "Supported\n**v1.8+**",
    "9-6": "Supported\n**v1.14+**",
    "10-4": "Supported\n**v1.11+**",
    "11-4": "Supported\n**v1.10+**",
    "12-4": "Supported\n**v1.11+**",
    "13-4": "Supported\n**v1.11+**",
    "14-4": "Supported\n**v1.12+**",
    "10-5": "Supported\n**v1.11+**",
    "10-6": "Supported\n**v1.14+**",
    "11-5": "Supported\n**v1.11+**",
    "11-6": "Supported\n**v1.14+**",
    "12-5": "Supported\n**v1.14+**",
    "12-6": "Supported\n**v1.14+**",
    "13-5": "Supported\n**v1.14+**",
    "13-6": "Supported\n**v1.14+**",
    "14-5": "Supported\n**v1.14+**",
    "14-6": "Supported\n**v1.14+**",
    "0-7": "Supported\n**v1.7+**",
    "1-7": "Supported\n**v1.7+**",
    "2-7": "Supported\n**v1.7+**",
    "3-7": "Supported\n**v1.7+**",
    "4-7": "Supported\n**v1.7+**",
    "5-7": "Supported\n**v1.7+**",
    "6-7": "Supported\n**v1.7+**",
    "8-7": "Supported\n**v1.8+**",
    "9-7": "Supported\n**v1.8+**",
    "11-7": "Supported\n**v1.10+**",
    "10-7": "Not Applicable",
    "12-7": "Supported\n**v1.12+**",
    "13-7": "Supported\n**v1.13+**",
    "14-7": "Supported\n**v1.14+**",
    "0-8": "Supported\n**v1.0+**",
    "1-8": "Supported\n**v1.0+**",
    "2-8": "Supported\n**v1.0+**",
    "3-8": "Supported\n**v1.0+**",
    "4-8": "Supported\n**v1.0+**",
    "5-8": "Supported\n**v1.0+**",
    "6-8": "Supported\n**v1.0+**",
    "7-8": "Not applicable",
    "8-8": "Supported\n**v1.8+**",
    "9-8": "Supported\n**v1.8+**",
    "10-8": "Supported\n**v1.14+**",
    "11-8": "Supported\n**v1.14+**",
    "12-8": "Supported\n**v1.14+**",
    "13-8": "Not yet",
    "14-8": "Supported\n**v1.14+**",
    "15-0": "**Mutually Exclusive Campaigns** ",
    "16-0": "**Campaign bucketing seed** ",
    "16-1": "Supported\n**v1.22+**",
    "16-2": "Supported\n**v1.22+**",
    "16-3": "Supported\n**v1.22+**",
    "16-4": "Supported\n**v1.22+**",
    "16-7": "Supported\n**v1.22+**",
    "16-6": "Supported\n**v1.22+**",
    "15-4": "Supported\n**v1.22+**",
    "15-1": "Supported\n**v1.19+**",
    "15-2": "Supported\n**v1.19+**",
    "15-3": "Supported\n**v1.20+**",
    "15-7": "Supported\n**v1.19+**",
    "15-6": "Supported\n**v1.22+**",
    "15-5": "Supported\n**v1.23+**",
    "16-5": "Supported\n**v1.23+**",
    "15-8": "Not yet",
    "16-8": "Supported\n**v1.23+**",
    "17-0": "**Opt Out**",
    "17-1": "Supported\n**v1.28+**",
    "17-7": "Supported\n**v1.28+**",
    "17-3": "Supported\n**v1.28+**",
    "17-4": "Supported\n**v1.32+**",
    "17-2": "Supported\n**v1.28+**",
    "17-6": "Supported\n**v1.28+**",
    "17-5": "Not yet",
    "17-8": "Not yet",
    "18-0": "**Operators ( Greater than / Less than / Greater than equal to / Less than equal to )**",
    "18-1": "Supported\n**v1.42.0+**",
    "18-2": "Supported\n**v1.32.0+**",
    "18-3": "Supported\n**v1.42.0+**",
    "18-4": "Please reach out to us if you want these operators enabled for your account and SDK.",
    "18-5": "Please reach out to us if you want these operators enabled for your account and SDK.",
    "18-6": "Please reach out to us if you want these operators enabled for your account and SDK.",
    "18-7": "Please reach out to us if you want these operators enabled for your account and SDK.",
    "18-8": "Please reach out to us if you want these operators enabled for your account and SDK."
  },
  "cols": 9,
  "rows": 19
}
[/block]

[block:api-header]
{
  "title": "How to make sure you are running the latest version of the SDK?"
}
[/block]
Please use the latest version of the SDK by periodically checking for the updates and updating the SDK to enjoy new features we keep on shipping time-to-time.
Refer to this [section](https://developers.vwo.com/reference#fullstack-is-there-any-list-of-features-in-different-sdks) to know about the changes VWO ships in different SDKs.
[block:api-header]
{
  "title": "Why use Webhooks for updating settings-file and not Polling?"
}
[/block]
Webhook Is much more efficient than Polling in terms of resources, infrastructure costs, and communication standpoint. Webhooks ensure the data is latest as compared to polling where data is always old except when something gets changed.
[block:api-header]
{
  "title": "Does VWO support User aliasing?"
}
[/block]
There might be scenarios when you have a situation like the following:

* Initially, users who land on my website are not logged in what User ID should I use for them? 
* Once they log in I have a different User ID for them. How do I manage this situation?

VWO SDKs operate on User ID. As long as the user ID is the same, SDKs will output consistent results, thereby, providing omnichannel testing support. If you have different IDs associated with the same user, please pass only one of them always or create another unique identifier that identifies the same user(logged-out vs logged-in) and pass it always. VWO currently does not provide a way to alias the multiple User IDs associated with the same user.
[block:api-header]
{
  "title": "Do I need to modify my firewall when using VWO FullStack?"
}
[/block]
If your firewall has any outbound traffic restrictions, you'll need to whitelist dev.visualwebsiteoptimizer.com.