---
title: Auto-configured GatewayService
deprecated: false
hidden: true
metadata:
  robots: index
---
We have enhanced the support for browser environments by enabling direct communication with VWO's DACDN (Dynamic Content Delivery Network) when no gateway service is configured. This change ensures that evaluation and segmentation (e.g., location, OS, and attributes list) are executed directly at the DACDN, bypassing the gateway service entirely.

### Key Features:

1. **Direct Communication with DACDN** : When no gateway service is configured, the SDK now communicates directly with VWO's DACDN. This allows for more efficient data retrieval and faster communication between the browser and the VWO platform.
2. **Segmentation and Evaluation at DACDN** :  Previously, the gateway service was responsible for evaluating the user’s location, OS, and attributes list (used for segmentation). Now, with direct communication to DACDN, this evaluation and segmentation occurs directly at DACDN.