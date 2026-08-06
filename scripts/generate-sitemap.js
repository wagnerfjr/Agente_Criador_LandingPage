#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const baseURL = 'https://lrfitmethod.vercel.app';

const pages = [
  { url: '/', lastmod: new Date().toISOString().split('T')[0], priority: '1.0' },
  { url: '/#about', lastmod: new Date().toISOString().split('T')[0], priority: '0.8' },
  { url: '/#results', lastmod: new Date().toISOString().split('T')[0], priority: '0.9' },
  { url: '/#pricing', lastmod: new Date().toISOString().split('T')[0], priority: '0.95' },
  { url: '/#dashboard', lastmod: new Date().toISOString().split('T')[0], priority: '0.7' },
  { url: '/#reports', lastmod: new Date().toISOString().split('T')[0], priority: '0.7' },
  { url: '/#faq', lastmod: new Date().toISOString().split('T')[0], priority: '0.8' },
  { url: '/#contato', lastmod: new Date().toISOString().split('T')[0], priority: '0.9' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseURL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const publicDir = path.join(__dirname, '../lrfitmethod-landing/public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ Sitemap generated: public/sitemap.xml');
