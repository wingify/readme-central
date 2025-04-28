---
title: Core Concepts
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
## Identify Users

User Identifier, also abbreviated as User ID,  is a way to uniquely identify a user. Since campaigns are directly associated with users, our SDK relies on User ID which you have to provide us. User ID is simply a string. You can customize the User ID based on your business requirements. 

You can use a client-side first-party cookie which will be available when any request to your server is made or device ID or use universal user identifier (UUID) to identify each user. But make sure, if you want a consistent behavior for a user, the same User ID should be provided each time. For example, a user comes on the website for the first time and you assigned a User ID as ***f34c3d91-a66e-4389-92fb-595fa9874725*** to that user. Using our SDK, let's assume the user got *Variation-1*. Now, if the same user comes back then our SDK assumes the same User ID for consistent behavior.

> 🚧 User IDs should be Unique
>
> Ensure User IDs are unique: User IDs must be unique for a campaign. VWO SDK relies on User ID you provide for consistent behavior across platforms. VWO buckets users and provides test metrics based on the User IDs that you provide.

> ❗️ Anonymize User ID
>
> The *User IDs* you provide are sent to VWO servers without any modification. You are responsible for anonymizing any sensitive data provided in User ID in accordance with your company's policies.

## How VWO FullStack SDKs Work End-to-End

Assuming that you have successfully [installed](https://developers.vwo.com/reference#fullstack-sdk-installation) VWO SDK and [instantiated](https://developers.vwo.com/reference#fullstack-sdk-instantiation) it with the [settingsFIle](https://developers.vwo.com/reference#fullstack-get-settings), the following process gets executed depending on the API used:

**[Activate](https://developers.vwo.com/reference#fullstack-sdk-activate) API** 

* The *activate* API is used, and the first action an SDK performs is parameter validation. If the parameters passed are not of the desired data-type, the evaluation ends there. Otherwise, we proceed further.
* An SDK ensures it has the required *settings-file*, provided at the time of [instantiation](https://developers.vwo.com/reference#fullstack-sdk-instantiation). It ensures that the campaign corresponding to the *test-key* is running.
* If provided, the SDK checks the [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) implementation to determine whether a profile exists for this User ID. If it does, the stored variation is returned and then the evaluation stops. Otherwise, proceed to the next step.
* We use the [murmur3](https://en.wikipedia.org/wiki/MurmurHash) hashing algorithm for getting a unique hash for every new *userId*. That hash is used for examining the user's eligibility to become a part of the campaign. If the user becomes a part of the campaign, proceed to the next step. Otherwise, the evaluation stops. **Note:** For the same userId, the hash is always the same, and hence, consistent bucketing is ensured for a particular user per the userId provided.
* Each variation is allocated a definite range according to the traffic distribution set inside the VWO application. The same hash, mentioned in the previous step, is used to map the overall range (1–10,000) and assigns a variation corresponding to the normalized hash value.
* If provided, the SDK checks the [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) implementation to save the User-Campaign data mapping.
* In addition to the above process, an impression event is built and sent to the VWO servers for tracking purposes and the results can be viewed in the VWO app reports. This is done for tracking different users.

<Image title="activate.jpg" alt={817} src="https://files.readme.io/da0fbab-activate.jpg">
  Activate API Flow
</Image>

**[Get Variation Name](https://developers.vwo.com/reference#fullstack-sdk-get-variation) API** 

<Image title="getVariation.jpg" alt={824} width="100%" src="https://files.readme.io/34380ce-getVariation.jpg">
  GetVariation API Flow
</Image>

The evaluation process is exactly the same as the *Activate API* mentioned above, except that it does not send an impression event to the VWO server. Check how to manage [activate](https://developers.vwo.com/reference#fullstack-sdk-activate) and [getVariationName](https://developers.vwo.com/reference#fullstack-sdk-get-variation) API.

**[Track](https://developers.vwo.com/reference#fullstack-sdk-track) API** 

The evaluation process is exactly the same as *Activate API* mentioned above, except that it tracks conversions instead of visitors corresponding to the *goalIdentifier*.

<Image title="track.jpg" alt={801} src="https://files.readme.io/a6075bf-track.jpg">
  Track API Flow
</Image>

**[isFeatureEnabled](https://developers.vwo.com/reference#fullstack-sdk-is-feature-enabled) API** 

* The *isFeatureEnabled* API is used, and the first action an SDK performs is parameter validation. If the parameters passed are not of the desired data-type, the evaluation ends there. Otherwise, we proceed further.
* An SDK ensures it has the required *settings-file*, provided at the time of [instantiation](https://developers.vwo.com/reference#fullstack-sdk-instantiation). It ensures that the campaign corresponding to the *test-key* is running.
* If provided, the SDK checks the [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) implementation to determine whether a profile exists for this User ID. If it does, the stored variation is returned and then the evaluation stops. Otherwise, proceed to the next step.
* We use the [murmur3](https://en.wikipedia.org/wiki/MurmurHash) hashing algorithm for getting a unique hash for every new *userId*. That hash is used for examining the user's eligibility to become a part of the campaign. If the user becomes a part of the campaign, proceed to the next step. Otherwise, the evaluation stops. **Note:** For the same userId, the hash is always the same, and hence, consistent bucketing is ensured for a particular user per the userId provided.
* If provided, the SDK checks the [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) implementation to save the User-Campaign data mapping.
* If the variation is returned, and the campaign is of feature-rollout type, return true.\
  If the variation is returned, and the campaign is of feature-test type, check the feature toggle flag for that variation and return accordingly.
* In addition to the above process, an impression event is built and sent to the VWO servers for tracking purposes and results can be viewed in the VWO app reports. This is done for tracking different users.

**For Feature Rollout**

<Image title="isFeatureEnabled-Feature_rollout.jpg" alt={806} src="https://files.readme.io/7be0cca-isFeatureEnabled-Feature_rollout.jpg">
  isFeatureEnabled - Feature Rollout Flow
</Image>

**For Feature Test** 

<Image title="isFeatureEnabled-Feature_Test.jpg" alt={822} src="https://files.readme.io/6a4b7a3-isFeatureEnabled-Feature_Test.jpg">
  isFeatureEnabled - Feature Test Flow
</Image>

**[getFeatureVariableValue](https://developers.vwo.com/reference#fullstack-get-feature-variable-value) API** 

The evaluation process is exactly the same as *isFeatureEnabled API* mentioned above, except that it returns whether the feature variable's value and does not make any impression call.

* If the variation is returned, and the campaign is of feature-rollout type, return feature variable value.
* If the variation is returned, and the campaign is of feature-test type, check the feature toggle flag for that variation.\
  If the flag is true, return the feature variable value of that *variation*. Otherwise, return the feature variable value of *Control*.

**For Feature Rollout**

<Image title="getFeatureVariableValue-Feature_Rollout.jpg" alt={806} src="https://files.readme.io/a392c94-getFeatureVariableValue-Feature_Rollout.jpg">
  getFeatureVariableValue - Feature Rollout Flow
</Image>

**For Feature Test**

<Image title="getFeatureVariableValue-Feature_Test .jpg" alt={822} src="https://files.readme.io/eacb094-getFeatureVariableValue-Feature_Test_.jpg">
  getFeatureVariableValue - Feature Test Flow
</Image>

## How Bucketing Works

Every user is evaluated by the SDK for checking eligibility to become a part of a campaign. After the user is found eligible for the campaign, the bucketing system assigns a variation corresponding to the traffic distribution set of each variation in the VWO application.

So, *Bucketing* is the process of assigning different users to different variations of a campaign. This process depends on the User ID you provide. As long as the User ID is the same, SDK results in the same variation across platforms.

**How do variations traffic distribution ensure deterministic bucketing?**

We first allocate the bucketing range to each variation of a campaign, corresponding to the settings in the VWO application. The minimum value a variation can have is *1*, and the maximum value is *10,000*. These numbers are constant, being chosen precisely for carrying out the arithmetic logic behind bucketing variations.\
For example, a campaign having two variations, *Control* and *Variation-1*, having traffic distribution set to 40% and 60% respectively, will get ranges as follows:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Variation Name
      </th>

      <th>
        Bucket Range
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Control
      </td>

      <td>
        1–4,000
      </td>
    </tr>

    <tr>
      <td>
        Variation-1
      </td>

      <td>
        4,001–10,000
      </td>
    </tr>
  </tbody>
</Table>

With the help of a third-party hashing algorithm, [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash), we get a hash value corresponding to the User ID. The value is normalized and maps to the corresponding bucket range.

**Campaign eligibility decision**

While checking the eligibility of a user to become a part of a campaign, we know that the minimum value of the campaign percent-traffic can be *0* and the maximum value can be *100*. Using this information, we normalize the hash value to the output and the integer value from 0 to 100. The normalized hash value and the campaign percent-traffic value are compared with each other. If the normalized value is less than or equal to the campaign percent-traffic, the user becomes a part of the campaign, otherwise, not.

**For example**, a campaign has percent-traffic set to 40%. A user lands on the webpage, and a corresponding hash value is generated. Say, after normalizing, the value is 23. As 23 \<= 40, the user becomes a part of the campaign.

**Variation bucket assignment**

As explained above, each variation is allocated a bucket range based on the traffic-distribution. Since we know that the maximum bucket range value can be 10000 whereas the minimum can be 1, we normalize the hash value corresponding to the User ID to output an integer value between 1 and 10000. The normalized hash value and each variation's bucket range are compared and the variation containing the normalized hash value in its bucket range is assigned.

**For example**, a campaign has two variations, *Control* and *Variation-1*, and traffic distribution is set to 40% and 60% respectively. A user lands on the webpage, and a corresponding hash value is generated. Say, after normalizing it, the value comes out to be *6278*. As *6278* lies in the range 4,001–10,000, the user will assign *Variation-1*.

## Ensuring Consistent Visitor Bucketing

As mentioned above, the SDKs will only maintain consistent variation assignments if the campaign settings remain unchanged after running a campaign. In general, adding variations or changing traffic distribution will re-bucket existing users.\
To completely prevent variation reassignments, implement sticky bucketing with the help of [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) implementation, which uses a caching layer to persist with User IDs to variation assignments.
