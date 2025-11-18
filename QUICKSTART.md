# Quick Start Guide

Get up and running with the MCP API Gateway in 5 minutes!

## Step 1: Install

```bash
# Clone the repository
git clone https://github.com/Clauskraft/mcp-api-gateway-template.git
cd mcp-api-gateway-template

# Install dependencies
npm install

# Build the project
npm run build
```

## Step 2: Get API Keys (Optional)

For the weather API to work, you'll need an API key from OpenWeatherMap:

1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Get your API key

## Step 3: Configure Claude Desktop

### macOS
Edit `~/Library/Application Support/Claude/claude_desktop_config.json`

### Windows
Edit `%APPDATA%\Claude\claude_desktop_config.json`

Add this configuration:

```json
{
  "mcpServers": {
    "api-gateway": {
      "command": "node",
      "args": [
        "/path/to/mcp-api-gateway-template/dist/index.js"
      ],
      "env": {
        "OPENWEATHER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

**Important:** Replace `/path/to/mcp-api-gateway-template` with the actual absolute path to where you cloned the repository.

## Step 4: Restart Claude Desktop

Completely quit and restart Claude Desktop for the changes to take effect.

## Step 5: Test It!

In Claude Desktop, try these prompts:

### Test JSONPlaceholder (no API key required):
- "Get user with ID 1"
- "Show me all posts"
- "Get post number 5"

### Test Weather API (requires API key):
- "What's the weather in London?"
- "Get the 5-day forecast for New York"
- "Show me the current weather in Tokyo"

## Troubleshooting

### Server not appearing in Claude
1. Check that you used the absolute path in the config
2. Verify the build succeeded (`npm run build`)
3. Restart Claude Desktop completely

### Tools not working
1. Check Claude Desktop's developer tools for errors
2. Verify API keys are correct in the config
3. Check that the API service is accessible

## What's Next?

- Check out the [README.md](README.md) for more details
- Learn how to add your own APIs
- Explore the [CONTRIBUTING.md](CONTRIBUTING.md) guide

## Need Help?

- Read the full documentation in [README.md](README.md)
- Check the example configuration files
- Open an issue on GitHub
