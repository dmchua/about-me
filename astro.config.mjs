// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO(domain): replace with the final custom domain before launch.
// This one value drives canonical URLs, OpenGraph URLs, the sitemap and robots.txt.
export const SITE_URL = 'https://denise-chua.example.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
