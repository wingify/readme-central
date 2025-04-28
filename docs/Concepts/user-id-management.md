---
title: Identifying Users (User ID)
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
A **User Identifier (User ID)** is a unique string used to identify individual users. Since campaigns are directly associated with users, our SDK relies on the User ID you provide. The User ID can be customized based on your business requirements.  

### **Generating a User ID**

You can generate a User ID using various methods, such as:  

- A client-side first-party cookie, which persists across requests to your server  
- A device ID unique to the user's device  
- A universal user identifier (**UUID**)  

### **Ensuring Consistent Behavior**

To maintain consistent behavior for a user across sessions, ensure that the same User ID is provided each time.  

#### **Example:**

A user visits your website for the first time, and you assign them the User ID **f34c3d91-a66e-4389-92fb-595fa9874725**. The SDK assigns this user to **Variation-1**. If the user returns later, the SDK will recognize the same User ID and ensure they receive the same variation, maintaining consistency in their experience.

> 🚧 User IDs should be Unique
> 
> Ensure User IDs are unique: User IDs must be unique for a campaign. VWO SDK relies on the User ID you provide for consistent behavior across platforms. VWO buckets users and provides test metrics based on the User IDs that you provide.

> ❗️ Anonymization of User ID
> 
> The User IDs you provide are anonymized by our SDKs into a UUID before being sent to VWO servers.