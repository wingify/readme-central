---
title: FAQs
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

- [What are Mobile Recordings in VWO, and how do they work?](https://developers.vwo.com/reference/mobile-insights-faqs#what-are-mobile-recordings-in-vwo-and-how-do-they-work)
- [What is the maximum duration of the saved recording?](https://developers.vwo.com/reference/mobile-insights-faqs#what-is-the-maximum-duration-of-the-saved-recording)
- [When does a recording start?](https://developers.vwo.com/reference/mobile-insights-faqs#when-does-a-recording-start)
- [When does a recording session expire?](https://developers.vwo.com/reference/mobile-insights-faqs#when-does-a-recording-session-expire)
- [Can I view all the recordings of the previous/next previous session of the user?](https://developers.vwo.com/reference/mobile-insights-faqs#can-i-view-all-the-recordings-of-the-previousnext-previous-session-of-the-user)
- [Do the recordings involve sensitive data?](https://developers.vwo.com/reference/mobile-insights-faqs#do-the-recordings-involve-sensitive-data)
- [How to record all the screens of your mobile application?](https://developers.vwo.com/reference/mobile-insights-faqs#how-to-record-all-the-screens-of-your-mobile-application)
- [How does VWO affect my application speed?](https://developers.vwo.com/reference/mobile-insights-faqs#how-does-vwo-affect-my-application-speed)
- [Why data is not reflected in the campaign report?](https://developers.vwo.com/reference/mobile-insights-faqs#why-data-is-not-reflected-in-the-campaign-report)
- [Which programming languages are supported by VWO Mobile Insights SDKs?](https://developers.vwo.com/reference/mobile-insights-faqs#which-programming-languages-are-supported-by-vwo-mobile-insights-sdks)
- [What's the minimum version supported by each VWO SDK?](https://developers.vwo.com/reference/mobile-insights-faqs#whats-the-minimum-version-supported-by-each-vwo-sdk)
- [How to make sure you are running the latest version of the SDK?](https://developers.vwo.com/reference/mobile-insights-faqs#how-to-make-sure-you-are-running-the-latest-version-of-the-sdk)
- [Do I need to modify my firewall when using VWO Mobile Insight?](https://developers.vwo.com/reference/mobile-insights-faqs#do-i-need-to-modify-my-firewall-when-using-vwo-fullstack)

## What are Mobile Recordings in VWO, and how do they work?

The Mobile Recordings module in VWO allows you to record visitor interactions with your mobile application in the form of video. These recordings show how the visitors interact with your mobile application by capturing various gestures like single tap, double tap, zoom, fling, scroll, etc. They work based on [sampling](https://help.vwo.com/hc/en-us/articles/360034213994).

## What is the maximum duration of the saved recording?

The maximum duration of a recording session is 2 hours. Therefore, no new data is recorded in the current session if the duration exceeds 2 hours. A session's data beyond the 2 hours window gets captured in a new recording.

## When does a recording start?

Once the Mobile Recordings feature is enabled and configured in VWO, the session recordings are triggered as soon as a visitor uses the app, provided the user has been sampled.

## When does a recording session expire?

A recording session expires after 30 minutes of idle time. For example, the current recording session ends if a user is idle for 30 minutes.

## Can I view all the recordings of the previous/next previous session of the user?

Yes. A tile in the player shows the visitor's currently active session and also displays all the available recorded sessions of the visitor. When clicking the tile, a sidebar shows the visitor's recorded sessions ordered from oldest to most recent.

## Do the recordings involve sensitive data?

By default, VWO hides all key presses right on the SDK side to avoid storing or transmitting any personal or sensitive data to VWO servers. Additionally, you can exclude the recording of any screen using the Exclude screens option or specifically exclude texts or UI elements such as fields, buttons, and checkboxes using the Exclude text, Exclude view, and Exclude tag options. To know more about these options, refer to [this article](https://help.vwo.com/hc/en-us/articles/12864264973337-Using-the-Mobile-Recordings-Dashboard-in-VWO).

## How to record all the screens of your mobile application?

By default, VWO records all the screens of your mobile application. However, it can be configured to exclude certain screens or hide select elements from screens on the Configuration page of the Mobile Recordings module.

## How does VWO affect my application speed?

VWO Mobile Insights SDKs are built in such a way that they track users' journeys and actions very efficiently. By integrating our SDKs, your current app will not be impacted. Once you have initialized the SDKs, they will start tracking the necessary information, batches it, and sync periodically with VWO servers to show the session recordings on the VWO dashboard. SDKs use the event-driven approach to capture different user actions and other information like app crashes, application not responding, etc., and smartly replay them on the dashboard.

We have benchmarked our SDKs and below is the impact analysis for different SDKs:

| Android | Impact Analysis                                                                |
| :------ | :----------------------------------------------------------------------------- |
| Android | <https://developers.vwo.com/reference/mobile-insights-android-impact-analysis> |
| iOS     | <https://developers.vwo.com/reference/mobile-insights-ios-impact-analysis>     |

## Why data is not reflected in the campaign report?

Please check the following:

- The campaign must be running on the VWO dashboard
- The tracking calls are not reaching the VWO server because of some firewall settings at your end.

## Which programming languages are supported by VWO Mobile Insights SDKs?

| SDK                   | Link                                                  |
| :-------------------- | :---------------------------------------------------- |
| Android (Java/Kotlin) | <https://mvnrepository.com/artifact/com.vwo/insights> |
| iOS (Swift)           | <https://cocoapods.org/pods/VWO-Insights>             |

## What's the minimum version supported by each VWO SDK?

| SDK     | Language | Min Version supported |
| :------ | :------- | :-------------------- |
| Android | Java     | JDK 8                 |
| Android | Kotlin   | 1.5.31                |
| iOS     | Swift    | Swift 5.0             |

## How to make sure you are running the latest version of the SDK?

Please use the latest version of the SDK by periodically checking for updates and updating the SDK to enjoy new features we keep on shipping time-to-time.

- VWO Insights Android SDK is hosted on **Maven** - <https://mvnrepository.com/artifact/com.vwo/insights>
- VWO Insights iOS SDK is available on **Cocoapods** - <https://cocoapods.org/pods/VWO-Insights>

## Do I need to modify my firewall when using VWO Mobile Insights?

If your firewall has any outbound traffic restrictions, you'll need to whitelist [dev.visualwebsiteoptimizer.com](dev.visualwebsiteoptimizer.com).