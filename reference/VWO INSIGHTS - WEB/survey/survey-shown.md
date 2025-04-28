---
title: Survey shown
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
## Survey Shown

### Overview

The `onSurveyShown` API allows you to trigger custom functionality when a survey is shown to a visitor. By listening to this callback, you can initiate behavior whenever a survey is displayed.

### Signature

```javascript
window.VWO.push(['onSurveyShown', function (data) {
    // Add your custom code here
}]);
```

#### Callback Data

**Type**: `Object` containing below information

| Parameter | Data Type | Required | Description                                     |
| --------- | --------- | -------- | ----------------------------------------------- |
| accountId | number    | Yes      | The VWO account ID.                             |
| surveyId  | number    | Yes      | The survey campaign ID of the completed survey. |
| uuid      | string    | Yes      | The unique identifier for the visitor.          |

### Example

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['onSurveyShown', function (data) {
    // Custom functionality when the survey is shown
}]);
```

#### Sample Data Object

```javascript
{
    "accountId": 1000047,
    "surveyId": 296,
    "uuid": "D4F232BA23BBA4EE9D1C1ACB47DB8BA9D"
}
```

### Use-cases

* **Customer Data Integration**: Use this callback to tag survey data with customer information and send it to your Customer Data Platform (CDP) or data warehouse for deeper analysis.
* **Behavior Analysis**: Send data to analytics tools like Google Analytics to study visitor behavior, such as survey entry points, time spent, and interactions.
* **CRM Integration**: For sales teams, integrate survey insights into your CRM system, including competitor evaluations, to refine sales strategies.

You may also refer to the following article: [https://vwo.com/product-updates/vwo-survey-api/](https://vwo.com/product-updates/vwo-survey-api/)
