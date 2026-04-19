# Yonadik Next Frontend

Story 002 baseline is implemented in this repo:

- centralized API client in `lib/api/client.js`
- typed adapters in `lib/api/web.js`
- zod schemas in `lib/schemas/*`
- contract-driven SSR example on `pages/index.js`

## Required env vars

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WP_BASE_URL`
- `WP_API_BASE_URL`
- `WP_MEDIA_BASE_URL`

## Run

```bash
npm install
npm run dev
```
