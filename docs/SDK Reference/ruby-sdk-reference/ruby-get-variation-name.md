---
title: Get Variation Name
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
After successfully instantiating a VWO class, *getVariationName API* returns the variation assigned to the specified user if the user qualifies to become part of the specified campaign. This API doesn't activate the campaign i.e. it will not send any impression call to the VWO servers for tracking any data.

## Description

The API method:

* Validates the parameters passed.
* Checks whether the user is whitelisted.
* Checks if User Storage Service is provided to know whether the user is returning. If yes, show the previously assigned variation always.
* Checks if the campaign is part of [Mutually Exclusive Group](https://developers.vwo.com/docs/mutually-exclusive-groups) and evaluates all the grouped campaigns to decide whether the user is eligible for the campaign.
* Checks whether the user is eligible based on the campaign's pre-segmentation conditions.
* Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
* Assigns a deterministic variation to the qualified user.
* Does ***not*** send an impression event to the VWO server.

It takes the same parameters and returns the same value as [Activate API](https://developers.vwo.com/docs/ruby-activate). The only difference is that this API method does ***not*** send a tracking impression to the VWO server. This API method is used to get the variation assigned to the *userId*.\
The behaviour of the two API methods, that is, [activate](https://developers.vwo.com/docs/ruby-activate) and [getVariationName](https://developers.vwo.com/docs/ruby-get-variation-name) is identical otherwise.

Use *Get Variation Name* API if *Activate* API has already been triggered to prevent a user from being tracked again. Also, this API is also helpful in retrieving the variation assignment to a particular User Id, respecting all other factors like segmentation, whitelisting, etc. without sending any impression call to the VWO servers.

## Parameter definitions

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
      </td>

      <td>
        The campaign needs to be identified based on the unique test-key provided at the time of campaign creation.
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
        The User ID which uniquely identifies each user.
      </td>
    </tr>

    <tr>
      <td>
        **options**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        Pass params for pre-segmentation and whitelisting 

        custom\_variables(Object): Custom variables to be matched  against Campaign's pre-segmentation.

        variation\_targeting\_variables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

The name of the variation in which the user is bucketed, or is *null* if the user does not qualify for a campaign.

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
        Variation name
      </td>

      <td>
        String
      </td>

      <td>
        When a user qualifies for the campaign, *variation name* is returned.
      </td>
    </tr>

    <tr>
      <td>
        null
      </td>

      <td>
        Object
      </td>

      <td>
        When a user is not qualified for a campaign, *null* is returned.
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```ruby
require 'vwo'

vwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false)

# With Custom Variables
options = {
  "custom_variables" => { "browser" => "chrome" },
  "variation_targeting_variables" => { "price" => 10  }
}


variation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, options)

# Without Custom Variables
options = {}
variation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, options)

if variation_name == "Control"
  # CODE: write code for Control
elsif variation_name == "Variation-1"
  # CODE: write code for Variation-1
else
  # CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
end
```

## Campaign Activation with User Storage Service

If [User Storage Service](https://developers.vwo.com/docs/ruby-implement-a-user-storage-service) is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.

**Correct Usage**

```ruby
vwo_client_instance.activate(campaign_key, user_id)
vwo_client_instance.track(campaign_key, user_id, goal_identifier, {})
```

**Wrong Usage**

```ruby
# Calling track API before activate API
# This will not track goal as campaign has not been activated yet.
vwo_client_instance.track(campaign_key, user_id, goal_identifier, {})

# After calling track API
vwo_client_instance.activate(campaign_key, user_id)
```

##
