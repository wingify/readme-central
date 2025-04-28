---
title: Variables
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: fme-go-metrics
      title: Metrics Tracking
---
Variables allow you to control specific aspects of your features dynamically. They are associated with feature flags and can be used to customize feature behavior.

## Accessing Variables

After fetching a feature flag, you can access its variables using the `GetVariable()` method:

```go
flag, err := instance.GetFlag("feature_key", userContext)
if err != nil {
    // Handle error
}

if flag.IsEnabled() {
    // Access a specific variable
    buttonColor := flag.GetVariable("button_color", "blue")
    
    // Use the variable in your code
    setButtonColor(buttonColor)
}

 
```

### GetVariable() Method

```go
GetVariable(key string, defaultValue interface{}) interface{}
```

<br />

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**key**  \n_Required_",
    "0-1": "string",
    "0-2": "The name of the variable.",
    "1-0": "**defaultValue**  \n_Required_",
    "1-1": "interface{}",
    "1-2": "The default value to return if the variable is not found."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


<br />

### GetVariables() Method

```go
variables := flag.GetVariables()
for _, variable := range variables {
    fmt.Printf("Key: %s, Value: %v\n", variable["key"], variable["value"])
}
```

This method returns a slice of maps, where each map represents a variable with its key and value.  
Remember that variables must be defined in your VWO dashboard for the corresponding feature flag before you can use them in your code.