# Denise Mae Chua, PhD — website

Astro static site. Replaces the old AcademicPages site at https://dmchua.github.io/about-me/.
Content editing guide for Denise: **[EDITING.md](EDITING.md)**.

## Develop

```bash
nvm use            # Node 22 LTS (.nvmrc)
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check + build to dist/ (must be 0 errors/warnings)
npm run check-links                # internal links + PDFs in dist/
npm run check-links -- --external  # also checks external links
npm run preview
```

Structure: `src/content/pages/*.md` (page text), `src/content/publications/*.md` (one per item),
`src/data/site.ts` (name, links, nav), `src/layouts/BaseLayout.astro` (meta/OG/JSON-LD),
`src/styles/global.css` (all styling; tokens at the top), `public/files/` (PDFs).

## Before launch: set the domain

Set `SITE_URL` in `astro.config.mjs` to the final domain. Canonical URLs, OpenGraph, the sitemap
and robots.txt all use it. It is a placeholder (`denise-chua.example.com`) until the domain is bought.

## Deploy (Cloudflare)

1. Create the GitHub repo (e.g. `dmchua/website`) and push `main`. Leave `dmchua/about-me` untouched for now.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
   - Framework preset: Astro · Build command: `npm run build` · Output directory: `dist`
   - Env var `NODE_VERSION=22`
   - (If you prefer Workers static assets instead of Pages, `wrangler.jsonc` is ready; build `npm run build`, deploy `npx wrangler deploy`.)
3. Every push to `main` then auto-deploys; other branches get preview URLs.
4. **Custom domain:** buy/transfer the domain into Cloudflare (Registrar), then project → **Custom domains** → add the apex (`example.com`) and `www.example.com`.
5. **HTTPS:** SSL/TLS → Edge Certificates → *Always Use HTTPS* on (HSTS optional once stable).
6. **www → apex:** Rules → Redirect Rules → template *Redirect from WWW to root* (301, preserve path + query).
7. Update `SITE_URL`, push, then submit `https://<domain>/sitemap-index.xml` in Google Search Console.

`public/_headers` sets security headers and long caching for hashed assets.

## Cut-over from the old site

Once the new domain is live:

```bash
node cutover/make-redirect-site.mjs https://<new-domain>
```

This writes `cutover/redirect-site/`: a redirect page (meta-refresh + canonical + JS) for every old URL
(`/about-me/`, `/research/`, `/teaching/`, `/cv/`, `/resources/`, `/contact/`, `/about/`) plus a catch-all 404.
In the `dmchua/about-me` repo, delete the Jekyll files, copy those files in, keep the three PDFs at the
repo root (old links point there), and commit. GitHub Pages then forwards everyone to the new domain.
Also update the "Personal website" line in the CV PDF.

## Migration notes (from dmchua/about-me @ b1fa0ad, 2026-09-30)

- Migrated: About, Research (publications list), Teaching, CV, Resources, Contact, profile photo, CV 2026, both handouts.
- Added: ORCID (from the CV), Research Officer role (from the CV), research-interests/current-project/PhD sections on Research (reusing her About text), CV summary (from the CV), handout descriptions.
- Dropped on purpose: `DMNChua_CV2024.pdf` and `DMNChua CV Updated.pdf` (old CVs); `dp.jpg`/`dp1.jpg` (older photos); all AcademicPages template placeholders (`_publications`, `_talks`, `_posts`, `_portfolio`, `_drafts`, `files/paper*.pdf`, talkmap, markdown/terms/archive/sitemap pages, demo images, demo comments); Google Analytics config (it had no ID).
- To confirm with Denise: the DRS 33rd abstract is listed as 2025 "…Effortful Swallowing in Healthy Adults" (Annual Meeting) on the old site but 2024 "…Effortful Swallowing Execution in Healthy Adults" (Annual Congress) on the CV. The site uses the website version.
- Typos: the old "exmaining" was already fixed upstream. None found in the migrated text.
