---
title: Variables in an A/B Test
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
Use variables to parameterize your mobile app, and then easily run A/B tests on the parameters.

Variables can be of the type:

- Integer
- Float
- String
- Boolean

Refer to the [Adding a Variable](ref:adding-a-variable) section on how to create a variable.
When you select a variable in an A/B test, you need not do any code changes for that variable. The VWO SDK will fetch the values for that variable and return the value according to the variation.

If you want to update the default value of a variable, change the default value on the VWO web portal, and then use the newly generated code snippet in your mobile app.

If you are not running an A/B test, the VWO SDK returns the ```defaultValue``` you pass in the function call.