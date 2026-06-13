---
title: Trigger Wingify Events Using GTM
deprecated: false
hidden: false
metadata:
  robots: index
---
## **Overview**

The **Wingify Event** is a custom Google Tag Manager (GTM) template designed to simplify the process of sending custom events and properties to, instead of writing custom JavaScript code to push data to the window.VWO object, this feature enables users to configure event tracking directly within the GTM interface.

## **Prerequisites**

Before setting up, ensure you have:

* Access to your **Google Tag Manager** container with publish permissions
* The **Wingify Event (.tpl)** file
* Your **Wingify Account ID** (if using Feature Experimentation)
* A GTM variable for the **Wingify UUID** (if using Feature Experimentation/Offline Conversions)

**NOTE:** The Wingify Event setup is exclusively applicable to [Data360](https://help.vwo.com/hc/en-us/articles/8679651827737-About-VWO-Data360) accounts.

## **Installing Wingify Event on GTM**

Download the Wingify Event tag template [from here](https://github.com/wingify/vwo-event-streamer-gtm-template/), extract the files and perform the following steps to install the Wingify Event on GTM:

1. Log in to your GTM account and select the appropriate workspace where you want to install the Wingify Event.

2. From the main menu on the left, go to **Templates** > **Tag Templates** > **New**.

   <Image align="center" border={false} width="550px" src="https://files.readme.io/36087e3a70b307cda5f6eda43634dd29ef30902cfea14f9fb83de1ee64449863-image2.png" />

3. On the Template Editor page, click on the vertical ellipsis (**⋮**) and select **Import**.

   <Image align="center" border={false} width="550px" src="https://files.readme.io/6a5f7cce930eb4a692c294d969dc97b77accd00ffdfd58e93056f7d49d4992ce-image1.png" />

4. Browse for **Wingify Event.tpl** from the Wingify Event files that you’ve downloaded and select it. The template is uploaded to GTM.

5. Click **Save** to complete the import of the Wingify Event template.

## **Using the Wingify Event Template**

Upon successful import, you can use the Wingify Event template to stream the events from GTM to Wingify effortlessly. To do that, perform the following steps:

* From the main menu on your GTM dashboard, navigate to **Tags** > **New**.

* Name the tag and click on the **Tag Configuration** section

* From the list of tags, under the **Custom** section, select the **Wingify Event** tag that you just imported.

<Image align="center" border={false} width="650px" src="https://files.readme.io/b60042f5c3e724ce674890279839a939ea31a6f8a55178639a5a84df69797824-image3.png" />

* To customize the tag configuration further, you can utilize the following options:

  * Enter the Event Name you want to send to Wingify  
    **Properties:** Allows you to add properties that will be sent with every event. To add a property, click on **Add a Property** and enter the input in the respective fields as follows:  
    **a. Property Name:** The name of the property.  
    **b. Property Value:** The value of the property.

<Image align="center" border={false} width="550px" src="https://files.readme.io/82480a00abd11610cc41e0a5c9308f55fdc2bc42216349fd3ced0762f5234e01-image6.png" />

* Click on the **Triggering** section and select the trigger to assign in the Wingify Event Tag.

  <Image align="center" border={false} src="https://files.readme.io/b222733f40b53029a6f7b6b65efacb5d788cb887f668fc425c41ca33b5f9c326-image5.png" />

## **Advanced Settings (Optional)**

**Send Events for Feature Experimentation using Offline Conversions: If checked, events will be sent to Wingify as Offline Conversions.**

– **Account ID:** Your Wingify Account ID

– **Region:** Region, US (default)

– **Wingify Visitor ID:** User’s UUID

<Image align="center" border={false} width="500px" src="https://files.readme.io/ee8556e480e50743cbf6338ceef03be2fd60561de5b2ce35afe0794315a44787-image4.png" />

## **Configuring the Wingify UUID Variable(Only required for FE)**

1. Navigate to the “Variables” tab in the GTM workspace.
2. Click on “New” to create a new variable.
3. Name your variable as Wingify UUID.
4. In the Variable Configuration section:
   1. Choose “1st Party Cookie” as the Variable Type.
   2. Enter **_vwo_uuid** in the Cookie Name field.
5. Save the variable.

   <Image align="center" border={false} width="550px" src="https://files.readme.io/c5c31db8b301a009c46b94af4d26cf31e1fbbb05140775255db8b67c6e6edfae-image1.png" />

**NOTE:** To enable GTM event tracking, the `_vwo_uuid` cookie must be accessible in the browser. Use the Wingify SDK’s `getUUID()` method to generate this identifier based on your implementation:

### Backend SDK (Server-Side)

* **Generate:** Call `getUUID(userId, accountId)` in your SDK (e.g., Node.js).
* **Pass:** Send the generated UUID from your server to the frontend.
* **Set:** Store the value in the browser as the `_vwo_uuid` cookie. Ensure the cookie is **not** `HttpOnly` so GTM can access it.

### Frontend SDK (Client-Side)

* **Generate:** Call `getUUID()` directly within your client-side SDK.
* **Set:** Store the returned string in the browser using `document.cookie` with the name `_vwo_uuid`.

## **Technical Details**

* **SmartCode Dependency:** When the “Feature Experimentation” option is OFF, this tag relies on Wingify SmartCode running on the page.

* **Via Offline Conversion:** When ON, the tag pushes data independently of SmartCode. A valid Wingify Visitor ID is required.

## **Recommended Best Practices**

* While configuring the Wingify Event tag in GTM, map event parameters (Properties) using **dynamic GTM variables** (typically sourced from the dataLayer) such as orderId or price, rather than using hard-coded static values.
* Maintain consistent **naming conventions** (camelCase, snake_case).
* For Offline Conversions, use a GTM **1st Party Cookie variable** to read _vwo_uuid.

# **Troubleshooting / Known Issues**

* ### **Issue: Event is not appearing in Wingify**

  * Verify tag firing using GTM Preview mode
  * Ensure Wingify SmartCode loads before the GTM event fires (if Offline Conversion is not enabled)

* ### **Issue: Data not linked to the correct user (Offline Conversion)**

  * Ensure the Wingify Visitor ID field is populated with a valid UUID
  * If undefined, check the GTM cookie variable configuration
