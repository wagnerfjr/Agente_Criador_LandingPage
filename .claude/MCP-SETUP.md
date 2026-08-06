# MCP Setup - LR Fit Method Project

## Status: ✅ CONFIGURED LOCALLY

### What's Configured

Two MCP servers configured locally in this project:

1. **meta-business-mcp** — Meta Business API integration
   - Create pixels automatically
   - List and verify pixels
   - Located: `.claude/mcp/meta-business-mcp/`

2. **vercel-mcp** — Vercel API integration
   - Trigger deployments
   - Check deployment status
   - Set environment variables
   - Located: `.claude/mcp/vercel-mcp/`

### Configuration Files

```
.claude/
├── settings.local.json          ← MCP configuration
├── mcp/
│   ├── meta-business-mcp/
│   │   ├── package.json
│   │   ├── index.js
│   │   └── node_modules/
│   └── vercel-mcp/
│       ├── package.json
│       ├── index.js
│       └── node_modules/
```

### Environment Variables

Required variables in project `.env`:

```bash
# Meta Business API
META_ACCESS_TOKEN=EAAKg...
META_BUSINESS_ACCOUNT_ID=739092169225144

# Vercel API
TOKEN_VERCEL=vcp_32Rxd8Kh...
```

✅ All variables already in `.env` — no additional setup needed!

### How to Use

#### In Claude Code:

**Create a Meta Pixel:**
```
"Create a Meta Pixel called 'LR Fit Method' for lrfitmethod.vercel.app"
```

**List all pixels:**
```
"Use the meta-business MCP to list all pixels"
```

**Check Vercel project info:**
```
"Get project info from Vercel MCP"
```

**Deploy to Vercel:**
```
"Deploy the app to Vercel from GitHub"
```

### Testing MCP Connection

To verify MCPs are working:

1. Open Claude Code in this project
2. Run `/mcp` command — should show both servers connected
3. Test: "Use meta-business MCP to list all pixels"
4. Test: "Get project info from Vercel MCP"

### Troubleshooting

**MCP not appearing in Claude Code:**
1. Restart Claude Code
2. Verify `.env` has correct tokens
3. Check `.claude/settings.local.json` exists
4. Run: `/mcp reconnect`

**"Authentication failed" error:**
1. Verify `META_ACCESS_TOKEN` is valid (not expired)
2. Verify `TOKEN_VERCEL` is valid
3. Check `.env` file has correct values

**MCP works but returns errors:**
- Meta errors: Check `META_BUSINESS_ACCOUNT_ID` is correct
- Vercel errors: Check `VERCEL_PROJECT_ID` is set (currently: `lrfitmethod-landing`)

### Next Steps

Now that MCPs are configured locally:

1. ✅ Test both MCPs work
2. ✅ Use in automation tasks
3. ✅ Ready for Phase 4 (Testing) from INFRASTRUCTURE-PLAN.md

---

**Setup Date:** 2026-08-05  
**Status:** Ready for EXECUTE phase
