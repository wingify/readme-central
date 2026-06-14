---
title: Authentication for third-party applications
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
## Authentication for Third-Party Applications

For Third Party Applications, create an application via our Developers Dashboard\
[https://app.wingify.com/#/developers/applications](https://app.wingify.com/#/developers/applications)\
After creating the application, redirect the user to the following Authorization URL(shared below).

`Path Syntax`:\
[https://app.wingify.com/#/authorize/:applicationId](https://app.wingify.com/#/authorize/:applicationId)

`Example`:\
[https://app.wingify.com/#/authorize/123456](https://app.wingify.com/#/authorize/123456)

\*where the Application getting authorized has the applicationId as 123456

Authorization URL redirects the user to Wingify, where an interface allows the user to authorize an application. The interface allows the user to choose the workspace for which the application will get the required access. On successful authorization, the user is redirected back to the application (if the redirect url has been specified) along with the authentication token as part of the query parameters. Although, if the redirect url has not been specified in the application settings, then, upon successful authorization, the user sees the authentication token for use in the application which initiated the authorization.

The authentication token can then be used with every API call to perform all operations available via API.
