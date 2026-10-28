// Writes public/sitemap.xml and public/robots.txt for the site URL in .env / environment.
// Runs automatically before `npm run build` (see "prebuild" in package.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readEnvFile() {
  const out = {};
  for (const name of ['.env', '.env.production', '.env.local']) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !line.trim().startsWith('#')) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return out;
}

const env = { ...readEnvFile(), ...process.env };
const site = (env.VITE_SITE_URL || env.SITE_URL || 'https://www.your-domain.example').replace(/\/$/, '');

const routes = [
  ['/', '1.0', 'weekly'],
  ['/about', '0.7', 'monthly'],
  ['/services', '0.9', 'monthly'],
  ['/weddings', '0.9', 'monthly'],
  ['/menu', '0.8', 'monthly'],
  ['/gallery', '0.7', 'weekly'],
  ['/contact', '0.9', 'monthly'],
];
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(([p, pr, cf]) => `  <url>\n    <loc>${site}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${cf}</changefreq>\n    <priority>${pr}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;

fs.mkdirSync(path.join(root, 'public'), { recursive: true });
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap);
fs.writeFileSync(path.join(root, 'public/robots.txt'), robots);
console.log(`[seo] sitemap.xml + robots.txt written for ${site}`);
if (site.includes('your-domain.example')) {
  console.warn('[seo] VITE_SITE_URL is still the placeholder – set the real domain before deploying.');
}
