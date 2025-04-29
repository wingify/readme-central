---
title: Create a custom widget
excerpt: ''
api:
  file: api.json
  operationId: create-a-custom-widget
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
```json
{
    "name": "Pop-up",
    "description": "Sample pop-up",
    "type": "custom",
    "isGlobal": true,
    "code": {
        "html": "<div> <div class=\"Click-here\">Click Here</div> <div class=\"custom-model-main\"> <div class=\"custom-model-inner\"> <div class=\"close-btn\">×</div> <div class=\"custom-model-wrap\"> <div class=\"pop-up-content-wrap\"> Content Here </div> </div> </div> <div class=\"bg-overlay\"></div> </div> </div>",
        "js": {
            "data": "document.querySelector(\".Click-here\").addEventListener('click', function () { document.querySelector(\".custom-model-main\").classList.add('model-open'); });  document.querySelector(\".close-btn, .bg-overlay\").addEventListener('click',function () { document.querySelector(\".custom-model-main\").classList.remove('model-open'); }); "
        },
        "css": "body {display: block;}"
    }
}
```

> 📘 Note:
>
> The following fields are mandatory for creation of widget
>
> * `html`
> * `name`
> * `type` with a fixed value of 'custom'
> * `isGlobal`: true/false (boolean) is used to make the widget global, any modification done in the global widget, will reflect in all the running campaigns using the widget reference
>
> *Global widget has size limit of 500Kb*
