# Setup Roadmap
## Do SDD Para EXECUTE - Passo a Passo

**Created:** 2026-08-04  
**Status:** START HERE  
**Timeline:** 2-3 horas total de setup

---

## 📋 O Que Você Tem Agora

| Documento | Propósito | Leia Quando |
|-----------|-----------|------------|
| **SDD-LR-FIT-COMPLETE.md** | Spec técnica completa | Referência durante implementação |
| **EXECUTE-CHECKLIST.md** | Guia por task | Seu manual do dia-a-dia |
| **INFRASTRUCTURE-PLAN.md** | Setup MCP + automação | **COMECE AGORA** |
| **README-SDD.md** | Mapa visual | Overview rápido |
| **SETUP-ROADMAP.md** | Este arquivo | Seu guia de setup (você está aqui) |

---

## 🚀 Roadmap Completo

### PHASE 0: Infrastructure Setup (TODAY - 2-3 hours)
**Goal:** MCP servers ready, automation configured

```
PHASE 0A: Credentials (15 min)
  └─ Step 1: Meta Business Account ID
  └─ Step 2: Meta Access Token
  └─ Step 3: Vercel Token
  └─ Step 4: Save to ~/.env.meta

PHASE 0B: MCP Servers (30 min)
  └─ Step 1: Create meta-business-mcp
  └─ Step 2: Create vercel-mcp
  └─ Step 3: npm install on both

PHASE 0C: Integration (15 min)
  └─ Step 1: Configure ~/.claude/settings.local.json
  └─ Step 2: Test MCP connection
  └─ Step 3: Verify both MCPs working

PHASE 0D: Testing (15 min)
  └─ Step 1: Test Meta Pixel creation
  └─ Step 2: Test Vercel project info
  └─ Step 3: Clean up test data
  └─ ✅ CHECKPOINT: All automation ready

PHASE 1: Project Setup (4-5 weeks starting after Phase 0)
  └─ Task 0: Meta Pixel (now automated ✓)
  └─ Task 1: React Setup
  └─ Task 1.5: Content Schema
  └─ ... (continue as per EXECUTE-CHECKLIST)
  └─ Task 14: Vercel Deploy (now automated ✓)
  └─ Task 15: Setup Guide
  └─ ✅ CHECKPOINT: Landing live
```

---

## ⚡ Quick Start (Right Now!)

### Immediate Actions

**1️⃣ Read This in Order (30 min):**
```
1. SETUP-ROADMAP.md (this file) ← you are here
2. INFRASTRUCTURE-PLAN.md (Phase 1 Credentials section)
3. INFRASTRUCTURE-PLAN.md (Phase 2 MCP Setup section)
```

**2️⃣ Get Credentials (15 min):**
```bash
# INFRASTRUCTURE-PLAN.md → Meta Business API Setup → Step 1
# Follow the 3 steps to get:
#   - META_BUSINESS_ACCOUNT_ID
#   - META_ACCESS_TOKEN
#   - VERCEL_TOKEN
```

**3️⃣ Create ~/.env.meta (5 min):**
```bash
# In your home directory, create .env.meta file:
nano ~/.env.meta

# Add:
export META_BUSINESS_ACCOUNT_ID="123456789"
export META_ACCESS_TOKEN="EAAB...xyz"
export VERCEL_TOKEN="vercel_..."
export VERCEL_PROJECT_ID="lrfitmethod-landing"

# Save (Ctrl+X, Y, Enter in nano)

# Test:
source ~/.env.meta
echo $META_BUSINESS_ACCOUNT_ID  # Should print your ID
```

---

## 📍 Current Checklist

### Today (You are starting this)

- [ ] **Step 1:** Read INFRASTRUCTURE-PLAN.md (full document)
- [ ] **Step 2:** Get Meta Business Account ID (5 min)
- [ ] **Step 3:** Create Meta Access Token (5 min)
- [ ] **Step 4:** Create Vercel Token (5 min)
- [ ] **Step 5:** Create ~/.env.meta file (5 min)
- [ ] **Step 6:** Verify credentials work (5 min)

### Tomorrow (Phase 0B - Create MCP Servers)

- [ ] **Step 7:** Create meta-business-mcp directory + package.json + index.js (15 min)
- [ ] **Step 8:** Create vercel-mcp directory + package.json + index.js (15 min)
- [ ] **Step 9:** Run `npm install` in both directories (5 min)

### Day 3 (Phase 0C - Integration)

- [ ] **Step 10:** Create ~/.claude/settings.local.json (10 min)
- [ ] **Step 11:** Test MCP connection in Claude Code (5 min)
- [ ] **Step 12:** Run test automation (5 min)

### Day 4 (Phase 0D - Testing)

- [ ] **Step 13:** Test Meta Pixel creation automation (5 min)
- [ ] **Step 14:** Test Vercel project info automation (5 min)
- [ ] **Step 15:** Clean up test data (5 min)
- [ ] ✅ **READY FOR TASK 0**

---

## 📊 Detailed Steps

### TODAY - Get Credentials

#### Step 1: Meta Business Account ID (2 min)
```
Go to: https://business.facebook.com/
→ Settings (bottom left)
→ Business Settings
→ Business Info
→ Copy "Business ID" (format: 123456789)
```

#### Step 2: Meta Access Token (5 min)
```
Go to: https://developers.facebook.com/
→ Click Your Name (top right) → Create App
→ Select "Business" type
→ App Name: "LR Fit Method"
→ Click Create

After creation:
→ Settings → Basic
→ Copy "App ID" and "App Secret"

→ Tools → Graph API Explorer
→ App: [Select LR Fit Method app]
→ Token: [Click "Get Token" → "Get Access Token"]
→ Permissions:
   ☑ ads_management
   ☑ business_management
→ Copy token (format: EAAB...xyz)
   (It's a LONG string, copy completely)
```

#### Step 3: Vercel Token (3 min)
```
Go to: https://vercel.com/account/tokens
→ Click "Create Token"
→ Name: "LR Fit Method"
→ Expiration: "365 days"
→ Scopes: Check "projects (read)" and "deployments (read/write)"
→ Click "Create"
→ Copy token immediately (format: vercel_xxxx...)
```

#### Step 4: Create ~/.env.meta (5 min)
```bash
# Open terminal
nano ~/.env.meta

# Paste this (replace with YOUR actual values):
export META_BUSINESS_ACCOUNT_ID="YOUR_ID_HERE"
export META_ACCESS_TOKEN="EAAB_TOKEN_HERE"
export VERCEL_TOKEN="vercel_token_here"
export VERCEL_PROJECT_ID="lrfitmethod-landing"

# Save: Ctrl+X, then Y, then Enter

# Test it works:
source ~/.env.meta
echo "ID: $META_BUSINESS_ACCOUNT_ID"
echo "Meta Token: ${META_ACCESS_TOKEN:0:20}..."
echo "Vercel Token: ${VERCEL_TOKEN:0:20}..."
# All three should print something ✓
```

---

### TOMORROW - Create MCP Servers

#### Step 7: Create Meta MCP Server (15 min)

**Copy this code into terminal:**

```bash
# Create directory
mkdir -p ~/.claude/mcp/meta-business-mcp
cd ~/.claude/mcp/meta-business-mcp

# Create package.json
cat > package.json << 'EOF'
{
  "name": "meta-business-mcp",
  "version": "1.0.0",
  "description": "MCP server for Meta Business API",
  "main": "index.js",
  "dependencies": {
    "axios": "^1.6.0"
  }
}
EOF

# Install dependencies
npm install

# Create index.js - COPY FROM INFRASTRUCTURE-PLAN.md SECTION "Meta Business MCP Server"
# (I'll provide below for convenience)
```

**Copy this into `~/.claude/mcp/meta-business-mcp/index.js`:**

```javascript
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
}

const mcp = new MetaBusinessMCP();

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

#### Step 8: Create Vercel MCP Server (15 min)

**Copy this:**

```bash
# Create directory
mkdir -p ~/.claude/mcp/vercel-mcp
cd ~/.claude/mcp/vercel-mcp

# Create package.json
cat > package.json << 'EOF'
{
  "name": "vercel-mcp",
  "version": "1.0.0",
  "description": "MCP server for Vercel API",
  "main": "index.js",
  "dependencies": {
    "axios": "^1.6.0"
  }
}
EOF

# Install
npm install

# Create index.js - COPY FROM BELOW
```

**Copy this into `~/.claude/mcp/vercel-mcp/index.js`:**

```javascript
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
    try {
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

#### Step 9: npm install (5 min)

```bash
# Make sure both installed
ls ~/.claude/mcp/meta-business-mcp/node_modules
ls ~/.claude/mcp/vercel-mcp/node_modules

# Both should have a "node_modules" folder ✓
```

---

### DAY 3 - Integration with Claude Code

#### Step 10: Configure Claude Code (10 min)

**Create or edit `~/.claude/settings.local.json`:**

```bash
nano ~/.claude/settings.local.json
```

**Paste:**

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

**Save:** Ctrl+X, Y, Enter

---

#### Step 11: Test MCP in Claude Code (5 min)

**Restart Claude Code:**

```bash
# First, ensure env vars are loaded:
source ~/.env.meta

# Then launch Claude Code:
claude-code

# Inside Claude Code, type:
# "List all Meta Pixels in my business account"
# 
# Should respond with: [{ id, name }, ...]
```

---

#### Step 12: Quick Automation Test (5 min)

**In Claude Code, ask:**

```
"What are the Meta Business MCP capabilities available?"

Expected response:
- create_pixel: Create a new Meta Pixel
- get_pixels: List all existing pixels
- verify_pixel: Check pixel status

"What are the Vercel MCP capabilities?"

Expected response:
- trigger_deploy: Start a deployment
- get_deployment_status: Check deployment status
- set_env_var: Set environment variable
- get_project_info: Get project details
```

---

### DAY 4 - Testing Automations

#### Step 13: Test Meta Pixel Automation (5 min)

**In Claude Code:**

```
"Create a test Meta Pixel called 'TEST-LR-FIT' for website testlrfit.com"

Expected:
{
  "success": true,
  "pixelId": "123456789",
  "status": "created"
}

If successful, ✓ Meta MCP working!
```

---

#### Step 14: Test Vercel Automation (5 min)

**In Claude Code:**

```
"Get the LR Fit Method project info from Vercel"

Expected:
{
  "success": true,
  "projectId": "...",
  "name": "lrfitmethod-landing",
  "gitUrl": "https://github.com/...",
  "url": "lrfitmethod.vercel.app"
}

If successful, ✓ Vercel MCP working!
```

---

#### Step 15: Cleanup (5 min)

**Delete test pixel manually:**
```
Go to: https://business.facebook.com/
→ Data Executions (or Pixel section)
→ Find "TEST-LR-FIT"
→ Delete it
```

---

## ✅ Final Checklist

### Phase 0 Complete When:

- [ ] ~/.env.meta created with all 4 exports
- [ ] Meta credentials tested (echo commands work)
- [ ] Vercel credentials tested (echo commands work)
- [ ] ~/.claude/mcp/meta-business-mcp/ exists with index.js + node_modules
- [ ] ~/.claude/mcp/vercel-mcp/ exists with index.js + node_modules
- [ ] ~/.claude/settings.local.json created with MCP config
- [ ] Claude Code recognizes both MCPs
- [ ] Test pixel creation successful (and deleted)
- [ ] Test project info retrieval successful

### Status:
```
Phase 0 (Infrastructure Setup): ✅ COMPLETE
Phase 1 (Project EXECUTE):      ⏳ READY TO START (Task 0)
```

---

## 🎯 What's Next

**After Phase 0 is done:**
1. Open `EXECUTE-CHECKLIST.md`
2. Start with **Task 0: Meta Pixel Setup**
3. But this time it's automated! ✨
4. Continue with remaining tasks as usual

**Expected Timeline:**
- Phase 0: 2-3 hours (one-time setup)
- Phase 1: 4-5 weeks (actual implementation)
- **Total:** 5-6 weeks to MVP ✅

---

## 🆘 Need Help?

**During Phase 0 Setup:**
- Check INFRASTRUCTURE-PLAN.md Troubleshooting section
- Common issues: token format, wrong directory path, env vars not loaded

**After Phase 0:**
- Use EXECUTE-CHECKLIST.md for each task
- Refer to SDD-LR-FIT-COMPLETE.md for technical specs
- When stuck: Don't guess → Ask or say "não sei"

---

## Ready?

**Start now with Step 1 (Get Credentials)**

Should take ~2-3 hours total. You'll have full automation running by end of Day 4! 🚀

---

**Good luck! Questions? Ask in Portuguese, I'll help.**
