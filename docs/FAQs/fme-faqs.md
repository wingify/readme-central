---
title: List of Questions
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
List of Frequently Asked Questions:

* [What should be considered as the User ID?](https://developers.vwo.com/v2/docs/list-of-questions#what-should-be-considered-as-the-user-id) 
* [How does VWO affect my application speed?](https://developers.vwo.com/v2/docs/list-of-questions#how-does-vwo-affect-my-application-speed)
* [How do VWO bucket users across SDKs?](https://developers.vwo.com/v2/docs/list-of-questions#how-do-vwo-bucket-users-across-sdks)
* [How does VWO bucket the same users across platforms?](https://developers.vwo.com/v2/docs/list-of-questions#how-does-vwo-bucket-the-same-users-across-platforms)
* [Why is it important to use Persistent Storage when deploying to Production?](https://developers.vwo.com/v2/docs/list-of-questions#why-is-it-important-to-use-persistent-storage-when-deploying-to-production)
* [Why isn't data reflecting in the campaign report](https://developers.vwo.com/v2/docs/list-of-questions#why-isnt-data-reflecting-in-the-campaign-report)
* [Are there any repercussions of changing campaign settings mid-campaign?](https://developers.vwo.com/v2/docs/list-of-questions#are-there-any-repercussions-of-changing-campaign-settings-mid-campaign)
* [What latency do getFlag, trackEvent, and setAttribute APIs calls add to my backend?](https://developers.vwo.com/v2/docs/list-of-questions#what-latency-do-getflag-trackevent-and-setattribute-apis-calls-add-to-my-backend)
* [Which programming languages are supported by VWO FME SDKs?](https://developers.vwo.com/v2/docs/list-of-questions#which-programming-languages-are-supported-by-vwo-fme-sdks)
* [What's the minimum version supported by each VWO SDK?](https://developers.vwo.com/v2/docs/list-of-questions#whats-the-minimum-version-supported-by-each-vwo-sdk)
* [Is there any history of changes that went live in different SDKs?](https://developers.vwo.com/v2/docs/list-of-questions#is-there-any-history-of-changes-that-went-live-in-different-sdks) 
* [Can we track a goal with the same identifier in multiple campaigns at once?](https://developers.vwo.com/v2/docs/list-of-questions#can-we-track-a-goal-with-the-same-identifier-in-multiple-campaigns-at-once)
* [How to make sure you are running the latest version of the SDK?](https://developers.vwo.com/v2/docs/list-of-questions#how-to-make-sure-you-are-running-the-latest-version-of-the-sdk)
* [Why use Webhooks for updating settings and not Polling?](https://developers.vwo.com/v2/docs/list-of-questions#why-use-webhooks-for-updating-settings-and-not-polling)
* [Does VWO support User aliasing?](https://developers.vwo.com/v2/docs/list-of-questions#does-vwo-support-user-aliasing)
* [Do I need to modify my firewall when using VWO FME?](https://developers.vwo.com/v2/docs/list-of-questions#do-i-need-to-modify-my-firewall-when-using-vwo-fme)

## What should be considered as the User ID?

A **User Identifier (User ID)** is a unique string used to identify individual users. Since campaigns are directly associated with users, our SDK relies on the User ID you provide. The User ID can be any string value, customized based on your business requirements.  

**Generating a User ID**

To ensure accurate user identification, you can generate a User ID using one of the following methods:  

* A **client-side first-party cookie**, which persists across requests to your server  
* A **device ID**, which remains unique to a user’s device  
* A **universal user identifier (UUID)**, ensuring a globally unique identification  

**Ensuring Consistent User Behavior**

For a seamless and consistent experience, the same User ID must be provided every time the user interacts with your application.  

**Example:**

A user visits your website for the first time, and you assign them the User ID ***f34c3d91-a66e-4389-92fb-595fa9874725***. The VWO SDK assigns this user to ***Variation-1***. If the same user returns later, you must provide the same User ID to ensure they receive the same variation, maintaining a consistent experience.  

**Why IP Addresses Should Not Be Used as User IDs**

Using an **IP address** as a User ID is not recommended because IP addresses can change over time, leading to inconsistent user assignments in VWO SDKs. Below are key scenarios where IP addresses are unsuitable:  

* **Cross-platform consistency**: A user’s IP address may vary across different devices, making it unreliable for tracking.  
* **Network changes**: Users switching networks (e.g., from home Wi-Fi to mobile data) may receive a different IP address.  
* **VPN usage**: Users accessing your platform through a VPN may have dynamically changing IP addresses.  

To ensure deterministic bucketing and a consistent user experience, always use a persistent and unique User ID instead of an IP address.

## How does VWO affect my application speed?

The benefit of using VWO FME feature flags is that these are lightning-fast. With the help of our SDKs, you can get the variation assignment without making any blocking requests to VWO servers. All the computation, like deciding user eligibility for a campaign and assigning variation to a user is carried out by our smart SDKs. We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to carry out our [bucketing logic](https://developers.vwo.com/reference#section-how-bucketing-works).

The only thing that could be blocking it is fetching settings. The VWO SDK requires a *settings* for its instantiation. Either you can cache it or fetch it just after the server is up, if possible.

As there is no client-side custom code execution, using a FME feature flag is much faster.

## How do VWO bucket users across SDKs?

All the computations, like deciding user eligibility for a campaign and variation assignment to a user are carried out by smart SDKs. We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to carry out our [bucketing logic](https://developers.vwo.com/docs/core-concepts#how-bucketing-works).

VWO also ensures that all of our SDKs give the same output. The bucketing user is language-agnostic.

## How does VWO bucket the same users across platforms?

We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to get the hash value. This algorithm always returns the same hash value for the same User ID provided. So, even if your visitor comes from any platform, as long as you identify the user and provide us the same userId, we will provide him the same experience across platforms.

## Why is it important to use Persistent Storage when deploying to Production?

VWO Feature Management & Experimentation offers multi-platform testing, i.e. you can run omnichannel tests to track and boost conversions. For this, VWO SDKs only require a unique identifier for the user using your application. As long as the identifier is the same, SDKs will provide consistent results without any need for storing anything either at your end or VWO's end.

We recommend using a Persistent Storage Service at your end in the following scenarios:

* If your campaign's traffic distribution is changing from time to time. 
* If the campaign's variation distribution is changing from time to time.
* You want to track unique visitors and conversions.

In all the above-mentioned scenarios, VWO SDKs may not provide consistent results for the users who became part of the campaign. To show your users' consistent behaviour throughout the journey, use a persistent data store and connect it with the VWO SDK.

## Why isn't data reflecting in the campaign report?

Please check the following:

* The development flag should **not** be ON(while launching the SDK).
* The settings on your server is up-to-date. For real-time updates, use Webhooks or Polling.  
* The tracking calls are not reaching the VWO server because of some firewall settings at your end. 

For detailed information on how SDK is working, please check the logs by enabling them or writing a custom logger.

## Are there any repercussions of changing campaign settings mid-campaign?

Changing the campaign settings like changing the campaign traffic or changing the traffic distribution of the variations might result in an inconsistent experience for the already tracked users if no persistent user storage service system is integrated with the VWO SDK. This will result in the same user being tracked into multiple variations and the same would be reflected in the respective campaign reports.

Changing campaign settings without impacting the tracked users, please refer to the section. Please check how to implement a persistent Storage Service and the FAQ - Why is it important to use Persistent Storage when deploying to Production?

## What latency do getFlag, trackEvent, and setAttribute APIs calls add to my backend?

For **asynchronous languages** like Node.js, Java, .NET, and Go, the tracking calls are asynchronous. Therefore, there's no significant impact on the latency when using such APIs.

For **synchronous languages** like PHP, Python, and Ruby, \~150 ms of latency is added to each such API call as these APIs send tracking calls from your server to the VWO server.

## Which programming languages are supported by VWO FME SDKs?

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
        [https://github.com/wingify/vwo-fme-dotnet-sdk](https://github.com/wingify/vwo-fme-dotnet-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Android
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-android-sdk](https://github.com/wingify/vwo-fme-android-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Flutter
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-flutter-sdk](https://github.com/wingify/vwo-fme-flutter-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Go
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-go-sdk](https://github.com/wingify/vwo-fme-go-sdk)
      </td>
    </tr>

    <tr>
      <td>
        iOS
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-ios-sdk](https://github.com/wingify/vwo-fme-ios-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Java
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-java-sdk](https://github.com/wingify/vwo-fme-java-sdk)
      </td>
    </tr>

    <tr>
      <td>
        JavaScript (client-side)
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-node-sdk](https://github.com/wingify/vwo-fme-node-sdk)\
        (Same as Node.js SDK, shares the common code, build and packaged differently.)
      </td>
    </tr>

    <tr>
      <td>
        Node.js
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-node-sdk](https://github.com/wingify/vwo-fme-node-sdk)
      </td>
    </tr>

    <tr>
      <td>
        PHP
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-php-sdk](https://github.com/wingify/vwo-fme-php-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Python
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-python-sdk](https://github.com/wingify/vwo-fme-python-sdk)
      </td>
    </tr>

    <tr>
      <td>
        React(web)
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-react-sdk](https://github.com/wingify/vwo-fme-react-sdk)
      </td>
    </tr>

    <tr>
      <td>
        React-Native
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-react-native-sdk](https://github.com/wingify/vwo-fme-react-native-sdk)
      </td>
    </tr>

    <tr>
      <td>
        Ruby
      </td>

      <td>
        [https://github.com/wingify/vwo-fme-ruby-sdk](https://github.com/wingify/vwo-fme-ruby-sdk)
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
        **12 onwards**
      </td>
    </tr>

    <tr>
      <td>
        PHP
      </td>

      <td>
        **7.4 onwards**
      </td>
    </tr>

    <tr>
      <td>
        Python
      </td>

      <td>
        **Python 3.6+**
      </td>
    </tr>

    <tr>
      <td>
        Ruby
      </td>

      <td>
        **2.6+**
      </td>
    </tr>
  </tbody>
</Table>

## Is there any history of changes that went live in different SDKs?

| SDK                  | Changelog                                                                                                                                                    |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .NET                 | [https://github.com/wingify/vwo-fme-dotnet-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-dotnet-sdk/blob/master/CHANGELOG.md)             |
| Android              | [https://github.com/wingify/vwo-fme-android-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-android-sdk/blob/master/CHANGELOG.md)           |
| Flutter              | [https://github.com/wingify/vwo-fme-flutter-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-flutter-sdk/blob/master/CHANGELOG.md)           |
| Go                   | [https://github.com/wingify/vwo-fme-go-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-go-sdk/blob/master/CHANGELOG.md)                     |
| iOS                  | [https://github.com/wingify/vwo-fme-ios-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-ios-sdk/blob/master/CHANGELOG.md)                   |
| Java                 | [https://github.com/wingify/vwo-fme-java-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-java-sdk/blob/master/CHANGELOG.md)                 |
| Node.js / JavaScript | [https://github.com/wingify/vwo-fme-node-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-node-sdk/blob/master/CHANGELOG.md)                 |
| PHP                  | [https://github.com/wingify/vwo-fme-php-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-php-sdk/blob/master/CHANGELOG.md)                   |
| Python               | [https://github.com/wingify/vwo-fme-python-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-python-sdk/blob/master/CHANGELOG.md)             |
| React(web)           | [https://github.com/wingify/vwo-fme-react-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-react-sdk/blob/master/CHANGELOG.md)               |
| React-Native         | [https://github.com/wingify/vwo-fme-react-native-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-react-native-sdk/blob/master/CHANGELOG.md) |
| Ruby                 | [https://github.com/wingify/vwo-fme-ruby-sdk/blob/master/CHANGELOG.md](https://github.com/wingify/vwo-fme-ruby-sdk/blob/master/CHANGELOG.md)                 |

## Can we track a goal with the same identifier in multiple campaigns at once?

VWO SDKs provide an API to track an event; that event can be associated with *n* number of campaigns in the VWO Application. Please refer to the **trackEvent** API.

## How to make sure you are running the latest version of the SDK?

Please use the latest version of the SDK by periodically checking for updates and updating the SDK to enjoy new features we keep on shipping from time to time.\
Refer to this [section](https://developers.vwo.com/reference#fullstack-is-there-any-list-of-features-in-different-sdks) to know about the changes VWO ships in different SDKs.

## Why use Webhooks for updating settings and not Polling?

Webhook Is much more efficient than Polling in terms of resources, infrastructure costs, and communication standpoint. Webhooks ensure the data is latest as compared to polling where data is always old except when something gets changed.

## Does VWO support User aliasing?

There might be scenarios when you have a situation like the following:

* Initially, users who land on my website are not logged in what User ID should I use for them? 
* Once they log in I have a different User ID for them. How do I manage this situation?

VWO SDKs operate on User ID. As long as the user ID is the same, SDKs will output consistent results, thereby, providing omnichannel testing support. If you have different IDs associated with the same user, please pass only one of them always or create another unique identifier that identifies the same user(logged-out vs logged-in) and pass it always. VWO currently does not provide a way to alias the multiple User IDs associated with the same user.

## Do I need to modify my firewall when using VWO FME?

If your firewall has any outbound traffic restrictions, you'll need to whitelist ***dev.visualwebsiteoptimizer.com***
