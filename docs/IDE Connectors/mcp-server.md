---
title: MCP Server
excerpt: VWO Feature Management MCP Server Documentation
deprecated: false
hidden: false
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
      "args": ["-y", "vwo-fme-mcp-server"],
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
      "args": ["-y", "vwo-fme-mcp-server"],
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
      "args": ["-y", "vwo-fme-mcp-server"],
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