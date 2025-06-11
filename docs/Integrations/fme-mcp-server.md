---
title: MCP Server
deprecated: false
hidden: false
metadata:
  robots: index
---
## Introduction

The `VWO MCP Server` serves as a seamless bridge between your development environment and VWO’s Feature Management & Experimentation. It enables effortless feature flag management by integrating directly with AI-powered IDEs, allowing you to control and optimize feature releases without disrupting your coding workflow.

### Key Features

* **AI Assistant Integration**: Compatible with tools such as `Cursor`, `VS Code`, and `Claude`.
* **Feature Flag Management**: Enables the creation, reading, updating, and deletion of feature flags.
* **Environment Control**: Offers flexibility to enable or disable features in different environments.

This is ideal for developers who want to manage feature flags efficiently within their IDEs.

<br />

## Required Configuration

To connect the MCP server to the VWO feature management system, you must configure two essential environment variables:

* **VWO\_ACCOUNT\_ID**: VWO Account ID.
* **VWO\_API\_KEY**: The API key (Developer Token) for authenticating with VWO REST APIs.

<br />

## Setup Instructions

To begin using the **VWO MCP server** with your client, follow the setup instructions below for popular tools.

### Cursor

1. Open **Cursor Settings** and navigate to the **MCP** section.
2. Click on **Add new global MCP server**.
3. Add the following configuration in `mcp.json`, ensuring that you replace the placeholder values with your actual credentials:

```json
{
  "mcpServers": {
    "vwo-mcp-server": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp@latest"],
      "env": {
        "VWO_ACCOUNT_ID": "VWO_ACCOUNT_ID",
        "VWO_API_KEY": "VWO_API_KEY"
      }
    }
  }
}

```

4. Save the configuration and confirm that the server status turns green, indicating it's active.

<Image align="center" className="border" border={true} src="https://files.readme.io/f09224a225717497a6d53fbf3adfe3b0be59a2712c28688322471616371499f3-VWO_Cursor_MCP_1.gif" />

### VS Code

1. Open the **User Settings (JSON)** in VS Code.
2. Add or update the MCP server configuration as follows:

```json
"mcp": {
  "servers": {
    "vwo-mcp-server": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp@latest"],
      "env": {
        "VWO_ACCOUNT_ID": "VWO_ACCOUNT_ID",
        "VWO_API_KEY": "VWO_API_KEY"
      }
    }
  }
}
```

3. Save the settings and ensure the MCP server is ready for use within VS Code.

<Image align="center" className="border" border={true} src="https://files.readme.io/351699fdc6e3c335f4b87f32eeaf204faca01600eda6fafc5291ab1464353da7-VWO_VS_Code_MCP.gif" />

### Claude Desktop

1. Open the **Settings** menu and navigate to the **Developer** section.
2. Click on **Edit Config** to open the `claude_desktop_config.json` file.
3. Add the following configuration (replacing placeholders with actual credentials):

```json
{
  "mcpServers": {
    "vwo-mcp-server": {
      "command": "npx",
      "args": ["-y", "vwo-fme-mcp@latest"],
      "env": {
        "VWO_ACCOUNT_ID": "VWO_ACCOUNT_ID",
        "VWO_API_KEY": "VWO_API_KEY"
      }
    }
  }
}
```

4. Save the file and restart Claude Desktop. Once the server is active, a hammer icon will appear in the chat window.

<Image align="center" className="border" border={true} src="https://files.readme.io/5f8166e22cf8760d4ffde73bca3e88a89d6f81720668864062a9e77bbb0d11bc-VWO_Claude_MCP.gif" />

<br />

> **Looking for other AI Clients**
>
> For other clients, refer to their documentation on configuring custom MCP servers. The configuration pattern remains similar.

## Available tools

Here's what you can do with our feature flag management tools:

### System

1. **Bootstrap VWO** - Retrieve cursor rules and configuration settings to manage feature flags within your project seamlessly. This enables smooth integration with your SDK and leverages VWO's feature management capabilities.

> Note: *Bootstrap VWO* tool is currently supported only in the Cursor IDE as it downloads the Cursor Rules based on the project's langugae.

### Feature Flags

1. **Create Feature Flag** - Launch a new feature flag with custom settings, metrics, and variables in your account.

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

<br />

## How it works

* Starts with a natural language **prompt** from a developer or AI agent.
* MCP Plugin acts as the **orchestrator**: detecting context, managing IDE rules, interacting with VWO APIs, and generating SDK code.
* Flags are created/updated in the VWO dashboard, and integration code is directly injected into the user’s codebase.

<br />

```mermaid
graph TD
    A[Developer or AI Agent in IDE] --> B{Feature intent detected}
    B -->|Yes, use VWO SDK| C[MCP Plugin]
    
    C --> D[Detect project context: language and structure]
    D --> E[Generate IDE rules for Cursor]

    C --> F[Call VWO API to create or update flag]
    F --> G[VWO FME Dashboard]

    C --> H[Generate SDK code: getFlag and getVariable]
    H --> I[Insert integration code into codebase]
    
    %% Assign classes

    class C project
    class G dashboard
    class I code

    %% Define styles
    classDef project fill:#ff9,stroke:#333,stroke-width:1px,color:#000
    classDef dashboard fill:#bbf,stroke:#333,stroke-width:1px,color:#000
    classDef code fill:#cfc,stroke:#333,stroke-width:1px,color:#000

```

## Source Code

We've open-sourced our MCP Server, you can explore the source code on our GitHub repository.

<Cards columns={1}>
  <Card title="VWO MCP Server" href="https://github.com/wingify/vwo-fme-mcp" icon="fa-link" target="_blank">
    GitHub Link
  </Card>
</Cards>