---
title: Adding a Variable
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Use Variables to parameterize your mobile app and easily run A/B tests on the parameters.
Variables can be defined in the VWO interface, and then used in your app. Once you define a variable, you can run an unlimited number of A/B tests on that variable, without any code changes or deploy.

Variables can be of type integer, float, string or boolean.
To create a variable, click on APPS section in Mobile App A/B.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d609531-Screen_Shot_2018-05-25_at_4.52.44_PM.png",
        "Screen Shot 2018-05-25 at 4.52.44 PM.png",
        1886,
        268,
        "#d4d5d9"
      ]
    }
  ]
}
[/block]
Use Create Variable button

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a8493b8-Screen_Shot_2018-05-25_at_4.54.52_PM.png",
        "Screen Shot 2018-05-25 at 4.54.52 PM.png",
        2508,
        1376,
        "#8e8f90"
      ],
      "sizing": "smart"
    }
  ]
}
[/block]
Enter the name of the variable, data type and a default value.
The default value is the original value for that variable. Default value gets used if there are no tests running.

Default value helps your write consistent code, without introducing checks for nil.
In the example above, we have defined ```speed``` integer variable with 5 default value.
The corresponding code for Java, Objective-C and Swift is also generated.
Now instead of using ```int speed = 5;``` use the below code.

**Integer Variable API** 
[block:code]
{
  "codes": [
    {
      "code": "int speed = VWO.getIntegerForKey(\"speed\", 5);",
      "language": "java"
    },
    {
      "code": "val speed = VWO.getIntegerForKey(\"speed\", 5)",
      "language": "kotlin",
      "name": null
    }
  ]
}
[/block]
**Boolean Variable API** 
[block:code]
{
  "codes": [
    {
      "code": "bool isFeatureEnabled = VWO.getBooleanForKey(\"feature_name\", true);",
      "language": "java"
    },
    {
      "code": "val isFeatureEnabled = VWO.getBooleanForKey(\"feature_name\", true)",
      "language": "kotlin"
    }
  ]
}
[/block]
**String Variable API** 
[block:code]
{
  "codes": [
    {
      "code": "string buttonColor = VWO.getBooleanForKey(\"button_color\", \"red\");",
      "language": "java"
    },
    {
      "code": "val buttonColor = VWO.getStringForKey(\"button_color\", \"red\")",
      "language": "kotlin"
    }
  ]
}
[/block]
**Double Variable API** 
[block:code]
{
  "codes": [
    {
      "code": "double price = VWO.getDoubleForKey(\"price\", 210.50);",
      "language": "java"
    },
    {
      "code": "val price = VWO.getDoubleForKey(\"price\", 210.50)",
      "language": "kotlin"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Return Value",
  "body": "The above functions will return a variable's value for the given variable-key. This function will search for the variable key in all the currently running campaigns. If the key exists in multiple campaigns, it will return the value for the key for the latest campaign."
}
[/block]

[block:api-header]
{
  "title": "Variable value for a Campaign"
}
[/block]
There's an option of providing the test-key of the campaign. This will return the variable value for that particular campaign only. A visitor will also become part of the provided campaign only.
[block:callout]
{
  "type": "warning",
  "title": "NOTE",
  "body": "Support for passing the test key is only applicable from SDK version **2.10.0** onwards."
}
[/block]
**Integer Variable API** 
[block:code]
{
  "codes": [
    {
      "code": "int speed = VWO.getIntegerForKey(\"test_key\", \"speed\", 5);",
      "language": "java"
    },
    {
      "code": "val speed = VWO.getIntegerForKey(\"test_key\", \"speed\", 5)",
      "language": "kotlin"
    }
  ]
}
[/block]
**Boolean Variable API** 
[block:code]
{
  "codes": [
    {
      "code": "bool isFeatureEnabled = VWO.getBooleanForKey(\"test_key\", \"feature_name\", true);",
      "language": "java"
    },
    {
      "code": "val isFeatureEnabled = VWO.getBooleanForKey(\"test_key\", \"feature_name\", true)",
      "language": "kotlin"
    }
  ]
}
[/block]
**String Variable API** 
[block:code]
{
  "codes": [
    {
      "code": "string buttonColor = VWO.getStringForKey(\"test_key\", \"button_color\", \"red\");",
      "language": "java"
    },
    {
      "code": "val buttonColor = VWO.getStringForKey(\"test_key\", \"button_color\", \"red\")",
      "language": "kotlin"
    }
  ]
}
[/block]
**Double Variable API** 
[block:code]
{
  "codes": [
    {
      "code": "double price = VWO.getDoubleForKey(\"test_key\", \"price\", 210.50);",
      "language": "java"
    },
    {
      "code": "val price = VWO.getDoubleForKey(\"test_key\", \"price\", 210.50)",
      "language": "kotlin"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Return Value",
  "body": "The above functions will return a variable's value for the given variable-key and test-key. This function will search for the variable key in all the currently running campaigns and return the variable value where the input test-key matches with the running campaigns' test-key."
}
[/block]

[block:api-header]
{}
[/block]