---
title: Update a project
excerpt: ''
api:
  file: api.json
  operationId: update-a-project
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Request URL for Workspace

```
PATCH /accounts/account_id/projects/project_id
```

Request Format

```json
{
    "name": "projectOne",
    "languages": [
        "DOTNET",
        "RUBY",
        "GO",
        "JAVASCRIPT"
    ],
    "environments": [
        {
            "id": 1,
            "name": "Env1",
            "isEnabled": false
        },
        {
            "id": 2,
            "name": "Env45",
            "isEnabled": true
        }
    ]
}
```

Update a project
