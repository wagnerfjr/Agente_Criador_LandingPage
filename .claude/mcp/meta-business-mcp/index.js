#!/usr/bin/env node
const axios = require('axios');
const readline = require('readline');

const GRAPH_API_VERSION = 'v19.0';
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
        pixelId: response.data.pixel_id || response.data.id,
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
        pixels: response.data.data || []
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
              name: 'create_pixel',
              description: 'Create a Meta Pixel',
              inputSchema: {
                type: 'object',
                properties: {
                  pixelName: { type: 'string', description: 'Name of the pixel' },
                  website: { type: 'string', description: 'Website URL' }
                },
                required: ['pixelName', 'website']
              }
            },
            {
              name: 'get_pixels',
              description: 'List all pixels in the business account',
              inputSchema: { type: 'object', properties: {} }
            },
            {
              name: 'verify_pixel',
              description: 'Verify if a pixel is active',
              inputSchema: {
                type: 'object',
                properties: {
                  pixelId: { type: 'string', description: 'Pixel ID' }
                },
                required: ['pixelId']
              }
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
