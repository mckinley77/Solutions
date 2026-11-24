// Builds Netlify's `_redirects` file from the Technical Notes collection, so every
// note automatically gets a short URL (/tn14 and /TN14 -> its full page) as a real 301.
// Astro skips page files whose names start with "_", so the output name comes in
// through a dynamic route parameter instead.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export function getStaticPaths() {
	return [{ params: { redirects: '_redirects' } }];
}

export const GET: APIRoute = async () => {
	const notes = (await getCollection('technical-notes')).sort((a, b) => a.data.number - b.data.number);
	const lines = ['# Generated at build time by src/pages/[redirects].ts - do not edit in dist/'];
	for (const note of notes) {
		const target = `/technical-notes/${note.id}/`;
		lines.push(`/tn${note.data.number}  ${target}  301`);
		lines.push(`/TN${note.data.number}  ${target}  301`);
	}
	return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain' } });
};
