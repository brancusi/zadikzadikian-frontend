import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const series = defineCollection({
  loader: glob({ base: './src/content/series', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    status: z.literal('sample'),
    order: z.number().int().positive(),
    fixture: z.enum(['stack', 'threshold', 'field']),
    intro: z.string().min(40),
    description: z.string().min(40),
    recordLabel: z.string().min(1),
  }),
});

export const collections = { series };
