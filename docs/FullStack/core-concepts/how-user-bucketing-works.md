---
title: How User Bucketing Works
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
  pages:
    - type: basic
      slug: mutually-exclusive-groups
      title: Mutually Exclusive Groups
---
Every user is evaluated by the SDK for checking eligibility to become a part of a campaign. After the user is found eligible for the campaign, the bucketing system assigns a variation corresponding to the traffic distribution set of each variation in the VWO application.

So, *Bucketing* is the process of assigning different users to different variations of a campaign. This process depends on the User ID you provide. As long as the user ID is the same, SDK results in the same variation across platforms.

**How do variations traffic distribution ensure deterministic bucketing?**

We first allocate the bucketing range to each variation of a campaign, corresponding to the settings in the VWO application. The minimum value a variation can have is *1*, and the maximum value is *10,000*. These numbers are constant, being chosen precisely for carrying out the arithmetic logic behind bucketing variations.\
For example, a campaign having two variations, *Control* and *Variation-1*, having traffic distribution set to 40% and 60% respectively, will get ranges as follows:

| Variation Name | bucket Range   |
| :------------- | :------------- |
| Control        | 1 - 4,000      |
| Variation-1    | 4,001 – 10,000 |

With the help of a third-party hashing algorithm, [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash), we get a hash value corresponding to the User ID. The value is normalized and maps to the corresponding bucket range.

**Campaign eligibility decision**

While checking the eligibility of a user to become a part of a campaign, we know that the minimum value of the campaign percent traffic can be *0* and the maximum value can be *100*. Using this information, we normalize the hash value to the output and the integer value from 0 to 100. The normalized hash value and the campaign percent traffic value are compared with each other. If the normalized value is less than or equal to the campaign percent traffic, the user becomes a part of the campaign, otherwise, not.

**For example**, a campaign has percent traffic set to 40%. A user lands on the webpage, and a corresponding hash value is generated. Say, after normalizing, the value is 23. As 23 \<= 40, the user becomes a part of the campaign.

**Variation bucket assignment**

As explained above, each variation is allocated a bucket range based on the traffic distribution. Since we know that the maximum bucket range value can be 10000 whereas the minimum can be 1, we normalize the hash value corresponding to the User ID to output an integer value between 1 and 10000. The normalized hash value and each variation's bucket range are compared and the variation containing the normalized hash value in its bucket range is assigned.

**For example**, a campaign has two variations, *Control* and *Variation-1*, and traffic distribution is set to 40% and 60% respectively. A user lands on the webpage, and a corresponding hash value is generated. Say, after normalizing it, the value comes out to be *6278*. As *6278* lies in the range 4,001–10,000, the user will assign *Variation-1*.

## Ensuring Consistent User Bucketing

As mentioned above, the SDKs will only maintain consistent variation assignments if the campaign settings remain unchanged after running a campaign. In general, adding variations or changing traffic distribution will re-bucket existing users.\
To completely prevent variation reassignments, implement sticky bucketing with the help of User Storage Service implementation, which uses a caching layer to persist with User IDs to variation assignments.
