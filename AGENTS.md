# AGENTS.md

Personal academic website for Denise Mae Chua, PhD (swallowing and dysphagia researcher, HKU). Astro 5 static site, live at https://denisechua.me.

## People

- **Denise** owns the repo `dmchua/about-me`, the Cloudflare account, and the content. Repo settings such as GitHub Pages need her `dmchua` login.
- **Sean** (her husband) maintains the site and relays her content decisions. He has push access, not admin. He does the GitHub settings and Cloudflare DNS himself, logged in as Denise in the "Denise Chrome Profile".

## Commands

```bash
npm install
npm run dev                  # http://localhost:4321 (add --host to preview on a phone)
npm run build                # astro check + build to dist/. Must end with 0 errors and 0 warnings.
npm run check-links          # internal links and PDFs in dist/ (add -- --external for outside links)
npm run find-new-papers      # DOIs on ORCID or Crossref that the site doesn't have (used by /check-papers)
```

Run `npm run build` before every commit.

## Where things live

| What | Where |
|---|---|
| Page text | `src/content/pages/*.md` |
| Publications, one file each | `src/content/publications/<year>-<slug>.md` (schema in `src/content.config.ts`) |
| Name, title, social links, menu | `src/data/site.ts` |
| Instagram posts for "Latest posts" | `src/data/instagram.ts` |
| Page shell, meta tags, light/dark script | `src/layouts/BaseLayout.astro` |
| Header and light/dark switch | `src/components/Header.astro` |
| Styles and color tokens (`light-dark()` pairs) | `src/styles/global.css` |
| PDFs (CV, handouts) | `public/files/` |
| Backlog, and how hosting is set up | `docs/backlog.md`, `docs/launch.md` |
| Editing guide for Denise | `EDITING.md` |
| Skill: find and draft new papers | `.claude/skills/check-papers/SKILL.md` |

## Deploy

- `.github/workflows/deploy.yml` builds the site and deploys it to GitHub Pages on every push to `master`. The `github-pages` environment only allows `master`. Other branches, such as the retired `astro-rebuild`, can't deploy.
- Cloudflare is DNS only, with the proxy off (grey cloud). Don't turn the proxy on, because GitHub needs direct traffic to issue and renew the HTTPS certificate. The records are listed in `docs/launch.md`.
- GitHub Pages can't do server redirects or custom headers. For an old URL to keep working, a file must exist at that path, or a redirect must be listed in `redirects` in `astro.config.mjs`.

## Content rules

- **Don't invent facts.** Check every date, title, and number against Denise's CV (`public/files/DMNChua_CV2026.pdf`) or the publisher's page. If the sources disagree, ask, and add the question to "Needs Denise" in `docs/backlog.md`.
- **Publications follow APA 7:** article titles in sentence case, journal names in title case, `pages` written as `"40(2), 327–335"` with an en dash, and `doi` as the bare DOI with no `https://doi.org/`. Write Denise's name exactly as `Chua, DMN.` so it shows in bold.
- **Design:** keep the Classic design in teal. The swallow figure (`SwallowFigure.astro`) appears only on the Research page.

## Working style

- Write user-facing text and replies in plain words and short sentences. Avoid em dashes and semicolons.
- Don't apply proposed content changes until Sean picks which ones to make.
- Track open work in `docs/backlog.md`. Move items to Done with the date.
- Commit or push only when asked.
