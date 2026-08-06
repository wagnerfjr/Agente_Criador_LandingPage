#!/usr/bin/env node

/**
 * Validates src/content/lrfit.content.json and blocks deployment if any
 * "STATUS: PENDENTE" placeholders remain. See docs/spec/CONTENT-SCHEMA.md.
 * Run: node scripts/validate-content.js
 */

const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '..', 'lrfitmethod-landing', 'src', 'content', 'lrfit.content.json');

function findPending(obj, keyPath = '') {
  const pending = [];
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = keyPath ? `${keyPath}.${key}` : key;
    if (typeof value === 'string' && value.startsWith('STATUS: PENDENTE')) {
      pending.push(currentPath);
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (item !== null && typeof item === 'object') {
          pending.push(...findPending(item, `${currentPath}[${i}]`));
        }
      });
    } else if (value !== null && typeof value === 'object') {
      pending.push(...findPending(value, currentPath));
    }
  }
  return pending;
}

try {
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  const pending = findPending(content);

  if (pending.length > 0) {
    console.error('❌ Campos pendentes antes do deploy final:');
    pending.forEach((p) => console.error(`   - ${p}`));
    process.exit(1);
  }

  console.log('✅ Content.json completo, pronto pra deploy.');
  process.exit(0);
} catch (error) {
  console.error('❌ Error validating content:');
  console.error(error.message);
  process.exit(1);
}
