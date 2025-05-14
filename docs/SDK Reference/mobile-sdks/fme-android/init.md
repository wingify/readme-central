---
title: Event batching
deprecated: false
hidden: true
metadata:
  robots: index
---
By default, VWO iOS SDK send impression events to VWO servers in real-time. This enables immediate tracking of visitor activity and conversions, with data instantly reflected in your VWO Campaign Reports.

However, there are scenarios where it may be beneficial to collect multiple events over a period of time and send them together in a single request. The VWO iOS SDK supports event batching, allowing you to configure how and when impression events are uploaded to VWO servers.

### Event Batching Configuration

You can enable event batching during SDK initialization by setting either of the following parameters:

| Parameter                   | Description                                                 | Example |
| :-------------------------- | :---------------------------------------------------------- | :------ |
| **batchMinSize**            | Minimum number of events to trigger a batch upload.         | 10      |
| **batchUploadTimeInterval** | Time interval (in milliseconds) before a batch is uploaded. | 300000  |

**Example Usage**

### Example Usage

```kotlin
val options = VWOInitOptions()
options.sdkKey = "YOUR_SDK_KEY"
options.accountId = YOUR_ACCOUNT_ID
options.batchMinSize = 10
options.batchUploadTimeInterval = 300000 // 5 minutes, please specify at least a few minutes
options.context = applicationContext // Required for batch uploads

VWO.init(options, object : IVwoInitCallback {
    override fun vwoInitSuccess(vwo: VWO, message: String?) {
        // VWO initialization succeeded
    }
    
    override fun vwoInitFailed(message: String?) {
        // VWO initialization failed
    }
})
```
```java
VWOInitOptions options = new VWOInitOptions();
options.setSdkKey("YOUR_SDK_KEY");
options.setAccountId(YOUR_ACCOUNT_ID);
options.setBatchMinSize(10);
options.setBatchUploadTimeInterval(300000L); // 5 minutes, please specify at least a few minutes
options.setContext(getApplicationContext()); // Required for batch uploads

VWO.init(options, new IVwoInitCallback() {
    @Override
    public void vwoInitSuccess(VWO vwo, String message) {
        // VWO initialization succeeded
    }
    
    @Override
    public void vwoInitFailed(String message) {
        // VWO initialization failed
    }
});
```

> 📝 Note:
>
> The uploading of events will get triggered based on whichever condition is met first if using both options.

***

### Offline Event Batching

The VWO iOS SDK is designed to ensure that no impression events are lost, even when your users are offline. If the device loses internet connectivity, the SDK securely stores all impression events locally on the device. Once the device reconnects to the internet, these stored events are automatically uploaded to VWO servers in batches.

### Important Notes:

* Without event batching: Impression events are sent in real-time and reflected instantly in campaign reports.
* With event batching: Campaign reports are updated only after the batch is sent to VWO servers.
* Offline support: Events generated offline are stored locally and uploaded automatically when the device reconnects.
* Offline event batching works in conjunction with online event batching.