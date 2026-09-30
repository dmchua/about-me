// Checks every internal link/src in dist/ resolves to a built file. Run after `npm run build`.
// Usage: npm run check-links            (internal only)
//        npm run check-links -- --external   (also HEAD-checks external links)
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const DIST = resolve('dist');
const checkExternal = process.argv.includes('--external');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}
async function exists(p) { try { await stat(p); return true; } catch { return false; } }

const broken = [];
const external = new Set();
let count = 0;
for (const file of await walk(DIST)) {
  const html = await readFile(file, 'utf8');
  for (const [, url] of html.matchAll(/\s(?:href|src|data)="([^"]+)"/g)) {
    if (/^(mailto:|tel:|data:|#)/.test(url)) continue;
    if (/^https?:\/\//.test(url)) { external.add(url); continue; }
    count++;
    const clean = decodeURIComponent(url.split(/[?#]/)[0]);
    const base = clean.startsWith('/') ? DIST : dirname(file);
    let target = join(base, clean);
    if (clean.endsWith('/')) target = join(target, 'index.html');
    if (!(await exists(target))) broken.push(`${file.replace(DIST, '')} -> ${url}`);
  }
}
if (checkExternal) {
  for (const url of external) {
    if (url.includes('.example.com')) continue; // placeholder domain (canonical/OG) until launch
    try {
      const r = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 link-check' } });
      if (r.status >= 400 && ![403, 429, 999].includes(r.status)) broken.push(`external ${r.status} -> ${url}`);
    } catch (e) { broken.push(`external ERR -> ${url} (${e.message})`); }
  }
}
console.log(`Checked ${count} internal links${checkExternal ? ` and ${external.size} external` : ''}.`);
if (broken.length) { console.error('Broken:\n  ' + broken.join('\n  ')); process.exit(1); }
console.log('All links OK.');
