---
title: Defining the Variables You Want to Test
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
Test variables are elements or parameters of your mobile app. After you define a variable, you can run an unlimited number of A/B tests on the variable, without doing any code changes or redeployment. For example, you can create a string-type variable for testing different text versions on the app screen.

Under the **Apps** tab, select the mobile app for which you want to create test variables.

To add an element for testing, select **Variables** **>** **Create Variable**.

Assign a name to the variable, and then select its data type. 

Type **Default Value**(current value or a value if there is no A/B test).

You can view the relevant Java, Objective, or Swift code snippet in the right panel as you create the variable. You can use this code snippet to update the changes in your mobile app code.

To add the variable, touch **Create**. You can add multiple variables to an app.

![1349](https://files.readme.io/0fb2726-mobile-app-ab-3.jpg "mobile-app-ab-3.jpg")

The Default Value field helps you write consistent code, without introducing checks for nil.\
In the example above, we have defined the `speed` integer variable with the default value as 5.\
The corresponding code for Java, Objective-C, and Swift is also generated.\
Now, instead of using `int speed = 5;` use the code below.

```objectivec
int speed = [VWO intForKey:@"speed" defaultValue:5];
```
```swift
int speed = VWO.intFor(key: "speed", defaultValue: 5)
```
