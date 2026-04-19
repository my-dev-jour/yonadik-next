# Yonadik Next Frontend

Story 003 baseline is implemented in this repo:

- centralized API client in `lib/api/client.js`
- typed adapters in `lib/api/web.js`
- zod schemas in `lib/schemas/*`
- contract-driven ISR homepage implementation on `pages/index.js`

## Required env vars

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WP_BASE_URL`
- `WP_API_BASE_URL`
- `WP_MEDIA_BASE_URL`
- `NEXT_PUBLIC_PRE_CUTOVER_NOINDEX` (`true` before cutover)

## Run

```bash
npm install
npm run dev
```
