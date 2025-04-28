---
title: Creating A/B Tests
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
Creating a mobile A/B Test requires starting a campaign on app.vwo.com, and then making corresponding changes to it in the mobile app.

On the **Mobile App A/B** testing screen, select **Campaigns** **>** **Create**. 

![2157](https://files.readme.io/6663f8a-mobile-app-ab-4.jpg "mobile-app-ab-4.jpg")

From the **Choose an app** drop-down, choose the app you want to test. All mobile apps you have added to VWO are listed here.\
Select a platform where the app is running.\
Enter a unique identifier in the **Define a test key** field to filter your tests easily. The test key helps you execute the custom logic, as explained in this [Code Blocks](http://developers.vwo.com/reference#code-blocks) section.

![2166](https://files.readme.io/2800102-test-key.png "test-key.png")

Click **Next**. 

Click **Add Variable**. All the variables you have created for the test are displayed here. You can choose to Create Variable by adding a new test variable.

Next, select the variable you want to test, and then enter the variation value in the relevant fields. You can test multiple variables through one test.

<Image className="border" border={true} src="https://files.readme.io/56d7d13-variable.png" />

In the example above, we have added the `speed` variable, and then defined 20 as the value of the variation.

For control, the value is 10, which is the default value of the variable.

You can use the code blocks shown in the test code to run custom logic for users in control or variation.

In the **Goals** step of campaign creation, we can add a goal to measure the performance of variations.

<Image className="border" border={true} src="https://files.readme.io/c2d6aeb-goal.png" />

In the **Finalize** step of campaign creation, we can control the traffic percentage, schedule a campaign, customize traffic allocation for each variation, and target the campaign for specific user groups.
