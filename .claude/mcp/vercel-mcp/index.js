#!/usr/bin/env node
const axios = require('axios');
const readline = require('readline');

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
      if (!this.projectId) {
        return {
          success: false,
          error: 'VERCEL_PROJECT_ID not set'
        };
      }

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
      if (!this.projectId) {
        return {
          success: false,
          error: 'VERCEL_PROJECT_ID not set'
        };
      }

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

// MCP JSON-RPC Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', async (line) => {
  try {
    const request = JSON.parse(line);

    if (request.method === 'tools/list') {
      console.log(JSON.stringify({
        jsonrpc: '2.0',
        id: request.id,
        result: {
          tools: [
            {
              name: 'trigger_deploy',
              description: 'Trigger a deployment on Vercel',
              inputSchema: {
                type: 'object',
                properties: {
                  gitUrl: { type: 'string', description: 'GitHub repository URL' },
                  branch: { type: 'string', description: 'Branch to deploy (default: main)' }
                },
                required: ['gitUrl']
              }
            },
            {
              name: 'get_deployment_status',
              description: 'Check the status of a deployment',
              inputSchema: {
                type: 'object',
                properties: {
                  deploymentId: { type: 'string', description: 'Deployment ID' }
                },
                required: ['deploymentId']
              }
            },
            {
              name: 'set_env_var',
              description: 'Set an environment variable in Vercel project',
              inputSchema: {
                type: 'object',
                properties: {
                  key: { type: 'string', description: 'Variable name' },
                  value: { type: 'string', description: 'Variable value' },
                  environment: { type: 'string', description: 'Environment (production, preview, development)' }
                },
                required: ['key', 'value']
              }
            },
            {
              name: 'get_project_info',
              description: 'Get Vercel project information',
              inputSchema: { type: 'object', properties: {} }
            }
          ]
        }
      }));
    } else if (request.method === 'tools/call') {
      const { name, arguments: args } = request.params;
      const result = await tools[name](args || {});
      console.log(JSON.stringify({
        jsonrpc: '2.0',
        id: request.id,
        result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      }));
    }
  } catch (error) {
    console.log(JSON.stringify({
      jsonrpc: '2.0',
      error: { code: -32700, message: error.message }
    }));
  }
});

rl.on('close', () => {
  process.exit(0);
});
