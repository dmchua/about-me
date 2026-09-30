import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Prose pages: src/content/pages/<name>.md
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Only used on the Resources page
    handouts: z
      .array(z.object({ title: z.string(), file: z.string(), description: z.string() }))
      .optional(),
  }),
});

// One file per publication/presentation: src/content/publications/<year>-<slug>.md
const publications = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.string(), // exactly as it should appear; "Chua, DMN." is bolded automatically
    year: z.number().int(),
    type: z.enum(['article', 'conference', 'unpublished']),
    venue: z.string().optional(), // journal or conference name
    pages: z.string().optional(),
    doi: z.string().optional(), // just the DOI, e.g. 10.1007/s00455-024-10730-1
    note: z.string().optional(), // e.g. "Undergraduate thesis adviser"
    order: z.number().default(0), // tie-breaker within a year: higher shows first
  }),
});

export const collections = { pages, publications };
