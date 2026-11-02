// Lists papers on Denise's ORCID or in Crossref that the site doesn't have yet.
// It compares DOIs only, so it can't find conference abstracts or papers without a DOI.
// Usage: npm run find-new-papers   (prints JSON: one entry per new DOI, with Crossref metadata)
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ORCID = '0000-0001-6211-2161';
const PUBS = 'src/content/publications';
const UA = 'denisechua.me paper check (mailto:dnchua@hku.hk)';

const norm = (doi) => doi.toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, '').trim();

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

// DOIs already on the site
async function siteDois() {
  const dois = new Set();
  for (const f of await readdir(PUBS)) {
    const m = (await readFile(join(PUBS, f), 'utf8')).match(/^doi:\s*"?([^"\n]+)"?/m);
    if (m) dois.add(norm(m[1]));
  }
  return dois;
}

// DOIs on her ORCID profile
async function orcidDois() {
  const data = await getJson(`https://pub.orcid.org/v3.0/${ORCID}/works`);
  const dois = new Set();
  for (const g of data.group) {
    for (const id of g['external-ids']?.['external-id'] ?? []) {
      if (id['external-id-type'] === 'doi') dois.add(norm(id['external-id-value']));
    }
  }
  return dois;
}

// DOIs that publishers registered in Crossref with her ORCID attached
async function crossrefDois() {
  const data = await getJson(`https://api.crossref.org/works?filter=orcid:${ORCID}&rows=100&select=DOI`);
  return new Set(data.message.items.map((w) => norm(w.DOI)));
}

const [have, orcid, crossref] = await Promise.all([siteDois(), orcidDois(), crossrefDois()]);
const found = [...new Set([...orcid, ...crossref])].filter((d) => !have.has(d));

const papers = [];
for (const doi of found) {
  const w = (await getJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}`)).message;
  papers.push({
    doi,
    sources: [orcid.has(doi) && 'orcid', crossref.has(doi) && 'crossref'].filter(Boolean),
    type: w.type,
    title: w.title?.[0],
    authors: (w.author ?? []).map((a) => ({ family: a.family, given: a.given, orcid: a.ORCID })),
    year: (w['published-print'] ?? w['published-online'] ?? w.issued)?.['date-parts']?.[0]?.[0],
    venue: w['container-title']?.[0],
    volume: w.volume,
    issue: w.issue,
    page: w.page,
    articleNumber: w['article-number'],
  });
}

console.log(JSON.stringify({ checked: { site: have.size, orcid: orcid.size, crossref: crossref.size }, new: papers }, null, 2));
