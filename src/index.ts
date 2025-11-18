#!/usr/bin/env node

/**
 * MCP API Gateway Server
 * Universal MCP server for Claude Desktop with pre-configured APIs
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { apis } from './apis/index.js';
import { makeHttpRequest, replacePathParams } from './utils/http.js';
import { ApiConfig } from './types/config.js';

// Environment variable handling
const envVars: Record<string, string> = {};
if (process.env.OPENWEATHER_API_KEY) {
  envVars.OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
}
if (process.env.WEATHER_API_KEY) {
  envVars.WEATHER_API_KEY = process.env.WEATHER_API_KEY;
}
if (process.env.NEWS_API_KEY) {
  envVars.NEWS_API_KEY = process.env.NEWS_API_KEY;
}

/**
 * Convert API configuration to MCP tools
 */
function createToolsFromApis(apis: ApiConfig[]): Tool[] {
  const tools: Tool[] = [];

  for (const api of apis) {
    for (const endpoint of api.endpoints) {
      const inputSchema: any = {
        type: 'object',
        properties: {},
        required: [] as string[],
      };

      // Add path parameters
      if (endpoint.parameters) {
        for (const param of endpoint.parameters) {
          inputSchema.properties[param.name] = {
            type: param.type,
            description: param.description,
          };
          if (param.required) {
            inputSchema.required.push(param.name);
          }
        }
      }

      // Add query parameters
      if (endpoint.queryParams) {
        for (const param of endpoint.queryParams) {
          // Skip API key parameters, they'll be injected
          if (param.name === 'appid' || param.name === 'apiKey') {
            continue;
          }
          inputSchema.properties[param.name] = {
            type: param.type,
            description: param.description,
          };
          if (param.required) {
            inputSchema.required.push(param.name);
          }
        }
      }

      // Add body parameters
      if (endpoint.bodyParams) {
        for (const param of endpoint.bodyParams) {
          inputSchema.properties[param.name] = {
            type: param.type,
            description: param.description,
          };
          if (param.required) {
            inputSchema.required.push(param.name);
          }
        }
      }

      tools.push({
        name: `${api.name}_${endpoint.name}`,
        description: `${api.description} - ${endpoint.description}`,
        inputSchema,
      });
    }
  }

  return tools;
}

/**
 * Execute an API call based on tool name and arguments
 */
async function executeApiCall(toolName: string, args: any): Promise<any> {
  // Parse tool name to get API and endpoint
  const parts = toolName.split('_');
  const apiName = parts[0];
  const endpointName = parts.slice(1).join('_');

  // Find the API configuration
  const api = apis.find((a) => a.name === apiName);
  if (!api) {
    throw new Error(`API not found: ${apiName}`);
  }

  const endpoint = api.endpoints.find((e) => e.name === endpointName);
  if (!endpoint) {
    throw new Error(`Endpoint not found: ${endpointName}`);
  }

  // Build the request URL
  let path = endpoint.path;
  const pathParams: Record<string, string> = {};
  const queryParams: Record<string, string> = {};
  const bodyParams: any = {};

  // Extract path parameters
  if (endpoint.parameters) {
    for (const param of endpoint.parameters) {
      if (args[param.name] !== undefined) {
        pathParams[param.name] = String(args[param.name]);
      }
    }
  }

  // Extract query parameters
  if (endpoint.queryParams) {
    for (const param of endpoint.queryParams) {
      if (args[param.name] !== undefined) {
        queryParams[param.name] = String(args[param.name]);
      } else if (param.default !== undefined) {
        queryParams[param.name] = String(param.default);
      }
    }
  }

  // Inject API keys if required
  if (api.requiresAuth) {
    if (api.name === 'weather') {
      const apiKey = envVars.OPENWEATHER_API_KEY || envVars.WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('Weather API key not configured. Set OPENWEATHER_API_KEY environment variable.');
      }
      queryParams.appid = apiKey;
    }
  }

  // Extract body parameters
  if (endpoint.bodyParams) {
    for (const param of endpoint.bodyParams) {
      if (args[param.name] !== undefined) {
        bodyParams[param.name] = args[param.name];
      }
    }
  }

  // Replace path parameters
  path = replacePathParams(path, pathParams);

  // Make the HTTP request
  const url = `${api.baseUrl}${path}`;
  const result = await makeHttpRequest(url, {
    method: endpoint.method,
    headers: api.headers,
    queryParams,
    body: Object.keys(bodyParams).length > 0 ? bodyParams : undefined,
  });

  return result;
}

/**
 * Main server setup
 */
async function main() {
  const server = new Server(
    {
      name: 'mcp-api-gateway',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = createToolsFromApis(apis);
    return { tools };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      const result = await executeApiCall(name, args || {});
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  });

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('MCP API Gateway server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
