# Backlog

Work for Denise's website, grouped by status. Move an item to **Done** when it ships, and add the date.

## Next

- **Launch on `denisechua.me`.** Follow the steps in [launch.md](launch.md). Owners: Sean (Cloudflare DNS), Denise (GitHub Pages settings), Claude (deploy workflow and checks).
- **Decide on the About page changes.** All six proposed changes are applied in `src/content/pages/about.md` but not committed. Sean paused them ("Wait no"). Keep all, keep some, or undo with `git checkout src/content/pages/about.md`. The changes:
  1. Remove the "Hello! I'm Denise…" sentence. The header already shows her role, lab, and HKU.
  2. Open with the one-line summary ("I study how the brain controls swallowing…").
  3. Cut the "Throughout the years…" opener in "My research interest".
  4. Turn "My background and experience" into a timeline.
  5. Add the RSLP credential (Philippines, since 2023).
  6. Keep "Outside of work" and "Latest posts" as they are.
- **Decide how to handle the old PDF links (launch step 1).** After launch, GitHub sends old links to the same path on `denisechua.me`, such as `/Muscles of Swallowing.pdf`. GitHub Pages can't redirect one file to another path, so a file must exist at the old name or the link breaks. Options:
  - Copy each PDF to its old name. Old links keep working, but each PDF exists twice and both copies need updating.
  - Recommended: use the old filenames as the only files and link to them directly. Keep `DMNChua_CV2026.pdf`. Let the older CV names (`DMNChua_CV2024.pdf`, `DMNChua CV Updated.pdf`) break.
  - Do nothing. Old PDF links break, and page links still redirect.
- **Check the DNS records against GitHub's docs before adding them.** The A records (`185.199.108.153` to `185.199.111.153`) are GitHub Pages' servers, listed in "Managing a custom domain for your GitHub Pages site". Optional IPv6 `AAAA` records: `2606:50c0:8000::153` to `2606:50c0:8003::153`.
- **Add Instagram posts to "Latest posts".** Paste post links into `src/data/instagram.ts`. Until a link is there, the About page shows a card that links to `@thebolusbrief`.

## Needs Denise

- Confirm the DRS 33rd abstract title: does it include the word "Execution"? The website and the CV disagree.
- Fix the CV PDF: the DRS 33rd abstract is 2025 and "Annual Meeting", not 2024 and "Annual Congress".
- Fix the cranial nerves handout PDF: "Opthalmic" should be "Ophthalmic".
- When the fixed CV and handout arrive, replace them in `public/files/`, plus any old-name copies.
- After launch, update the website link in the CV PDF, ORCID, LinkedIn, X, and the HKU lab page.

## Ideas

- Add Google Scholar and HKU Scholars Hub links.
- Show the newest Instagram posts automatically. This needs the Instagram API, a Business or Creator account, and a scheduled rebuild.

## Done

- 2026-10-10: Content review fixes, APA citations, final page numbers.
- 2026-10-10: Classic design chosen. Swallow figure behind the Research page.
- 2026-10-10: Domain `denisechua.me` registered at Cloudflare and set as `SITE_URL`.
