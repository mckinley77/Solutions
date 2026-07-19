import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const technicalNotes = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/technical-notes' }),
	schema: z.object({
		title: z.string(),
		number: z.number(),
		date: z.date(),
		summary: z.string(),
		tags: z.array(z.string()).default([]),
		thumbnail: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { 'technical-notes': technicalNotes };
