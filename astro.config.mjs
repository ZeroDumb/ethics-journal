import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://zerodumb.dev',
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    react(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true
    }
  },
  // Site metadata
  siteMetadata: {
    title: 'ZeroDumb Ethics Journal',
    author: 'Zero',
    email: 'zero@zerodumb.dev',
    description: 'Ethical hacking reflections, recon lab notes, and the hacker\'s compass.',
    lang: 'en',
    locale: 'en_US',
    twitter: {
      username: 'zerodumb',
      card: 'summary_large_image',
      image: '/assets/images/og-image.jpg'
    }
  },
  // Default front matter for all pages
  defaultFrontmatter: {
    layout: 'post',
    comments: true,
    share: true
  }
});