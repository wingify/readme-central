---
title: Delete Soon
deprecated: false
hidden: true
metadata:
  robots: index
---
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

```mermaid
flowchart TD A["getFlag() called for a user"] --> B{"User already\nevaluated before?"} B -- "Yes" --> Z["Return the same\ndecision as before"] B -- "No" --> C{"In an active\nHoldout?"} C -- "Yes" --> H["Feature OFF\n(excluded from experimentation)"] C -- "No" --> D{"Rollout rule(s)\nconfigured & matched?"} D -- "No rollout rules" --> E D -- "Matched & in traffic %" --> E{"Evaluate A/B Testing\n& Personalize rules"} D -- "No match / out of traffic %" --> H2["Feature OFF"] E -- "Rule matched" --> F["Allocate traffic /\nassign variation"] E -- "No rule matched" --> H3["Feature OFF"] F --> Z2["Return final\nvariation & feature state"]
```