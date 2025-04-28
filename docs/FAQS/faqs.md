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

## What should be considered as the User ID?

User Identifier, also abbreviated as User ID, is a way to uniquely identify a user. Since campaigns are directly associated with users, our SDK relies on a User ID that you provide. User ID is simply a string and can have any value as per your business requirements.

You can use a client-side first-party cookie which will be available when any request to your server is made or device ID or use universal user identifier (UUID) to identify each user. But make sure, if you want a consistent behavior for a user, the same User ID should be provided each time.

For example, a user comes on the website for the first time and you assigned a User ID as ***f34c3d91-a66e-4389-92fb-595fa9874725*** to that user. Let's assume our SDK buckets the user into *Variation-1*. Now, if the same user comes back, please make sure to provide the same User ID for getting the consistent result from the VWO SDKs.

Choosing an IP address is not recommended as the IP address of a user might change over a period of time and thus, VWO SDKs will operate the same user differently as the User ID you would pass in different APIs will keep on changing. Following are the cases where IP address does not fit:

* You want to show consistent behavior to the same user across different platforms. The IP address of the user might vary across different devices.
* The user might change the networks, thereby getting a different IP address.
* The user might be using a VPN, thereby chances of getting a different IP address time-to-time.

## How does VWO affect my application speed?

The benefits of using FullStack campaigns are that these are lightning-fast. With the help of our SDKs, you can get the variation assignment without making any blocking requests to VWO servers. All the computation like deciding user eligibility for a campaign and assigning variation to a user is carried out by our smart SDKs. We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to carry out our [bucketing logic](https://developers.vwo.com/reference#section-how-bucketing-works).

The only thing that could be blocking is fetching settings-file. The VWO SDK requires *settings file* for its instantiation. Either you can cache it or fetch it just after the server is up, if possible.

As there is no client-side custom code execution, using a FullStack campaign is much faster.

## How does VWO bucket users across SDKs?

All the computations like deciding user eligibility for a campaign and variation assignment to a user are carried out by smart SDKs. We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to carry out our [bucketing logic](https://developers.vwo.com/docs/core-concepts#how-bucketing-works).

VWO also ensures that all of our SDKs give the same output. The bucketing user is language-agnostic.

## How does VWO bucket the same users across platforms?

We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to get the hash value. This algorithm always returns the same hash value for the same User ID provided. So, even if your visitor comes from any platform, as long as you identify the user and provide us the same userId, we will provide him the same experience across platforms.

## Why is it important to use Persistent Storage when deploying to Production?

VWO FullStack testing offers multi-platform testing i.e. you can run omnichannel tests to track and boost conversions. For this, VWO SDKs only require a unique identifier for the user using your application. As long as the identifier is the same, SDKs will provide consistent results without any need for storing anything either at your end or VWO's end.

We recommend using a Persistent Storage Service at your end in the following scenarios:

* If your campaign's traffic distribution is changing from time to time. 
* If the campaign's variation distribution is changing from time to time.
* You want to track only unique visitors and conversions.

In all the above-mentioned scenarios, VWO SDKs may not provide consistent results for the users that became part of the campaign. In order to show your users' consistent behavior throughout the journey, use a persistent data store and connect it with the VWO SDK.

## Why data is not reflecting in the campaign report?

Please check the following:

* The development flag should **not** be ON(while launching the SDK).
* The settings-file on your server is up-to-date. For real-time updates, use Webhooks or Polling.  
* The tracking calls are not reaching the VWO server because of some firewall settings at your end. 

For detailed information on how SDK is working, please check the logs by enabling them or writing a custom logger.

## What SDK calls are local and which ones send data to VWO?

Following calls are responsible for tracking data from the server where SDK is implemented to the VWO server:

* **activate** API sends a visitor-tracking call to the VWO server so that the same could be reflected in the respective server-side running A/B campaigns' report along with providing the variation assigned for a particular user. 

* **isFeatureEnabled** API sends a visitor-tracking call to the VWO server so that the same could be reflected in the respective server-side running Feature Test campaigns report along with providing the decision whether the feature is enabled for a particular user. 

* **track** API sends a conversion-tracking call to the VWO server so that the same could be reflected in the respective server-side running campaigns report. This API is applicable for A/B and Feature Test both.

## Are there any repercussions of changing campaign settings mid-campaign?

Changing the campaign settings like changing the campaign traffic or changing the traffic distribution of the variations might result in an inconsistent experience for the already tracked users if no persistent user storage service system is integrated with the VWO SDK. This will result in the same user being tracked into multiple variations and the same would be reflected in the respective campaign reports.

Changing campaign settings without impacting the tracked users, please refer to the section. Please check how to implement a persistent Storage Service and the FAQ - Why is it important to use Persistent Storage when deploying to Production?

## What latency do activate, isFeatureEnabled and track API calls add to my backend?

For **asynchronous languages** like Node.js, Java, .NET, and Go, the tracking calls are asynchronous. Thereby, there's no significant impact on the latency when using such APIs.

For **synchronous languages** like PHP, Python, and Ruby, \~150 ms of latency is added to each such API call as these APIs send tracking calls from your server to the VWO server.

Note: For PHP, we have [optimized our tracking approach](https://vwo.com/product-updates/improvements-in-vwo-fullstack/) for sending the calls which reduced the overall latency by one-third.

## Which programming languages are supported by VWO FullStack SDKs?

We support the following programming languages:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        SDK
      </th>

      <th>
        Source Code
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        .NET
      </td>

      <td>
        [https://github.com/wingify/vwo-dotnet-sdk](https://github.com/wingify/vwo-dotnet-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Go
      </td>

      <td>
        [https://github.com/wingify/vwo-go-sdk](https://github.com/wingify/vwo-go-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Java
      </td>

      <td>
        [https://github.com/wingify/vwo-java-sdk](https://github.com/wingify/vwo-java-sdk)
      </td>
    </tr>

    <tr>
      <td>
        JavaScript (client-side)
      </td>

      <td>
        [https://github.com/wingify/vwo-node-sdk](https://github.com/wingify/vwo-node-sdk)\
        (Same as Node.js SDK, shares the common code, build and packaged differently.)
      </td>
    </tr>

    <tr>
      <td>
        Node.js
      </td>

      <td>
        [https://github.com/wingify/vwo-node-sdk](https://github.com/wingify/vwo-node-sdk)
      </td>
    </tr>

    <tr>
      <td>
        PHP
      </td>

      <td>
        [https://github.com/wingify/vwo-php-sdk](https://github.com/wingify/vwo-php-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Python
      </td>

      <td>
        [https://github.com/wingify/vwo-python-sdk](https://github.com/wingify/vwo-python-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Ruby
      </td>

      <td>
        [https://github.com/wingify/vwo-ruby-sdk](https://github.com/wingify/vwo-ruby-sdk)
      </td>
    </tr>
  </tbody>
</Table>

## What's the minimum version supported by each VWO SDK?

Here is the list of various languages we offer which SDKs and the minimum version required for each kind of SDK.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        SDK
      </th>

      <th>
        Requirements
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        .NET
      </td>

      <td>
        **NetStandard2.0 onwards**
      </td>
    </tr>

    <tr>
      <td>
        Go
      </td>

      <td>
        **1.11 onwards**
      </td>
    </tr>

    <tr>
      <td>
        Java
      </td>

      <td>
        * \*Open JDK 8, 9, 11, 12\
          Oracle JDK 8, 9, 11, 12\*\*
      </td>
    </tr>

    <tr>
      <td>
        JavaScript (client-side)
      </td>

      <td>
        Latest browsers:

        **Chrome >= 60.0, Firefox >= 60.0, Safari >= 10.1, Edge >= 12, Opera >= 50**
      </td>
    </tr>

    <tr>
      <td>
        Node.js
      </td>

      <td>
        **6.10.0 onwards**
      </td>
    </tr>

    <tr>
      <td>
        PHP
      </td>

      <td>
        **5.6.0 onwards**
      </td>
    </tr>

    <tr>
      <td>
        Python
      </td>

      <td>
        **2.7+, Python 3+**
      </td>
    </tr>

    <tr>
      <td>
        Ruby
      </td>

      <td>
        **2.3.0+**
      </td>
    </tr>
  </tbody>
</Table>

## Is there any history of changes that went live in different SDKs?

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        SDK
      </th>

      <th>
        Changelog
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        .NET
      </td>

      <td>
        [https://github.com/wingify/vwo-dotnet-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-dotnet-sdk/blob/master/CHANGELOG.md)
      </td>
    </tr>

    <tr>
      <td>
        Go
      </td>

      <td>
        [https://github.com/wingify/vwo-go-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-go-sdk/blob/master/CHANGELOG.md)
      </td>
    </tr>

    <tr>
      <td>
        Java
      </td>

      <td>
        [https://github.com/wingify/vwo-java-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-java-sdk/blob/master/CHANGELOG.md)
      </td>
    </tr>

    <tr>
      <td>
        Node.js / JavaScript
      </td>

      <td>
        [https://github.com/wingify/vwo-node-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-node-sdk/blob/master/CHANGELOG.md)
      </td>
    </tr>

    <tr>
      <td>
        PHP
      </td>

      <td>
        [https://github.com/wingify/vwo-php-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-php-sdk/blob/master/CHANGELOG.md)
      </td>
    </tr>

    <tr>
      <td>
        Python
      </td>

      <td>
        [https://github.com/wingify/vwo-python-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-python-sdk/blob/master/CHANGELOG.md)
      </td>
    </tr>

    <tr>
      <td>
        Ruby
      </td>

      <td>
        [https://github.com/wingify/vwo-ruby-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-ruby-sdk/blob/master/CHANGELOG.md)
      </td>
    </tr>
  </tbody>
</Table>

## Can we track a goal with the same identifier in multiple campaigns at once?

VWO SDKs provide an API to track a particular goal of a campaign or the same goal across multiple campaigns. Please refer to **track** API.

## Can we batch impression events?

Yes, it is possible. Please refer to Configure Event Batching in [SDK Reference](https://developers.vwo.com/docs/sdk-quickstart).

## Is there any list of features in different SDKs?

The below list displays the list of all features different VWO SDKs support, along with the version in which they are supported.

<Table align={["left","left","left","left","left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>

      </th>

      <th>
        Node.js
      </th>

      <th>
        Python
      </th>

      <th>
        PHP
      </th>

      <th>
        Java
      </th>

      <th>
        .NET
      </th>

      <th>
        Ruby
      </th>

      <th>
        JavaScript (client-side)
      </th>

      <th>
        Go
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **A/B Test**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.7+**
      </td>

      <td>
        Supported\
        **v1.0+**
      </td>
    </tr>

    <tr>
      <td>
        **Tracking Conversions**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.3.0**
      </td>

      <td>
        Supported\
        **v1.7+**
      </td>

      <td>
        Supported\
        **v1.0+**
      </td>
    </tr>

    <tr>
      <td>
        **Feature Rollout**
      </td>

      <td>
        Supported\
        **v1.4+**
      </td>

      <td>
        Supported\
        **v1.4+**
      </td>

      <td>
        Supported\
        **v1.4+**
      </td>

      <td>
        Supported\
        **v1.4+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.7+**
      </td>

      <td>
        Supported\
        **v1.0+**
      </td>
    </tr>

    <tr>
      <td>
        **Feature Test**
      </td>

      <td>
        Supported\
        **v1.4+**
      </td>

      <td>
        Supported\
        **v1.4+**
      </td>

      <td>
        Supported\
        **v1.4+**
      </td>

      <td>
        Supported\
        **v1.4+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.7+**
      </td>

      <td>
        Supported\
        **v1.0+**
      </td>
    </tr>

    <tr>
      <td>
        **Pre-segmentation / Targeting**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.7+**
      </td>

      <td>
        Supported\
        **v1.0+**
      </td>
    </tr>

    <tr>
      <td>
        **Custom Dimension / Post-segmentation**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.5+**
      </td>

      <td>
        Supported\
        **v1.7+**
      </td>

      <td>
        Supported\
        **v1.0+**
      </td>
    </tr>

    <tr>
      <td>
        **Forced Variation / Whitelisting**
      </td>

      <td>
        Supported\
        **v1.6+**
      </td>

      <td>
        Supported\
        **v1.6+**
      </td>

      <td>
        Supported\
        **v1.6+**
      </td>

      <td>
        Supported\
        **v1.6+**
      </td>

      <td>
        Supported\
        **v1.6+**
      </td>

      <td>
        Supported\
        **v1.6+**
      </td>

      <td>
        Supported\
        **v1.7+**
      </td>

      <td>
        Supported\
        **v1.0+**
      </td>
    </tr>

    <tr>
      <td>
        **Client-side Capabilities** 
      </td>

      <td>
        Supported\
        Same SDK can be used on client-side and get all capabilities of server-side on client-side\
        **v1.7+**
      </td>

      <td>
        Not applicable
      </td>

      <td>
        Not applicable
      </td>

      <td>
        Not applicable
      </td>

      <td>
        Not applicable
      </td>

      <td>
        Not applicable
      </td>

      <td>

      </td>

      <td>
        Not applicable
      </td>
    </tr>

    <tr>
      <td>
        **Same goal tracking in multiple campaigns**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.13+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>
    </tr>

    <tr>
      <td>
        **Tracking Duplicate conversions**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.13+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>

      <td>
        Supported\
        **v1.8+**
      </td>
    </tr>

    <tr>
      <td>
        **Event Batching**
      </td>

      <td>
        Supported\
        **v1.9+**
      </td>

      <td>
        Supported\
        **v1.11+**
      </td>

      <td>
        Not applicable
      </td>

      <td>
        Supported\
        **v1.11+**
      </td>

      <td>
        Supported\
        **v1.11+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>
    </tr>

    <tr>
      <td>
        **Webhooks** 
      </td>

      <td>
        Supported\
        **v1.10+**
      </td>

      <td>
        Supported\
        **v1.10+**
      </td>

      <td>
        Supported\
        **v1.10+**
      </td>

      <td>
        Supported\
        **v1.10+**
      </td>

      <td>
        Supported\
        **v1.11+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.10+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>
    </tr>

    <tr>
      <td>
        **Environment-level Reporting** 
      </td>

      <td>
        Supported\
        **v1.12+**
      </td>

      <td>
        Supported\
        **v1.12+**
      </td>

      <td>
        Supported\
        **v1.13+**
      </td>

      <td>
        Supported\
        **v1.11+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.12+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>
    </tr>

    <tr>
      <td>
        **Prevent duplicates of visitors** 
      </td>

      <td>
        Supported\
        **v1.13+**
      </td>

      <td>
        Supported\
        **v1.12+**
      </td>

      <td>
        Supported\
        **v1.13+**
      </td>

      <td>
        Supported\
        **v1.11+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.13+**
      </td>

      <td>
        Not yet
      </td>
    </tr>

    <tr>
      <td>
        **Integrations** 
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.13+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.12+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>

      <td>
        Supported\
        **v1.14+**
      </td>
    </tr>

    <tr>
      <td>
        **Mutually Exclusive Campaigns** 
      </td>

      <td>
        Supported\
        **v1.19+**
      </td>

      <td>
        Supported\
        **v1.19+**
      </td>

      <td>
        Supported\
        **v1.20+**
      </td>

      <td>
        Supported\
        **v1.22+**
      </td>

      <td>
        Supported\
        **v1.23+**
      </td>

      <td>
        Supported\
        **v1.22+**
      </td>

      <td>
        Supported\
        **v1.19+**
      </td>

      <td>
        Not yet
      </td>
    </tr>

    <tr>
      <td>
        **Campaign bucketing seed** 
      </td>

      <td>
        Supported\
        **v1.22+**
      </td>

      <td>
        Supported\
        **v1.22+**
      </td>

      <td>
        Supported\
        **v1.22+**
      </td>

      <td>
        Supported\
        **v1.22+**
      </td>

      <td>
        Supported\
        **v1.23+**
      </td>

      <td>
        Supported\
        **v1.22+**
      </td>

      <td>
        Supported\
        **v1.22+**
      </td>

      <td>
        Supported\
        **v1.23+**
      </td>
    </tr>

    <tr>
      <td>
        **Opt Out**
      </td>

      <td>
        Supported\
        **v1.28+**
      </td>

      <td>
        Supported\
        **v1.28+**
      </td>

      <td>
        Supported\
        **v1.28+**
      </td>

      <td>
        Supported\
        **v1.32+**
      </td>

      <td>
        Not yet
      </td>

      <td>
        Supported\
        **v1.28+**
      </td>

      <td>
        Supported\
        **v1.28+**
      </td>

      <td>
        Not yet
      </td>
    </tr>

    <tr>
      <td>
        **Operators ( Greater than / Less than / Greater than equal to / Less than equal to )**
      </td>

      <td>
        Supported\
        **v1.42.0+**
      </td>

      <td>
        Supported\
        **v1.32.0+**
      </td>

      <td>
        Supported\
        **v1.42.0+**
      </td>

      <td>
        Please reach out to us if you want these operators enabled for your account and SDK.
      </td>

      <td>
        Please reach out to us if you want these operators enabled for your account and SDK.
      </td>

      <td>
        Please reach out to us if you want these operators enabled for your account and SDK.
      </td>

      <td>
        Please reach out to us if you want these operators enabled for your account and SDK.
      </td>

      <td>
        Please reach out to us if you want these operators enabled for your account and SDK.
      </td>
    </tr>
  </tbody>
</Table>

## How to make sure you are running the latest version of the SDK?

Please use the latest version of the SDK by periodically checking for the updates and updating the SDK to enjoy new features we keep on shipping time-to-time.\
Refer to this [section](https://developers.vwo.com/reference#fullstack-is-there-any-list-of-features-in-different-sdks) to know about the changes VWO ships in different SDKs.

## Why use Webhooks for updating settings-file and not Polling?

Webhook Is much more efficient than Polling in terms of resources, infrastructure costs, and communication standpoint. Webhooks ensure the data is latest as compared to polling where data is always old except when something gets changed.

## Does VWO support User aliasing?

There might be scenarios when you have a situation like the following:

* Initially, users who land on my website are not logged in what User ID should I use for them? 
* Once they log in I have a different User ID for them. How do I manage this situation?

VWO SDKs operate on User ID. As long as the user ID is the same, SDKs will output consistent results, thereby, providing omnichannel testing support. If you have different IDs associated with the same user, please pass only one of them always or create another unique identifier that identifies the same user(logged-out vs logged-in) and pass it always. VWO currently does not provide a way to alias the multiple User IDs associated with the same user.

## Do I need to modify my firewall when using VWO FullStack?

If your firewall has any outbound traffic restrictions, you'll need to whitelist dev.visualwebsiteoptimizer.com.
