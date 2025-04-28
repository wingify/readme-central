---
title: VWO FME SDK Usage
description: Recipe Description
hidden: true
recipe:
  color: '#018FF4'
  icon: 🦉
---
```python Python
from vwo import init

options = {
   'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
   'account_id': '123456' # VWO Account ID
}

vwo_client = init(options)

# Set user context
# id(required) - uniquely identifies a user
user_context = {'id': 'unique_user_id'}

# Returns a flag object which can be used to get flag's status or variable(s)
flag = vwo_client.get_flag('feature_key', user_context)
# Check if flag is enabled
is_flag_enabled = flag.is_enabled()
# Get value of the flag's variable
variable_value = flag.get_variable('variable_key', 'default_value')
# Get value of all the variables of the flag
all_variables = flag.get_variables()

# Track a metric conversion for the specified event-name
vwo_client.track_event('event_name', user_context, event_properties)

# Send a user attribute to VWO
vwo_client.set_attribute('attribute_key', 'attribute_value', user_context)
```

```node Node
const { init } = require('vwo-fme-node-sdk');

(async function () {
  // Initialize VWO client
  const vwoClient = await init({
    accountId: '123456',
    sdkKey: '32-alpha-numeric-sdk-key',
  });

  // Set user context
  // id(required) - uniquely identifies a user
  const userContext = { id: 'unique_user_id' };
  
  // Returns a flag object which can be used to get flag's status or variable(s)
  const flag = await vwoClient.getFlag('feature_key', userContext);
  
  // Check if flag is enabled
  if (flag.isEnabled()) {
    // Get value of the flag's variable
    const value = flag.getVariable('variable_key', 'default_value');
    
    // Get value of all the variables of the flag
    const allVariables = flag.getVariables();
  }

  // Track a metric conversion for the specified event-name
  vwoClient.trackEvent('event_name', userContext, { userType});
  
  // Send a user attribute to VWO
  vwoClient.setAttribute('attribute_name', 'attribute_value', { id: 'unique_user_id' });
})();
```

```java Java
import com.vwo.VWO;
import com.vwo.models.user.VWOContext;
import com.vwo.models.user.GetFlag;
import com.vwo.models.user.VWOInitOptions;
import java.util.Map;

public class VWOExample {
    public static void main(String[] args) {
      // Initialize VWO SDK with your account details
      VWOInitOptions vwoInitOptions = new VWOInitOptions();
      vwoInitOptions.setSdkKey("32-alpha-numeric-sdk-key"); // Replace with your SDK key
      vwoInitOptions.setAccountId(123456); // Replace with your account ID

      // Initialize VWO instance
      VWO vwoClient = VWO.init(vwoInitOptions);

      // Set user context
      // id(required) - uniquely identifies a user
      VWOContext userContext = new VWOContext();
      userContext.setId("unique_user_id"); // Set a unique user identifier

      // Returns a flag object which can be used to get flag's status or variable(s)
      GetFlag flag = vwoClient.getFlag("feature_key", userContext);
      // Check if flag is enabled
      Boolean isFeatureEnabled = flag.isEnabled();

      // Get value of the flag's variable
      String variableValue = (String) flag.getVariable("variable_key", "default_value");

      // Get value of all the variables of the flag
      List<Map<String, Object>> allVariables = flag.getVariables();

      // Track a metric conversion for the specified event-name
      vwoClient.trackEvent("event_name", userContext);

      // Send a user attribute to VWO
      vwoClient.setAttribute("attribute_key", "attribute_value", userContext);
    }
}
```

```php PHP
use vwo\VWO;

// Initialize VWO SDK with your account details
$vwoClient = VWO::init([
  'sdkKey' => 'vwo_sdk_key',
  'accountId' => 'vwo_account_id',
]);

// Set user context
// id(required) - uniquely identifies a user
$userContext = [ 'id' => 'unique_user_id'];

// Returns a flag object which can be used to get flag's status or variable(s)
$flag = $vwoClient->getFlag('feature_key', $userContext);

// Check if flag is enabled
$isFlagEnabled = $flag['isEnabled'];

// Get value of the flag's variable
$variableValue = $flag->getVariable('variable_key', 'default-value');

// Get value of all the variables of the flag
$allVariables = $flag->getVariables();

// Track a metric conversion for the specified event-name
$trackRes = $vwoClient->trackEvent('event_name', $userContext);

// Send a user attribute to VWO
$setAttribute = $vwoClient->setAttribute('attribute_key', 'attribute_value', $userContext);
```

```csharp .NET
using VWOFmeSdk;
using VWOFmeSdk.Models.User;

class Program
{
    static void Main(string[] args)
    {
      // Initialize VWO SDK with your account details
      var vwoClient = new VWOInitOptions
      {
        SdkKey = "32-alpha-numeric-sdk-key", // Replace with your SDK key
        AccountId = 123456 // Replace with your account ID
       };

      var vwoInstance = VWO.Init(vwoInitOptions);

      // Set user context
      // id(required) - uniquely identifies a user
      var userContext = new VWOContext
      {
        Id = "unique_user_id" // Set a unique user identifier
       };

      // Returns a flag object which can be used to get flag's status or variable(s)
      var flag = vwoClient.GetFlag("feature_key", userContext);
      
      // Check if flag is enabled
      bool isFeatureEnabled = flag.IsEnabled();

      // Get value of all the variables of the flag
      var variableValue = flag.GetVariable("variable_key", "default_value");
      
      // Get value of all the variables of the flag
      var allVariables = flag.GetVariables();

      // Track a metric conversion for the specified event-name
      var eventProperties = new Dictionary<string, object> { { "revenue", 100 } };
      var trackResponse = vwoClient.TrackEvent("event_name", userContext, eventProperties);

      // Send a user attribute to VWO
      vwoClient.SetAttribute("attribute_key", "attribute_value", userContext);
    }
}
```

```json Response Example
{"success":true}
```

# Import

<!-- python@1 -->
<!-- node@1 -->
<!-- java@1-4 -->
<!-- php@1 -->
<!-- csharp@1-2 -->

Import the VWO FME SDK so that it can be initialized

# Initialize

<!-- python@3-8 -->
<!-- node@4-8 -->
<!-- java@9-15 -->
<!-- php@3-7 -->
<!-- csharp@8-15 -->

This code initializes the VWO SDK using the init function. The init function takes in the required parameters - SDK Key and Account ID. Optional keys like storage, logger, polling, etc. can be passed depending upon the requirements.

# Set User Context

<!-- python@10-12 -->
<!-- node@10-12 -->
<!-- java@17-20 -->
<!-- php@9-11 -->
<!-- csharp@17-22 -->

The context uniquely identifies users and is crucial for consistent feature rollouts. A typical context is an object with a required id key for user identification. Other user attributes can also be passed for segmentation purposes.

# Get Flag Status & its Variables

<!-- python@14-21 -->
<!-- node@14-24 -->
<!-- java@22-31 -->
<!-- php@13-23 -->
<!-- csharp@24-34 -->

This code verifies whether the flag associated with the provided feature-key is enabled and allows access to the corresponding variable(s).

# Track a Custom Event

<!-- python@23-24 -->
<!-- node@26-27 -->
<!-- java@33-34 -->
<!-- php@25-26 -->
<!-- csharp@36-38 -->

Tracks a metric conversion for a specified event, requiring a User Context and optional event properties.

# Set User Attributes

<!-- python@26-27 -->
<!-- node@29-30 -->
<!-- java@36-37 -->
<!-- php@28-29 -->
<!-- csharp@40-41 -->

Sends a user attribute to VWO for filtering campaign reports based on attributes.