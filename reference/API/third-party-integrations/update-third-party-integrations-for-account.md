---
api:
  file: api.json
  operationId: update-third-party-integrations-for-account
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
Request URI for Sub Account

```
PATCH /accounts/1/integrations
```

<br />

This API endpoint allows you to delete a specific integration connection configured for an account.

Use this endpoint when:

* an integration is no longer required
* a connector needs to be disconnected
* integration credentials need to be revoked
* cleanup of unused integrations is required

The endpoint removes the integration connection associated with the provided `connection_id` under the specified account.
