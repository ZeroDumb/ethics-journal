import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    categories: z.array(z.string()).optional(),
  }),
});

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    categories: z.array(z.string()).optional(),
  }),
});

const labs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    categories: z.array(z.string()).optional(),
  }),
});

const sevenSisters = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    categories: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
  }),
});

const happyFrog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    categories: z.array(z.string()).optional(),
  }),
});

export const collections = { 
  blog, 
  tools, 
  labs, 
  '7-sisters': sevenSisters,
  'happy-frog': happyFrog
};