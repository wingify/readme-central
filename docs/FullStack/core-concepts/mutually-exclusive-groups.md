---
title: Mutually Exclusive Groups
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
  pages:
    - type: basic
      slug: sdk-quickstart
      title: Quickstart
---
To ensure that a user on your website who is part of one campaign does not become part of another campaign from the same group, you can make your campaigns mutually exclusive one another. This means that the data collected for one campaign is not affected by any other campaign, even if both campaigns are set up on the same page and targeted to the same set of users. 

Some campaigns may have variations that would be absurd if presented together. For example, one campaign is running to see the effects of discounts on specific products, while another compares performance when a blanket discount is provided. There is a chance that a user can experience variations where they get a discount for specific products and are also presented with a blanket discount from the other campaign. These users have a better upside and hence you have introduced a bias in both the campaigns. You can avoid that by making the campaign mutually exclusive, you can ensure that users are shown either product-specific discounts from Campaign 1 or blanket discounts from Campaign 2. This will help ensure that improvements in conversion rates from specific campaigns are attributed correctly to that campaign.

Using the Mutually Exclusive Groups option in VWO, you can group multiple campaigns together that are mutually exclusive. By ensuring that your users are not exposed to multiple campaigns running on the same page, you can keep the reports clean, attribute the change in conversion rate to the correct campaign, remove bias, and avoid overlapping users across campaigns. 

> 🚧
>
> A campaign can only become a part of one exclusive group.

Many VWO users set up multiple campaigns on the same page and want them to run simultaneously. In such situations, a user on the page can become a part of multiple campaigns running on the same URL, and the user data is collected from all the campaign reports.

**For example**, let's say you want to run a campaign by changing the color and position of your primary CTA button on the homepage to make it more prominent on the page. Simultaneously, you also want to run another campaign on the same page by changing the headline of the page to campaign if an idea is communicated effectively to the users.\
In such a scenario, if you run both campaigns at the same time to track the increase in engagement on the page, you cannot be sure which change delivered positive or negative results. In other words, you can not say accurately which set of changes had the maximum impact. Creating mutually exclusive groups allows you to run these campaigns without overlapping users' data between the campaigns.

For unrelated campaigns, it does not matter if your users become a part of more than one campaign. However, if the campaigns are related, you may want to keep the users exclusive to each campaign when you are:

* Running multiple campaigns on the same page
* Running multiple campaigns on the same funnel where there is a possibility of user overlap (like checkout or form pages)

## Create a Mutually Exclusive Group

To learn about configuring the mutually exclusive campaign groups in VWO, refer to [How to Set Up Mutually Exclusive Campaign Groups in VWO](https://developers.vwo.com/docs/mutually-exclusive-campaigns).

## How SDK evaluates

![](https://files.readme.io/c9ab890-MEG-flowchart.jpg)

## Demo

You can play around with different options and observe how the decision is evaluated.\
Please visit [here](https://repl-nodejs-demo.wingify.repl.co/meg).

> 🚧 Note
>
> This feature is only available for Java, Node.js, PHP, Python, and .NET SDKs as of now. We will soon be releasing this functionality in other SDKs.
