---
title: MCP
hidden: true
---
The APIs, Integrations & Implementation Docs | Wingify Developer Hub Model Context Protocol (MCP) server enables AI-powered code editors like Cursor and Windsurf, plus general-purpose tools like Claude Desktop, to interact directly with your APIs, Integrations & Implementation Docs | Wingify Developer Hub API and documentation.

## What is MCP?

Model Context Protocol (MCP) is an open standard that allows AI applications to securely access external data sources and tools. The APIs, Integrations & Implementation Docs | Wingify Developer Hub MCP server provides AI agents with:

* **Direct API access** to APIs, Integrations & Implementation Docs | Wingify Developer Hub functionality
* **Documentation search** capabilities
* **Real-time data** from your APIs, Integrations & Implementation Docs | Wingify Developer Hub account
* **Code generation** assistance for APIs, Integrations & Implementation Docs | Wingify Developer Hub integrations

## APIs, Integrations & Implementation Docs | Wingify Developer Hub MCP Server Setup

APIs, Integrations & Implementation Docs | Wingify Developer Hub hosts a remote MCP server at `https://developers.wingify.com/mcp`. Configure your AI development tools to connect to this server. If your APIs require authentication, you can pass in headers via query parameters or however headers are configured in your MCP client.

<Tabs>
  <Tab title="Cursor">
    **Add to `~/.cursor/mcp.json`:**

    ```json
    {
      "mcpServers": {
        "vwo": {
          "url": "https://developers.wingify.com/mcp"
        }
      }
    }
    ```

    </Tab>
  <Tab title="Windsurf">
    **Add to `~/.codeium/windsurf/mcp_config.json`:**

    ```json
    {
      "mcpServers": {
        "vwo": {
          "url": "https://developers.wingify.com/mcp"
        }
      }
    }
    ```

  </Tab>
  <Tab title="Claude Desktop">
    **Add to `claude_desktop_config.json`:**

    ```json
    {
      "mcpServers": {
        "vwo": {
          "url": "https://developers.wingify.com/mcp"
        }
      }
    }
    ```

  </Tab>
</Tabs>

## Testing Your MCP Setup

Once configured, you can test your MCP server connection:

1. **Open your AI editor** (Cursor, Windsurf, etc.)
2. **Start a new chat** with the AI assistant
3. **Ask about APIs, Integrations & Implementation Docs | Wingify Developer Hub** - try questions like:
   * "How do I [common use case]?"
   * "Show me an example of [API functionality]"
   * "Create a [integration type] using APIs, Integrations & Implementation Docs | Wingify Developer Hub"

The AI should now have access to your APIs, Integrations & Implementation Docs | Wingify Developer Hub account data and documentation through the MCP server.