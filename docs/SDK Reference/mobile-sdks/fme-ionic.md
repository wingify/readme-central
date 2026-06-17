---
title: Ionic(JavaScript)
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide provides step-by-step instructions for integrating the Wingify FE JavaScript SDK into an Ionic-based mobile application.

### What is Ionic?

[Ionic](https://ionicframework.com/) is an open-source UI toolkit for building cross-platform mobile applications using web technologies like HTML, CSS, and JavaScript. It provides a library of pre-built components and tools for creating native-like mobile apps that can run on iOS, Android, and the web. Ionic is built on top of Angular, React, or Vue.js frameworks.

<br />

### Compatibility with Wingify FE JavaScript SDK

The Wingify FE JavaScript SDK integrates seamlessly with Ionic applications through the installation of an npm package. Since Ionic uses web technologies and can leverage Capacitor for native functionality, the Wingify FE JavaScript SDK can be directly imported and used within Ionic services and components.

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

### 2. Install FE JavaScript SDK

Add the Wingify FE JavaScript SDK to your project using npm:

```shell
npm install wingify-fme-node-sdk
```

<br />

### 3. Create Environment Configuration

Set up environment files in `src/environments/`:

```typescript
// environment.ts
export const environment = {
  production: false,
  wingify: {
    accountId: process.env.WINGIFY_ACCOUNT_ID || '',
    sdkKey: process.env.WINGIFY_SDK_KEY || '',
    // Other keys as required
  }
};
```

<br />

> 💡
>
> **Recommendation**: We highly recommend using environment variables for your SDK key and account ID. This practice helps to keep your credentials secure and out of your codebase.

### 4. Create Wingify Service

Create a service to handle FE SDK initialization and operations:

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { init } from 'wingify-fme-node-sdk';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WingifyService {
  private wingifyClient: any = null;
  private isInitializedSubject = new BehaviorSubject<boolean>(false);

  public isInitialized$ = this.isInitializedSubject.asObservable();

  constructor() {
    this.initializeWingify();
  }

  private async initializeWingify(): Promise<void> {
    try {
      const options = {
        accountId: environment.wingify.accountId,
        sdkKey: environment.wingify.sdkKey,
        logger: {
          level: 'DEBUG',
          transport: {
            log: (level: string, message: string) => {
              console.log(`[Wingify ${level}]: ${message}`);
            }
          }
        }
      };

      this.wingifyClient = await init(options);
      this.isInitializedSubject.next(true);
    } catch (error: any) {
      console.error('Failed to initialize Wingify SDK:', error);
    }
  }

  public async getFlag(featureKey: string, context: any): Promise<any> {
    if (!this.wingifyClient || !this.isInitializedSubject.value) {
      return null;
    }
    return this.wingifyClient.getFlag(featureKey, context);
  }

  public trackEvent(eventName: string, context: any, eventProperties?: any): void {
    if (!this.wingifyClient || !this.isInitializedSubject.value) {
      return;
    }
    this.wingifyClient.trackEvent(eventName, context, eventProperties);
  }
}

```

<br />

### 5. Use FE in Components

Import and use the Wingify service in your Ionic components:

```typescript
import { Component, OnInit } from '@angular/core';
import { WingifyService } from '../services/wingify.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isWingifyInitialized = false;

  constructor(private wingifyService: WingifyService) {}

  ngOnInit() {
    this.wingifyService.isInitialized$.subscribe(initialized => {
      this.isWingifyInitialized = initialized;
    });
  }

  async checkFeatureFlag(userId: string) {
    const context = { id: userId };
    const flagResult = await this.wingifyService.getFlag(environment.wingify.flagKey, context);

    if (flagResult && flagResult.isEnabled()) {
      const modelName = flagResult.getVariable(environment.wingify.variables.modelName, 'Default');
      // Use the feature flag result
    }
  }
}
```

<br />

> 💡 The Wingify Feature Experimentation (FE) SDK provides a range of APIs for managing feature flags and tracking user behavior. Key APIs include
>
> - [getFlag()](https://developers.wingify.com/v3/docs/fme-javascript-flags#/) to retrieve feature flag status and getting variables values
> - [trackEvent()](https://developers.wingify.com/v3/docs/fme-javascript-metrics#/) to send custom events for reporting
Wingify  - [setAttribute()](https://developers.wingify.com/v3/docs/fme-javascript-attributes#/) to send user attributes to

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

## Code Reference

> The complete source code for the Ionic example is available on [GitHub](https://github.com/wingify/vwo-fme-examples/tree/master/ionic).

<br />
