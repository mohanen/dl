import { z, defineCollection } from 'astro:content';

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    keywords: z.array(z.string()).min(1),
  }),
});

export const collections = { concepts };


