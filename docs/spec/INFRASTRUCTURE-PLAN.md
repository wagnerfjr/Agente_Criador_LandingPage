# Infrastructure Plan - MCP Integrations
## LR Fit Method - Automation & API Integration

**Status:** READY FOR SETUP  
**Created:** 2026-08-04  
**Owner:** Wagner (Setup) + Claude Code (Implementation)  
**Timeline:** 1-2 hours initial setup → 8-10 hours saved during EXECUTE

---

## Table of Contents
1. [Overview](#overview)
2. [MCP Architecture](#mcp-architecture)
3. [Meta Business API Setup](#meta-business-api-setup)
4. [Vercel API Setup](#vercel-api-setup)
5. [Automation Mapping](#automation-mapping)
6. [Security & Best Practices](#security--best-practices)
7. [Setup Timeline](#setup-timeline)
8. [Testing Checklist](#testing-checklist)

---

## Overview

### What This Solves

**Before (Manual):**
```
Task 0: Meta Pixel Setup → 30 min manual in Meta UI
Task 1: React Setup → 5 min to paste Pixel ID
Task 14: Vercel Deploy → 10 min wait + verify
Task 15: Setup Guide → 1 hour to create Ad campaigns manually
Total Manual Overhead: ~2 hours
```

**After (Automated with MCP):**
```
Task 0: Meta Pixel Setup → MCP creates pixel automatically (1 min)
Task 1: React Setup → Pixel ID auto-populated (0 min)
Task 14: Vercel Deploy → MCP deploys + monitors (1 min)
Task 15: Setup Guide → MCP creates 2 campaigns automatically (2 min)
Total Automated: ~4 min
Saved: ~2 hours ✅
```

### MCP Strategy

**What is MCP?** Model Context Protocol - allows Claude to call external APIs in a structured way.

**How it works:**
```
Claude Code                MCP Server (Lightweight)              External API
    ↓                            ↓                                   ↓
"Create Pixel XYZ" → [Meta MCP Server] → Meta Business API → Pixel created ✓
"Deploy to Vercel" → [Vercel MCP Server] → Vercel API → App deployed ✓
```

**Why MCP over direct API calls?**
- ✅ Standardized interface (all APIs look the same to Claude)
- ✅ Error handling built-in
- ✅ Token management automatic
- ✅ No hardcoding API credentials in Claude Code
- ✅ Reusable for future projects

---

## MCP Architecture

### Servers We'll Create/Use

```
MCP Infrastructure:
├─ meta-business-mcp (Create)
│  ├─ Meta Graph API endpoint
│  ├─ Business Account ID
│  ├─ Pixel creation + verification
│  └─ Campaign management (future)
│
├─ vercel-mcp (Create)
│  ├─ Vercel API endpoint
│  ├─ Deploy trigger
│  ├─ Environment variables
│  └─ Deployment status monitoring
│
└─ GitHub-mcp (Optional, can use native Bash)
   ├─ Repository operations
   └─ Deployment triggers (alternative to Vercel)
```

### Where MCP Servers Live

```
~/.claude/mcp/  (User MCP directory)
├─ meta-business-mcp/
│  ├─ index.js (MCP server code)
│  ├─ package.json
│  └─ README.md
│
├─ vercel-mcp/
│  ├─ index.js
│  ├─ package.json
│  └─ README.md
│
└─ config.json (MCP server configuration)
```

### How Claude Code Will Use Them

```json
// .claude/settings.json (or settings.local.json)
{
  "mcp_servers": [
    {
      "name": "meta-business",
      "type": "stdio",
      "command": "node",
      "args": ["~/.claude/mcp/meta-business-mcp/index.js"],
      "env": {
        "META_BUSINESS_ACCOUNT_ID": "{{secrets.META_BUSINESS_ACCOUNT_ID}}",
        "META_ACCESS_TOKEN": "{{secrets.META_ACCESS_TOKEN}}"
      }
    },
    {
      "name": "vercel",
      "type": "stdio",
      "command": "node",
      "args": ["~/.claude/mcp/vercel-mcp/index.js"],
      "env": {
        "VERCEL_TOKEN": "{{secrets.VERCEL_TOKEN}}"
      }
    }
  ]
}
```

---

## Meta Business API Setup

### Step 1: Get Credentials

**What You Need:**
1. Meta Business Account ID
2. Meta Access Token (with Graph API permissions)

**How to Get Them:**

#### 1.1 Find Your Business Account ID
```
1. Go to: https://business.facebook.com/
2. Settings → Business Settings → Business Info
3. Copy "Business ID" (format: 123456789)
```

#### 1.2 Create Access Token
```
1. Go to: https://developers.facebook.com/
2. Create App (or use existing) → "Business"
3. App Settings → Basic → Copy "App ID" and "App Secret"
4. Tools → Graph API Explorer
5. App: [Select your app]
6. Token: [Click "Get Token" → "Get Access Token" → Grant permissions]
7. Permissions needed:
   - ads_management
   - business_management
   - pages_read_engagement
8. Copy token (long string of letters/numbers)
   Format: EAAB...xyz
```

**Save These:**
```bash
# Create file: ~/.env.meta (don't commit to Git!)
export META_BUSINESS_ACCOUNT_ID="123456789"
export META_ACCESS_TOKEN="EAAB...xyz"
export META_APP_ID="987654321"
export META_APP_SECRET="your_app_secret_here"
```

---

### Step 2: Create Meta Business MCP Server

**Create the server directory:**
```bash
mkdir -p ~/.claude/mcp/meta-business-mcp
cd ~/.claude/mcp/meta-business-mcp
```

**Create `package.json`:**
```json
{
  "name": "meta-business-mcp",
  "version": "1.0.0",
  "description": "MCP server for Meta Business API integration",
  "main": "index.js",
  "dependencies": {
    "axios": "^1.6.0"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

**Run:**
```bash
npm install
```

**Create `index.js`:**
```javascript
// ~/.claude/mcp/meta-business-mcp/index.js
const axios = require('axios');

const GRAPH_API_VERSION = 'v18.0';
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

class MetaBusinessMCP {
  constructor() {
    this.accessToken = process.env.META_ACCESS_TOKEN;
    this.businessAccountId = process.env.META_BUSINESS_ACCOUNT_ID;
    
    if (!this.accessToken || !this.businessAccountId) {
      throw new Error('META_ACCESS_TOKEN and META_BUSINESS_ACCOUNT_ID required');
    }
  }

  async createPixel(pixelName, website) {
    /**
     * Creates a Meta Pixel
     * @param {string} pixelName - e.g., "LR Fit Method Landing"
     * @param {string} website - e.g., "lrfitmethod.com"
     * @returns {object} { pixelId, status, created }
     */
    try {
      const response = await axios.post(
        `${BASE_URL}/${this.businessAccountId}/owned_pixels`,
        {
          name: pixelName,
          website_url: website
        },
        {
          params: { access_token: this.accessToken }
        }
      );
      
      return {
        success: true,
        pixelId: response.data.pixel_id,
        pixelName: pixelName,
        status: 'created',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message,
        pixelName: pixelName
      };
    }
  }

  async getPixels() {
    /**
     * Lists all pixels in the business account
     * @returns {array} [ { id, name }, ... ]
     */
    try {
      const response = await axios.get(
        `${BASE_URL}/${this.businessAccountId}/owned_pixels`,
        {
          params: {
            access_token: this.accessToken,
            fields: 'id,name,creation_time'
          }
        }
      );
      
      return {
        success: true,
        pixels: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  async verifyPixel(pixelId) {
    /**
     * Checks if pixel is receiving events
     * @param {string} pixelId
     * @returns {object} { status, events_received }
     */
    try {
      const response = await axios.get(
        `${BASE_URL}/${pixelId}`,
        {
          params: {
            access_token: this.accessToken,
            fields: 'id,name,is_active'
          }
        }
      );
      
      return {
        success: true,
        pixelId: pixelId,
        isActive: response.data.is_active,
        name: response.data.name
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Future: add createCampaign, getCampaigns, etc.
}

// MCP Server Interface
const mcp = new MetaBusinessMCP();

// Tool Handlers (called by Claude)
const tools = {
  create_pixel: async (params) => {
    return await mcp.createPixel(params.pixelName, params.website);
  },
  get_pixels: async () => {
    return await mcp.getPixels();
  },
  verify_pixel: async (params) => {
    return await mcp.verifyPixel(params.pixelId);
  }
};

// stdout-based MCP communication
process.stdin.on('data', async (chunk) => {
  try {
    const request = JSON.parse(chunk.toString());
    const toolName = request.tool;
    const params = request.params || {};
    
    if (tools[toolName]) {
      const result = await tools[toolName](params);
      console.log(JSON.stringify({ success: true, result }));
    } else {
      console.log(JSON.stringify({ success: false, error: 'Unknown tool' }));
    }
  } catch (error) {
    console.log(JSON.stringify({ success: false, error: error.message }));
  }
});
```

---

## Vercel API Setup

### Step 1: Get Vercel Token

**How to Create:**
```
1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: "LR Fit Method"
4. Expiration: 365 days (or longer)
5. Scopes needed:
   - read (projects, deployments)
   - write (deployments, environment variables)
6. Copy token (format: vercel_xxx...)
```

**Save:**
```bash
# Append to ~/.env.meta (keep secure!)
export VERCEL_TOKEN="vercel_xxx..."
export VERCEL_PROJECT_ID="lrfitmethod-landing"
export VERCEL_TEAM_ID="your_team_id" # (if using team, else leave empty)
```

---

### Step 2: Create Vercel MCP Server

**Create:**
```bash
mkdir -p ~/.claude/mcp/vercel-mcp
cd ~/.claude/mcp/vercel-mcp
npm init -y
npm install axios
```

**Create `index.js`:**
```javascript
// ~/.claude/mcp/vercel-mcp/index.js
const axios = require('axios');

const BASE_URL = 'https://api.vercel.com';

class VercelMCP {
  constructor() {
    this.token = process.env.VERCEL_TOKEN;
    this.projectId = process.env.VERCEL_PROJECT_ID;
    
    if (!this.token) {
      throw new Error('VERCEL_TOKEN required');
    }
    
    this.headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }

  async triggerDeploy(gitUrl, branch = 'main') {
    /**
     * Triggers a deployment from GitHub
     * @param {string} gitUrl - GitHub repo URL
     * @param {string} branch - Branch to deploy
     * @returns {object} { deploymentUrl, status }
     */
    try {
      // Note: Vercel auto-deploys from GitHub, but we can trigger via API
      const response = await axios.post(
        `${BASE_URL}/v13/deployments`,
        {
          gitSource: {
            repo: gitUrl,
            ref: branch
          }
        },
        { headers: this.headers }
      );
      
      return {
        success: true,
        deploymentId: response.data.id,
        url: response.data.url,
        status: response.data.readyState,
        created: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  async getDeploymentStatus(deploymentId) {
    /**
     * Check deployment status
     * @param {string} deploymentId
     * @returns {object} { status, url, ready }
     */
    try {
      const response = await axios.get(
        `${BASE_URL}/v13/deployments/${deploymentId}`,
        { headers: this.headers }
      );
      
      return {
        success: true,
        deploymentId: deploymentId,
        status: response.data.readyState,
        url: response.data.url,
        ready: response.data.readyState === 'READY'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async setEnvironmentVariable(key, value, environment = 'production') {
    /**
     * Set environment variable in Vercel project
     * @param {string} key - Variable name (e.g., VITE_META_PIXEL_ID)
     * @param {string} value - Variable value
     * @param {string} environment - 'production', 'preview', 'development'
     * @returns {object} { success, key, environment }
     */
    try {
      const response = await axios.post(
        `${BASE_URL}/v9/projects/${this.projectId}/env`,
        {
          key: key,
          value: value,
          target: [environment]
        },
        { headers: this.headers }
      );
      
      return {
        success: true,
        key: key,
        environment: environment,
        set: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  async getProjectInfo() {
    /**
     * Get project details
     * @returns {object} { projectId, name, git, url }
     */
    try {
      const response = await axios.get(
        `${BASE_URL}/v9/projects/${this.projectId}`,
        { headers: this.headers }
      );
      
      return {
        success: true,
        projectId: response.data.id,
        name: response.data.name,
        gitUrl: response.data.link?.repo,
        url: response.data.alias?.[0] || response.data.name
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Tool Handlers
const vercel = new VercelMCP();

const tools = {
  trigger_deploy: async (params) => {
    return await vercel.triggerDeploy(params.gitUrl, params.branch || 'main');
  },
  get_deployment_status: async (params) => {
    return await vercel.getDeploymentStatus(params.deploymentId);
  },
  set_env_var: async (params) => {
    return await vercel.setEnvironmentVariable(params.key, params.value, params.environment || 'production');
  },
  get_project_info: async () => {
    return await vercel.getProjectInfo();
  }
};

// stdin communication
process.stdin.on('data', async (chunk) => {
  try {
    const request = JSON.parse(chunk.toString());
    const toolName = request.tool;
    const params = request.params || {};
    
    if (tools[toolName]) {
      const result = await tools[toolName](params);
      console.log(JSON.stringify({ success: true, result }));
    } else {
      console.log(JSON.stringify({ success: false, error: 'Unknown tool' }));
    }
  } catch (error) {
    console.log(JSON.stringify({ success: false, error: error.message }));
  }
});
```

---

## Automation Mapping

### Which Tasks Get Automated

#### Task 0: Meta Pixel Setup
**Before:** Manual 30 minutes
```
1. Go to Meta Business Suite
2. Navigate to Pixels
3. Create new pixel
4. Copy Pixel ID
5. Paste in .env.local
```

**After:** Automated 1 minute
```bash
# Claude Code calls MCP:
mcp.meta-business.create_pixel({
  pixelName: "LR Fit Method Landing",
  website: "lrfitmethod.vercel.app"
})
# → Returns { pixelId: "123456789" }
# → Auto-saves to .env.local
# → Done ✓
```

---

#### Task 1: React Setup
**Before:** Manual 5 minutes (paste Pixel ID)
**After:** Automated 0 minutes
```
Pixel ID already populated from Task 0 ✓
No manual work needed
```

---

#### Task 10: Meta Pixel Integration (Verification)
**Before:** Manual 15 minutes (test in browser + Meta Events Manager)
**After:** Automated 2 minutes
```bash
# Claude Code calls:
mcp.meta-business.verify_pixel({
  pixelId: "123456789"
})
# → Confirms pixel is active
# → Reports to console
# → Done ✓
```

---

#### Task 14: Vercel Deploy
**Before:** Manual 10 minutes (push + wait + verify)
**After:** Automated 2 minutes
```bash
# Claude Code calls:
mcp.vercel.trigger_deploy({
  gitUrl: "https://github.com/wagner/lrfitmethod-landing",
  branch: "main"
})
# → Deployment starts
# → Waits for completion (polls status)
# → Reports: "Landing live at https://lrfitmethod.vercel.app ✓"
# → Done ✓
```

---

#### Task 15: Setup Guide (Campaign Creation)
**Before:** Manual 1 hour (create 2 campaigns manually in Meta Ads Manager)
**After:** Automated 3 minutes
```bash
# Claude Code calls (Future - needs Meta Ads API):
mcp.meta-ads.create_campaign({
  name: "LR Fit - Renata",
  budget_daily: 100, # R$1-2 test
  url_params: "?trainer=renata",
  target_audience: "Brazil, ages 25-45, interested in fitness"
})
# → Campaign created automatically
# → Second campaign for Leandro
# → Done ✓
```

---

### Time Savings Summary

| Task | Manual | Automated | Saved |
|------|--------|-----------|-------|
| Task 0 | 30 min | 1 min | **29 min** |
| Task 1 | 5 min | 0 min | **5 min** |
| Task 10 | 15 min | 2 min | **13 min** |
| Task 14 | 10 min | 2 min | **8 min** |
| Task 15 (campaigns) | 60 min | 3 min | **57 min** |
| **Total** | **120 min** | **8 min** | **112 min (2 hours)** ✅ |

---

## Security & Best Practices

### 1. Token Management

**Never commit tokens to GitHub:**
```bash
# Create ~/.env.meta (local only, NOT in repo)
export META_ACCESS_TOKEN="EAAB..."
export META_BUSINESS_ACCOUNT_ID="123..."
export VERCEL_TOKEN="vercel_..."

# In .gitignore (if you create a config file):
.env.meta
.env.local
*.secret
```

**Use in Claude Code:**
```bash
# Before running Claude Code:
source ~/.env.meta
export META_ACCESS_TOKEN
export META_BUSINESS_ACCOUNT_ID
export VERCEL_TOKEN

# Then launch Claude Code
claude-code
```

Or add to `.claude/settings.local.json`:
```json
{
  "env": {
    "META_ACCESS_TOKEN": "${secrets.META_ACCESS_TOKEN}",
    "META_BUSINESS_ACCOUNT_ID": "${secrets.META_BUSINESS_ACCOUNT_ID}",
    "VERCEL_TOKEN": "${secrets.VERCEL_TOKEN}"
  }
}
```

---

### 2. Token Rotation

**Recommended:** Every 90 days
```
1. Generate new Vercel token: https://vercel.com/account/tokens
2. Generate new Meta token: https://developers.facebook.com/tools/debug/
3. Update ~/.env.meta
4. Test MCP connections
5. Delete old tokens
```

---

### 3. Permissions Best Practices

**Meta Access Token - Minimum Permissions:**
- ✅ ads_management (for pixel)
- ✅ business_management (for account access)
- ❌ pages_manage_metadata (not needed)
- ❌ pages_read_user_content (not needed)

**Vercel Token - Minimum Permissions:**
- ✅ Read projects
- ✅ Write deployments
- ✅ Read/write environment variables
- ❌ Delete projects (don't grant)
- ❌ Team admin (if possible, use project-level token)

---

### 4. API Rate Limiting

**Meta Graph API:**
- Rate limit: 200 calls/hour (for business account)
- Our usage: ~5 calls total across all tasks
- **No problem** ✓

**Vercel API:**
- Rate limit: 100 requests/minute
- Our usage: ~2 requests per deploy
- **No problem** ✓

---

### 5. Error Handling

**MCP servers should log errors:**
```javascript
// In index.js, all catch blocks should log:
console.error({
  error: error.message,
  timestamp: new Date().toISOString(),
  tool: toolName,
  params: params
});
```

---

## Setup Timeline

### Phase 1: Credential Gathering (15 min)

**Step 1.1: Meta Setup (5 min)**
- [ ] Go to https://business.facebook.com/
- [ ] Copy Business ID (Settings → Business Info)
- [ ] Go to https://developers.facebook.com/
- [ ] Create app or use existing
- [ ] Get Access Token (Graph API Explorer)
- [ ] Save to ~/.env.meta

**Step 1.2: Vercel Setup (5 min)**
- [ ] Go to https://vercel.com/account/tokens
- [ ] Create Token ("LR Fit Method")
- [ ] Copy token
- [ ] Save to ~/.env.meta

**Step 1.3: Verify Credentials (5 min)**
```bash
source ~/.env.meta
echo "Meta Business Account: $META_BUSINESS_ACCOUNT_ID"
echo "Meta Token: ${META_ACCESS_TOKEN:0:20}..."
echo "Vercel Token: ${VERCEL_TOKEN:0:20}..."
# Should all print ✓
```

---

### Phase 2: MCP Server Setup (30 min)

**Step 2.1: Create Meta MCP Server (15 min)**
```bash
mkdir -p ~/.claude/mcp/meta-business-mcp
cd ~/.claude/mcp/meta-business-mcp
cat > package.json << 'EOF'
{
  "name": "meta-business-mcp",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "axios": "^1.6.0"
  }
}
EOF

npm install

# Copy index.js code from section above
# (I'll provide file download link below)
```

**Step 2.2: Create Vercel MCP Server (15 min)**
```bash
mkdir -p ~/.claude/mcp/vercel-mcp
cd ~/.claude/mcp/vercel-mcp
cat > package.json << 'EOF'
{
  "name": "vercel-mcp",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "axios": "^1.6.0"
  }
}
EOF

npm install

# Copy index.js code from section above
```

---

### Phase 3: Claude Code Integration (15 min)

**Step 3.1: Configure MCP in Claude Code (10 min)**

Create/edit `~/.claude/settings.local.json`:
```json
{
  "mcp_servers": [
    {
      "name": "meta-business",
      "type": "stdio",
      "command": "node",
      "args": ["~/.claude/mcp/meta-business-mcp/index.js"],
      "env": {
        "META_ACCESS_TOKEN": "${env.META_ACCESS_TOKEN}",
        "META_BUSINESS_ACCOUNT_ID": "${env.META_BUSINESS_ACCOUNT_ID}"
      }
    },
    {
      "name": "vercel",
      "type": "stdio",
      "command": "node",
      "args": ["~/.claude/mcp/vercel-mcp/index.js"],
      "env": {
        "VERCEL_TOKEN": "${env.VERCEL_TOKEN}",
        "VERCEL_PROJECT_ID": "lrfitmethod-landing"
      }
    }
  ]
}
```

**Step 3.2: Test MCP Connection (5 min)**
```bash
# Restart Claude Code
# In Claude Code, test:
# "Use MCP to list all Meta pixels"
# Should show: [ { id, name }, ... ]
```

---

### Phase 4: Test Automation (15 min)

**Step 4.1: Test Meta Pixel Creation**
```bash
# In Claude Code:
# "Create a test Meta Pixel called 'TEST-LR-FIT'"
# Should return: { pixelId, status: 'created' }
```

**Step 4.2: Test Vercel Integration**
```bash
# In Claude Code:
# "Get the LR Fit Method project info from Vercel"
# Should return: { projectId, name, gitUrl, url }
```

**Step 4.3: Clean Up Test Data**
```bash
# Delete test pixel from Meta Business Suite manually
# (MCP servers don't have delete yet)
```

---

### Phase 5: Ready for Task 0 (Start EXECUTE)

**Checkpoint: All MCP Ready ✓**
- [ ] Meta credentials working (pixel creation test passed)
- [ ] Vercel credentials working (project info test passed)
- [ ] Claude Code can call both MCPs
- [ ] No errors in logs

**Next:** Begin Task 0 with full automation

---

## Testing Checklist

### Pre-Flight Tests (Before Task 0)

**MCP Setup Test:**
```bash
# Test 1: Meta API Connection
source ~/.env.meta
cd ~/.claude/mcp/meta-business-mcp
node -e "
const axios = require('axios');
axios.get('https://graph.facebook.com/v18.0/' + process.env.META_BUSINESS_ACCOUNT_ID + '/owned_pixels', {
  params: { access_token: process.env.META_ACCESS_TOKEN, fields: 'id,name' }
}).then(r => console.log('✓ Meta API working')).catch(e => console.log('✗ Meta API error:', e.message));
"

# Test 2: Vercel API Connection
source ~/.env.meta
cd ~/.claude/mcp/vercel-mcp
node -e "
const axios = require('axios');
axios.get('https://api.vercel.com/v9/projects/lrfitmethod-landing', {
  headers: { 'Authorization': 'Bearer ' + process.env.VERCEL_TOKEN }
}).then(r => console.log('✓ Vercel API working')).catch(e => console.log('✗ Vercel API error:', e.message));
"
```

**Expected Output:**
```
✓ Meta API working
✓ Vercel API working
```

---

### During EXECUTE Tests

**Task 0 Automation Test:**
- [ ] MCP creates pixel automatically
- [ ] Pixel ID returned and verified
- [ ] Pixel ID saved to .env.local
- [ ] No manual UI interaction needed

**Task 14 Automation Test:**
- [ ] MCP detects GitHub push
- [ ] Triggers Vercel deployment
- [ ] Monitors deployment status
- [ ] Reports live URL
- [ ] No manual Vercel dashboard visit needed

---

## Troubleshooting

### "MCP server not found"
**Solution:**
```bash
# Verify path exists:
ls ~/.claude/mcp/meta-business-mcp/index.js
ls ~/.claude/mcp/vercel-mcp/index.js

# Verify settings.local.json has correct paths:
cat ~/.claude/settings.local.json | grep "args"

# Check Claude Code logs:
tail -f ~/.claude/logs/claude-code.log
```

---

### "CORS error from Meta API"
**Solution:**
- Not a CORS issue (MCP runs server-side)
- Likely: Invalid token or Business Account ID
- **Test:**
```bash
source ~/.env.meta
curl -H "Authorization: Bearer $META_ACCESS_TOKEN" \
  "https://graph.facebook.com/v18.0/${META_BUSINESS_ACCOUNT_ID}?fields=name"
# Should return: { "name": "...", "id": "..." }
```

---

### "Vercel token rejected"
**Solution:**
- Token expired or revoked
- Wrong scopes
- **Create new token:**
  1. Go to https://vercel.com/account/tokens
  2. Delete old token
  3. Create new: name="LR Fit", expiration="365 days"
  4. Copy and update ~/.env.meta

---

### "MCP works locally but Claude Code can't access"
**Solution:**
```bash
# Ensure environment vars exported before launching Claude Code:
source ~/.env.meta
echo $META_ACCESS_TOKEN # Should print something
echo $VERCEL_TOKEN       # Should print something

# Then launch Claude Code:
claude-code

# In Claude Code, check settings:
# Settings → MCP Servers → should list both servers
```

---

## Future Enhancements

**Phase 2 (Deferred):**
- [ ] Add Meta Ads API (create campaigns automatically)
- [ ] Add Supabase MCP (for custom dashboard later)
- [ ] Add GitHub MCP (for automated pull requests)
- [ ] Add Slack MCP (for notifications)

**Phase 3 (Product):**
- [ ] MCP server for agente gerador (JSON → Vercel deploy)
- [ ] Analytics MCP (pull data from Meta Ads Manager)

---

## Setup Files to Download/Create

All MCP code is above. Quick links:

1. **~/.env.meta** (Create manually, keep secret)
   ```bash
   export META_BUSINESS_ACCOUNT_ID="..."
   export META_ACCESS_TOKEN="..."
   export VERCEL_TOKEN="..."
   export VERCEL_PROJECT_ID="lrfitmethod-landing"
   ```

2. **~/.claude/mcp/meta-business-mcp/index.js** (Copy from section above)

3. **~/.claude/mcp/vercel-mcp/index.js** (Copy from section above)

4. **~/.claude/settings.local.json** (Create from section above)

---

## Next Steps

**Right Now:**
1. ✅ Complete Phase 1 (credential gathering) → 15 min
2. ✅ Complete Phase 2 (MCP server creation) → 30 min
3. ✅ Complete Phase 3 (Claude Code integration) → 15 min
4. ✅ Complete Phase 4 (testing) → 15 min

**Total Setup Time:** ~75 minutes (but one-time investment)

**After Setup:**
- Task 0 now takes 1 min instead of 30 min
- Task 14 now takes 2 min instead of 10 min
- Saves 2 hours across entire EXECUTE phase ✅

---

**Setup Status:** READY TO START  
**Owner:** Wagner (setup) + Claude Code (automation)  
**Timeline:** 1-2 hours to fully setup, then automatic from Task 0 onwards

**Ready to begin Phase 1? Let's go! 🚀**
