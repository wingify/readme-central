---
title: Implement a User Storage Service
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
*User Storage Service (USS)* is a caching layer to persist data about your users. This is helpful in ensuring that variation assignments are always sticky even if you update the campaign settings.\
For example, you can create an implementation that reads and saves user-campaign data mapping from backend services such as Redis, Memcache, MongoDB, or any other storage service.

## How to Implement User Storage Service

User Storage Service is optional while [instantiating](https://developers.vwo.com/docs/ruby-launch) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing one.

User Storage Service should expose two methods: *get* and *set*.

| Method Name | Params              | Description                                                                                                                                                                                        | Returns                                                                       |
| :---------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| get         | userId, campaignKey | Retrieve stored data                                                                                                                                                                               | Returns a matching user-campaign data mapping corresponding to User ID passed |
| set         | campaignUserMap     | Store user-campaign data mapping. It has information like user with User ID become part of a campaign having campaign-key as \<*Campaign\_Key*> and got the assigned variation \<Variation\_Name>. | Nothing.                                                                      |

Check the following example to know more about how to implement your own User Storage Service.

```ruby
class VWO
  # Abstract class encapsulating user storage service functionality.
  # Override with your own implementation for storing
  # And retrieving the user.

  class UserStorage

    # Abstract method, must be defined to fetch the
    # User storage dict corresponding to the user_id.
    #
    # @param[String]        :user_id            ID for user that needs to be retrieved.
    # @return[Hash]         :user_storage_obj   Object representing the user.
    #
    def get(user_id, campaign_key)
      # example code to fetch it from DB column
      JSON.parse(User.find_by(vwo_id: user_id).vwo_user)
    end

    # Abstract method, must be to defined to save
    # The user dict sent to this method.
    # @param[Hash]    :user_storage_obj     Object representing the user.
    #
    def set(user_data)
        # example code to save it in DB
        User.update_attributes(vwo_id: user_data.userId, vwo_user: JSON.generate(user_data))
    end
	end
end

# Now use it to initiate VWO client instance
vwo_client_instance = VWO.new(account_id, sdk_key, custom_logger, UserStorage.new)
```

## Format for the userStorageData

***userStorageData*** is a map where data is being stored with respect to a unique user ID and a unique campaign key.

The following keys are expected in the map:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>

      </th>

      <th>

      </th>

      <th>

      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **userId** 
      </td>

      <td>
        String
      </td>

      <td>
        Unique User ID which was provided at the time of calling the SDK API.
      </td>
    </tr>

    <tr>
      <td>
        **campaignKey** 
      </td>

      <td>
        String
      </td>

      <td>
        Unique campaign key, provided at the time of campaign creation and passed when calling the SDK API.
      </td>
    </tr>

    <tr>
      <td>
        **variationName** 
      </td>

      <td>
        String
      </td>

      <td>
        Variation Name that was assigned to the user having the User ID
      </td>
    </tr>

    <tr>
      <td>
        **goalIdentifier** 
      </td>

      <td>
        String
      </td>

      <td>
        List of goals that have already been triggered for the campaign having *campaignKey* and for User ID, separated by a delimiter `_vwo_`.\
        Example: The campaign has three goals but only two have been triggered since now i.e. *buy-now-clicked* and *product-bought* goals.\
        *'buy-now-clicked\_vwo\_product-bought'*  

        * \*Note:\*\* This is required in case of track API only. If you aren't calling *track* API, you can skip this parameter.
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note:
>
> VWO SDK validates the *variationName* and checks whether the variation exists in the campaign having the *campaignkey* or not. If the variation is found, SDK will use without looking into the User Storage service. If the variation of not found, SDK will jump onto the process of checking whether the user is eligible for the campaign or not and returns accordingly from the SDK API.

Below is an example:

```json JSON
{
  userId: 'User ID',
  campaignKey: 'unique-campaign-key',
  variationName: 'Variation-1'
}
```
