function isPreCutoverNoindex() {
  return process.env.NEXT_PUBLIC_PRE_CUTOVER_NOINDEX !== 'false'
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://next.yonadik.com').replace(/\/$/, '')
}

function buildUrlset(locations) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locations.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  const siteUrl = getSiteUrl()

  // During pre-cutover we intentionally keep the sitemap empty to avoid indexing
  // next.yonadik.com routes before canonical cutover.
  const locations = isPreCutoverNoindex()
    ? []
    : [
        `${siteUrl}/`,
        `${siteUrl}/dealers-used-cars`,
        `${siteUrl}/dealers-accident`,
      ]

  res.setHeader('Content-Type', 'application/xml')
  res.write(buildUrlset(locations))
  res.end()

  return { props: {} }
}

export default function SitemapXml() {
  return null
}
