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
*User Storage Service (USS)* is a caching layer to persist data about your users. This is helpful in ensuring that variation assignments are always sticky even if you update the campaign settings.
For example, you can create an implementation that reads and saves user-campaign data mapping from backend services such as Redis, Memcache, MongoDB, or any other storage service.
[block:api-header]
{
  "title": "How to Implement User Storage Service"
}
[/block]
User Storage Service is optional while [instantiating](https://developers.vwo.com/reference#fullstack-sdk-instantiation) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing one.

User Storage Service should expose two methods: *get* and *set*.
[block:parameters]
{
  "data": {
    "h-0": "Method Name",
    "h-1": "Params",
    "h-2": "Description",
    "0-0": "get",
    "1-0": "set",
    "0-1": "userId, campaignKey",
    "h-3": "Returns",
    "0-2": "Retrieve stored data",
    "0-3": "Returns a matching user-campaign data mapping corresponding to User ID passed",
    "1-2": "Store user-campaign data mapping. It has information like user with User ID become part of a campaign having campaign-key as <*Campaign_Key*> and got the assigned variation <Variation_Name>.",
    "1-1": "campaignUserMap",
    "1-3": "Nothing."
  },
  "cols": 4,
  "rows": 2
}
[/block]
Check the following example to know more about how to implement your own User Storage Service.
[block:code]
{
  "codes": [
    {
      "code": "var vwoSDK = require('vwo-node-sdk');\n\nvar userStorageService = {};\n\n// Sync Implementation\nuserStorageService = {\n  get: function (userId, campaignKey) {\n    // Get stored user-campaign data mapping in the format sdk passed it to set method\n  },\n  set: function (campaignUserMap) {\n    // Save user-campaign data mapping\n  }\n};\n\n// Async Implementation\nuserStorageService = {\n  get: function (userId, campaignKey) {\n    // This method needs to be synchronous\n    // Get stored user-campaign data mapping in the format sdk passed it to set method\n    const storedData = db.query(userId, campaignKey);\n    // transform (storedData), if needed and\n    // return in same format just like campaignUserMap, the it was provided to set method\n    return { campaignKey: '', variationName: '', userId: ''  }; // stored data\n  },\n  set: async function (campaignUserMap) {\n    // Save user-campaign data mapping\n    // transform (campaignUserMap), if needed\n    await db.set(campaignUserMap);\n  }\n}\n\nvar vwoClientInstance = vwoSDK.launch({\n  settingsFile: settingsFile,\n  userStorageService: userStorageService \n});\n",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "// USER PROFILE SERVICE File - UserStorageService.php\n\n<?php\n\nrequire_once('vendor/autoload.php');\nuse vwo\\Storage\\UserStorageInterface;\n\nClass UserStorage implements UserStorageInterface{\n  /**\n   * @param $userId\n   * @param $campaignKey\n   * @return array\n   */\n  public function get($userId, $campaignKey){  \n    return [\n      'userId'=>$userId,\n      'campaignKey'=> $campaignKey,\n      'variationName'=>'Control'\n    ];\n  }\n\n  /**\n   * @param $campaignUserMap\n   * @return bool\n   */\n  public function set($campaignUserMap){\n    // Save into DB/any storage\n    return True;\n  }\n}\n?>\n\n// MAIN FILE\n\n<?php\n\nrequire_once('vendor/autoload.php');\nrequire_once('UserStorageService.php');\n\nuse vwo\\VWO;\n\n$config = [\n  'settingsFile'=> $settingsFile,\n  'userStorageService'=> new userStorage()\n];\n\n$vwoClientInstance = new VWO($config);\n",
      "language": "php"
    },
    {
      "code": "import vwo\nfrom vwo import logger\n\nclass user_storage_service(UserStorageService):\n  def get(self, user_id, campaign_test_key):\n    # ...code here for getting data\n    # return data\n\n  def set(self, campaign_user_map):\n    # ...code to persist data\n\nuss = user_storage_service()\n\nsettings_file = vwo.get_settings_file(account_id, sdk_key)\nvwo_client_instance = vwo.launch(settings_file, user_storage_service = uss)",
      "language": "python"
    },
    {
      "code": "using VWO.Sdk;\n\npublic class UserStorageService : IUserStorageService\n{\n    public UserStorageMap Get(string userId)\n    {\n        // ...code here for getting data\n        // return data\n    }\n\n    public void Set(UserStorageMap userStorageMap)\n    {\n        // ...code to persist data\n    }\n}\n\n\nvar settingsFile = VWO.GetSettingsFile(accountId, sdkKey);\n\n//  Provide UserProfileService instance while vwoClient Instantiation.\nvar vwoClient = VWO.CreateInstance(settingsFile, userProfileService: new UserProfileService());",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "import com.vwo.VWO;\n\nString settingsFile = VWO.getSettingsFile(accountId, sdkKey);\n\nStorage.User userStorage = return new Storage.User() {\n     @Override\n     public Map<String, String> get(String userId, String campaignKey) {\n        for (Map<String, String> savedCampaign: campaignStorageArray) {\n            if (savedCampaign.get(\"userId\").equals(userId) && savedCampaign.get(\"campaignKey\").equals(campaignKey)) {\n               return savedCampaign;\n            }\n        }\n        return null;\n     }\n    \n     @Override\n     public void set(Map<String, String> map){\n        campaignStorageArray.add(map);\n     }\n};\n\nVWO vwo = VWO.launch(settingsFile).withUserStorage(userStorage).build();",
      "language": "java"
    },
    {
      "code": "class VWO\n  # Abstract class encapsulating user storage service functionality.\n  # Override with your own implementation for storing\n  # And retrieving the user.\n\n  class UserStorage\n\n    # Abstract method, must be defined to fetch the\n    # User storage dict corresponding to the user_id.\n    #\n    # @param[String]        :user_id            ID for user that needs to be retrieved.\n    # @return[Hash]         :user_storage_obj   Object representing the user.\n    #\n    def get(user_id, campaign_key)\n      # example code to fetch it from DB column\n      JSON.parse(User.find_by(vwo_id: user_id).vwo_user)\n    end\n\n    # Abstract method, must be to defined to save\n    # The user dict sent to this method.\n    # @param[Hash]    :user_storage_obj     Object representing the user.\n    #\n    def set(user_data)\n        # example code to save it in DB\n        User.update_attributes(vwo_id: user_data.userId, vwo_user: JSON.generate(user_data))\n    end\n\tend\nend\n\n# Now use it to initiate VWO client instance\nvwo_client_instance = VWO.new(account_id, sdk_key, custom_logger, UserStorage.new)",
      "language": "ruby"
    },
    {
      "code": "import vwo \"github.com/wingify/vwo-go-sdk/\"\nimport \"github.com/wingify/vwo-go-sdk/pkg/api\"\nimport \"github.com/wingify/vwo-go-sdk/pkg/schema\"\n\n// declare UserStorage interface with the following Get & Set function signature\ntype UserStorage interface{\n    Get(userID, campaignKey string) UserData\n    Set(string, string, string)\n}\n\n// declare a UserStorageData struct to implement UserStorage interface\ntype UserStorageData struct{}\n\n// Get method to fetch user variation from storage\nfunc (us *UserStorageData) Get(userID, campaignKey string) schema.UserData {\n    //Example code showing how to get userData  from storage service\n    userData, ok := userDatas[campaignKey]\n    if ok {\n\t\tfor _, userdata := range userData {\n\t\t\tif userdata.UserID == userID {\n\t\t\t\treturn userdata\n\t\t\t}\n\t\t}\n    }\n    /*\n    // UserData  struct\n    type UserData struct {\n        UserID        string\n        CampaignKey   string\n        VariationName string\n    }\n    */\n\treturn schema.UserData{}\n}\n\n// Set method to save user variation to storage\nfunc (us *UserStorageData) Set(userID, campaignKey, variationName string) {\n    //Example code showing how to store userData in storage service\n    userdata := schema.UserData{\n\t\tUserID:        userID,\n\t\tCampaignKey:   campaignKey,\n\t\tVariationName: variationName,\n\t}\n\tflag := false\n\tuserData, ok := userDatas[userdata.CampaignKey]\n\tif ok {\n\t\tfor _, user := range userData {\n\t\t\tif user.UserID == userdata.UserID {\n\t\t\t\tflag = true\n\t\t\t}\n\t\t}\n\t\tif !flag {\n\t\t\tuserDatas[userdata.CampaignKey] = append(userDatas[userdata.CampaignKey], userdata)\n\t\t}\n\t} else {\n\t\tuserDatas[userdata.CampaignKey] = []schema.UserData{\n\t\t\tuserdata,\n\t\t}\n\t}\n}\n\nfunc main() {\n\tsettingsFile := vwo.GetSettingsFile(\"accountID\", \"SDKKey\")\n\t// create UserStorageData object\n\tstorage := &UserStorageData{}\n\n\tvwoClientInstance, err := vwo.Launch(settingsFile, api.WithStorage(storage))\n\tif err != nil {\n\t\t//handle err\n\t}\n}",
      "language": "go"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Format for the userStorageData"
}
[/block]
***userStorageData*** is a map where data is being stored with respect to a unique user ID and a unique campaign key.

Following keys are expected in the map:
[block:parameters]
{
  "data": {
    "0-0": "**userId** ",
    "1-0": "**campaignKey** ",
    "2-0": "**variationName** ",
    "0-1": "String",
    "1-1": "String",
    "2-1": "String",
    "0-2": "Unique User ID which was provided at the time of calling the SDK API.",
    "1-2": "Unique campaign key, provided at the time of campaign creation, and passed when calling the SDK API.",
    "2-2": "Variation Name that was assigned to the user having the User ID",
    "3-0": "**goalIdentifier** ",
    "3-1": "String",
    "3-2": "List of goals that has already been triggered for the campaign having *campaignKey* and for User ID, separated by a delimiter *_vwo_*.\nExample: Campaign having three goals but only two have been triggered since now i.e. *buy-now-clicked* and *product-bought* goals.\n*'buy-now-clicked_vwo_product-bought'* \n\n**Note:** This is required in case of track API only. If you aren't calling *track* API, you can skip this parameter."
  },
  "cols": 3,
  "rows": 4
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Note:",
  "body": "VWO SDK validates the *variationName* and checks whether the variation exists in the campaign having the *campaignkey* or not. If the variation is found, SDK will use without looking into the User Storage service. If the variation of not found, SDK will jump onto the process of checking whether the user is eligible for the campaign or not and returns accordingly from the SDK API."
}
[/block]
Below is an example:
[block:code]
{
  "codes": [
    {
      "code": "{\n  userId: 'User ID',\n  campaignKey: 'unique-campaign-key',\n  variationName: 'Variation-1'\n}",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "User Storage Service Asynchronous Behaviour",
  "body": "***get*** method needs to be synchronous as all SDK APIs are synchronous except *getSettingsFile* API.\nUsing asynchronous DB/Storage operations inside ***get*** method are not useful as, in any way, SDK needs to wait for the response so that the stored results could be used synchronously.\n\n***set*** method could be asynchronous as VWO SDK need not wait for any response from it.\n\n\nAlso, asynchronous behavior is limited to languages like Node.js, JavaScript, and Java as other languages do not natively support them in all the SDK supported versions."
}
[/block]
Please check the FAQ [Is User Storage Service synchronous or asynchronous?
](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous) - to know more about how to implement the asynchronous User Storage Service.