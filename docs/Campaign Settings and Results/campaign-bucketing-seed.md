---
title: Campaign Bucketing Seed
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
By default, a new Fullstack campaign considers the campaign ID while bucketing a user using its user ID. This helps in providing a much better experience to a user when the same user becomes a part of multiple similar campaigns. Disabling this option means a user will be exposed to the same variation of different similar campaigns.

[block:callout]
{
  "type": "info",
  "title": "Similar Campaigns",
  "body": "When traffic distribution, number of variations, and their respective weights of two or more campaigns are the same, they are referred to as *similar campaigns*. Pre-segmentation, whitelisting, or other things could vary."
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1725334-Screen_Shot_2021-08-17_at_3.48.33_PM.png",
        "Screen Shot 2021-08-17 at 3.48.33 PM.png",
        2244,
        1510,
        "#bfc2c6"
      ],
      "caption": "Enable Bucketing Seed Option while creating a Campaign"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Please Note",
  "body": "Once a campaign is started i.e. running, paused, or archived, this option can not be toggled for that campaign. This helps in providing a consistent experience to an already bucketed user throughout the journey of a campaign."
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/163cdb2-Screen_Shot_2021-08-17_at_3.49.25_PM.png",
        "Screen Shot 2021-08-17 at 3.49.25 PM.png",
        2242,
        1412,
        "#d2d3d7"
      ],
      "caption": "Enable Bucketing Seed Option while editing a Campaign"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Supported SDKs",
  "body": "This is currently supported by Java, Node.js, PHP, Python, and Ruby SDKs. We will soon be releasing this feature in other SDKs too."
}
[/block]