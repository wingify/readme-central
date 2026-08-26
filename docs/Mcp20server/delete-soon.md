---
title: Delete Soon
deprecated: false
hidden: true
metadata:
  robots: index
---
Web Testing as Pre-Seg

```mermaid
flowchart TD
  subgraph Dashboard["VWO dashboard"]
    A["Configure a feature segmentation rule"]
    B["Target or exclude a Web Testing campaign"]
    A --> B
  end

  subgraph Application["Your application"]
    C["Read the visitor's campaign and variation assignment"]
    D["Add the assignment to platformVariables.webTestingCampaigns"]
    E["Call getFlag(featureKey, context)"]
    C --> D --> E
  end

  B --> C
  E --> F{"Does the assignment match the segmentation rule?"}
  F -- "Yes" --> G["Feature included"]
  F -- "No, missing, or unmatched" --> H["Feature excluded"]
```

<br />

<br />

## Part 1: Enable Panic Mode

```mermaid
flowchart TD
  A["1. Account owner turns ON Panic Mode\nin Wingify dashboard"]
  B["2. Wingify backend flags the account\nas in Panic Mode"]
  C["3. Connected SDK instances detect\nPanic Mode is active"]

  A --> B --> C
```

## Part 2: SDK behavior and recovery

```mermaid
flowchart TD
  D["4. Flag evaluations & tracking calls\nshort-circuit to safe defaults"]
  E["5. SDK checks in quietly with Wingify\nin the background"]
  F["6. SDK resumes normal evaluation\n(Force Refresh pulls the latest settings — see Part 2)"]

  D --> E
  E -- "Panic Mode still ON" --> D
  E -- "Panic Mode turned OFF" --> F
```

<br />

### Force Refresh

```mermaid
flowchart TD
A["Urgent change on Wingify's side\n(e.g. Panic Mode cleared, or an urgent\ndashboard update)"] --> B["Wingify sends a refresh signal\nto connected SDK instances"]

B --> C["SDK fetches latest settings\nimmediately, without waiting\nfor the next poll"]

C --> D["SDK's local configuration\nis now fully up to date"]

D --> E["getFlag() / tracking calls continue\nusing the refreshed configuration"]

```

## **Rule Evaluation**

```mermaid
flowchart TD
  A["getFlag() called for a user"] --> C{"In an active<br/>holdout?"}

  C -- "Yes" --> H["Feature OFF<br/>(excluded from experimentation)"]
  C -- "No" --> D{"Rollout rule(s)<br/>configured and matched?"}

  D -- "No rollout rules" --> E{"Evaluate A/B testing<br/>and personalize rules"}
  D -- "Matched and in traffic %" --> E
  D -- "No match or out of traffic %" --> H2["Feature OFF"]

  E -- "Rule matched" --> F["Allocate traffic /<br/>assign variation"]
  E -- "No rule matched" --> H3["Feature OFF"]
  F --> Z2["Return final<br/>variation and feature state"]
```
