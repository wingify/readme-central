---
title: Survey completed
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
## Survey Completed

### Overview

The `onSurveyCompleted` API triggers custom functionality when a visitor completes a survey. It allows you to capture survey completion data and perform actions such as sending the data to a data warehouse or triggering specific business logic.

### Signature

```javascript
window.VWO.push(['onSurveyCompleted', function (data) {
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
window.VWO.push(['onSurveyCompleted', function (data) {
    // Add your custom code here
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

* **Customer Data Integration**: Use this callback to tag survey responses with customer data and push them to your Customer Data Platform (CDP) or data warehouse for deeper analysis.
* **Behavior Analysis**: Send survey response data to analytics tools like Google Analytics to study user behavior, including entry points, time spent, and average page visits.
* **CRM Integration**: For sales teams, send survey insights into your CRM system to enhance their approach based on customer feedback (e.g., identifying competitors being evaluated).

You may also refer to the following article: [https://vwo.com/product-updates/vwo-survey-api/](https://vwo.com/product-updates/vwo-survey-api/)
