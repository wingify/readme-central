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

> 🚧 Important
>
> Fetching *settingsFIle* means hitting a call to VWO CDN to fetch FullStack campaigns. Programming languages that do not offer asynchronous behavior or provision to fetch *settingsFIle* while starting a server must implement a caching layer to prevent unwanted delay on rendering a website.

Caching your settings file in programming languages, which support execution at the server start-time like Node.js, Python, and others, is not necessary. It can be done at the server start time and can be referenced while a request is made to the server on each route.

Each *settings file* represents the current state of the project. So, if you need to reflect the changes made in the VWO application, you must set a polling mechanism, which fetches the *settingsFile* at regular intervals and reinitializes the SDK if any change is detected with the previously saved settings. All VWO FullStack SDKs have example usage with a bare minimum server. Please refer to the following table for each SDK example.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Language
      </th>

      <th>
        Repository
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        .NET
      </td>

      <td>
        [https://github.com/wingify/vwo-dotnet-sdk-example](https://github.com/wingify/vwo-dotnet-sdk-example)
      </td>
    </tr>

    <tr>
      <td>
        Go
      </td>

      <td>
        [https://github.com/wingify/vwo-go-sdk-example](https://github.com/wingify/vwo-go-sdk-example)
      </td>
    </tr>

    <tr>
      <td>
        Java
      </td>

      <td>
        [https://github.com/wingify/vwo-java-sdk-example](https://github.com/wingify/vwo-java-sdk-example)
      </td>
    </tr>

    <tr>
      <td>
        Node.js
      </td>

      <td>
        [https://github.com/wingify/vwo-node-sdk-example](https://github.com/wingify/vwo-node-sdk-example)
      </td>
    </tr>

    <tr>
      <td>
        PHP
      </td>

      <td>
        [https://github.com/wingify/vwo-php-sdk-example](https://github.com/wingify/vwo-php-sdk-example)
      </td>
    </tr>

    <tr>
      <td>
        Python
      </td>

      <td>
        [https://github.com/wingify/vwo-python-sdk-example](https://github.com/wingify/vwo-python-sdk-example)
      </td>
    </tr>

    <tr>
      <td>
        Ruby
      </td>

      <td>
        [https://github.com/wingify/vwo-ruby-sdk-example](https://github.com/wingify/vwo-ruby-sdk-example)
      </td>
    </tr>
  </tbody>
</Table>

> 📘 Important
>
> Having a caching layer saves you time, thereby speeding up the overall user experience.

Also, check how to implement a *User Storage Service* for sticky variation assignments.

## Usage

```php
<?php

// Cache your settingsFile inside the session so that no new request is sent for fetching settingsFile for every hit to your server

// Unset the settingsFile data present in session whenever you need you need to get settingsFile from VWO server

if (isset($_SESSION['VWOSettingsFile'])){
  $settingsFile = $_SESSION['VWOSettingsFile'];
} else{
  $settingsFile = VWO::getSettingsFile($accountId, $sdkKey);
}
```
