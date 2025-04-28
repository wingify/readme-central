---
title: Authentication and Authorization
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
VWO's API lets you interact with a user’s VWO account and allows you to act on your user's behalf to perform multiple operations. To do so, your application first needs to request authorization from users.

Each API request is authenticated by a token in the request header. If you provide a wrong token, or include a token in the request body rather than the header, the response will be an `Authentication Failed` error.

`IMPORTANT`
A user authentication token authorized to your application is not time-bound and is valid indefinitely without requiring you to re-authorize. You can revoke the token from its Control Panel.