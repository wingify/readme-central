---
title: Update bulk custom widgets
excerpt: The api is used to bulk update the global widgets.
api:
  file: api.json
  operationId: get_new-endpoint
deprecated: false
hidden: false
metadata:
  robots: index
---
Request Format

```json
{
  "widgets": [
    {
      "id": 1,
      "code": {
        "html": "<div> <div class=\"Click-here\">Click Here</div> <div class=\"custom-model-main\"> <div class=\"custom-model-inner\"> <div class=\"close-btn\">×</div> <div class=\"custom-model-wrap\"> <div class=\"pop-up-content-wrap\"> Content Here </div> </div> </div> <div class=\"bg-overlay\"></div> </div> </div>",
        "js": {
          "data": "document.querySelector(\".Click-here\").addEventListener('click', function () { document.querySelector(\".custom-model-main\").classList.add('model-open'); });  document.querySelector(\".close-btn, .bg-overlay\").addEventListener('click',function () { document.querySelector(\".custom-model-main\").classList.remove('model-open'); }); "
        },
        "css": "body {display: block;}"
      }
    },
    {
      "id": 2,
      "name": "Pop-up-2-updated",
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

> 📘 NOTE:
>
> Maximum 10 widgets can be updated.