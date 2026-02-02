---
title: Streaming Events From GTM to VWO
deprecated: false
hidden: false
metadata:
  robots: index
---
**ATTENTION**:  
VWO Event Streamer fetches events only from the GTM `dataLayer` variable. It does **not** import events directly from **Google Analytics (GA)**

VWO Event Streamer is a custom tag template that you can import into your GTM account in order to stream custom events from GTM to VWO. This is an effortless approach if you just require fetching custom events from GTM to VWO. You just need to install the VWO streamer as a template on GTM and configure the events to be sent to VWO from GTM. 

Let’s say you have created tags in GTM for events such as “Add to Cart”, “Proceed to Checkout”, and “Purchase”, and you use these events in your Google Analytics account. Now, you’re looking to import the same events as metrics into VWO to run a campaign for gauging the sellability of a certain product. Don’t worry, you needn’t get into extensive integration here. You can simply install the VWO Event Streamer and add it as a custom template to your GTM account. This streams all your custom events from GTM to VWO just like that. 

If you require more capabilities, such as transferring campaign data from VWO to GTM targeting visitors in your VWO campaigns using a GTM datalayer variable, you need to [integrate your VWO account with GTM](https://help.vwo.com/hc/en-us/articles/15595250852761-Integrating-VWO-with-Google-Tag-Manager-GTM-) .

**NOTE:** The VWO Event Streamer setup is exclusively applicable to [Data360](https://help.vwo.com/hc/en-us/articles/8679651827737-About-VWO-Data360)  accounts.


# **Installing VWO Event Streamer on GTM**

Download the VWO Event Streamer tag template [from here](https://github.com/wingify/vwo-event-streamer-gtm-template/) , extract the files and perform the following steps to install the VWO Event Streamer on GTM:


1. Log in to your GTM account and select the appropriate workspace where you want to install the VWO Event Streamer.

2. From the main menu on the left, go to **Templates** \> **Tag Templates** \> **New**.

     


   <Image align="center" border={false} width="650px" src="https://files.readme.io/3c973f3bda16d8cc51fdd648f6d42c15fe28a62324c44fa5566f4ed49c4fd04d-image3.png" />
3. On the Template Editor page, click on the vertical ellipsis (**⋮**) and select **Import**.
    


   <Image align="center" border={false} width="600px" src="https://files.readme.io/eea08acf5dffff0b6d889b035b00175f48413ea1d8a2be1289c2ec84c6185707-image11.png" />
4. Unzip the **VWO\_Event\_Streamer.zip** and select the **template.tpl** file. 

5. Click **Save** to complete the import of the VWO Event Streamer template.


# **Using the VWO Event Streamer Template**


Upon successful import, you can use the VWO Event Streamer template to stream the events from GTM to VWO effortlessly. To do that, perform the following steps:


1. From the main menu on your GTM dashboard, navigate to **Tags** \> **New**.  
2. Name the tag and click on the **Tag Configuration** section.  
3. From the list of tags, under the **Custom** section, select the **VWO Streamer** tag.  
      


   <Image align="center" border={false} width="625px" src="https://files.readme.io/1885bbf3e462d517b708fbb025ff9b6d232aef8d98db70191f18701d3f53e255-image5.png" />

## &#x20;**Configure the VWO Template Settings:**



### **Send Events for Feature Experimentation using Offline Conversions** (Optional)

Enables sending events for Feature experimentation (FE) using Offline Conversions. When this option is checked, the GTM tag sends the events to VWO as Offline Conversions.


* **Account ID:** Your VWO Account ID  
* **Region:** Region, US (default)  
* **VWO Visitor ID:** [User’s UUID](#configuring-the-vwo-uuid-variable-\(only-required-for-fe\))  


<Image align="center" border={false} width="600px" src="https://files.readme.io/b52e54ffe04ee088bbb47bd83665bb46ada5541185578e9dd837d18bf8db9a91-image4.png" />



## **Additional Custom Properties**



* **Custom Property:** Allows you to add custom properties that will be sent with every event. To add a custom property, click on **Add New Property** and enter the input in the respective fields as follows:  
  * **Property Name:** The name of the custom property.  
  * **Property Value:** The value of the custom property.  
  * **Nested JSON Field Mapping:** Allows you to import event properties with JSON nested values into VWO. To do this, click on **Add Nested Field Mapping** and enter the input in the respective fields as follows:  
    * **Property Name:** The name of the property you want to map.  
      * **JSON Key Path:** The path to the key in the JSON object.

        **Example JSON:**

        ```json
        {
          "event": "purchase",
          "ecommerce": {
            "transaction_id": "123",
            "value": 55,
            "currency": "USD",
            "items": [
              { "item_id": "SKU_12345", "item_name": "Vintage Chair" },
              { "item_id": "SKU_67890", "item_name": "Antique Lamp" }
            ]
          }
        }
        ```

        * For a value inside a nested object, such as "value": 55 inside ecommerce,  the JSON Key Path to use is: **ecommerce.value**  
        * **For a value inside an array**, such as the name of the first purchased item ("Vintage Chair"), the JSON Key Path to use is: **ecommerce.items.0.item\_name**

          You can add as many property mappings as needed by clicking **\+ Add Field Mapping**.




## **Manage Event and Property Exclusions:** 

Use this section to block specific data from being sent to VWO


* **Properties to exclude:** Specify the names of the events to exclude if necessary (e.g.,taxValue).  
* **Events to exclude:** Add rows for event names you do not want to track (e.g.,sign_up).




  <Image align="center" border={false} width="500px" src="https://files.readme.io/b610734c68606eb426b8070c2c07870cc488917a5bca1ad750bdbae3c2124e67-image6.png" />

## **Triggering**



1. Click on the **Triggering** section and click on the **\+** icon at the top-right to create a new trigger.  
      

   <Image align="center" border={false} width="550px" src="https://files.readme.io/d1db45d7aee4394704a206b6ab7495f8df650ebb516ab77e01eead04264b733d-image10.png" />
2. Name the trigger and click on the **Trigger Configuration** section.  
3. We recommend using the following trigger settings to stream all the events to VWO. Configure your trigger settings as follows and click on **Save**:  

   1. In the **Trigger Type** field, select **Custom Event**.  
   2. In the **Event name** field, enter “**.\***”.  
   3. Select the **Use regex matching** option.  
   4. Click **Save**.   

      <Image align="center" border={false} width="550px" src="https://files.readme.io/18589fcead215a22e499d9bee9093a4ed59c019eafb8bd02dfcd6e8c4108fa94-image2.png" />



     
   Now, your website events from GTM will be streaming into the **UNREGISTERED EVENTS** section under [**Events**](https://help.vwo.com/hc/en-us/articles/8676443712537-Working-With-Events-in-VWO)  in your [**VWO Data360**](https://help.vwo.com/hc/en-us/categories/8675257180185-VWO-Data360)  module. You can use these events to [set up your campaign triggers](https://help.vwo.com/hc/en-us/articles/18789345801113)   , [create metrics](https://help.vwo.com/hc/en-us/articles/8675547113625-Working-With-Metrics-in-VWO) , and [target the visitors for your campaigns](https://help.vwo.com/hc/en-us/articles/360020418454-Using-Segmentation-in-VWO) .    



   <Image align="center" border={false} width="600px" src="https://files.readme.io/139f37e0e973f60c21ecec316253a60e6c9ffd95faa8971f0e08088cd1352354-image9.png" />



## **Configuring the VWO UUID Variable (Only required for FE)** 



1. Navigate to the “Variables” tab in the GTM workspace.  
2. Click on “New” to create a new variable. 
3. Name your variable as VWO UUID.  
4. In the Variable Configuration section:  
   1. Choose “1st Party Cookie” as the Variable Type.  
   2. Enter **\_vwo\_uuid** in the Cookie Name field.  
5. Save the variable.


   **NOTE:** To enable GTM event tracking, the `_vwo_uuid` cookie must be accessible in the browser. Use the VWO SDK’s `getUUID()` method to generate this identifier based on your implementation:  

   <Image align="center" border={false} width="600px" src="https://files.readme.io/44df4f558bcbf250a453ed0847b25e29ab96404482f74a67bab823c3413572c0-image7.png" />



### **1. Backend SDK (Server-Side)**



* **Generate:** Call `getUUID(userId, accountId)` in your SDK (e.g., Node.js).  
* **Pass:** Send the generated UUID from your server to the frontend.  
* **Set:** Store the value in the browser as the `_vwo_uuid` cookie. Ensure the cookie is **not** `HttpOnly` so GTM can access it.


### **2. Frontend SDK (Client-Side)**

* **Generate:** Call `getUUID()` directly within your client-side SDK.  
* **Set:** Store the returned string in the browser using `document.cookie` with the name `_vwo_uuid`.


## **Supported Event Formats**

The VWO Event Streamer only supports events that are directly pushed into the **dataLayer** or triggered through **gtag**. Therefore, ensure that your events are structured in one of these formats for them to be successfully imported into VWO:

**Pushing Events Directly into dataLayer**

```javascript
dataLayer.push({
  "event": "event_name"
});
```

**Triggering Events Through gtag**

```javascript
gtag("event", "event_name");
```

**NOTE:** GTM’s system events, like gtm.load, gtm.start, gtm.dom, etc., are not forwarded to VWO.


## **Configuring Custom Datalayer Variable Name in Google Tag Manager**


By default, GTM is set up to access events from your datalayer variable named 'dataLayer.' If you use a different datalayer variable name, follow these steps to specify your dataLayer variable name in GTM. This allows GTM to recognize and stream your events:


1. From your GTM dashboard, access **Templates** \> **Tag Templates** \> **VWO Event Streamer** \> **Code**.  
      

   <Image align="center" border={false} width="550px" src="https://files.readme.io/6eacdad66a4aaa77520d241fab64fdc0797c44d251612d4a4d5490938bd65b61-image1.png" />
2. In the code, replace “dataLayer”, corresponding to **const DATALAYER\_VARIABLE\_NAME**, with your custom datalayer variable name and click **Save**.  
     

   <Image align="center" border={false} width="550px" src="https://files.readme.io/5b25a4455260425cda1b759196c5a4a9ecb8f6bfb2f3a01e37c7f972090e77e5-image8.png" />
3. Go to **Permissions** \> **Accesses global variables** \> **Add key**.  
4. In the **Key** field, enter the name of your custom datalayer variable, select **Read**, and click **Add**.  
      

   <Image align="center" border={false} width="550px" src="https://files.readme.io/c7decc60e38ecf42d05144109a67025097a6323c56df0da50a72bd489d7d2a3e-image12.png" />
5. Click **Save**.


## **Technical Details**



* **SmartCode Dependency:** When the “Feature experimentation” option is OFF, this tag relies on VWO SmartCode running on the page.  
* **Via Offline Conversion:** When ON, the tag pushes data independently of SmartCode. A valid VWO Visitor ID is required.


# #**Recommended Best Practices**



* While configuring the VWO Event tag in GTM, map event parameters (Properties) using **dynamic GTM variables** (typically sourced from the dataLayer) such as orderId or price, rather than using hard-coded static values.  
* Maintain consistent **naming conventions** (camelCase, snake\_case).  
* For Offline Conversions, use a GTM **1st Party Cookie variable** to read \_vwo\_uuid.


## **Troubleshooting / Known Issues**



* ### **Issue: Event is not appearing in VWO**

  * Verify tag firing using GTM Preview mode	  
  * Ensure VWO SmartCode loads before the GTM event fires (if Offline Conversion is not enabled)

  ### **Issue: Data not linked to the correct user (Offline Conversion)**

  * Ensure the VWO Visitor ID field is populated with a valid UUID        
  * If undefined, check the GTM cookie variable configuration
