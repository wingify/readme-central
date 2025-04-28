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

User Storage Service is optional while [instantiating](https://developers.vwo.com/reference#fullstack-sdk-instantiation) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing one.

User Storage Service should expose two methods: *get* and *set*.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Method Name
      </th>

      <th>
        Params
      </th>

      <th>
        Description
      </th>

      <th>
        Returns
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        get
      </td>

      <td>
        userId, campaignKey
      </td>

      <td>
        Retrieve stored data
      </td>

      <td>
        Returns a matching user-campaign data mapping corresponding to User ID passed
      </td>
    </tr>

    <tr>
      <td>
        set
      </td>

      <td>
        campaignUserMap
      </td>

      <td>
        Store user-campaign data mapping. It has information like user with User ID become part of a campaign having campaign-key as \<*Campaign\_Key*> and got the assigned variation \<Variation\_Name>.
      </td>

      <td>
        Nothing.
      </td>
    </tr>
  </tbody>
</Table>

Check the following example to know more about how to implement your own User Storage Service.

```javascript Node.js
var vwoSDK = require('vwo-node-sdk');

var userStorageService = {};

// Sync Implementation
userStorageService = {
  get: function (userId, campaignKey) {
    // Get stored user-campaign data mapping in the format sdk passed it to set method
  },
  set: function (campaignUserMap) {
    // Save user-campaign data mapping
  }
};

// Async Implementation
userStorageService = {
  get: function (userId, campaignKey) {
    // This method needs to be synchronous
    // Get stored user-campaign data mapping in the format sdk passed it to set method
    const storedData = db.query(userId, campaignKey);
    // transform (storedData), if needed and
    // return in same format just like campaignUserMap, the it was provided to set method
    return { campaignKey: '', variationName: '', userId: ''  }; // stored data
  },
  set: async function (campaignUserMap) {
    // Save user-campaign data mapping
    // transform (campaignUserMap), if needed
    await db.set(campaignUserMap);
  }
}

var vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile,
  userStorageService: userStorageService 
});
```
```php
// USER PROFILE SERVICE File - UserStorageService.php

<?php

require_once('vendor/autoload.php');
use vwo\Storage\UserStorageInterface;

Class UserStorage implements UserStorageInterface{
  /**
   * @param $userId
   * @param $campaignKey
   * @return array
   */
  public function get($userId, $campaignKey){  
    return [
      'userId'=>$userId,
      'campaignKey'=> $campaignKey,
      'variationName'=>'Control'
    ];
  }

  /**
   * @param $campaignUserMap
   * @return bool
   */
  public function set($campaignUserMap){
    // Save into DB/any storage
    return True;
  }
}
?>

// MAIN FILE

<?php

require_once('vendor/autoload.php');
require_once('UserStorageService.php');

use vwo\VWO;

$config = [
  'settingsFile'=> $settingsFile,
  'userStorageService'=> new userStorage()
];

$vwoClientInstance = new VWO($config);
```
```python
import vwo
from vwo import logger

class user_storage_service(UserStorageService):
  def get(self, user_id, campaign_test_key):
    # ...code here for getting data
    # return data

  def set(self, campaign_user_map):
    # ...code to persist data

uss = user_storage_service()

settings_file = vwo.get_settings_file(account_id, sdk_key)
vwo_client_instance = vwo.launch(settings_file, user_storage_service = uss)
```
```csharp .NET
using VWO.Sdk;

public class UserStorageService : IUserStorageService
{
    public UserStorageMap Get(string userId)
    {
        // ...code here for getting data
        // return data
    }

    public void Set(UserStorageMap userStorageMap)
    {
        // ...code to persist data
    }
}


var settingsFile = VWO.GetSettingsFile(accountId, sdkKey);

//  Provide UserProfileService instance while vwoClient Instantiation.
var vwoClient = VWO.CreateInstance(settingsFile, userProfileService: new UserProfileService());
```
```java
import com.vwo.VWO;

String settingsFile = VWO.getSettingsFile(accountId, sdkKey);

Storage.User userStorage = return new Storage.User() {
     @Override
     public Map<String, String> get(String userId, String campaignKey) {
        for (Map<String, String> savedCampaign: campaignStorageArray) {
            if (savedCampaign.get("userId").equals(userId) && savedCampaign.get("campaignKey").equals(campaignKey)) {
               return savedCampaign;
            }
        }
        return null;
     }
    
     @Override
     public void set(Map<String, String> map){
        campaignStorageArray.add(map);
     }
};

VWO vwo = VWO.launch(settingsFile).withUserStorage(userStorage).build();
```
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
```go
import vwo "github.com/wingify/vwo-go-sdk/"
import "github.com/wingify/vwo-go-sdk/pkg/api"
import "github.com/wingify/vwo-go-sdk/pkg/schema"

// declare UserStorage interface with the following Get & Set function signature
type UserStorage interface{
    Get(userID, campaignKey string) UserData
    Set(string, string, string)
}

// declare a UserStorageData struct to implement UserStorage interface
type UserStorageData struct{}

// Get method to fetch user variation from storage
func (us *UserStorageData) Get(userID, campaignKey string) schema.UserData {
    //Example code showing how to get userData  from storage service
    userData, ok := userDatas[campaignKey]
    if ok {
		for _, userdata := range userData {
			if userdata.UserID == userID {
				return userdata
			}
		}
    }
    /*
    // UserData  struct
    type UserData struct {
        UserID        string
        CampaignKey   string
        VariationName string
    }
    */
	return schema.UserData{}
}

// Set method to save user variation to storage
func (us *UserStorageData) Set(userID, campaignKey, variationName string) {
    //Example code showing how to store userData in storage service
    userdata := schema.UserData{
		UserID:        userID,
		CampaignKey:   campaignKey,
		VariationName: variationName,
	}
	flag := false
	userData, ok := userDatas[userdata.CampaignKey]
	if ok {
		for _, user := range userData {
			if user.UserID == userdata.UserID {
				flag = true
			}
		}
		if !flag {
			userDatas[userdata.CampaignKey] = append(userDatas[userdata.CampaignKey], userdata)
		}
	} else {
		userDatas[userdata.CampaignKey] = []schema.UserData{
			userdata,
		}
	}
}

func main() {
	settingsFile := vwo.GetSettingsFile("accountID", "SDKKey")
	// create UserStorageData object
	storage := &UserStorageData{}

	vwoClientInstance, err := vwo.Launch(settingsFile, api.WithStorage(storage))
	if err != nil {
		//handle err
	}
}
```

## Format for the userStorageData

***userStorageData*** is a map where data is being stored with respect to a unique user ID and a unique campaign key.

Following keys are expected in the map:

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
        Unique campaign key, provided at the time of campaign creation, and passed when calling the SDK API.
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
        List of goals that has already been triggered for the campaign having *campaignKey* and for User ID, separated by a delimiter **vwo**.\
        Example: Campaign having three goals but only two have been triggered since now i.e. *buy-now-clicked* and *product-bought* goals.\
        *'buy-now-clicked\_vwo\_product-bought'* 

        * *Note:\*\* This is required in case of track API only. If you aren't calling*track\* API, you can skip this parameter.
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note:
>
> VWO SDK validates the *variationName* and checks whether the variation exists in the campaign having the *campaignkey* or not. If the variation is found, SDK will use without looking into the User Storage service. If the variation of not found, SDK will jump onto the process of checking whether the user is eligible for the campaign or not and returns accordingly from the SDK API.

Below is an example:

```javascript Node.js
{
  userId: 'User ID',
  campaignKey: 'unique-campaign-key',
  variationName: 'Variation-1'
}
```

> 🚧 User Storage Service Asynchronous Behaviour
>
> ***get*** method needs to be synchronous as all SDK APIs are synchronous except *getSettingsFile* API.\
> Using asynchronous DB/Storage operations inside ***get*** method are not useful as, in any way, SDK needs to wait for the response so that the stored results could be used synchronously.
>
> ***set*** method could be asynchronous as VWO SDK need not wait for any response from it.
>
> Also, asynchronous behavior is limited to languages like Node.js, JavaScript, and Java as other languages do not natively support them in all the SDK supported versions.

Please check the FAQ [Is User Storage Service synchronous or asynchronous?\
](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous) - to know more about how to implement the asynchronous User Storage Service.
