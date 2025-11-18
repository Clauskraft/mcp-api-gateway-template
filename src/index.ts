import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from "@modelcontextprotocol/sdk/types.js";

const tools: Tool[] = [
  {
    name: "twitter_search",
    description: "Search Twitter for posts",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        max_results: { type: "number", description: "Max results", default: 10 }
      },
      required: ["query"]
    }
  },
  {
    name: "google_search",
    description: "Search Google",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        num: { type: "number", description: "Number of results", default: 10 }
      },
      required: ["query"]
    }
  },
  {
    name: "llm_complete",
    description: "Call LLM (OpenAI, Anthropic, Gemini, etc)",
    inputSchema: {
      type: "object",
      properties: {
        model: { type: "string", description: "Model name", default: "gpt-3.5-turbo" },
        prompt: { type: "string", description: "Prompt" },
        temperature: { type: "number", description: "Temperature (0-2)", default: 0.7 }
      },
      required: ["prompt"]
    }
  },
  {
    name: "search_brave",
    description: "Search the web with Brave",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        count: { type: "number", description: "Number of results", default: 10 }
      },
      required: ["query"]
    }
  }
];

const server = new Server(
  {
    name: "mcp-api-gateway",
    version: "1.0.0"
  },
  {
    capabilities: {}
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  console.log(`Tool called: ${name}`, args);
  return {
    isError: false,
    content: [{ type: "text", text: `Result from ${name}` }]
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP API Gateway started");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
