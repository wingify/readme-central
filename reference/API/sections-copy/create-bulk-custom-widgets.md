---
title: Create bulk custom widgets
excerpt: The api is used to create custom widgets in bulk
api:
  file: api.json
  operationId: create-bulk-custom-widgets
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
  "widgets": [
    {
      "name": "Pop-up-1",
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
    },
    {
      "name": "Pop-up-2",
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
  ]
}
```

> 📘 Note:
> 
> Maximum 25 widgets can be created.