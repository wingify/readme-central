---
title: Website resource representation
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
| Key                    | Type    | Description                                           | Editable                                                     |
| :--------------------- | :------ | :---------------------------------------------------- | :----------------------------------------------------------- |
| id                     | int     | website Id                                            | No                                                           |
| accountId              | int     | Account ID                                            | No                                                           |
| domain                 | string  | domain ex, example.com                                | No                                                           |
| isArchived             | boolean | Whether a property is archived or not                 | Yes                                                          |
| archivedAt             | int     | Epoch time of archival                                | No                                                           |
| isRegistered           | boolean | Whether a property is registered or not               | Yes, we can only register a website but cannot unregister it |
| createdAt              | int     | Epoch time of creation of property                    | No                                                           |
| lastUpdatedAt          | int     | Epoch time of last updation of property               | No                                                           |
| status                 | string  | 3 status: NO\_SMARTCODE\_DETECTED / CONNECTED / ERROR | No                                                           |
| lastActivity           | int     | Epoch time of last activity on a domain               | No                                                           |
| codeType               | string  | 2 codeType:sync / async                               | Yes                                                          |
| settingsTimeout        | int     | settings timeout of a particular domain               | Yes                                                          |
| libraryTimeout         | int     | library timeout of a particular domain                | Yes                                                          |
| useJquery              | boolean | whether jquery is used or not                         | Yes                                                          |
| rocketLoader           | boolean | whether rocket loader is used or not                  | Yes                                                          |
| hideBodyHtml           | boolean | whether to hide Body in HTML or not                   | Yes                                                          |
| nextJsHandlingRequired | boolean | whether next js handling is required or not           | No, It is fetched by page analyzer service                   |
