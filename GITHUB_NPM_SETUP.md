# GitHub + NPM Setup Guide

Project is 100% ready. Just need 2 final steps:

## STEP 1: Push to GitHub

### 1a. Create GitHub Repository
```bash
# Go to: https://github.com/new
# Fill in:
#   Repository name: mcp-api-gateway-template
#   Description: Universal MCP server for Claude Desktop with pre-configured APIs
#   Public: YES
#   Add .gitignore: NO (already have it)
#   Add LICENSE: NO (already have it)
#   ✅ Create repository
```

### 1b. Add Remote & Push
```bash
cd C:\Users\claus\Projects\mcp-api-gateway-template

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/mcp-api-gateway-template.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 1c. Enable Template Repository
```bash
# On GitHub:
# 1. Go to your repo Settings
# 2. Scroll to "Repository templates"
# 3. Check "Template repository"
# 4. Save
```

---

## STEP 2: Publish to NPM

### 2a. Setup NPM Account
```bash
# If you don't have an npm account:
# Go to: https://www.npmjs.com/signup

# If you already have one:
npm login
# Enter: username, password, email, OTP (2FA if enabled)
```

### 2b. Publish Package
```bash
cd C:\Users\claus\Projects\mcp-api-gateway-template

# First build
npm run build

# Publish
npm publish --access public
```

### 2c: Verify Publishing
```bash
# Check on npm: https://www.npmjs.com/package/@claus/mcp-api-gateway

# Or from terminal:
npm info @claus/mcp-api-gateway
```

---

## VERIFICATION

### On GitHub
- ✅ Repo at: `https://github.com/USERNAME/mcp-api-gateway-template`
- ✅ Template enabled (badge appears on repo)
- ✅ Clone as template: "Use this template" button visible

### On NPM
- ✅ Package at: `https://www.npmjs.com/package/@claus/mcp-api-gateway`
- ✅ Can install: `npm install @claus/mcp-api-gateway`
- ✅ Can use via npx: `npx @claus/mcp-api-gateway@latest setup`

---

## USE CASES

### For Others
```bash
# Clone template
git clone https://github.com/USERNAME/mcp-api-gateway-template.git my-gateway
cd my-gateway
npm install
npm run setup
```

### Or Install Globally
```bash
npx @claus/mcp-api-gateway@latest setup
```

### Or Use in Claude Desktop
```json
{
  "mcpServers": {
    "api-gateway": {
      "command": "npx",
      "args": ["@claus/mcp-api-gateway"]
    }
  }
}
```

---

## NEXT STEPS

1. **Create GitHub repo** (link above)
2. **Run `git push`** from this directory
3. **Login to npm**
4. **Run `npm publish`**
5. **Enable template on GitHub**
6. **Done!** 🚀

---

## WHAT YOU'LL HAVE

✅ **GitHub Template Repository**
- Users can click "Use this template"
- Full source code visible
- MIT License included
- Production ready

✅ **NPM Package**
- `npm install @claus/mcp-api-gateway`
- `npx @claus/mcp-api-gateway@latest` (auto-update)
- Pre-configured with 9 APIs
- Easy setup command

✅ **Documentation**
- README with quick start
- .cursorrules for IDE integration
- .env.example for configuration
- Makefile for common commands

---

**Status**: All code ready - just need to execute git push + npm publish!

Questions? Check GitHub Issues on your repo.
