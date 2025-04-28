---
title: Identify Users
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
      slug: how-sdk-works
      title: How SDK Works
---
User Identifier, also abbreviated as User ID, is a way to uniquely identify a user. Since campaigns are directly associated with users, our SDK relies on the User ID which you have to provide us. User ID is simply a string. You can customize the User ID based on your business requirements.

You can use a client-side first-party cookie which will be available when any request to your server is made or device ID or use universal user identifier (UUID) to identify each user. But make sure, if you want a consistent behavior for a user, the same User ID should be provided each time. For example, a user comes on the website for the first time and you assigned a User ID as **f34c3d91-a66e-4389-92fb-595fa9874725** to that user. Using our SDK, let's assume the user got Variation-1. Now, if the same user comes back then our SDK assumes the same User ID for consistent behavior.

> 🚧 User IDs should be Unique
>
> Ensure User IDs are unique: User IDs must be unique for a campaign. VWO SDK relies on the User ID you provide for consistent behavior across platforms. VWO buckets users and provides test metrics based on the User IDs that you provide.

> ❗️ Anonymize User ID
>
> The User IDs you provide are sent to VWO servers without any modification. You are responsible for anonymizing any sensitive data provided in User ID in accordance with your company's policies.
