# MCP API Gateway

Universal Model Context Protocol (MCP) server for Claude Desktop with pre-configured integrations.

## Features

✨ **Pre-Configured APIs**
- Twitter/X (search, timeline)
- Google (search, maps, drive)
- LLM APIs (OpenAI, Anthropic, Gemini, Mistral, Deepseek)
- Brave Web Search
- Langfuse Analytics

🚀 **Installation**

```bash
# Option 1: NPx (Recommended)
npx @claus/mcp-api-gateway@latest setup

# Option 2: Docker
docker-compose up -d

# Option 3: Bash
curl https://github.com/claus/mcp-api-gateway-template/raw/main/install.sh | bash
```

## Quick Start

1. Install: `npx @claus/mcp-api-gateway@latest setup`
2. Configure: Copy `.env.example` to `.env` and add API keys
3. Restart Claude Desktop
4. Test: "Search twitter for Python news"

## Available Tools

- `twitter_search` - Search tweets
- `google_search` - Search Google  
- `llm_complete` - Call any LLM
- `search_brave` - Web search

## Configuration

Create `.env` with your API keys:

```env
TWITTER_BEARER_TOKEN=...
GOOGLE_API_KEY=...
OPENAI_API_KEY=...
BRAVE_API_KEY=...
```

## Development

```bash
npm install
npm run build
npm start
```

## License

MIT

---

**Status**: Production Ready ✅  
**Version**: 1.0.0
