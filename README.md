# MCP API Gateway Template

Universal MCP server for Claude Desktop with pre-configured APIs. This template provides a flexible gateway to integrate multiple external APIs with Claude Desktop using the Model Context Protocol (MCP).

## Features

- 🚀 Easy-to-use API gateway for Claude Desktop
- 🔌 Pre-configured APIs (Weather, JSONPlaceholder)
- 🛠️ Simple configuration system for adding new APIs
- 📝 TypeScript support with full type safety
- 🔐 Secure API key management through environment variables
- 📦 Ready-to-use template for your own API integrations

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Claude Desktop app

### Installation

1. **Clone or use this template repository:**
   ```bash
   git clone https://github.com/Clauskraft/mcp-api-gateway-template.git
   cd mcp-api-gateway-template
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Configure environment variables (optional):**
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

### Configuration for Claude Desktop

Add this configuration to your Claude Desktop config file:

**MacOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "api-gateway": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-api-gateway-template/dist/index.js"],
      "env": {
        "OPENWEATHER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

**Note:** Replace `/absolute/path/to/mcp-api-gateway-template` with the actual path to your cloned repository.

## Pre-configured APIs

### 1. Weather API (OpenWeatherMap)

Get current weather and forecasts for any location.

**Available tools:**
- `weather_getCurrentWeather` - Get current weather data
- `weather_getForecast` - Get 5-day weather forecast

**Setup:**
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Add `OPENWEATHER_API_KEY` to your environment variables

**Example usage in Claude:**
> "What's the current weather in London?"

### 2. JSONPlaceholder API

Free fake REST API for testing and prototyping.

**Available tools:**
- `jsonplaceholder_getPosts` - Get all posts
- `jsonplaceholder_getPost` - Get a specific post
- `jsonplaceholder_getUsers` - Get all users
- `jsonplaceholder_getUser` - Get a specific user

**Example usage in Claude:**
> "Get user with ID 1 from JSONPlaceholder"

## Adding Your Own APIs

1. **Create a new API configuration file** in `src/apis/`:

```typescript
// src/apis/myapi.ts
import { ApiConfig } from '../types/config.js';

export const myApi: ApiConfig = {
  name: 'myapi',
  baseUrl: 'https://api.example.com',
  description: 'My Custom API',
  requiresAuth: true,
  endpoints: [
    {
      name: 'getData',
      path: '/data',
      method: 'GET',
      description: 'Get data from my API',
      queryParams: [
        {
          name: 'id',
          type: 'string',
          description: 'Resource ID',
          required: true,
        },
      ],
    },
  ],
};
```

2. **Export your API** in `src/apis/index.ts`:

```typescript
import { myApi } from './myapi.js';

export const apis: ApiConfig[] = [
  weatherApi,
  placeholderApi,
  myApi, // Add your API here
];
```

3. **Rebuild the project:**
```bash
npm run build
```

4. **Restart Claude Desktop** to load the new tools.

## Project Structure

```
mcp-api-gateway-template/
├── src/
│   ├── apis/           # API configurations
│   │   ├── weather.ts
│   │   ├── placeholder.ts
│   │   └── index.ts
│   ├── types/          # TypeScript type definitions
│   │   └── config.ts
│   ├── utils/          # Utility functions
│   │   └── http.ts
│   └── index.ts        # Main server entry point
├── dist/               # Built JavaScript files
├── .env.example        # Example environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Watch mode (auto-rebuild on changes):
```bash
npm run watch
```

### Run directly with ts-node:
```bash
npm run dev
```

## Environment Variables

- `OPENWEATHER_API_KEY` - API key for OpenWeatherMap
- `WEATHER_API_KEY` - Alternative weather API key
- `NEWS_API_KEY` - API key for news services (if added)

## Troubleshooting

### Server not showing up in Claude Desktop

1. Check that the path in `claude_desktop_config.json` is absolute and correct
2. Verify the build completed successfully (`npm run build`)
3. Check Claude Desktop logs for error messages
4. Restart Claude Desktop after configuration changes

### API calls failing

1. Verify API keys are correctly set in environment variables
2. Check that the API service is accessible
3. Review error messages in Claude Desktop developer tools

## Contributing

Contributions are welcome! Feel free to:
- Add new API configurations
- Improve error handling
- Add tests
- Enhance documentation

## License

MIT License - feel free to use this template for your own projects.

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [Claude Desktop Documentation](https://claude.ai/desktop)
- [MCP SDK on npm](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
