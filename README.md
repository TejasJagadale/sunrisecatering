# Sunrise Caterers & Event Management — website

A multipage React + Vite site for **Sunrise Caterers and Event Management**, Kallekkad, Palakkad, Kerala.

Pages: Home · About · Services (7 sections) · Weddings · Menu · Gallery · Contact · 404.

Stack: React, Vite, React Router, GSAP + ScrollTrigger (scroll animation), Lenis (smooth scroll, driven by the GSAP ticker), Framer Motion (page transitions, drawer, lightbox), Lucide icons, plain CSS files.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # writes sitemap.xml + robots.txt, then builds to dist/
npm run preview    # serve dist/ locally
```

Needs Node 20.19 or newer.

## Environment variables

Copy `.env.example` to `.env`.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public domain (no trailing slash). Used for canonical links, Open Graph tags, JSON-LD, `sitemap.xml`, `robots.txt`. **Currently a placeholder — replace before launch.** |
| `VITE_FORM_ENDPOINT` | URL that accepts a JSON POST (Formspree, Web3Forms, your own API). |

## The enquiry form (demo mode)

With `VITE_FORM_ENDPOINT` empty the form validates, then clearly says **nothing was sent** and offers a pre-filled WhatsApp message and a call button. It never shows a fake "enquiry sent" message.

To go live, set `VITE_FORM_ENDPOINT` and rebuild. The form POSTs JSON and shows success only on a 2xx response. A hidden honeypot field (`company`) is included for basic spam protection.

## Deploying

- **Netlify**: build command `npm run build`, publish directory `dist`. `public/_redirects` handles SPA routing.
- **Vercel**: framework Vite. `vercel.json` handles SPA routing.
- **Other hosts**: serve `dist/` and rewrite unknown paths to `index.html`.
- **Sub-folder hosting**: set `base` in `vite.config.js` and adjust the router basename.

Set `VITE_SITE_URL` in the host's environment settings before building.

## Replacing the sample images

All pictures are **illustrated placeholders** (generated SVG scenes), each marked with a "Sample image" badge. Replace them with real photographs:

1. Put photos in `public/images/client/`.
2. In `src/config/images.js`, point each entry's `src` at the new file, add useful `alt` text, and set `sample: false` (this removes the badge).
3. Replace `public/og-image.png` with a real 1200×630 share image.

`npm run images` regenerates the placeholder set (needs `sharp`).

## Editing content

- **Business details**: `src/config/site.js` (name, address, phone, Instagram, WhatsApp, map). Use only verified details.
- **About facts**: `ABOUT_FACTS` in `site.js` — empty values are hidden, so add a founding year, team or milestones only once the client confirms them.
- **Services**: `src/data/services.js`.
- **Menu**: `src/data/menu.js`. The dishes are illustrative samples with no prices; replace with the real menu when available.
- **Gallery**: derived from `src/config/images.js`.
- **Colours and fonts**: CSS variables at the top of `src/styles/global.css`.

## SEO notes

- Per-page title, description, canonical and Open Graph tags are set in `src/components/Seo.jsx`; `index.html` holds defaults and JSON-LD (`FoodEstablishment`) with the verified details.
- This is a client-rendered SPA. Crawlers that don't run JavaScript see only the `index.html` defaults. Google runs JS, but for stronger coverage consider pre-rendering (e.g. `vite-plugin-prerender`) or a static-generation setup.
- Submit `sitemap.xml` to Google Search Console after launch, and add a Google Business Profile.

## Accessibility and motion

- `prefers-reduced-motion` disables Lenis, GSAP scroll effects, parallax and decorative loops.
- Animation start states are applied by JavaScript only, so content stays visible if scripts fail.
- Drawer, dropdown, tabs and lightbox support keyboard use; Escape closes overlays.

## Content honesty

The site deliberately contains no invented founding year, awards, prices, packages, testimonials, statistics or "best caterer" claims. Sample content is labelled as such. Keep it that way: add claims only when the client can back them up.

## Network note

The map embed and Google Fonts load from the internet. They will not render in offline or restricted environments.
