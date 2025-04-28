---
title: Set Opt Out
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
In case you want to opt-out of tracking by VWO, simply call the Set Opt Out API. This will exclude all the users from any kind of tracking by VWO. This is useful when you just want to make the VWO SDK ineffective without actually removing the associated code.

Set Opt Out API will also remove unwanted memory footprint by destructing all the instance variables.

> 📘 Important
>
> Calling any other API after this will not be effective i.e. no decision-making or impression would be made to VWO.

```ruby Ruby
vwo_client_instance.set_opt_out()
```

If you want to opt-in again for tracking by VWO SDK, reinitialize the SDK with the latest settings.
