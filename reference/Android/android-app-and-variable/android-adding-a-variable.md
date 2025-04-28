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