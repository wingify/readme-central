---
title: Track
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
Tracks a conversion event for a particular user for a running FullStack campaign.

## Description

The API method:

* Validates the parameters passed.
* Checks whether the user is whitelisted.
* Checks if User Storage Service is provided to know whether the user is returning. If yes, show the previously assigned variation always.
* Assigns the consistent variation to the new/returning qualified user.
* Sends an impression event to the VWO server for generating reports.

The API method requires a campaign unique-key - *campaign\_key*, unique user identifier - *userId* and the goal-identifier - *goalIdentifer*. You can also pass other flags under the *options* key.

*campaign\_key* is the required key provided at the time of FullStack campaign creation.\
*userId* is the required unique id associated with the user for identification.\
*goal\_identifier* is the required key provided at the time of creating the goal in a FullStack campaign.\
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

## Parameter Definitions

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **campaign\_key**
        *Required*
      </td>

      <td>
        String

        From v1.8.0+\
        String | Array | null/undefined/empty
      </td>

      <td>
        The Campaign key to uniquely identify a FullStack campaign.

        From v1.8.0+\
        Campaign key, a list of campaign keys, or empty are supported as the type of parameter
      </td>
    </tr>

    <tr>
      <td>
        **user\_id**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        User ID, which uniquely identifies each user.

        * \*Important\*\*: This User ID must match the User ID provided to activate or getVariation API.
      </td>
    </tr>

    <tr>
      <td>
        **goal\_identifier**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The Goal key to uniquely identify a goal of a FullStack campaign.
      </td>
    </tr>

    <tr>
      <td>
        **options**\
        *Optional*
      </td>

      <td>
        Hash
      </td>

      <td>
        Pass params for pre-segmentation and whitelisting 

        custom-variables(Object): Custom variables to be matched  against Campaign's pre-segmentation.

        variation\_targeting\_variables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.

        revenue\_value(Number | Float | String): Revenue goal value, necessary only when type of goal is revenue.

        goal\_type\_to\_track(String): If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.

        should\_track\_returning\_user(Boolean): Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a User Storage Service at your end.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

A boolean value based on whether the impression was made to the VWO server.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Value
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        true
      </td>

      <td>
        Boolean
      </td>

      <td>
        If an impression event is successfully received by VWO server for report generation.
      </td>
    </tr>

    <tr>
      <td>
        false
      </td>

      <td>
        Boolean
      </td>

      <td>
        If userId provided is not part of campaign or when unexpected error comes and no impression call is received by VWO server.
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```ruby
# Without Custom Variables and Revenue Value
vwo_client_instance.track(campaign_key, user_id, goal_identifier)

# With Revenue Value and other options
options = {
  "custom_variables" => { "browser" => "chrome" },
  "variation_targeting_variables" => { "price" => 10  },
	"revenue_value" => 10.23
}

is_successful = vwo_client_instance.track(campaign_key, user_id, goal_identifier, options)

# With both Custom Variables and Revenue Value
options = { "custom_variable" => { "a" => "x"}, "revenue_value" => 10.23}
is_successful = vwo_client_instance.track(campaign_key, user_id, goal_identifier, options)
```

> 🚧 Tracking Conversions for PAUSED campaign
>
> If your server is using an old version of settings, VWO will discard any track calls for a campaign that is now in a **Paused** state. SDKs will keep on sending tracking hits for users or conversions for that campaign until you fetch the latest settings file and update your VWO client-instance.

## Tracking goal having same identifier across different campaigns

When you want to track a goal having the same identifier across multiple campaigns, there is no need to trigger the goal for each different campaign individually. This will reduce the manual effort in case you plan to use the same goal in many campaigns. For example, in case you are planning to run 3 A/B tests and 4 Feature Tests, where you would be using the same goal, you don't have to trigger the goal having the same identifier for each of those 7 campaigns individually.

> 👍 Same Goal Definition
>
> A goal is considered to be the **same** when the goal identifier used for that goal is same across the multiple campaigns, irrespective of the type of campaign i.e. A/B or Feature Test Campaign.

VWO offers two types of goals i.e. **Conversion** and **Revenue**, which can be configured inside VWO application.

> 📘 Tracking goal across campaigns only if goal-type is same
>
> By default, SDK will track a goal across all running campaigns irrespective of the type of goal.\
> The behavior to configure and track only the specific type of goals is possible via passing a key either at the time of launching the SDK or inside the options parameter of the track API.

Passing the type of goal at the time of launching the SDK will consider the flag for all the track API calls. Defaults to ALL i.e. Conversion as well as Revenue.

```ruby
#  Available Goal_Types - REVENUE_TRACKING, CUSTOM_GOAL, ALL (Default)

vwo_client_instance.track(campaign_key, user_id, goal_identifier, {goal_type_to_track: 'REVENUE_TRACKING'})
```

## Usage(when tracking same goal across campaigns)

```ruby
# it will track goal having `goal_identifier` of campaign having `campaign_key` for the user having `user_id` as id.
vwo_client_instance.track(campaign_key, user_id, goal_identifier, {})

# it will track goal having `goal_identifier` of campaigns having `campaign_key1` and `campaign_key2` for the user having `user_id` as id.

vwo_client_instance.track([campaign_key1, campaign_key2], user_id, goal_identifier, {})

# it will track goal having `goal_identifier` of all the campaigns
vwo_client_instance.track(nil, user_id, goalIdentifier, {}
```

> 🚧 Unique conversions
>
> VWO only tracks a conversion corresponding to a visitor hit only once even if the SDK sends multiple calls for the same user per campaign.
