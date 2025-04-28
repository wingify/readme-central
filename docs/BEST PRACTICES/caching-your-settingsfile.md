---
title: Caching Your settingsFile
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
  pages:
    - type: basic
      slug: updating-cached-settings-file
      title: Updating Cached Settings FIle
---
Adding a caching layer for *settingsFile* inside your application is beneficial in preventing a hit to VWO CDN for fetching settingsFile, which can save you some amount of time for every request in FullStack rendering a webpage.
[block:callout]
{
  "type": "warning",
  "body": "Fetching *settingsFIle* means hitting a call to VWO CDN to fetch FullStack campaigns. Programming languages that do not offer asynchronous behavior or provision to fetch *settingsFIle* while starting a server must implement a caching layer to prevent unwanted delay on rendering a website.",
  "title": "Important"
}
[/block]
Caching your settings file in programming languages, which support execution at the server start-time like Node.js, Python, and others, is not necessary. It can be done at the server start time and can be referenced while a request is made to the server on each route.

Each *settings file* represents the current state of the project. So, if you need to reflect the changes made in the VWO application, you must set a polling mechanism, which fetches the *settingsFile* at regular intervals and reinitializes the SDK if any change is detected with the previously saved settings. All VWO FullStack SDKs have example usage with a bare minimum server. Please refer to the following table for each SDK example.
[block:parameters]
{
  "data": {
    "0-0": ".NET",
    "1-0": "Go",
    "2-0": "Java",
    "3-0": "Node.js",
    "4-0": "PHP",
    "h-0": "Language",
    "h-1": "Repository",
    "0-1": "https://github.com/wingify/vwo-dotnet-sdk-example",
    "1-1": "https://github.com/wingify/vwo-go-sdk-example",
    "2-1": "https://github.com/wingify/vwo-java-sdk-example",
    "4-1": "https://github.com/wingify/vwo-php-sdk-example",
    "3-1": "https://github.com/wingify/vwo-node-sdk-example",
    "5-0": "Python",
    "5-1": "https://github.com/wingify/vwo-python-sdk-example",
    "6-0": "Ruby",
    "6-1": "https://github.com/wingify/vwo-ruby-sdk-example"
  },
  "cols": 2,
  "rows": 7
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Important",
  "body": "Having a caching layer saves you time, thereby speeding up the overall user experience."
}
[/block]
Also, check how to implement a *User Storage Service* for sticky variation assignments.
[block:api-header]
{
  "title": "Usage"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "<?php\n\n// Cache your settingsFile inside the session so that no new request is sent for fetching settingsFile for every hit to your server\n\n// Unset the settingsFile data present in session whenever you need you need to get settingsFile from VWO server\n\nif (isset($_SESSION['VWOSettingsFile'])){\n  $settingsFile = $_SESSION['VWOSettingsFile'];\n} else{\n  $settingsFile = VWO::getSettingsFile($accountId, $sdkKey);\n}",
      "language": "php"
    }
  ]
}
[/block]