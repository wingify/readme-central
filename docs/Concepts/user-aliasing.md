---
title: 'User Aliasing '
deprecated: false
hidden: true
metadata:
  robots: index
---
User aliasing allows you to associate two different user identifiers so your experimentation and personalization systems can treat them as the same user. This is especially useful when a user transitions from an anonymous ID to a logged-in ID.

Once an alias is created, all future lookups and evaluations can reference a unified identity.

### Prerequisites

To use user aliasing, the following must be configured in your SDK setup:

* **Aliasing must be enabled** via a configuration flag (e.g., `isAliasingEnabled: true`)
* **Gateway service must be configured**, since alias updates are sent through an API call

<br />
