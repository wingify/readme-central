---
title: Using Variables to Drive Logic
excerpt: Using variables ensures that variation name is not required
deprecated: false
hidden: false
metadata:
  robots: index
---
## **Using Variables to Drive Logic Instead of Returning Variation Names in VWO FE**

<br />

## Why Variables Over Direct Variation Returns?

<br />

When running experiments or feature rollouts with VWO Feature Experimentation (FE), you typically need to change behavior or configuration _based on the variation assigned to a user_. A naive approach is to check the variation name returned by VWO and hard-code behavior in your application. However, this quickly leads to **tightly coupled logic**, **hard-to-maintain code**, and **rigid experiment evolution**.

<br />

Instead, centralizing configuration via **feature variables** makes your code:

* **Data-driven**: No hard-coded variation names in app logic.
* **Flexible**: Change behaviour by updating variable values in the VWO dashboard only.
* **Extensible**: Add or evolve variations without code changes.

Variables are first-class concepts in VWO FME — they let you attach typed values (Boolean, text, number, JSON) to a feature flag. Each variation then defines _variable values_ for that feature.

<br />

## How VWO Feature Experimentation Works

In VWO FE:

1. You **create a feature flag** in the VWO dashboard and define one or more **variables** for it.
2. You create **variations** of that flag, where each variation assigns specific values to those variables.
3. You configure **rules** (rollouts, experimentation, personalization) that determine which users should see which variation.
4. In your code, you fetch the flag and then access variable values for the assigned variation.

This model decouples _what the code does_ from _how it’s configured_.

<br />

## Typical Node.js SDK Flow (Without Variables)

Here’s how many teams first implement a feature test:

```javascript
const flag = await vwoClient.getFlag('feature_key', userContext);

// What variation was assigned?
const variation = flag.isEnabled() ? flag.getVariable('variationName') : null;



// Branch directly on variation name
if (variation === 'Variation A') {
    // Do something
} else if (variation === 'Variation B') {
    // Do something else
} else {
    // Control or fallback
}
```

While workable, this tightly couples your application logic to _variation names_. If you rename a variation or add a third one, you must change the code.

## The Better Pattern: Use Variables

Instead of returning or comparing variation strings, define variables for all controlled behavior. For example:

### **Step 1 — Define Variables in VWO**

In the VWO dashboard for your feature flag:

|                      |          |                                  |
| :------------------: | :------: | :------------------------------: |
|   **Variable Key**   | **Type** |            **Meaning**           |
|     `buttonText`     |  String  |      Label text for a button     |
|     `showNewFlow`    |  Boolean | Whether to use the new user flow |
| `discountPercentage` |  Number  |          Discount value          |

Assign values across variations:

|               |                  |                 |                        |
| :-----------: | :--------------: | :-------------: | :--------------------: |
| **Variation** |  **buttonText**  | **showNewFlow** | **discountPercentage** |
|    Control    |     “Buy Now”    |      false      |            0           |
|  Variation\_A |    “Get Deal”    |       true      |           10           |
|  Variation\_B | “Claim Discount” |       true      |           15           |

Now behavior is driven by _data_, not string matching.

***

## **Step 2 — Access Variables in Code**

```javascript
const flag = await vwoClient.getFlag('feature_key', userContext);

if (flag.isEnabled()) {
    // Fetch individual variables
    const buttonText = flag.getVariable('buttonText', 'Buy Now'); // fallback default
    const showNewFlow = flag.getVariable('showNewFlow', false);
    const discount = flag.getVariable('discountPercentage', 0);

    // Use them in your app logic
    renderButton(buttonText);
    if (showNewFlow) {
        runNewSignupFlow(discount);
    } else {
        runLegacyFlow();
    }
} else {
    renderLegacyUI();
}
```

<br />

### **Benefits of This Pattern**

1. **No dependency on variation names** — Your app logic adapts to variable values only.
2. **Easier experiment evolution** — Add or change variation values without touching code.
3. **Single source of truth** — All behavioral configuration lives in VWO.
4. **Better telemetry & experimentation** — You can measure metric impact on variables directly.
   <br />

## Accessing the Variation Name (When You Really Need It)

There are valid scenarios where teams want to **know which variation was assigned**, for example:

* Logging or analytics enrichment
* Debugging experiment behavior
* Integrating with downstream systems that expect a label

**VWO FE intentionally avoids exposing variation names as a first-class runtime dependency**, to discourage tight coupling. Instead, the recommended approach is:

<br />

**Expose the variation name explicitly as a variable.**

<br />

### **Recommended Pattern:** `variation_name` **Variable**

Define a variable such as:

|                  |          |                                             |
| :--------------: | :------: | :-----------------------------------------: |
| **Variable Key** | **Type** |                 **Purpose**                 |
| `variation_name` |  String  | Human-readable identifier for the variation |

Assign values per variation:

|               |                     |
| :-----------: | :-----------------: |
| **Variation** | **variation\_name** |
|    Control    |      `control`      |
|  Variation\_A |    `new_flow_v1`    |
|  Variation\_B |    `new_flow_v2`    |

### **Accessing It in Code**

```javascript
const flag = await vwoClient.getFlag('feature_key', userContext);

if (flag.isEnabled()) {
    const variationName = flag.getVariable('variation_name', 'control');

    logger.info('User assigned variation:', variationName);

    // Still use variables for behavior
}

```

<br />

### **Why This Is the Right Approach in VWO FE**

<br />

From a VWO Feature Experimentation product design perspective:

* Variations are **configuration artifacts**, not runtime contracts
* Variables are the **explicit API surface** exposed to applications
* Making variation identity a variable ensures:
  * Controlled exposure
  * Backward compatibility
  * Safe refactoring of experiments

This approach also aligns with **OpenFeature-style best practices**, where flag evaluation returns _values_, not _experiment structure_.

<br />

## Using JSON Variables for Complex Config

If you have many related configuration parameters, using **JSON variables** can be even more powerful:

```json
{
  "uiConfig": {
    "theme": "dark",
    "layout": "compact",
    "ctaColors": { "bg":"#F00", "text":"#FFF" }
  },
  "threshold": 45
}

```

This pattern is especially useful for _dynamic values_ and _feature parameter sets_ that go beyond simple booleans and strings.

```javascript
const config = flag.getVariable('config', { uiConfig: {}, threshold: 0 });

// Use config.uiConfig and config.threshold in your logic
applyUIConfig(config.uiConfig);
```

<br />

## Summary

Using variables instead of branching directly on variation names:

* Makes your codebase more maintainable
* Lets non-devs iterate on experiments without code changes
* Avoids logic sprawl tied to variation identifiers
* Supports richer experiment configurations via types and JSON
