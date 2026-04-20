# Yonadik Next Frontend

Story 004 baseline is implemented in this repo:

- centralized API client in `lib/api/client.js`
- typed adapters in `lib/api/web.js`
- zod schemas in `lib/schemas/*`
- contract-driven ISR homepage implementation on `pages/index.js`
- canonical dealers directories:
  - `pages/dealers-used-cars.js`
  - `pages/dealers-accident.js`
- canonical dealer profile route:
  - `pages/dealer-profile/[slugOrId].js` (slug canonical, id redirects to slug)
- SEO policy endpoints:
  - `pages/robots.txt.js`
  - `pages/sitemap.xml.js`
- deployment checklist:
  - `docs/deployment-checklist.md`

## Required env vars

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CANONICAL_BASE_URL`
- `NEXT_PUBLIC_WP_BASE_URL`
- `WP_API_BASE_URL`
- `WP_MEDIA_BASE_URL`
- `NEXT_PUBLIC_PRE_CUTOVER_NOINDEX` (`true` before cutover)

## Run

```bash
npm install
npm run dev
```
