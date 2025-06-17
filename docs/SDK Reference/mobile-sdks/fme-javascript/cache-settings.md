---
title: Cache Settings
deprecated: false
hidden: true
metadata:
  robots: index
---
Advanced storage configuration capabilities enable greater flexibility and precision in managing how data is cached and updated within browser environments.

These enhanced options allow developers to fine-tune storage behavior by specifying which mechanisms to use (such as localStorage(default), sessionStorage, or IndexedDB), as well as defining custom rules for cache invalidation and refresh intervals. This level of granularity not only improves application performance by reducing unnecessary data fetches but also ensures more predictable and efficient control over data persistence and cache lifetimes, leading to a more responsive and consistent user experience.

## Key Features:

1. **Custom ttl (Time To Live) Option**
   * The ttl setting allows to specify how long the settings should remain valid in the storage. If not specified, the default TTL is set to 2 hours. This helps in controlling the frequency with which settings are refreshed from the server.\
     Note - The TTL value is specified in milliseconds.
   * This is especially useful when you want to limit the frequency of network requests and instead rely on cached settings for performance.
2. **`alwaysUseCachedSettings`Option**
   * When enabled, the SDK will always use cached settings, regardless of the TTL value. This means the settings stored in the browser will be used even if they have expired based on the TTL.
   * By default, this option is disabled. If disabled, the SDK will check the TTL and refresh settings as per the specified interval.
3. **Background Refresh**
   * When valid cached settings are returned and the TTL has not expired, the SDK will use the cached settings immediately. While doing so, it will asynchronously refresh the settings in the background. This helps in ensuring the settings are up to date without introducing delays in loading or performance bottlenecks.

## Benefits

* **Improved Performance:** By customizing the TTL and cache usage, you can optimize how often settings are fetched from the server, reducing unnecessary network requests and improving load times.
* **Better Control:** You can fine-tune how settings are stored and refreshed, ensuring that your application behaves exactly as needed depending on the environment and the use case.
* **Flexible Caching:** It allows for a balance between always using fresh settings and reducing the reliance on server fetches, giving you more control over your caching strategy.
* **Non-Blocking Updates:** The background refresh feature ensures that the user experiences no delay in getting the settings, while the SDK silently keeps them updated in the background.

<br />

## Configuration Parameters

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>

      <th>
        Use Case
      </th>

      <th>
        Default
        Value
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **ttl**(Integer)
        (*Optional*)
      </td>

      <td>
        Time-to-live for cached settings in milliseconds. Determines how long the cached settings are considered valid before expiring.
      </td>

      <td>
        Use when you want to control how frequently settings are refreshed from the server
      </td>

      <td>
        7200000 ms               (2 hours)
      </td>
    </tr>

    <tr>
      <td>
        **alwaysUseCachedSettings**(Boolean)
        (*Optional*)
      </td>

      <td>
        If set to true, always uses cached settings from storage, ignoring TTL and server fetch.
      </td>

      <td>
        Use when you want to force the SDK to always use local cached settings, even if expired.
      </td>

      <td>
        false
      </td>
    </tr>
  </tbody>
</Table>

<br />

## Usage

```javascript
const vwoClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  clientStorage: {
    // Custom key used to store SDK data, default is 'vwo_fme_data'
    key: 'vwo_data',
    
    // Use cached settings regardless of TTL, defaults to false
    alwaysUseCachedSettings: true,
    
    // Custom TTL value in milliseconds (1 hour), defaults to 2 hours
    ttl: 3600000
  },
});

```

<br />

## Flow

```mermaid
flowchart TD

    %% ENTRY POINT
    A0(["VWO FME SDK"]) --> A("Initialize using<br/>configurable options")
    A --> B("Set Custom TTL (Time To Live)")
    A --> C("Set alwaysUseCachedSettings Option")
    A --> D("Background Refresh (Core)")

    %% TTL Settings Logic (Reusable)
    subgraph TTL_Logic ["TTL-Based Settings Logic"]
        B1{"Is TTL Valid?"}
        B1 -- Yes --> B2("Return Cached Settings")
        B1 -- No --> B3("Fetch Fresh Data from Server")
        B2 --> B4("Trigger Background Refresh<br/>Update TTL Timestamp")
        B3 --> B4
        B4 --> B5("Store Updated Settings in localStorage")
        B5 --> B6("Return Fresh or Updated Data")
    end

    %% alwaysUseCachedSettings Logic
    subgraph alwaysUseCachedSettings_Logic ["Cached Settings Mode"]
        C1{"Is alwaysUseCachedSettings Enabled?"}
        C1 -- Yes --> C2("Use Cached Settings Always")
        C1 -- No --> C3("Use TTL Logic")
        C2 --> B2
        C3 --> B1
    end

    %% Background Refresh Logic
    subgraph Background_Refresh_Core ["Background Refresh"]
        D1{"Is Valid Cached Data Available?"}
        D1 -- Yes --> D2("Use Cached Data Immediately")
        D1 -- No --> D3("Fetch New Settings from Server")
        D2 --> D4("Background Refresh<br/>(Async Cache Update)")
        D3 --> D4
        D4 --> D5("Store Fresh Settings in localStorage")
    end

    %% Main Flow to Subgraphs
    B --> B1
    C --> C1
    D --> D1

    %% Assign Classes
    class B ttlSettings
    class C alwaysUseCachedSettings
    class D backgroundRefresh
    class B1,C1,D1 conditional

    %% Define Styles
    classDef ttlSettings fill:#bbf,stroke:#333,stroke-width:1px,color:#000
    classDef alwaysUseCachedSettings fill:#bbf,stroke:#333,stroke-width:1px,color:#000
    classDef backgroundRefresh fill:#bbf,stroke:#333,stroke-width:1px,color:#000
    classDef conditional fill:#d0efff,stroke:#333,stroke-width:1px,color:#000
```