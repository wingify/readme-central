---
title: Overview
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
  pages:
    - type: link
      title: How User Bucketing works
      url: https://developers.vwo.com/docs/how-user-bucketing-works
---
Assuming that you have successfully [installed VWO SDK and instantiated](https://developers.vwo.com/docs/sdk-quickstart) it with the settings-fIle, the following process gets executed depending on the API used:

**Activate API** 

- The _activate_ API is used, and the first action an SDK performs is parameter validation. If the parameters passed are not of the desired data type, the evaluation ends there. Otherwise, we proceed further.
- An SDK ensures it has the required _settings-file_, provided at the time of instantiation. It ensures that the campaign corresponding to the _campaign-key_ is running.
- If provided, the SDK checks the User Storage Service implementation to determine whether a profile exists for this User ID. If it does, the stored variation is returned and then the evaluation stops. Otherwise, proceed to the next step.
- We use the [murmur3](https://en.wikipedia.org/wiki/MurmurHash) hashing algorithm for getting a unique hash for every new _userId_. That hash is used for examining the user's eligibility to become a part of the campaign. If the user becomes a part of the campaign, proceed to the next step. Otherwise, the evaluation stops. **Note:** For the same userId, the hash is always the same, and hence, consistent bucketing is ensured for a particular user per the userId provided.
- Each variation is allocated a definite range according to the traffic distribution set inside the VWO application. The same hash, mentioned in the previous step, is used to map the overall range (1–10,000) and assigns a variation corresponding to the normalized hash value.
- If provided, the SDK checks the User Storage Service implementation to save the User-Campaign data mapping.
- In addition to the above process, an impression event is built and sent to the VWO servers for tracking purposes and the results can be viewed in the VWO app reports. This is done for tracking different users.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8888aa9-activate.jpeg",
        "activate.jpeg",
        817
      ],
      "align": "center",
      "caption": "Activate API Flow"
    }
  ]
}
[/block]


**Get Variation Name API** 

The evaluation process is exactly the same as the _Activate API_ mentioned above, except that it does not send an impression event to the VWO server.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7a53428-Decision.png",
        "Decision.png",
        1171
      ],
      "align": "center",
      "caption": "Get Variation Name API Flow"
    }
  ]
}
[/block]


**Track API** 

The evaluation process is exactly the same as _Activate API_ mentioned above, except that it tracks conversions instead of users corresponding to the _goalIdentifier_.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/555c749-track.jpeg",
        "track.jpeg",
        801
      ],
      "align": "center",
      "caption": "Track apI Flow"
    }
  ]
}
[/block]


**isFeatureEnabled API** 

- The _isFeatureEnabled_ API is used, and the first action an SDK performs is parameter validation. If the parameters passed are not of the desired data type, the evaluation ends there. Otherwise, we proceed further.
- An SDK ensures it has the required _settings-file_, provided at the time of instantiation. It ensures that the campaign corresponding to the _test-key_ is running.
- If provided, the SDK checks the User Storage Service implementation to determine whether a profile exists for this User ID. If it does, the stored variation is returned and then the evaluation stops. Otherwise, proceed to the next step.
- We use the [murmur3](https://en.wikipedia.org/wiki/MurmurHash) hashing algorithm for getting a unique hash for every new _userId_. That hash is used for examining the user's eligibility to become a part of the campaign. If the user becomes a part of the campaign, proceed to the next step. Otherwise, the evaluation stops. **Note:** For the same userId, the hash is always the same, and hence, consistent bucketing is ensured for a particular user per the userId provided.
- If provided, the SDK checks the User Storage Service implementation to save the User-Campaign data mapping.
- If the variation is returned, and the campaign is of feature-rollout type, return true.  
  If the variation is returned, and the campaign is of feature-test type, check the feature toggle flag for that variation and return accordingly.
- In addition to the above process, an impression event is built and sent to the VWO servers for tracking purposes and results can be viewed in the VWO app reports. This is done for tracking different users.

**For Feature Rollout**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/90a9b5d-isFeatureEnabled.jpeg",
        "isFeatureEnabled.jpeg",
        806
      ],
      "align": "center",
      "caption": "Is Feature Enabled API Flow"
    }
  ]
}
[/block]


**For Feature Test** 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f2f954c-isFeatureEnabledFT.jpeg",
        "isFeatureEnabledFT.jpeg",
        822
      ],
      "align": "center",
      "caption": "Is Feature Enabled API Flow"
    }
  ]
}
[/block]


**getFeatureVariableValue API** 

The evaluation process is exactly the same as _isFeatureEnabled API_ mentioned above, except that it returns the feature variable's value and does not make any impression call.

- If the variation is returned, and the campaign is of feature-rollout type, return feature variable value.
- If the variation is returned, and the campaign is of feature-test type, check the feature toggle flag for that variation.  
  If the flag is true, return the feature variable value of that _variation_. Otherwise, return the feature variable value of _Control_.

**For Feature Rollout**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ec78afb-GetFeatureVariableValue.jpeg",
        "GetFeatureVariableValue.jpeg",
        806
      ],
      "align": "center",
      "caption": "Get Feature Variable Value API Flow"
    }
  ]
}
[/block]


**For Feature Test**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/db02a9f-GetFeatureVariableValueFT.jpeg",
        "GetFeatureVariableValueFT.jpeg",
        822
      ],
      "align": "center",
      "caption": "Get Feature Variable Value API Flow"
    }
  ]
}
[/block]