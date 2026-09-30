// Generates a redirect-only replacement for the old GitHub Pages repo (dmchua/about-me).
// Usage: node cutover/make-redirect-site.mjs https://your-new-domain.com
// Output: cutover/redirect-site/  → copy its contents into the old repo (after removing the Jekyll files).
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const target = (process.argv[2] || '').replace(/\/$/, '');
if (!/^https:\/\//.test(target)) {
  console.error('Pass the new site URL, e.g. node cutover/make-redirect-site.mjs https://denisechua.com');
  process.exit(1);
}
// old path (relative to /about-me/) → new path
const map = {
  '': '/', 'about/': '/', 'research/': '/research/', 'publications/': '/research/',
  'teaching/': '/teaching/', 'cv/': '/cv/', 'resources/': '/resources/', 'contact/': '/contact/',
};
const page = (to) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Moved to ${to}</title>
<meta http-equiv="refresh" content="0; url=${to}">
<link rel="canonical" href="${to}">
<script>location.replace(${JSON.stringify(to)} + location.hash)</script>
</head><body><p>This site has moved to <a href="${to}">${to}</a>.</p></body></html>
`;
const out = 'cutover/redirect-site';
for (const [from, to] of Object.entries(map)) {
  await mkdir(join(out, from), { recursive: true });
  await writeFile(join(out, from, 'index.html'), page(target + to));
}
await writeFile(join(out, '404.html'), page(target + '/'));
await writeFile(join(out, '.nojekyll'), '');
await writeFile(join(out, 'README.md'), `Denise's site has moved to ${target}.\n\nThis repo only holds redirects. The CV and handout PDFs are kept at their old paths so existing links keep working.\n`);
console.log(`Wrote ${out}/ → redirects to ${target}.
Also keep these files at the repo root so old PDF links still work:
  DMNChua_CV2026.pdf, Muscles of Swallowing.pdf, Neuroanatomy of Swallowing_Cranial Nerves.pdf`);
