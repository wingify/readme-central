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

* The *activate* API is used, and the first action an SDK performs is parameter validation. If the parameters passed are not of the desired data type, the evaluation ends there. Otherwise, we proceed further.
* An SDK ensures it has the required *settings-file*, provided at the time of instantiation. It ensures that the campaign corresponding to the *campaign-key* is running.
* If provided, the SDK checks the User Storage Service implementation to determine whether a profile exists for this User ID. If it does, the stored variation is returned and then the evaluation stops. Otherwise, proceed to the next step.
* We use the [murmur3](https://en.wikipedia.org/wiki/MurmurHash) hashing algorithm for getting a unique hash for every new *userId*. That hash is used for examining the user's eligibility to become a part of the campaign. If the user becomes a part of the campaign, proceed to the next step. Otherwise, the evaluation stops. **Note:** For the same userId, the hash is always the same, and hence, consistent bucketing is ensured for a particular user per the userId provided.
* Each variation is allocated a definite range according to the traffic distribution set inside the VWO application. The same hash, mentioned in the previous step, is used to map the overall range (1–10,000) and assigns a variation corresponding to the normalized hash value.
* If provided, the SDK checks the User Storage Service implementation to save the User-Campaign data mapping.
* In addition to the above process, an impression event is built and sent to the VWO servers for tracking purposes and the results can be viewed in the VWO app reports. This is done for tracking different users.

<Image title="activate.jpeg" alt={817} align="center" src="https://files.readme.io/8888aa9-activate.jpeg">
  Activate API Flow
</Image>

**Get Variation Name API** 

The evaluation process is exactly the same as the *Activate API* mentioned above, except that it does not send an impression event to the VWO server.

<Image title="Decision.png" alt={1171} align="center" src="https://files.readme.io/7a53428-Decision.png">
  Get Variation Name API Flow
</Image>

**Track API** 

The evaluation process is exactly the same as *Activate API* mentioned above, except that it tracks conversions instead of users corresponding to the *goalIdentifier*.

<Image title="track.jpeg" alt={801} align="center" src="https://files.readme.io/555c749-track.jpeg">
  Track apI Flow
</Image>

**isFeatureEnabled API** 

* The *isFeatureEnabled* API is used, and the first action an SDK performs is parameter validation. If the parameters passed are not of the desired data type, the evaluation ends there. Otherwise, we proceed further.
* An SDK ensures it has the required *settings-file*, provided at the time of instantiation. It ensures that the campaign corresponding to the *test-key* is running.
* If provided, the SDK checks the User Storage Service implementation to determine whether a profile exists for this User ID. If it does, the stored variation is returned and then the evaluation stops. Otherwise, proceed to the next step.
* We use the [murmur3](https://en.wikipedia.org/wiki/MurmurHash) hashing algorithm for getting a unique hash for every new *userId*. That hash is used for examining the user's eligibility to become a part of the campaign. If the user becomes a part of the campaign, proceed to the next step. Otherwise, the evaluation stops. **Note:** For the same userId, the hash is always the same, and hence, consistent bucketing is ensured for a particular user per the userId provided.
* If provided, the SDK checks the User Storage Service implementation to save the User-Campaign data mapping.
* If the variation is returned, and the campaign is of feature-rollout type, return true.\
  If the variation is returned, and the campaign is of feature-test type, check the feature toggle flag for that variation and return accordingly.
* In addition to the above process, an impression event is built and sent to the VWO servers for tracking purposes and results can be viewed in the VWO app reports. This is done for tracking different users.

**For Feature Rollout**

<Image title="isFeatureEnabled.jpeg" alt={806} align="center" src="https://files.readme.io/90a9b5d-isFeatureEnabled.jpeg">
  Is Feature Enabled API Flow
</Image>

**For Feature Test** 

<Image title="isFeatureEnabledFT.jpeg" alt={822} align="center" src="https://files.readme.io/f2f954c-isFeatureEnabledFT.jpeg">
  Is Feature Enabled API Flow
</Image>

**getFeatureVariableValue API** 

The evaluation process is exactly the same as *isFeatureEnabled API* mentioned above, except that it returns the feature variable's value and does not make any impression call.

* If the variation is returned, and the campaign is of feature-rollout type, return feature variable value.
* If the variation is returned, and the campaign is of feature-test type, check the feature toggle flag for that variation.\
  If the flag is true, return the feature variable value of that *variation*. Otherwise, return the feature variable value of *Control*.

**For Feature Rollout**

<Image title="GetFeatureVariableValue.jpeg" alt={806} align="center" src="https://files.readme.io/ec78afb-GetFeatureVariableValue.jpeg">
  Get Feature Variable Value API Flow
</Image>

**For Feature Test**

<Image title="GetFeatureVariableValueFT.jpeg" alt={822} align="center" src="https://files.readme.io/db02a9f-GetFeatureVariableValueFT.jpeg">
  Get Feature Variable Value API Flow
</Image>
