---
title: Survey answer submitted
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
## Survey Answer Submitted

### Overview

The `onSurveyAnswerSubmitted` API triggers custom functionality when a survey answer is submitted in VWO surveys. It provides access to the data related to the submitted answers, including question details and visitor responses.

### Signature

```javascript
window.VWO.push(['onSurveyAnswerSubmitted', function(data) {
    // Add your custom code here
}]);
```

#### Callback Data

**Type**: `Object` containing below information

| Parameter    | Data Type | Required | Description                                                                            |
| ------------ | --------- | -------- | -------------------------------------------------------------------------------------- |
| accountId    | number    | Yes      | The VWO account ID.                                                                    |
| surveyId     | number    | Yes      | The survey campaign ID of the survey being answered.                                   |
| uuid         | string    | Yes      | The unique identifier for the visitor.                                                 |
| questionId   | number    | Yes      | The unique ID of the question being answered.                                          |
| questionType | string    | Yes      | The type of the question (e.g., "multi\_line", "checkbox", "radio").                   |
| questionText | string    | Yes      | The text of the question being answered.                                               |
| answers      | array     | Yes      | An array of answer objects containing id (number) and value (string).                  |
| skipped      | boolean   | No       | Indicates whether the visitor skipped the question. If true, the question was skipped. |

### Example

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['onSurveyAnswerSubmitted', function(data) {
    // Custom functionality for survey answer submission
    console.log("Survey answer submitted:", data);
}]);
```

#### Sample Data Object

**Text Response (multi-line):**

```javascript
{
    "accountId": 307590,
    "surveyId": 293,
    "uuid": "D37EF4336FD3C784165C6D2BEBDACE430",
    "questionId": 2005,
    "questionType": "multi_line",
    "questionText": "What could we do to make this site more useful?",
    "answers": [
        {
            "id": 1,
            "value": "Add multiple theme options"
        }
    ]
}
```

### Use-cases

* **Customer Data Integration**: Use this callback to tag survey answers with visitor data and send it to your Customer Data Platform (CDP) or data warehouse for deeper analysis.
* **Behavior Analysis**: Push survey response data to analytics tools like Google Analytics to track visitor behavior, such as response patterns and survey interactions.
* **CRM Integration**: For sales teams, integrate survey responses into your CRM system to refine strategies based on customer feedback, such as identifying competitors being evaluated.

You may also refer to the following article: [https://vwo.com/product-updates/vwo-survey-api/](https://vwo.com/product-updates/vwo-survey-api/)
