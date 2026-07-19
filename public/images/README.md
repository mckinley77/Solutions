# Image slots

Drop exported/downloaded images from the old Wix site here, then update the matching page to
reference the real file instead of the `.image-placeholder` div.

- `hero.jpg` — used on the home page hero (referenced in `src/pages/index.astro`)
- `surveys-maps.jpg` — Surveys & Maps service page
- `structures.jpg` — Structures service page
- `logo.svg` / `logo.png` — replace `public/favicon.svg` / `favicon.ico` and optionally add a logo
  to the header (`src/components/Header.astro`)
- `gallery/` — project photos for `src/pages/gallery.astro`
- `testimonials/` — optional headshots/course photos for `src/pages/testimonials.astro`

Once an image is in place, swap the corresponding `<div class="image-placeholder">…</div>` block
for an `<img src="/images/…" alt="…" />` tag.
