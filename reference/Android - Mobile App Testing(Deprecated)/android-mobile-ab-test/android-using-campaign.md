---
title: Creating an A/B Test
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
Creating a mobile A/B Test requires creating a campaign on app.vwo.com and making corresponding changes in the mobile app.

To create a mobile A/B test, navigate to Mobile App A/B and click on CREATE button.

![2538](https://files.readme.io/fbfcee3-create-button.png "create-button.png")

In the APP step of campaign creation, select an app on which you want to run a test.\
Select the platform and provide a campaign key.\
campaign key helps you execute custom logic for this test, the details are covered in the [Code Blocks](ref:code-blocks) section.

![2166](https://files.readme.io/2800102-test-key.png "test-key.png")

In the next step (VARIATIONS) of campaign creation, we can use any existing variable for the test or we can add a new variable.

<Image className="border" border={true} src="https://files.readme.io/56d7d13-variable.png" />

In the example above, we have added `speed` variable, defined value as 20 for the variation.\
For control, the value is 10, which is the default value for the variable

We can also use code blocks as shown in the test code. Using code blocks we can run custom logic depending on user becomes part Control or Variation 1.

In the GOALS step of campaign creation, we can add a goal to measure the performance of variations.

<Image className="border" border={true} src="https://files.readme.io/c2d6aeb-goal.png" />

In the FINALIZE step of campaign creation, we can control the traffic percentage, schedule a campaign, customize traffic allocation for each variation, and target the campaign for specific user groups.
