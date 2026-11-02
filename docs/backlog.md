# Backlog

Work for Denise's website, grouped by status. Move an item to **Done** when it ships, and add the date.

## Next

- **Launch on `denisechua.me`.** Follow the steps in [launch.md](launch.md). Owners: Sean (Cloudflare DNS and GitHub Pages settings, logged in as Denise), Claude (deploy workflow, push to `master`, checks).
- **Check the DNS records against GitHub's docs before adding them.** The A records (`185.199.108.153` to `185.199.111.153`) are GitHub Pages' servers, listed in "Managing a custom domain for your GitHub Pages site". Optional IPv6 `AAAA` records: `2606:50c0:8000::153` to `2606:50c0:8003::153`.
- **Add Instagram posts to "Latest posts".** Paste post links into `src/data/instagram.ts`. Until a link is there, the About page shows a card that links to `@thebolusbrief`.

- **Test the `/check-papers` skill.** Run it in Claude Code. Check that it finds nothing today, then test a draft by temporarily removing a publication file. Skill: `.claude/skills/check-papers/SKILL.md`. Script: `scripts/find-new-papers.mjs`.

## Needs Denise

- Confirm the DRS 33rd abstract title: does it include the word "Execution"? The website and the CV disagree.
- Fix the CV PDF: the DRS 33rd abstract is 2025 and "Annual Meeting", not 2024 and "Annual Congress".
- Fix the cranial nerves handout PDF: "Opthalmic" should be "Ophthalmic".
- When the fixed CV and handout arrive, replace them in `public/files/`.
- Add the 2025 mapping review (10.1080/17549507.2025.2573336) to ORCID, and turn on Crossref auto-update in ORCID, so `/check-papers` finds future papers.
- After launch, update the website link in the CV PDF, ORCID, LinkedIn, X, and the HKU lab page.

## Ideas

- Analytics: Cloudflare Web Analytics (needs the site token from the Cloudflare dashboard) plus Google Search Console.
- Find new papers automatically: a weekly GitHub Action that runs `npm run find-new-papers` and opens a PR. Try the `/check-papers` skill first.
- Rewrite the stale "Deploy (Cloudflare)" and "Cut-over" sections of `README.md`, and remove `wrangler.jsonc` and `cutover/`.
- Add Google Scholar and HKU Scholars Hub links.
- Show the newest Instagram posts automatically. This needs the Instagram API, a Business or Creator account, and a scheduled rebuild.

## Done

- 2026-11-02: About page kept with the timeline, no "Hello" opener, and the RSLP line.
- 2026-11-02: Old PDF links: new paths in `files/` only. Old links such as `/Muscles of Swallowing.pdf` break after launch.
- 2026-11-02: Deploy moved from `astro-rebuild` to `master`. The first run failed because the `github-pages` environment only allows `master`.

- 2026-10-10: Content review fixes, APA citations, final page numbers.
- 2026-10-10: Classic design chosen. Swallow figure behind the Research page.
- 2026-10-10: Domain `denisechua.me` registered at Cloudflare and set as `SITE_URL`.
