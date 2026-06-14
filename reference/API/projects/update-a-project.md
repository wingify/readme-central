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

Request Payload Schema Format

```json
{
    "name": "Project Name",
    "languages": [
        "NODEJS",
        "PYTHON",
        "PHP",
        "JAVA", 
        "DOTNET",
        "RUBY",
        "GO",
        "JAVASCRIPT"
    ],
    "environments": [
        {
            "id": 1,
            "name": "Staging",
            "isEnabled": true
        },
        {
            "id": 2,
            "name": "Production",
            "isEnabled": false
        }
    ]
}
```

### Key Rules

* All fields (`name`, `languages`, `environments`) are mandatory in the payload.
* Partial updates are not supported. You must always send the full updated state of the project.
* Environments behave like a full replacement. Any environment not included in the payload will be considered deleted.
* New environments are created when an `ID` is passed that does not match the existing ones.
* The `isEnabled` flag in environments is used to indicate the default or active environment. It does not affect existence.

### Example Use Cases

1. **No Change Update**\
   If you’re not changing anything but still calling the update API, you must send all current values to avoid unintentional data loss.
   ```json
   {
     "name": "Acme Project",
     "languages": ["DOTNET", "RUBY"],
     "environments": [
       {
         "id": 1,
         "name": "Staging",
         "isEnabled": true
       },
       {
         "id": 2,
         "name": "Production",
         "isEnabled": false
       }
     ]
   }
   ```
   If you only passed `"GO"` in the list, it would replace the entire language list, removing `"DOTNET"` and `"RUBY"`.
2. **Add a New Language**\
   If the project currently has `["DOTNET", "RUBY"]` and you want to add `"GO"`, you must provide all languages:
   ```json
   {
     "name": "Acme Project",
     "languages": ["DOTNET", "RUBY", "GO"],
     "environments": [
       {
         "id": 1,
         "name": "Staging",
         "isEnabled": true
       },
       {
         "id": 2,
         "name": "Production",
         "isEnabled": false
       }
     ]
   }
   ```
3. **Remove an Environment**\
   To remove an environment (e.g., `Production`), simply omit it from the list:
   ```json
   {
     "name": "Acme Project",
     "languages": ["DOTNET", "RUBY"],
     "environments": [
       {
         "id": 1,
         "name": "Staging",
         "isEnabled": true
       }
     ]
   }
   ```
   This would delete the `Production` environment.
4. **Replace an Environment**\
   To replace an environment, pass an environment object with a new ID. The system will delete the old one and create the new one.
   ```json
   {
     "name": "Acme Project",
     "languages": ["DOTNET", "RUBY"],
     "environments": [
       {
         "id": 1,
         "name": "Staging",
         "isEnabled": false
       },
       {
         "id": 3,
         "name": "Testing",
         "isEnabled": true
       }
     ]
   }
   ```
   In this case, the environment with `id: 2 (Production)` will be deleted, and a new one `(id: 3, Testing)` will be added.

> 🚧 Notes
>
> * Always pass the complete current state of the`name`, `languages` and `environments` lists.
> * Omitting an environment or language will remove it permanently.
> * `isEnabled` only affects whether an environment is considered the *default* one and does not impact its presence in the system.