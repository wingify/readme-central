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

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **key**
        *Required*
      </td>

      <td>
        string
      </td>

      <td>
        The name of the variable.
      </td>
    </tr>

    <tr>
      <td>
        **defaultValue**\
        *Required*
      </td>

      <td>
        interface\{}
      </td>

      <td>
        The default value to return if the variable is not found.
      </td>
    </tr>
  </tbody>
</Table>

<br />

### GetVariables() Method

```go
variables := flag.GetVariables()
for _, variable := range variables {
    fmt.Printf("Key: %s, Value: %v\n", variable["key"], variable["value"])
}
```

This method returns a slice of maps, where each map represents a variable with its key and value.\
Remember that variables must be defined in your VWO dashboard for the corresponding feature flag before you can use them in your code.
