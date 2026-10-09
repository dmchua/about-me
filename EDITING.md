# Editing the website

You only need to edit Markdown text files. When you commit a change on GitHub, the site rebuilds and is live in about a minute.

## The quickest way (in the browser)

1. Open the repository on GitHub and find the file (list below).
2. Click the pencil icon ✏️, make your change, then click **Commit changes**.
3. Wait about a minute and refresh the website.

## Where things live

| To change… | Edit this file |
| --- | --- |
| About (home page text) | `src/content/pages/about.md` |
| Publications and conference papers | `src/content/publications/` (one file each) |
| Teaching | `src/content/pages/teaching.md` |
| CV page summary | `src/content/pages/cv.md` |
| Resources page and handout list | `src/content/pages/resources.md` |
| Contact page | `src/content/pages/contact.md` |
| Name, job title, email, social links, menu | `src/data/site.ts` |
| Profile photo | replace `src/assets/denise-chua.jpeg` (keep the file name) |

The text between the two `---` lines at the top of each file is settings (title, description for Google). Everything below it is the page.

## Adding a publication

Create a new file in `src/content/publications/`, e.g. `2027-my-new-paper.md`, and copy this:

```md
---
title: "Title of the Paper"
authors: "Chua, DMN., Chan, KMK."
year: 2027
type: article          # article, conference, or unpublished
venue: "Dysphagia"     # journal or conference name
pages: "40(2), 327–335"  # optional: volume(issue), pages
doi: "10.1007/xxxxx"   # optional; just the DOI. It makes the title a link
---
```

- Your name ("Chua, DMN.") is made bold automatically.
- The list is sorted newest first. If two items share a year, add `order: 2` to the one that should come first (higher number first).
- To remove an item, delete its file.

## Updating the CV

1. Upload the new PDF into `public/files/`.
2. If the file name changed, update `cv:` in `src/data/site.ts` (e.g. `/files/DMNChua_CV2027.pdf`).
3. Delete the old PDF from `public/files/` if you no longer want it online.

## Adding a handout

Upload the PDF to `public/files/` (use a short name without spaces), then add an entry under `handouts:` in `src/content/pages/resources.md`:

```yaml
  - title: My New Handout
    file: /files/my-new-handout.pdf
    description: One sentence about what it covers.
```

## Markdown cheat sheet

- `## Heading` makes a section heading
- `**bold**` makes **bold**, and `*italic*` makes *italic*
- `- item` makes a bullet point
- `[link text](https://example.com)` makes a link

## If something breaks

If a change has a typo in the settings block (a missing quote, say), the build fails and the old version **stays online**. Nothing goes down. Open the repository's commit list on GitHub, click the red ✗ to see the error, fix the file, and commit again. Or ask Sean.
