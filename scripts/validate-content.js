#!/usr/bin/env node

/**
 * Validates lrfit.content.json and blocks deployment if any PENDENTE items remain.
 * Run: node scripts/validate-content.js
 */

const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '..', 'lrfit.content.json');

try {
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

  // Check for PENDENTE status
  if (content.meta.status === 'PENDENTE') {
    console.error('❌ DEPLOYMENT BLOCKED: Content status is PENDENTE');
    console.error(`   Reason: ${content.meta.statusReason}`);
    process.exit(1);
  }

  // Recursively find all PENDENTE strings
  const pendentes = [];

  function findPendentes(obj, path = '') {
    if (typeof obj === 'string' && obj.includes('PENDENTE')) {
      pendentes.push({
        path,
        value: obj
      });
    } else if (obj !== null && typeof obj === 'object') {
      for (const [key, value] of Object.entries(obj)) {
        findPendentes(value, path ? `${path}.${key}` : key);
      }
    }
  }

  findPendentes(content);

  if (pendentes.length > 0) {
    console.error('❌ DEPLOYMENT BLOCKED: Found PENDENTE placeholders');
    console.error(`\n   Total PENDENTE items: ${pendentes.length}\n`);

    pendentes.forEach((item, i) => {
      console.error(`   ${i + 1}. ${item.path}`);
      console.error(`      Value: "${item.value}"`);
    });

    console.error('\n   Action required: Replace all PENDENTE items with real content');
    console.error(`   Content file: ${contentPath}\n`);
    process.exit(1);
  }

  console.log('✅ Content validation passed!');
  console.log(`   Status: ${content.meta.status}`);
  console.log(`   Last updated: ${content.meta.lastUpdated}`);
  process.exit(0);

} catch (error) {
  console.error('❌ Error validating content:');
  console.error(error.message);
  process.exit(1);
}
