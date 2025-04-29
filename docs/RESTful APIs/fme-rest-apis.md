---
title: REST APIs
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
VWO’s Feature Management and Experimentation (FME) APIs allow developers to programmatically manage feature flags and their rules programmatically, enabling seamless integration into development and deployment workflows.

## API Operations

| Name                                          | Method | Description                                                                         |
| --------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| **Feature Flag APIs**                         |        |                                                                                     |
| Get All Feature Flags of a Workspace          | GET    | Retrieve all feature flags configured within a workspace.                           |
| Get Details of a Specific Feature Flag        | GET    | Fetch detailed information about a specific feature flag using its ID.              |
| Create a Feature Flag                         | POST   | Create a new feature flag by specifying its name, key, and other configurations.    |
| Update a Feature Flag                         | PATCH  | Modify the name, description, tags, or key of an existing feature flag.             |
| Feature Flag Resource Representation          | –      | Understand the structure and fields of the feature flag object.                     |
| **Feature Flag Rules APIs**                   |        |                                                                                     |
| Get Feature Flag Projects and Environments    | GET    | Fetch the list of projects and environments a flag is assigned to.                  |
| Get All Feature Flag Rules                    | GET    | List all rules configured for a given feature flag.                                 |
| Get Details of a Specific Feature Flag Rule   | GET    | Get full configuration details for a specific rule of a feature flag.               |
| Create a Feature Flag Rule                    | POST   | Create a new rule for a feature flag with targeting conditions and rollout type.    |
| Update a Feature Flag Rule                    | PATCH  | Update an existing rule to modify its audience conditions, variations, or strategy. |
| Toggle Feature Flag Rule Status               | PATCH  | Enable or disable a specific rule without deleting it.                              |
| Toggle Feature Flag Status for an Environment | PATCH  | Enable or disable a feature flag for a specific environment.                        |
| Delete a Feature Flag Rule                    | DELETE | Permanently delete a rule from a feature flag.                                      |
| Feature Flag Rule Resource Representation     | –      | View the structure of the rule object and its configurable fields.                  |

## Feature Flag Operations

### Get All Feature Flags of a Workspace

Retrieve all feature flags configured within a workspace.\
**Detailed documentation →** [here](https://developers.vwo.com/reference/fme-get-all-feature-flags-of-a-workspace)

***

### Get Details of a Specific Feature Flag

Fetch detailed information about a specific feature flag using its ID.\
**Detailed documentation →** [here](https://developers.vwo.com/v2/reference/fme-get-details-of-a-specific-feature-flag)

***

### Create a Feature Flag

Create a new feature flag by specifying its name, key, and other configurations.\
**Detailed documentation →** [here](https://developers.vwo.com/v2/reference/fme-create-a-feature-flag)

***

### Update a Feature Flag

Modify the name, description, tags, or key of an existing feature flag.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-update-a-feature-flag)

***

### Feature Flag Resource Representation

Understand the structure and fields of the feature flag object.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-feature-flag-resource-representation)

***

### Feature Flag Rules Overview

A general conceptual overview of rules that can be applied to feature flags.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-feature-flags-rules)

***

## Feature Flag Rules Operations

### Get Feature Flag Projects and Environments

Fetch the list of projects and environments a flag is assigned to.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-get-feature-flag-projects-and-environments)

***

### Get All Feature Flag Rules

List all rules configured for a given feature flag.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-get-all-feature-flags-rules)

***

### Get Details of a Specific Feature Flag Rule

Get full configuration details for a specific rule of a feature flag.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-get-details-of-a-specific-feature-flag-rule)

***

### Create a Feature Flag Rule

Create a new rule for a feature flag with targeting conditions and rollout type.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-create-a-feature-flag-rule)

***

### Update a Feature Flag Rule

Update an existing rule to modify its audience conditions, variations, or strategy.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-update-a-feature-flag-rule)

***

### Toggle Feature Flag Rule Status

Enable or disable a specific rule without deleting it.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-toggle-feature-flag-rule-status)

***

### Toggle Feature Flag Status for an Environment

Enable or disable a feature flag for a specific environment.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-toggle-feature-flag-status-for-an-environment)

***

### Delete a Feature Flag Rule

Permanently delete a rule from a feature flag.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-delete-a-feature-flag-rule)

***

### Feature Flag Rule Resource Representation

View the structure of the rule object and its configurable fields.\
**Detailed documentation →** [here](https://developers.vwo.com/v4/reference/fme-feature-flag-rules-resource-representation)