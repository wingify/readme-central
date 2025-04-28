---
title: Update a custom widget
excerpt: ''
api:
  file: api.json
  operationId: update-a-custom-widget
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Request Format

```json
{
  "description": "Cool widget for my application1",
  "isGlobal":true,
   "code": {
        "html": "<div> update html</div>",
        "js": {
            "data": "console.log('updated js')"
        },
        "css": "body{background-color: grey}"
    }
}
```

> 📘 Note:
> 
> When using the patch API, note that it will overwrite the entire content of the widget. If your request only includes HTML, any existing JavaScript and CSS originally associated with the widget will be replaced. Ensure that all necessary components (HTML, JS, CSS) are included in your request if you wish to retain them.
> 
> You can convert any existing widget to global widget by using isGlobal key. The widget code should not be more than 500Kb.