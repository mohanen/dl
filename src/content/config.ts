import { z, defineCollection } from 'astro:content';

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    // For multi-topic files, we only strictly need a category at the file level.
    // Other fields are optional to allow legacy or mixed content during migration.
    category: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { concepts };


