// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://filmeditrun.co.uk',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you') &&
        !page.includes('/sample-page') &&
        !page.includes('/review') &&
        !page.includes('/admin'),
    }),
  ],
  server: {
    host: true,
  },
  redirects: {
    '/admin': '/admin/index.html',
    '/review': 'https://g.page/r/Cba1pWWqNcpWEAI/review',
    '/reviews': 'https://g.page/r/Cba1pWWqNcpWEAI/review',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});