# Using This Template

This repository is designed to be used as a template for creating your own MCP API Gateway servers. Here's how to use it:

## Creating Your Own Repository from This Template

### Option 1: Using GitHub's Template Feature (Recommended)

1. Click the "Use this template" button at the top of this repository
2. Choose "Create a new repository"
3. Name your new repository
4. Clone your new repository

### Option 2: Manual Clone and Setup

```bash
# Clone this repository
git clone https://github.com/Clauskraft/mcp-api-gateway-template.git my-api-gateway

# Change to the directory
cd my-api-gateway

# Remove the original git history
rm -rf .git

# Initialize a new git repository
git init
git add .
git commit -m "Initial commit from template"

# Add your own remote
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## Customizing Your Gateway

### 1. Update Package Information

Edit `package.json`:
```json
{
  "name": "my-custom-api-gateway",
  "description": "My custom MCP server for specific APIs",
  "author": "Your Name",
  ...
}
```

### 2. Remove Unnecessary APIs

If you don't need the pre-configured APIs:
- Delete files from `src/apis/` that you don't need
- Update `src/apis/index.ts` to remove the imports and exports

### 3. Add Your Own APIs

Follow the pattern in `src/apis/weather.ts` or `src/apis/placeholder.ts`:

```typescript
// src/apis/myapi.ts
import { ApiConfig } from '../types/config.js';

export const myApi: ApiConfig = {
  name: 'myapi',
  baseUrl: 'https://api.example.com',
  description: 'Description of your API',
  requiresAuth: true,
  endpoints: [
    // Define your endpoints here
  ],
};
```

Then add it to `src/apis/index.ts`:
```typescript
import { myApi } from './myapi.js';

export const apis: ApiConfig[] = [
  myApi,
  // ... other APIs
];
```

### 4. Update Documentation

- Edit `README.md` to reflect your specific use case
- Update `QUICKSTART.md` with your setup instructions
- Modify `.env.example` with your required environment variables
- Update `claude_desktop_config.example.json` with your config

### 5. Handle Authentication

If your APIs require authentication, update the `executeApiCall` function in `src/index.ts` to inject the appropriate headers or parameters:

```typescript
// In src/index.ts, around line 150
if (api.requiresAuth) {
  if (api.name === 'myapi') {
    const apiKey = envVars.MY_API_KEY;
    if (!apiKey) {
      throw new Error('API key not configured');
    }
    queryParams.apiKey = apiKey;
    // Or add to headers:
    // headers['Authorization'] = `Bearer ${apiKey}`;
  }
}
```

### 6. Build and Test

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test your changes
# Update your Claude Desktop config and restart Claude
```

## Best Practices

1. **Version Control**: Commit your changes frequently
2. **Documentation**: Keep your README and guides up to date
3. **Testing**: Test each API endpoint thoroughly
4. **Security**: Never commit API keys or secrets
5. **Dependencies**: Keep dependencies updated regularly

## Tips

- Start with one API and add more gradually
- Use the JSONPlaceholder API as a reference for structure
- Test locally before deploying to production
- Consider rate limiting and error handling for production use

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review existing API configurations for examples
- Open an issue if you find bugs or have questions

## Sharing Your Template

If you create a useful specialized template (e.g., for specific industry APIs), consider:
- Making your repository public
- Adding it to the MCP ecosystem
- Contributing improvements back to this template
