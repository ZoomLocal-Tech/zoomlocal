# ZoomLocal (zoomlocal.in) — Developer Handoff

Marketing site for ZoomLocal: managed Local SEO + a directory of
white-label audit tools embedded from fly-social.com.

## Stack
- Vue 3 + Vue Router
- Vite 4 (build) with vite-ssg (static pre-rendering)
- Tailwind CSS
- Deployed on Firebase Hosting (project: zoomlocal-77be3)

## Run locally
```bash
npm install
cp .env.example .env    # then fill in the real Supabase values
npm run dev             # http://localhost:5173
```

## Build & preview
```bash
npm run build           # generates sitemap + static site into /dist
npm run preview
```

## Deploy (Firebase)
```bash
npm run build
firebase deploy --only hosting   # requires access to project zoomlocal-77be3
```

## Project map
| Path | Purpose |
|------|---------|
| `src/router.js` | Routes: home, pricing, tools, tools/:slug, blog, blog/:slug |
| `src/pages/` | Page components (Home, Pricing, Tools, ToolPage, Blog, BlogPost) |
| `src/data/tools.js` | The audit-tool catalog (name, slug, category, copy) |
| `src/data/posts.js` | Blog posts |
| `src/config.js` | fly-social embed wiring — `EMBED_ENABLED` toggles which tools are live |
| `src/components/layout/` | AppHeader / AppFooter |
| `src/components/managed/` | Managed-service page + contact form |
| `src/composables/useSeo.js` | Per-page SEO meta |
| `scripts/gen-sitemap.mjs` | Sitemap generator (runs on build) |
| `public/` | Static assets, favicons, robots.txt, sitemap.xml, llms.txt |

## Notes
- Tools render as embeds from `EMBED_ORIGIN` (https://www.fly-social.com)
  using the agency slug in `src/config.js`. A tool only shows its live
  widget if its slug is in `EMBED_ENABLED`; otherwise it shows an SEO page
  with a call to action.
- `.env` is NOT included in this package (secrets). Use `.env.example`.
