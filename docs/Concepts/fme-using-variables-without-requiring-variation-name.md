---
title: Using Variables Without Requiring Variation Name
excerpt: Using variables ensures that variation name is not required
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

When a user gets bucketed into a variation inside a testing rule, one way of determining the flow going ahead, is to get the variation name and branch off based on it. This is also the flow that our old Fullstack product used.

<br />

## Variables instead of Variations

With FE, we have removed this need. You do not need to know which variation a user was bucketed into, to decide the flow.

<br />

## Workaround for Variation Name
