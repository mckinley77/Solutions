# The Sustainable Golf Course Project — mmck.solutions

A static site (built with [Astro](https://astro.build)) replacing the previous Wix site. Content
lives in plain text/Markdown files, so updates don't require any web app login — just edit a file,
commit, and push.

## Project structure

```text
src/
  content/technical-notes/   Markdown files — one per Technical Note (the LinkedIn articles)
  content.config.ts          Schema for the Technical Notes collection
  pages/                     One file per site page/route
  layouts/BaseLayout.astro   Shared page shell (head, header, footer)
  components/                Header, Footer
  styles/global.css          All site styling (colours, layout, components)
public/images/               Drop real photos here (see public/images/README.md)
```

## Local development

```sh
npm install
npm run dev        # http://localhost:4321
```

| Command           | Action                                    |
| :----------------- | :---------------------------------------- |
| `npm run dev`       | Local dev server with live reload         |
| `npm run build`     | Production build to `./dist/`             |
| `npm run preview`   | Preview the production build locally      |

## Adding a new Technical Note

1. Copy `src/content/technical-notes/technical-note-09-robotic-mowing.md`.
2. Rename it e.g. `technical-note-10-your-topic.md`.
3. Fill in the frontmatter (`title`, `number`, `date`, `summary`, `tags`) and paste the article body
   below the `---`. Markdown headings/lists/bold all work.
4. Set `draft: false` when it's ready to publish. It will automatically appear in `/technical-notes/`
   and on the home page if it's the highest-numbered note.

## Editing existing pages

Every page is a `.astro` file under `src/pages/` (or `src/pages/services/` for the two service
subpages). The visible text sits directly in each file between HTML-like tags — safe to edit without
touching the surrounding markup.

Several pages currently contain clearly-marked **placeholders**:

- `<div class="image-placeholder">…</div>` blocks — replace with `<img src="/images/…" alt="…" />`
  once real photos are in `public/images/` (see `public/images/README.md`).
- `src/pages/testimonials.astro` — has 3 placeholder testimonial cards ready for the real quotes.
- `src/content/technical-notes/technical-note-09-robotic-mowing.md` — has a draft banner; paste in
  the real LinkedIn article text and set `draft: false`.

## Deploying (Netlify) and moving the domain off Wix/GoDaddy hosting

This site is designed to deploy on [Netlify](https://netlify.com)'s free tier. GoDaddy stays as the
**domain registrar** — only where the domain *points* changes, not who it's registered with.

1. **Push this project to a GitHub repository** (private is fine).
2. **Create a Netlify site**: New site from Git → pick the repo. Build command `npm run build`,
   publish directory `dist`. Netlify auto-detects Astro, so these are usually pre-filled.
3. **Add the custom domain** in Netlify: Site settings → Domain management → Add a domain →
   `mmck.solutions` (and `www.mmck.solutions` if you want both to work).
4. **Point DNS at Netlify.** In your GoDaddy account (DNS management for mmck.solutions), either:
   - **Simplest:** change the domain's nameservers to Netlify's DNS (Netlify shows you the exact
     values after you add the domain) — Netlify then manages all DNS for the domain, or
   - **Keep DNS at GoDaddy:** leave nameservers as-is and instead add/replace records in GoDaddy:
     an `A` record for `@` pointing at Netlify's load-balancer IP, and a `CNAME` for `www` pointing
     at your `<sitename>.netlify.app` address (Netlify shows the exact current values in the domain
     setup screen — they can change, so use what Netlify displays at the time, not old copies of
     this IP from elsewhere).
5. **Wait for DNS propagation** (usually minutes, can take up to ~24h) and confirm Netlify shows
   "Netlify DNS" or "DNS verified" and issues an HTTPS certificate automatically.
6. **Turn off/park the Wix site** once mmck.solutions is confirmed serving the new site, so there's
   no confusion about which is live during the switch.

No code in this repo needs to change for deployment — steps 1–6 are all done in the GitHub, Netlify,
and GoDaddy web dashboards.
