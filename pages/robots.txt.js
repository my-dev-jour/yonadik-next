function isPreCutoverNoindex() {
  return process.env.NEXT_PUBLIC_PRE_CUTOVER_NOINDEX !== 'false'
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://next.yonadik.com').replace(/\/$/, '')
}

export async function getServerSideProps({ res }) {
  const preCutoverNoindex = isPreCutoverNoindex()
  const siteUrl = getSiteUrl()
  const lines = preCutoverNoindex
    ? ['User-agent: *', 'Disallow: /']
    : ['User-agent: *', 'Allow: /', `Sitemap: ${siteUrl}/sitemap.xml`]

  res.setHeader('Content-Type', 'text/plain')
  res.write(lines.join('\n'))
  res.end()

  return { props: {} }
}

export default function RobotsTxt() {
  return null
}
