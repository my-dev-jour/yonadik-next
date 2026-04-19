import Head from 'next/head'
import { getHomepage } from '../lib/api/web'

export default function Home({ homepage, error }) {
  const hero = homepage?.hero || null
  const region = homepage?.region || null
  const featuredSections = Array.isArray(homepage?.featuredSections)
    ? homepage.featuredSections
    : []
  const maps = Array.isArray(homepage?.maps) ? homepage.maps : []
  const stats = Array.isArray(homepage?.stats) ? homepage.stats : []
  const seo = homepage?.seo || {}

  const explorerSegments = Array.isArray(homepage?.explorer?.segments)
    ? homepage.explorer.segments
    : []

  const shouldNoindex = process.env.NEXT_PUBLIC_PRE_CUTOVER_NOINDEX !== 'false'
  const robotsContent = shouldNoindex ? 'noindex, nofollow' : 'index, follow'

  return (
    <>
      <Head>
        <title>{seo.title || 'Yonadik'}</title>
        <meta name='description' content={seo.description || ''} />
        <meta name='robots' content={robotsContent} />
        <meta name='googlebot' content={robotsContent} />
        {seo.canonicalUrl ? <link rel='canonical' href={seo.canonicalUrl} /> : null}
      </Head>
      <main style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 20px 72px' }}>
        <section
          style={{
            border: '1px solid #e6e7eb',
            borderRadius: 16,
            padding: 24,
            background: 'linear-gradient(180deg, #fcfcfd 0%, #f7f8fa 100%)',
            marginBottom: 24,
          }}
        >
          <p style={{ margin: 0, color: '#5b6470', fontSize: 14 }}>
            {hero?.eyebrow || 'Yonadik'}
          </p>
          <h1 style={{ margin: '10px 0 8px', color: '#111827', fontSize: 34 }}>
            {hero?.title || 'Find trusted dealers'}
          </h1>
          <p style={{ margin: 0, color: '#4b5563', fontSize: 17 }}>
            {hero?.subtitle || 'Browse dealers by region.'}
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
            {hero?.primaryCta?.url ? (
              <a
                href={hero.primaryCta.url}
                style={{
                  display: 'inline-block',
                  padding: '10px 16px',
                  borderRadius: 10,
                  background: '#111827',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                {hero.primaryCta.label || 'Primary'}
              </a>
            ) : null}
            {hero?.secondaryCta?.url ? (
              <a
                href={hero.secondaryCta.url}
                style={{
                  display: 'inline-block',
                  padding: '10px 16px',
                  borderRadius: 10,
                  border: '1px solid #c9ced7',
                  color: '#111827',
                  textDecoration: 'none',
                  background: '#fff',
                }}
              >
                {hero.secondaryCta.label || 'Secondary'}
              </a>
            ) : null}
          </div>
        </section>

        {error ? (
          <section
            style={{
              border: '1px solid #d33',
              borderRadius: 8,
              padding: 16,
              background: '#fff2f2',
              color: '#6b1111',
            }}
          >
            <h2 style={{ marginTop: 0 }}>API error</h2>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
              {JSON.stringify(error, null, 2)}
            </pre>
          </section>
        ) : (
          <>
            <section
              style={{
                border: '1px solid #e6e7eb',
                borderRadius: 16,
                padding: 20,
                background: '#fff',
                marginBottom: 18,
              }}
            >
              <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>Region Context</h2>
              <p style={{ margin: 0, color: '#4b5563' }}>
                Active: <strong>{region?.active || '-'}</strong> | Default:{' '}
                <strong>{region?.default || '-'}</strong> | Source:{' '}
                <strong>{region?.source || '-'}</strong>
              </p>
            </section>

            <section
              style={{
                border: '1px solid #e6e7eb',
                borderRadius: 16,
                padding: 20,
                background: '#fff',
                marginBottom: 18,
              }}
            >
              <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>Featured Sections</h2>
              {featuredSections.length === 0 ? (
                <p style={{ margin: 0, color: '#6b7280' }}>No featured sections configured.</p>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {featuredSections.map((section) => (
                    <li key={section.key} style={{ marginBottom: 8 }}>
                      <a href={section.url} style={{ color: '#1f2937' }}>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section
              style={{
                border: '1px solid #e6e7eb',
                borderRadius: 16,
                padding: 20,
                background: '#fff',
                marginBottom: 18,
              }}
            >
              <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>Maps</h2>
              {maps.length === 0 ? (
                <p style={{ margin: 0, color: '#6b7280' }}>No maps configured.</p>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {maps.map((map) => (
                    <li key={`${map.context}:${map.mapId}`}>
                      {map.context} (#{map.mapId})
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section
              style={{
                border: '1px solid #e6e7eb',
                borderRadius: 16,
                padding: 20,
                background: '#fff',
                marginBottom: 18,
              }}
            >
              <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>Explorer Segments</h2>
              {explorerSegments.length === 0 ? (
                <p style={{ margin: 0, color: '#6b7280' }}>No explorer segments configured.</p>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {explorerSegments.map((segment) => (
                    <li key={segment.slug || segment.label}>
                      {segment.label || segment.slug} ({segment.count || 0})
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {stats.length > 0 ? (
              <section
                style={{
                  border: '1px solid #e6e7eb',
                  borderRadius: 16,
                  padding: 20,
                  background: '#fff',
                }}
              >
                <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>Stats</h2>
                <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                  {JSON.stringify(stats, null, 2)}
                </pre>
              </section>
            ) : null}
          </>
        )}
      </main>
    </>
  )
}

export async function getStaticProps() {
  try {
    const homepage = await getHomepage()
    return {
      props: { homepage, error: null },
      revalidate: 120,
    }
  } catch (error) {
    return {
      props: {
        homepage: null,
        error: {
          code: error?.code || 'internal_error',
          status: error?.status || 500,
          message: error?.message || 'Unexpected API error.',
          details: error?.details || {},
        },
      },
      revalidate: 120,
    }
  }
}
