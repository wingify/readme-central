---
title: Integration with Wingify Web & Mobile Insights
excerpt: Behavioral Analytics Integration with Wingify Behavior Analytics
deprecated: false
hidden: false
metadata:
  robots: index
---
Beyond experimentation and conversion tracking, Wingify Behavior Analytics adds behavioral analytics capabilities such as:

* Session Recordings
* Heatmaps
* Funnel Analysis
  -Visitor-level analysis

When the `UUID` is consistent across:

* Web Experimentation
* Feature Management
* Behavior Analytics

You unlock a powerful capability:

> You can directly correlate experiment variations with actual user behavior.

### Why UUID Consistency Matters for Insights

If UUID is shared across products:

* A visitor bucketed into Variation B (client-side test)
* Or exposed to Feature Flag ON (server-side experiment)

Can be:

* Filtered inside Behavior Analytics
* Viewed through session recordings
* Analyzed via heatmaps
* Compared across variations

Without shared UUID:

* Session recordings cannot be reliably tied to experiment variations
* Heatmap segmentation becomes inaccurate
* Behavioral debugging becomes fragmented

<br />

## Summary

When UUID is unified:

| Product                 | Role                    | What It Tracks                |
| ----------------------- | ----------------------- | ----------------------------- |
| Web Experimentation             | Client-side experiments | UI variation exposure         |
| Feature Management | Server-side experiments | Business logic exposure       |
| Behavior Analytics            | Behavioral analytics    | Session recordings & heatmaps |

Because UUID is identical:

* Exposure → Behavior → Conversion
* Are all tied to the same visitor profile.

### With all three systems connected:

```mermaid
flowchart LR
    Browser -->|UUID Cookie| Server
    Server --> FM_SDK[Wingify FM SDK]
    FM_SDK --> Wingify

    Browser --> SmartCode
    SmartCode --> Wingify

    Browser --> WebInsights[Wingify Behavior Analytics]
    WebInsights --> Wingify

    FM_SDK -. Shared UUID .- SmartCode
    SmartCode -. Shared UUID .- WebInsights

```

This architecture enables system-wide experimentation, not just UI testing.

* Web Experimentation experiments UI behavior
* Feature Management controls application logic
* `UUID` is the binding identity
* Cookies are the transport mechanism
* Two-way identity propagation is supported
* Wingify Behavior Analytics unifies analytics across layers

<br />

## Integration with Wingify Mobile Insights

<Callout icon="📘" theme="info">
  Refer this [article](https://developers.wingify.com/v3/docs/fme-integrations-vwo-insights-mobile)  to know the details.
</Callout>
