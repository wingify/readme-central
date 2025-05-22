---
title: How FME SDKs work?
deprecated: false
hidden: true
metadata:
  robots: index
---
```mermaid
flowchart TD
    A[Start] --> B[Initialize VWO FME SDK]
    B --> C[Set accountId and SDK key]
    C --> D{Feature flag check required?}
    
    D -- Yes --> E[Call getFlag() with featureKey and user context]
    E --> F{Flag enabled?}
    
    F -- Yes --> G[Execute variation-specific logic]
    F -- No --> H[Execute default logic]
    
    D -- No --> I{Variable value required?}
    I -- Yes --> J[Call getVariable() with featureKey, variableKey, and user context]
    J --> K[Use variable value in application logic]
    
    I -- No --> L[Continue application flow]
    
    G --> M[End]
    H --> M
    K --> M
    L --> M

```