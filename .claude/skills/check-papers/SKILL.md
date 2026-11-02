---
name: check-papers
description: Check ORCID and Crossref for papers by Denise that aren't on the website yet, and draft publication files for them. Use when asked to check for new papers or update the Research page.
---

# Check for new papers

Finds journal papers by Denise that are on ORCID or Crossref but missing from `src/content/publications/`, and drafts a file for each one. Sean reviews the drafts before anything is committed.

## Steps

1. Run `npm run find-new-papers`. It prints JSON with a `new` list. Each entry has Crossref metadata for one DOI the site doesn't have.
2. If `new` is empty, tell Sean that no new papers were found, and say how many DOIs each source had (`checked`). Stop.
3. For each new paper, check that it's really Denise's work. She's a speech-language pathologist who researches swallowing and dysphagia. One of the authors should have her ORCID (`0000-0001-6211-2161`) or be "Chua, Denise Mae" or similar. If you're unsure, list the paper for Sean and don't draft a file.
4. Draft `src/content/publications/<year>-<short-slug>.md` using the format below. Open `https://doi.org/<doi>` to confirm the details Crossref lacks, such as volume, issue, pages, or the final year.
5. Run `npm run build`. It must finish with 0 errors and 0 warnings.
6. Report what you added. For each paper, give the citation as it will appear, list anything you couldn't confirm, and give the source (ORCID, Crossref, or both). Don't commit. Sean reviews first.

## File format

Copy the style of the existing files, such as `2024-cortical-activation-fnirs-pilot.md`:

```md
---
title: "Cortical activation during swallowing exercise tasks: An fNIRS pilot study"
authors: "Chua, DMN. & Chan, KMK."
year: 2024
type: article
venue: "Dysphagia"
pages: "40(2), 327–335"
doi: "10.1007/s00455-024-10730-1"
---
```

- **title:** APA sentence case. Capitalize only the first word, the first word after a colon, proper nouns, and acronyms (fNIRS, SLP). Crossref titles are often in title case, so convert them.
- **authors:** `Family, Initials.` with no periods between initials, for example `Chan, KMK.`. Separate authors with `, `, and put `& ` before the last one. Write Denise as `Chua, DMN.` exactly, so the site bolds it.
- **year:** the year of the issue. If the paper is online only, with no volume yet, use the online year and leave out `pages`.
- **type:** `article` for journal papers. A conference paper with a DOI is `conference`.
- **venue:** the journal name in title case, as the journal writes it.
- **pages:** `volume(issue), first–last` with an en dash (–). Use the article number if there are no pages. Leave it out if there's no volume yet.
- **doi:** the bare DOI, lowercase prefix, with no `https://doi.org/`.

## Limits

- Only finds papers with a DOI. Conference abstracts and talks, such as the DRS presentations, must be added by hand.
- Only finds papers that are on Denise's ORCID, or that a publisher registered with her ORCID. If a known paper is missing, Denise can add it to ORCID, or turn on Crossref auto-update in ORCID.
- Google Scholar isn't checked. It has no API and blocks scripts.
