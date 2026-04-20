import Head from 'next/head'
import { getDealerProfile } from '../../lib/api/web'

function toStringParam(value) {
  if (Array.isArray(value)) return value[0] || ''
  return typeof value === 'string' ? value : ''
}

function buildCanonicalFallback(slug) {
  const canonicalBase = process.env.NEXT_PUBLIC_CANONICAL_BASE_URL || 'https://yonadik.com'
  return new URL(`/dealer-profile/${slug}/`, canonicalBase).toString()
}

function buildSlugPath(slug, region) {
  const search = new URLSearchParams()
  if (region) search.set('region', region)
  const qs = search.toString()
  return `/dealer-profile/${slug}${qs ? `?${qs}` : ''}`
}

export default function DealerProfilePage({ profile }) {
  const shouldNoindex = process.env.NEXT_PUBLIC_PRE_CUTOVER_NOINDEX !== 'false'
  const robotsContent = shouldNoindex ? 'noindex, nofollow' : 'index, follow'
  const dealer = profile?.dealer
  const stats = profile?.stats
  const socials = dealer?.socials || {}

  if (!dealer) {
    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }}>
        <section
          style={{
            border: '1px solid #ef4444',
            borderRadius: 14,
            background: '#fef2f2',
            padding: 16,
            color: '#991b1b',
          }}
        >
          <h1 style={{ marginTop: 0, fontSize: 22 }}>Dealer profile unavailable</h1>
          <p style={{ margin: 0 }}>Unable to load the dealer profile right now.</p>
        </section>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{dealer.name || 'Dealer Profile'} | Yonadik</title>
        <meta
          name='description'
          content={dealer.notes || dealer.tagline || `Dealer profile for ${dealer.name}.`}
        />
        <meta name='robots' content={robotsContent} />
        <meta name='googlebot' content={robotsContent} />
        <link rel='canonical' href={dealer.canonicalUrl || buildCanonicalFallback(dealer.slug)} />
      </Head>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '28px 20px 64px' }}>
        <section
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 14,
            background: '#fff',
            overflow: 'hidden',
            marginBottom: 16,
          }}
        >
          {dealer.coverUrl ? (
            <img
              src={dealer.coverUrl}
              alt={`${dealer.name} cover`}
              style={{ width: '100%', height: 220, objectFit: 'cover', background: '#f3f4f6' }}
            />
          ) : null}
          <div style={{ padding: 18 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              {dealer.logoUrl ? (
                <img
                  src={dealer.logoUrl}
                  alt={dealer.name}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 12,
                    objectFit: 'cover',
                    background: '#f3f4f6',
                  }}
                />
              ) : null}
              <div>
                <h1 style={{ margin: '0 0 6px', fontSize: 30 }}>{dealer.name}</h1>
                <p style={{ margin: 0, color: '#4b5563' }}>
                  {dealer.tagline || dealer.location || 'Dealer profile'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gap: 14,
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            marginBottom: 16,
          }}
        >
          <article style={{ border: '1px solid #e5e7eb', borderRadius: 14, background: '#fff', padding: 16 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Profile</h2>
            <p style={{ margin: '0 0 6px', color: '#374151' }}>Type: {dealer.directoryType}</p>
            <p style={{ margin: '0 0 6px', color: '#374151' }}>Region: {dealer.region}</p>
            <p style={{ margin: 0, color: '#374151' }}>Location: {dealer.location || '-'}</p>
          </article>

          <article style={{ border: '1px solid #e5e7eb', borderRadius: 14, background: '#fff', padding: 16 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Contact</h2>
            <p style={{ margin: '0 0 6px', color: '#374151' }}>Phone: {dealer.phone || '-'}</p>
            <p style={{ margin: '0 0 6px', color: '#374151' }}>Email: {dealer.email || '-'}</p>
            <p style={{ margin: 0, color: '#374151' }}>
              Website:{' '}
              {dealer.website ? (
                <a href={dealer.website} target='_blank' rel='noreferrer'>
                  {dealer.website}
                </a>
              ) : (
                '-'
              )}
            </p>
          </article>

          <article style={{ border: '1px solid #e5e7eb', borderRadius: 14, background: '#fff', padding: 16 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Stats</h2>
            <p style={{ margin: '0 0 6px', color: '#374151' }}>
              Inventory: {stats?.inventoryCount ?? 0}
            </p>
            <p style={{ margin: '0 0 6px', color: '#374151' }}>Reviews: {stats?.reviewsCount ?? 0}</p>
            <p style={{ margin: 0, color: '#374151' }}>
              Rating: {stats?.averageRating === null ? '-' : stats?.averageRating}
            </p>
          </article>
        </section>

        {Object.keys(socials).length > 0 ? (
          <section
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 14,
              background: '#fff',
              padding: 16,
              marginBottom: 16,
            }}
          >
            <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Socials</h2>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {Object.entries(socials).map(([platform, url]) => (
                <li key={platform}>
                  <a href={url} target='_blank' rel='noreferrer'>
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section style={{ border: '1px solid #e5e7eb', borderRadius: 14, background: '#fff', padding: 16 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>Notes</h2>
          <p style={{ margin: 0, color: '#374151' }}>{dealer.notes || 'No additional notes.'}</p>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps({ params, query, req }) {
  const slugOrId = toStringParam(params?.slugOrId)
  const region = toStringParam(query?.region)

  if (!slugOrId) {
    return { notFound: true }
  }

  try {
    const profile = await getDealerProfile({
      slugOrId,
      region,
      requestHeaders: {
        cookie: req?.headers?.cookie || '',
      },
    })

    const canonicalSlug = profile?.dealer?.slug
    if (canonicalSlug && canonicalSlug !== slugOrId) {
      return {
        redirect: {
          destination: buildSlugPath(canonicalSlug, region),
          permanent: true,
        },
      }
    }

    return {
      props: {
        profile,
      },
    }
  } catch (error) {
    if (error?.code === 'dealer_not_found' || error?.status === 404) {
      return { notFound: true }
    }

    return {
      props: {
        profile: null,
      },
    }
  }
}
