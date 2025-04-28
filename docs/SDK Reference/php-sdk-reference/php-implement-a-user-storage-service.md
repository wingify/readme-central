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

User Storage Service is optional while [instantiating](https://developers.vwo.com/docs/php-launch) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing one.

User Storage Service should expose two methods: _get_ and _set_.

| Method Name | Params              | Description                                                                                                                                                                                      | Returns                                                                       |
| :---------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| get         | userId, campaignKey | Retrieve stored data                                                                                                                                                                             | Returns a matching user-campaign data mapping corresponding to User ID passed |
| set         | campaignUserMap     | Store user-campaign data mapping. It has information like user with User ID become part of a campaign having campaign-key as \<_Campaign_Key_> and got the assigned variation \<Variation_Name>. | Nothing.                                                                      |

Check the following example to know more about how to implement your own User Storage Service.

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