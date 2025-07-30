---
title: Create a attributes list
api:
  file: api.json
  operationId: post_accounts{account_id}attribute-list
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  robots: index
---
Creates a new attributes list by uploading one-column CSV-style values in the request body.

These list attributes can later be used for audience targeting in VWO campaigns.

### Constraints

* Max request body size: **15MB**
* Max attribute name length: **25 characters**
* Max attribute description length: **50 characters**

> 📘 **Note:**
>
> * The request body must contain **one value per line**, with a maximum body size of **15 MB**.
> * Updates via this API are processed immediately on the backend. However, list-based matching in campaigns is refreshed **once daily** at the time the list was originally created.\
>   *For example: If a list was created at 3 PM, any new values added later will only be matched starting 3 PM the next day.*
>
> ⚠️ **Do not include Personally Identifiable Information (PII)** such as email addresses, phone numbers, or full names in the list.
>
> Instead, use a hashed value or an anonymized identifier that:
>
> * Can be accessed from the browser (e.g., via cookies or local storage) for **client-side targeting**
> * Is available in your server logic (e.g., user ID or hashed email) for **server-side targeting**
>
> Using a consistent, non-PII identifier ensures safe and reliable matching across client and backend integrations.

```Text Request Body
user_1
user_2
user_3
```