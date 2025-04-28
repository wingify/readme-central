---
title: How User Bucketing Works
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
### **Campaign Eligibility and Bucketing Process**

The SDK evaluates every user to determine their eligibility for participating in a campaign. Once a user is deemed eligible, the bucketing system assigns them a variation based on the traffic distribution settings configured in the VWO application.  

**Bucketing** refers to assigning users to different variations within a campaign. This assignment is based on the provided User ID. As long as the User ID remains consistent, the SDK ensures that the user is assigned the same variation across different platforms.  

### **How Does Traffic Distribution Ensure Deterministic Bucketing?**

The bucketing system operates by allocating a specific range to each variation based on the campaign’s traffic distribution settings. The minimum possible bucket value is **1**, while the maximum is **10,000**. These values are fixed to support the arithmetic logic used in the bucketing process.  

For example, consider a campaign with two variations—*Control* and *Variation-1*—with a traffic distribution of 40% and 60%, respectively. The allocated bucket ranges will be:  

| **Variation Name** | **Bucket Range** |
| ------------------ | ---------------- |
| Control            | 1 - 4,000        |
| Variation-1        | 4,001 - 10,000   |

A third-party hashing algorithm, [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash), generates a hash value corresponding to the User ID. This hash value is then normalized and mapped to the appropriate bucket range.  

### **Determining Campaign Eligibility**

To determine whether a user qualifies for a campaign, the system considers the campaign’s percent traffic setting, which ranges from **0% to 100%**. The user’s hash value is normalized to generate an integer between **0 and 100**, which is then compared against the campaign’s percent traffic value.  

* If the normalized hash value is **less than or equal to** the campaign’s percent traffic, the user is included in the campaign.  
* Otherwise, the user is excluded.  

#### **Example:**

If a campaign’s percent traffic is set to **40%** and a user generates a normalized hash value of **23**, the user qualifies for the campaign since **23 ≤ 40**.  

### **Assigning Users to Variations**

Once a user is deemed eligible, they are assigned a variation based on the pre-defined bucket ranges. Since the bucket range is always between **1 and 10,000**, the normalized hash value corresponding to the User ID is mapped to an integer within this range. The system then assigns the user to the variation that contains this value.  

#### **Example:**

A campaign has two variations, *Control* (40%) and *Variation-1* (60%). A user lands on the webpage, and their hash value is generated. After normalization, the value is **6,278**. Since **6,278** falls within the range **4,001–10,000**, the user is assigned to **Variation-1**.

## Ensuring Consistent User Bucketing

As mentioned earlier, the SDKs maintain consistent variation assignments only if the campaign settings remain unchanged after the campaign has started. Any modifications, such as adding new variations or altering traffic distribution, will result in the re-bucketing of existing users.  

To fully prevent variation reassignments, implement **sticky bucketing** using the **Storage Service**. This approach leverages a caching layer to persist User ID-to-variation assignments, ensuring consistency even if campaign settings change.
