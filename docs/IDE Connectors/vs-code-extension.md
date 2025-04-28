---
title: VS Code Extension
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
The **VWO Feature Management extension** for Visual Studio Code offers a seamless experience for managing VWO feature flags directly from your code editor. With this extension, you can view, toggle, and manage your feature flags without switching between your editor and the VWO dashboard. Boost your productivity and streamline feature flag management by integrating it right into your development workflow.

## Features

* **Feature Flag Explorer**: View a comprehensive list of all feature flags in your project, organized by environment, and get a quick overview of their statuses.
* **Toggle Feature Flags**: Easily enable or disable feature flags directly from the command palette or the feature flag explorer. Stay in your flow without needing to open the VWO dashboard.
* **Environment Selection**: Use the status bar to select and switch between different environments, allowing you to manage and view feature flags across various stages like development, testing, and production.
* **Quick Flag Actions**: Insert code snippets for initializing the VWO SDK, retrieving a feature flag, and accessing variables associated with flags, tailored to different programming languages supported by VWO.
* **Contextual Menu Commands**: Right-click on feature flags in the explorer to access quick actions, including toggling the flag and managing rules and variations.
* **Feature Flag Variables**: View and manage variables associated with feature flags. Insert variables into your code directly from the command palette, saving time and reducing context switching.
* **Search Feature Flags**: Quickly search for feature flags by name or rule, making it easier to locate and manage flags in large projects.

## Usage

### Setting Up VWO API Credentials

Before using the extension, you need to set up your VWO API credentials:

1. Enter your Account ID and VWO API Access Token through the configuration WebView provided by the extension.
2. Click on "Fetch Environments" to retrieve the list of environments linked to your account.
3. Select the desired environment to view and manage feature flags specific to that environment.

## Commands

### Open VWO Feature Manager

Use the `VWO: Open Feature Manager` command to open the main interface of the VWO Feature Management extension. Here, you can configure your account and access all available feature flags.

### Toggle Feature Flag

Use the `VWO: Toggle Feature Flag` command from the command palette to enable or disable a feature flag. Select the feature flag you want to toggle from the list, and the extension will update its state.

### Insert Init Code

Use `VWO: Insert Init Code` to insert the code snippet for initializing the VWO SDK. This snippet is automatically customized for the current language of your editor.

### Insert GetFlag Code

Use `VWO: Insert GetFlag Code` to insert a code snippet that retrieves a feature flag in your code. This snippet is tailored for the language you're working with.

### Insert GetVariables Code

Use `VWO: Insert GetVariables Code` to insert a snippet that retrieves all variables associated with a feature flag.

### Insert Variable Code

Use `VWO: Insert Variable Code` to insert a specific variable from a feature flag into your code.

### Search VWO Feature Flags

Use `VWO: Search VWO Feature Flags` to quickly locate a feature flag or rule by name. This command opens a search bar to filter feature flags based on your query.

### Select Environment

Switch between environments using the `VWO: Select Environment` command. This updates the feature flag explorer to display flags relevant to the selected environment.

## Configuration

After installing the extension, navigate to the **Configuration** section within the feature flag explorer:

1. **Account ID**: Enter your VWO account ID.
2. **VWO API Access Token**: Enter your API access token. You can generate this from the VWO dashboard.
3. **Fetch Environments**: Retrieve environments linked to your account to view environment-specific flags.

Once configured, you can start exploring and managing feature flags for the selected environment.

## Requirements

This extension requires:

* A valid VWO account and API access token.
* Visual Studio Code version 1.54.0 or higher.

## Resources

| Resource          | Link                                                                                                                                                                     |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VS Code Extension | [https://marketplace.visualstudio.com/items?itemName=Wingify.vwo-feature-management](https://marketplace.visualstudio.com/items?itemName=Wingify.vwo-feature-management) |

## License

Apache License, Version 2.0

Copyright 2024-2025 Wingify Software Pvt. Ltd.
