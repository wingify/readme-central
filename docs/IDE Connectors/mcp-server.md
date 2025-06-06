---
title: MCP Server
excerpt: VWO Feature Management MCP Server Documentation
deprecated: false
hidden: true
metadata:
  robots: index
---
## Introduction

The `VWO MCP Server` is your gateway to managing feature flags effortlessly in your development environment. This tool connects the VWO feature management system directly with your favorite AI-powered IDEs, making it easier than ever to control and optimize feature releases without leaving your coding flow.

### Key Features

* **AI Assistant Integration**: Compatible with tools such as `Cursor`, `VS Code`, and `Claude`.
* **Feature Flag Management**: Enables the creation, reading, updating, and deletion of feature flags.
* **Environment Control**: Offers flexibility to enable or disable features in different environments.

This is ideal for developers who want to manage feature flags efficiently within their IDEs.

## Required Configuration

To connect the MCP server to the VWO feature management system, you must configure two essential environment variables:

* **VWO\_ACCOUNT\_ID**: Your VWO account ID.
* **VWO\_API\_KEY**: The API key (Developer Token) used for authentication.

## Setup Instructions

To begin using the **VWO MCP server** with your client, follow the setup instructions below for popular tools.

### Cursor

1. Open **Cursor Settings** and navigate to the **MCP** section.
2. Click on **Add new global MCP server**.
3. Add the following configuration, ensuring that you replace the placeholder values with your actual credentials:

```json
{
  "mcpServers": {
    "vwo-mcp-server": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp"],
      "env": {
        "VWO_ACCOUNT_ID": "YOUR_ACCOUNT_ID",
        "VWO_API_KEY": "YOUR_API_URL"
      }
    }
  }
}

```

4. Save the configuration and confirm that the server status turns green, indicating it's active.

### VS Code

1. Open the **User Settings (JSON)** in VS Code.
2. Add or update the MCP server configuration as follows:

```json
"mcp": {
  "servers": {
    "vwo-mcp-server": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp"],
      "env": {
        "VWO_ACCOUNT_ID": "YOUR_ACCOUNT_ID",
        "VWO_API_KEY": "YOUR_API_URL"
      }
    }
  }
}
```

3. Save the settings and ensure the MCP server is ready for use within VS Code.

### Claude Desktop

1. Open the **Settings** menu and navigate to the **Developer** section.
2. Click on **Edit Config** to open the `claude_desktop_config.json` file.
3. Add the following configuration (replacing placeholders with actual credentials):

```json
{
  "mcpServers": {
    "vwo-mcp-server": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp"],
      "env": {
        "VWO_ACCOUNT_ID": "YOUR_ACCOUNT_ID",
        "VWO_API_KEY": "YOUR_API_URL"
      }
    }
  }
}
```

4. Save the file and restart Claude Desktop. A hammer icon will appear in the chat window once the server is active.

For other clients, refer to their documentation on how to configure custom MCP servers. The configuration pattern remains similar.

## Available tools

Here's what you can do with our feature flag management tools:

### System

1. **Bootstrap VWO** - Retrieve cursor rules and configuration settings to seamlessly manage feature flags within your project. This enables smooth integration with your SDK and leverages VWO's feature management capabilities.

> Note: Bootstrap VWO  is currently supported only in the Cursor IDE.

### Feature Flags

1. **Create Feature Flag** - Launch a new feature flag into your account with custom settings, metrics, and variables.

2. **Delete Feature Flag** - Safely remove any feature flag from your account when it's no longer needed.

3. **Get Feature Flag** - Dive into the details of any feature flag to see its current configuration and status.

4. **List Feature Flags** - Get a bird's-eye view of all your feature flags in one place.

5. **Update Feature Flag** - Fine-tune your feature flags by modifying their properties, metrics, and variations.

6. **Toggle Feature Flag** - Instantly enable or disable feature flags in different environments with a single click.

### Feature Flag Rules

1. **List Feature Flag Rules** - View all rules associated with your feature flags.

2. **Create Rollout and Personalize Rule** - Set up rules for gradual rollout or personalization of your features.

3. **Create Testing and MVT Rule** - Configure rules for A/B testing or multivariate testing.

4. **Get Feature Flag Rule** - Examine the details of a specific feature flag rule.

5. **Toggle Feature Flag Rule** - Enable or disable specific rules for your feature flags.

6. **Delete Feature Flag Rule** - Remove unwanted rules from your feature flags.

### Projects and Environments

1. **List Projects and Environments** - See all your projects and their associated environments.

### Metrics

1. **Get Metrics** - Access metrics for your feature flags and experiments.