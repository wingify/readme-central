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
_User Storage Service (USS)_ is a caching layer to persist data about your users. This is helpful in ensuring that variation assignments are always sticky even if you update the campaign settings.  
For example, you can create an implementation that reads and saves user-campaign data mapping from backend services such as Redis, Memcache, MongoDB, or any other storage service.

## How to Implement User Storage Service

User Storage Service is optional while [instantiating](https://developers.vwo.com/docs/go-launch) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing one.

User Storage Service should expose two methods: _get_ and _set_.

| Method Name | Params              | Description                                                                                                                                                                                      | Returns                                                                       |
| :---------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| get         | userId, campaignKey | Retrieve stored data                                                                                                                                                                             | Returns a matching user-campaign data mapping corresponding to User ID passed |
| set         | campaignUserMap     | Store user-campaign data mapping. It has information like user with User ID become part of a campaign having campaign-key as \<_Campaign_Key_> and got the assigned variation \<Variation_Name>. | Nothing.                                                                      |

Check the following example to know more about how to implement your own User Storage Service.

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

**_userStorageData_** is a map where data is being stored with respect to a unique user ID and a unique campaign key.

The following keys are expected in the map:

[block:parameters]
{
  "data": {
    "h-0": "",
    "h-1": "",
    "h-2": "",
    "0-0": "**userId** ",
    "0-1": "String",
    "0-2": "Unique User ID which was provided at the time of calling the SDK API.",
    "1-0": "**campaignKey** ",
    "1-1": "String",
    "1-2": "Unique campaign key, provided at the time of campaign creation and passed when calling the SDK API.",
    "2-0": "**variationName** ",
    "2-1": "String",
    "2-2": "Variation Name that was assigned to the user having the User ID",
    "3-0": "**goalIdentifier** ",
    "3-1": "String",
    "3-2": "List of goals that have already been triggered for the campaign having _campaignKey_ and for User ID, separated by a delimiter `_vwo_`.  \nExample: The campaign has three goals but only two have been triggered since now i.e. _buy-now-clicked_ and _product-bought_ goals.  \n_'buy-now-clicked_vwo_product-bought'_  \n  \n**Note:** This is required in case of track API only. If you aren't calling _track_ API, you can skip this parameter."
  },
  "cols": 3,
  "rows": 4,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


> 🚧 Note:
> 
> VWO SDK validates the _variationName_ and checks whether the variation exists in the campaign having the _campaignkey_ or not. If the variation is found, SDK will use without looking into the User Storage service. If the variation of not found, SDK will jump onto the process of checking whether the user is eligible for the campaign or not and returns accordingly from the SDK API.

Below is an example:

```json JSON
{
  userId: 'User ID',
  campaignKey: 'unique-campaign-key',
  variationName: 'Variation-1'
}
```

Please check the FAQ [Is User Storage Service synchronous or asynchronous?  
](https://developers.vwo.com/docs/is-user-storage-service-synchronous-or-asynchronous) - to know more about how to implement the asynchronous User Storage Service.