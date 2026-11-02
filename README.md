# Denise Mae Chua, PhD: website

Personal academic website of Denise Mae Chua, PhD, a swallowing and dysphagia researcher at the University of Hong Kong.

**Live at [denisechua.me](https://denisechua.me).** Built with [Astro](https://astro.build) and hosted on GitHub Pages.

To change page text or add a publication, see **[EDITING.md](EDITING.md)**. You only need to edit Markdown files.

## Develop

```bash
nvm use                            # Node 22 (.nvmrc)
npm install
npm run dev                        # http://localhost:4321 (add -- --host to open it on a phone)
npm run build                      # astro check + build to dist/. Must end with 0 errors and 0 warnings.
npm run check-links                # internal links and PDFs in dist/
npm run check-links -- --external  # also checks external links
npm run find-new-papers            # DOIs on ORCID or Crossref that the site doesn't have yet
```

## Where things live

| What | Where |
|---|---|
| Page text | `src/content/pages/*.md` |
| Publications, one file each | `src/content/publications/<year>-<slug>.md` (schema in `src/content.config.ts`) |
| Name, title, social links, menu | `src/data/site.ts` |
| Instagram posts for "Latest posts" | `src/data/instagram.ts` |
| Page shell, meta tags, light/dark script | `src/layouts/BaseLayout.astro` |
| Styles and color tokens | `src/styles/global.css` |
| PDFs (CV, handouts) | `public/files/` |
| Domain used for canonical URLs and the sitemap | `SITE_URL` in `astro.config.mjs` |

## Deploy

Every push to `master` deploys the site. You don't need to do anything else.

1. `.github/workflows/deploy.yml` runs `npm run build` and uploads `dist/` to GitHub Pages. It takes about a minute.
2. If the build fails, nothing is deployed and the current site stays online. The commit shows a red ✗ in GitHub.

Setup:

- **Hosting:** GitHub Pages on `dmchua/about-me`. The source is set to GitHub Actions, and the custom domain is `denisechua.me` with Enforce HTTPS on.
- **DNS:** Cloudflare, set to **DNS only** (grey cloud). There are 4 A records and 4 AAAA records for GitHub Pages, a `www` CNAME to `dmchua.github.io`, and a TXT record that verifies the domain to the `dmchua` account. Don't turn on the Cloudflare proxy, because GitHub needs direct traffic to renew the HTTPS certificate.
- **Old links:** GitHub redirects `dmchua.github.io/about-me/...` to the same path on `denisechua.me`. GitHub Pages ignores `public/_redirects` and `public/_headers`. To keep an old URL working, put a file at that path or add it to `redirects` in `astro.config.mjs`.

[docs/launch.md](docs/launch.md) has the full launch steps and the reason for each one.

## Project docs

- [docs/backlog.md](docs/backlog.md): open work, questions for Denise, and ideas
- [AGENTS.md](AGENTS.md): rules for AI agents working in this repo
- `.claude/skills/check-papers/`: the `/check-papers` skill, which finds new papers and drafts their files
