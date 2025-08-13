---
title: Ionic(Node)
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide provides step-by-step instructions to integrate the FME Node SDK into a Ionic-based mobile application.

### What is Ionic?

[Ionic](https://ionicframework.com/) is an open-source UI toolkit for building cross-platform mobile applications using web technologies like HTML, CSS, and Javascript. It provides a library of pre-built components and tools for creating native-like mobile apps that can run on iOS, Android, and the web. Ionic is built on top of Angular, React, or Vue.js frameworks.

<br />

### Compatibility with FME Node SDK

The FME Node  SDK integrates seamlessly with Ionic applications through npm package installation. Since Ionic uses web technologies and can leverage Capacitor for native functionality, the FME Node SDK can be directly imported and used within Ionic services and components.

<br />

## Integration Steps

### 1. Create an Ionic Project

If you haven't already set up an Ionic project, follow these steps:

```shell
npm install -g @ionic/cli
ionic start myApp tabs --type=angular
cd myApp
```

For detailed instructions, refer to the [Ionic Getting Started Guide](https://ionicframework.com/docs/intro/cli).

<br />

### 2. Install FME node SDK

Add the FME node SDK to your project using npm:

```shell
npm install vwo-fme-node-sdk
```

<br />

### 3. Create Environment Configuration

Set up environment files in `src/environments/`:

```typescript
// environment.ts
export const environment = {
  production: false,
  vwo: {
    accountId: process.env.VWO_ACCOUNT_ID || '',
    sdkKey: process.env.VWO_SDK_KEY || '',
    // Other keys as required
  }
};
```

<br />

<Callout icon="💡" theme="default">
  ### We highly recommend using environment variables for your SDK key and account ID. This practice helps to keep your credentials secure and out of your codebase.
</Callout>

### 4. Create VWO Service

Create a service to handle FME SDK initialization and operations:

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { init } from 'vwo-fme-node-sdk';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VwoService {
  private vwoClient: any = null;
  private isInitializedSubject = new BehaviorSubject<boolean>(false);
  
  public isInitialized$ = this.isInitializedSubject.asObservable();

  constructor() {
    this.initializeVWO();
  }

  private async initializeVWO(): Promise<void> {
    try {
      const options = {
        accountId: environment.vwo.accountId,
        sdkKey: environment.vwo.sdkKey,
        logger: {
          level: 'DEBUG',
          transport: {
            log: (level: string, message: string) => {
              console.log(`[VWO ${level}]: ${message}`);
            }
          }
        }
      };

      this.vwoClient = await init(options);
      this.isInitializedSubject.next(true);
    } catch (error: any) {
      console.error('Failed to initialize VWO SDK:', error);
    }
  }

  public async getFlag(featureKey: string, context: any): Promise<any> {
    if (!this.vwoClient || !this.isInitializedSubject.value) {
      return null;
    }
    return this.vwoClient.getFlag(featureKey, context);
  }

  public trackEvent(eventName: string, context: any, eventProperties?: any): void {
    if (!this.vwoClient || !this.isInitializedSubject.value) {
      return;
    }
    this.vwoClient.trackEvent(eventName, context, eventProperties);
  }
}
```

<br />

### 5. Use FME in Components

Import and use the VWO service in your Ionic components:

```typescript
import { Component, OnInit } from '@angular/core';
import { VwoService } from '../services/vwo.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isVwoInitialized = false;

  constructor(private vwoService: VwoService) {}

  ngOnInit() {
    this.vwoService.isInitialized$.subscribe(initialized => {
      this.isVwoInitialized = initialized;
    });
  }

  async checkFeatureFlag(userId: string) {
    const context = { id: userId };
    const flagResult = await this.vwoService.getFlag(environment.vwo.flagKey, context);
    
    if (flagResult && flagResult.isEnabled()) {
      const modelName = flagResult.getVariable(environment.vwo.variables.modelName, 'Default');
      // Use the feature flag result
    }
  }
}
```

<br />

<Callout icon="💡" theme="default">
  ### The VWO Feature Management and Experimentation (FME) SDK provides a range of APIs for managing feature flags and tracking user behavior. Key APIs include

  * [getFlag()](https://developers.vwo.com/v2/docs/fme-node-flags#/) to retrieve feature configuration
  * [trackEvent()](https://developers.vwo.com/v2/docs/fme-node-metrics#/) to send user events for analysis
  * [setAttribute()](https://developers.vwo.com/v2/docs/fme-node-attributes#/) properties assigned that help define who users are or how they interact with an application
</Callout>

<br />

### 6. Build and Run Your Project

Build your project and run it on different platforms:

```shell
# Build the project
npm run build

# Run in browser
ionic serve
```

<br />

### Platform-Specific Setup

#### Android

1. Add Android platform:
   ```shell
   ionic capacitor add android
   ```

2. Sync and run:
   ```shell
   ionic capacitor sync android
   ionic capacitor run android
   ```

<br />

#### iOS

1. Add iOS platform:
   ```shell
   ionic capacitor add ios
   ```

2. Sync and run:
   ```shell
   ionic capacitor sync ios
   ionic capacitor run ios
   ```

<br />

## GitHub Reference

The complete source code for Ionic example is available on [GitHub](https://github.com/wingify/vwo-fme-examples/tree/master/ionic).