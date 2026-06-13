---
title: Identifying Users (User ID)
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
A **User Identifier (User ID)** is a unique string used to identify an individual user within your system. Since campaigns and feature evaluations are directly associated with users, Wingify SDKs rely on the **User ID you provide** to ensure deterministic bucketing and consistent experience delivery.

The structure and generation of the User ID are fully customizable based on your business requirements.

***

### Generating a User ID

You can generate a User ID using various strategies, such as:

* A **client-side first-party cookie** that persists across server requests
* A **device identifier** unique to the user’s device
* A **universally unique identifier (UUID)** generated within your system

The only requirement is that the identifier remains **stable and unique per user**.

<br />

### Ensuring Consistent Behavior

To maintain consistent experiment behavior across sessions, the **same User ID must be supplied on every evaluation request**.

Example: A user visits your website for the first time and is assigned:

> f34c3d91-a66e-4389-92fb-595fa9874725

The SDK evaluates this User ID and assigns the user to **Variation-1**.

If the user returns later and the same User ID is passed again:

* The SDK deterministically assigns the same variation
* The user experience remains consistent
* Metrics remain accurate

<br />

### UUID Conversion and Privacy Compliance

For privacy and compliance reasons:

* The raw User ID is never stored in Wingify systems.
* The SDK anonymizes the provided User ID into a-generated UUID before transmission.
* Only the derived UUID is stored and used for:
  * Bucketing
  * Experiment decisioning
  * Conversion attribution
  * Cross-product stitching

This approach supports:

* **GDPR compliance**
* **Data minimization**
* **Privacy-by-design principles**

> 🚧 Anonymization of User ID
>
> The User IDs you provide are anonymized by our SDKs into a UUID before being sent to Wingify servers.

<br />

### Wingify UUID Characteristics

The Wingify UUID:

* Is a 32-character unique identifier
* Is generated from the provided User ID
* Ensures a 1:1 mapping:
  * One unique User ID → One unique Wingify UUID
* Is the canonical identity used internally by Wingify

The original User ID is used only for deterministic UUID generation and is not persisted in raw form.

> 📘 User IDs should be Unique
>
> Ensure User IDs are unique: User IDs must be unique for a campaign. Wingify SDK relies on the User ID you provide for consistent behavior across platforms. Wingify buckets users and provides test metrics based on the User IDs that you provide.

<br />

### Important Guidelines

* User IDs must be unique per user
* Do not use session-based or temporary identifiers
* Always pass the same stable identifier across:
  * Backend services
  * Frontend applications
  * Mobile SDKs

Correct implementation ensures:

* Deterministic bucketing
* Accurate reporting
* Cross-platform identity consistency
