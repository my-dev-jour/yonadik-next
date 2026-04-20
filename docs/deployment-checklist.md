# Story 006 Deployment Checklist

## Hostinger Node.js App Settings

- Repository: `my-dev-jour/yonadik-next`
- Branch: `main`
- Build command: `npm run build`
- Start command: `npm start`
- Node version: `22.x`

## Required Environment Variables

- `NEXT_PUBLIC_SITE_URL=https://next.yonadik.com`
- `NEXT_PUBLIC_CANONICAL_BASE_URL=https://yonadik.com`
- `NEXT_PUBLIC_WP_BASE_URL=https://staging.yonadik.com` (staging) / `https://yonadik.com` (prod)
- `WP_API_BASE_URL=https://staging.yonadik.com` (staging) / `https://yonadik.com` (prod)
- `WP_MEDIA_BASE_URL=https://staging.yonadik.com` (staging) / `https://yonadik.com` (prod)
- `NEXT_PUBLIC_PRE_CUTOVER_NOINDEX=true` (before apex cutover)

## Pre-Deploy Verification

- `npm run build` passes locally.
- Homepage API returns `{"code":200,"data":...}` from `/wp-json/stm-mra/v1/web/homepage/`.
- Dealers directory API returns `{"code":200,"data":...}` for both `type=used` and `type=accident`.
- Dealer profile API returns `{"code":200,"data":...}` for canonical slug and resolves ID.

## Post-Deploy Smoke Tests

- `GET /` loads and has `noindex` metadata before cutover.
- `GET /dealers-used-cars` loads.
- `GET /dealers-accident` loads.
- `GET /dealer-profile/<slug>` loads.
- `GET /dealer-profile/<id>` redirects to slug route.
- `GET /robots.txt` returns:
  - `Disallow: /` when `NEXT_PUBLIC_PRE_CUTOVER_NOINDEX=true`
  - otherwise `Allow: /` and `Sitemap: .../sitemap.xml`
- `GET /sitemap.xml` returns empty urlset while pre-cutover noindex is true.

## Rollback

1. Redeploy previous successful commit in Hostinger.
2. Verify `/` and directory routes recover.
3. Re-check `robots.txt` and `sitemap.xml` policy outputs.
