# Backlog

Work for Denise's website, grouped by status. Move an item to **Done** when it ships, and add the date.

## Next

- **Add Instagram posts to "Latest posts".** Paste post links into `src/data/instagram.ts`. Until a link is there, the About page shows a card that links to `@thebolusbrief`.
- **Test the `/check-papers` skill.** Run it in Claude Code. Check that it finds nothing today, then test a draft by temporarily removing a publication file. Skill: `.claude/skills/check-papers/SKILL.md`. Script: `scripts/find-new-papers.mjs`.

## Needs Denise

- Confirm the DRS 33rd abstract title: does it include the word "Execution"? The website and the CV disagree.
- Fix the CV PDF: the DRS 33rd abstract is 2025 and "Annual Meeting", not 2024 and "Annual Congress".
- Fix the cranial nerves handout PDF: "Opthalmic" should be "Ophthalmic".
- When the fixed CV and handout arrive, replace them in `public/files/`.
- Add the 2025 mapping review (10.1080/17549507.2025.2573336) to ORCID, and turn on Crossref auto-update in ORCID, so `/check-papers` finds future papers.
- Update the website link to `https://denisechua.me` in the CV PDF, ORCID, LinkedIn, X, and the HKU lab page.

## Ideas

- Analytics: Cloudflare Web Analytics (a script tag with the site token, works without the proxy) plus Google Search Console with `https://denisechua.me/sitemap-index.xml`.
- Find new papers automatically: a weekly GitHub Action that runs `npm run find-new-papers` and opens a PR. Try the `/check-papers` skill first.
- Add Google Scholar and HKU Scholars Hub links.
- Show the newest Instagram posts automatically. This needs the Instagram API, a Business or Creator account, and a scheduled rebuild.

## Done

- 2026-11-03: README rewritten for the live setup. Removed `wrangler.jsonc` and `cutover/` (old Cloudflare plan).
- 2026-11-03: Docs checked against the live setup. `docs/launch.md` is now a record of the hosting setup. Removed `public/_redirects` and `public/_headers`, which GitHub Pages ignores.
- 2026-11-03: Light/dark switch in the header. `http://` now redirects to `https://`.
- 2026-11-02: Launched on `denisechua.me`. DNS in Cloudflare (4 A, 4 AAAA, `www` CNAME, all DNS only), domain verified on the `dmchua` account (TXT `_github-pages-challenge-dmchua`), Pages Source set to GitHub Actions, custom domain set, Enforce HTTPS on. Certificate covers apex and www, expires 2027-01-31, renewed by GitHub.
- 2026-11-02: About page kept with the timeline, no "Hello" opener, and the RSLP line.
- 2026-11-02: Old PDF links: new paths in `files/` only. Old links such as `/Muscles of Swallowing.pdf` break after launch.
- 2026-11-02: Deploy moved from `astro-rebuild` to `master`. The first run failed because the `github-pages` environment only allows `master`.
- 2026-10-10: Content review fixes, APA citations, final page numbers.
- 2026-10-10: Classic design chosen. Swallow figure behind the Research page.
- 2026-10-10: Domain `denisechua.me` registered at Cloudflare and set as `SITE_URL`.
