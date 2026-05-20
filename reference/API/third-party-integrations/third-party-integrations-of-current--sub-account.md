---
excerpt: ''
api:
  file: api.json
  operationId: third-party-integrations-of-current--sub-account
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Request URI

```
GET /accounts/:account_id/integrations
```

This API endpoint allows you to fetch all integration connections configured for a workspace or account.

Use this endpoint when:

* retrieving all connected third-party integrations for an account
* validating existing integration configurations
* displaying connected integrations in an admin dashboard
* auditing or managing workspace integrations

The endpoint returns the list of integrations associated with the provided `account_id`, including their configuration details and connection metadata.