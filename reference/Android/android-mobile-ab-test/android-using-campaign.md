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

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/fbfcee3-create-button.png",
        "create-button.png",
        2538,
        1318,
        "#d9dbde"
      ]
    }
  ]
}
[/block]
In the APP step of campaign creation, select an app on which you want to run a test.
Select the platform and provide a test key.
Test key helps you execute custom logic for this test, the details are covered in the [Code Blocks](ref:code-blocks) section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2800102-test-key.png",
        "test-key.png",
        2166,
        1330,
        "#f1f3f3"
      ]
    }
  ]
}
[/block]
In the next step (VARIATIONS) of campaign creation, we can use any existing variable for the test or we can add a new variable.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/56d7d13-variable.png",
        "variable.png",
        2162,
        1322,
        "#f0f2f3"
      ],
      "border": true
    }
  ]
}
[/block]
In the example above, we have added ```speed``` variable, defined value as 20 for the variation.
For control, the value is 10, which is the default value for the variable

We can also use code blocks as shown in the test code. Using code blocks we can run custom logic depending on user becomes part Control or Variation 1.

In the GOALS step of campaign creation, we can add a goal to measure the performance of variations.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c2d6aeb-goal.png",
        "goal.png",
        1532,
        1324,
        "#edf1f2"
      ],
      "border": true
    }
  ]
}
[/block]
In the FINALIZE step of campaign creation, we can control the traffic percentage, schedule a campaign, customize traffic allocation for each variation, and target the campaign for specific user groups.