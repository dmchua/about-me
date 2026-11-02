# How the site is hosted on denisechua.me

The site went live on 2026-11-02. This file records how it's set up and why, so the setup can be checked or rebuilt.

GitHub Pages serves the site from the `master` branch of `dmchua/about-me`. Cloudflare is the registrar for `denisechua.me` and holds its DNS records. It doesn't serve any traffic.

## 1. Deploy workflow

`.github/workflows/deploy.yml` runs on every push to `master`. The build job runs `npm run build` with the official Astro action and uploads `dist/`. The deploy job publishes that upload to GitHub Pages.

The `github-pages` environment only allows deploys from `master`. A deploy from any other branch fails with "Deployments are only allowed from master".

`master` used to hold the old Jekyll site. The Astro site was joined onto it with `git merge -s ours --allow-unrelated-histories`. The tree is the Astro site, and the old Jekyll history is still reachable. No force push was needed.

## 2. DNS records (Cloudflare → denisechua.me → DNS → Records)

Every record is **DNS only** (grey cloud).

| Type | Name | Content | Why |
|---|---|---|---|
| A | `@` | `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` (4 records) | GitHub Pages IPv4 addresses (`gh api meta --jq .pages`) |
| AAAA | `@` | `2606:50c0:8000::153` to `2606:50c0:8003::153` (4 records) | The same, for IPv6 |
| CNAME | `www` | `dmchua.github.io` | `www` follows GitHub if its IPs change. GitHub redirects `www` to the bare domain. |
| TXT | `_github-pages-challenge-dmchua` | the code GitHub showed | Verifies the domain to the `dmchua` account (step 3) |

Keep the proxy off. With the orange cloud, GitHub can't see the traffic and can't issue or renew the HTTPS certificate.

## 3. GitHub settings (logged in as `dmchua`)

Only the repo owner sees these pages. Sean does them in the Denise Chrome profile.

1. **Account → Settings → Pages → Verified domains:** `denisechua.me` is verified. Only `dmchua`'s repos can use the domain. This stops anyone else from claiming it if the repo ever drops it.
2. **Repo → Settings → Pages → Source:** GitHub Actions. This turns off the old Jekyll build.
3. **Custom domain:** `denisechua.me`. GitHub routes the domain to this repo, gets a Let's Encrypt certificate for the bare domain and `www`, and redirects old `dmchua.github.io/about-me/...` links to the same path on `denisechua.me`.
4. **Enforce HTTPS:** on. `http://` requests redirect to `https://`.

Order matters. Switch the Source before the first push to `master`, or the Jekyll build runs on the Astro code. Set the custom domain before the first deploy, because the build assumes it's served from `/`.

## 4. Old links

- Old page links keep working. The old site used the same paths (`/research/`, `/teaching/`, `/cv/`, `/resources/`, `/contact/`), and GitHub forwards them.
- `/about/` and `/about.html` redirect to `/`. They come from `redirects` in `astro.config.mjs` and `public/about.html`.
- Old PDF links, such as `/Muscles of Swallowing.pdf`, break on purpose. The PDFs now live only in `/files/`.
- GitHub Pages can't do server redirects or custom headers. To keep another old URL working, add it to `redirects` in `astro.config.mjs`.

## 5. Checks

```bash
dig +short denisechua.me A @1.1.1.1                                         # 4 GitHub IPs
curl -sI http://denisechua.me/ | head -3                                    # 301 to https
curl -sI https://www.denisechua.me/ | head -3                               # 301 to the bare domain
curl -sI https://dmchua.github.io/about-me/research/ | head -3               # 301 to denisechua.me/research/
gh api repos/dmchua/about-me/pages --jq '{cname, https_enforced, https_certificate}'
```

The certificate renews itself. On 2026-11-02 it covered `denisechua.me` and `www.denisechua.me` and expired on 2027-01-31.
