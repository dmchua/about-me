# How to launch the site on denisechua.me

The site deploys to GitHub Pages from the `master` branch of `dmchua/about-me`. Cloudflare only holds the domain and its DNS records. Do the steps in order.

## 1. Prepare the repo (Claude)

Done on 2026-11-02.

1. Add `.github/workflows/deploy.yml`, which builds the site with the official Astro action and deploys it to GitHub Pages on every push to `master`. The `github-pages` environment only allows deploys from `master`, so a deploy from `astro-rebuild` fails.
2. Add redirect pages for `/about/` and `/publications/`. PDFs live only at their new paths in `files/`, so old PDF links break on purpose.

## 2. Add the DNS records (Sean, Cloudflare dashboard)

1. Log in to Cloudflare and open `denisechua.me`.
2. Go to **DNS → Records**. If Cloudflare added records on its own, delete them.
3. Add each record below. For each one, click the orange cloud so that it turns grey and reads **DNS only**.

| Type | Name | Content |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `dmchua.github.io` |

The proxy must stay off. GitHub can't issue the HTTPS certificate while Cloudflare proxies the traffic.

## 3. Change the Pages settings (Sean as Denise, GitHub)

Only the repo owner can change these settings, so log in as Denise. Do this step after step 2.

1. Open `github.com/dmchua/about-me` and go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Claude pushes the new site to `master`. It joins the unrelated histories with `git merge -s ours --allow-unrelated-histories`, so `master` keeps the old Jekyll history without a force push. Do this only after step 2. Otherwise the old Jekyll build runs on the Astro code.
4. Under **Custom domain**, enter `denisechua.me` and click **Save**.

The old Jekyll site stops, and the new site goes live when the deploy finishes. From then on, GitHub redirects each old `dmchua.github.io/about-me/...` link to the same page on `denisechua.me`.

## 4. Turn on HTTPS (Sean as Denise, GitHub)

Within 24 hours, open **Settings → Pages** again and tick **Enforce HTTPS**. The option appears after GitHub issues the certificate.

## 5. Check the launch (Claude)

- `https://denisechua.me` and `https://www.denisechua.me` load the new site.
- `https://dmchua.github.io/about-me/research/` redirects to `https://denisechua.me/research/`.
- `https://denisechua.me/files/DMNChua_CV2026.pdf` opens the CV.

## 6. After launch (Denise, Sean)

- Denise updates the website link in her CV PDF, ORCID, LinkedIn, and X, and asks the HKU lab to update her profile link.
- Optional: Sean adds the site to Google Search Console and submits `https://denisechua.me/sitemap-index.xml`.
