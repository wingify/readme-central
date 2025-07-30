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

### Important Note

When you push data via the API, it will be updated on our side. However, the list used to match records is refreshed daily, and the updated data will become available at the same time the list was originally created. For example, if your list was created at 3 PM, any data added later will only be available for matching after 3 PM the following day.