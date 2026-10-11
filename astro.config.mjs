// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// This one value drives canonical URLs, OpenGraph URLs, the sitemap and robots.txt.
export const SITE_URL = 'https://denisechua.me';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  // Old Jekyll URLs. GitHub Pages can't redirect on the server, so Astro writes a redirect page for each.
  redirects: { '/about/': '/' },
  build: { format: 'directory' },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
