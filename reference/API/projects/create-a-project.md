---
title: Create a Project
excerpt: ''
api:
  file: api.json
  operationId: create-a-project
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Request URI for Sub Account

```
POST /accounts/account_id/projects
```

Request Format

```json
{
    "name": "Project One",
    "languages": [
        "NODEJS",
        "PYTHON"
    ],
    "environments": [
        {
            "name": "Env1",
            "isEnabled": true
        },
        {
            "name": "Env2"
        }
    ],
    "type": "project"
}
```