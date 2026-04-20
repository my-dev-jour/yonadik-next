import Head from 'next/head'
import { getDealersDirectory } from '../api/web'

function buildCanonicalUrl(pathname) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://next.yonadik.com').replace(/\/$/, '')
  const canonicalBase = process.env.NEXT_PUBLIC_CANONICAL_BASE_URL || 'https://yonadik.com'
  const parsed = new URL(siteUrl)
  const canonical = new URL(pathname, canonicalBase)

  if (parsed.hostname.includes('next.yonadik.com')) {
    return canonical.toString()
  }

  return new URL(pathname, siteUrl).toString()
}

function toStringParam(value) {
  if (Array.isArray(value)) return value[0] || ''
  return typeof value === 'string' ? value : ''
}

function DealersDirectoryPage({ directory, error, canonicalPath }) {
  const shouldNoindex = process.env.NEXT_PUBLIC_PRE_CUTOVER_NOINDEX !== 'false'
  const robotsContent = shouldNoindex ? 'noindex, nofollow' : 'index, follow'

  return (
    <>
      <Head>
        <title>{directory?.title || 'Dealers | Yonadik'}</title>
        <meta
          name='description'
          content={`${directory?.title || 'Dealers'} in ${directory?.region?.label || 'your region'}.`}
        />
        <meta name='robots' content={robotsContent} />
        <meta name='googlebot' content={robotsContent} />
        <link rel='canonical' href={buildCanonicalUrl(canonicalPath)} />
      </Head>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '28px 20px 64px' }}>
        <header
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 14,
            padding: 20,
            background: '#fff',
            marginBottom: 18,
          }}
        >
          <h1 style={{ margin: '0 0 8px', fontSize: 30 }}>{directory?.title || 'Dealers'}</h1>
          <p style={{ margin: 0, color: '#4b5563' }}>
            Region: <strong>{directory?.region?.label || '-'}</strong> (
            {directory?.region?.code || '-'}) | Source: <strong>{directory?.region?.source || '-'}</strong>
          </p>
        </header>

        <section
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 14,
            padding: 18,
            background: '#fff',
            marginBottom: 18,
          }}
        >
          <form method='get' style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              type='text'
              name='q'
              defaultValue={directory?.query?.q || ''}
              placeholder='Search dealers'
              style={{
                border: '1px solid #d1d5db',
                borderRadius: 10,
                padding: '10px 12px',
                fontSize: 14,
                flex: '1 1 280px',
              }}
            />
            <select
              name='region'
              defaultValue={directory?.region?.code || ''}
              style={{
                border: '1px solid #d1d5db',
                borderRadius: 10,
                padding: '10px 12px',
                fontSize: 14,
                minWidth: 120,
              }}
            >
              <option value=''>Auto region</option>
              <option value='ae'>UAE</option>
              <option value='om'>Oman</option>
            </select>
            <button
              type='submit'
              style={{
                border: 0,
                borderRadius: 10,
                background: '#111827',
                color: '#fff',
                padding: '10px 16px',
                cursor: 'pointer',
              }}
            >
              Apply
            </button>
          </form>
        </section>

        {error ? (
          <section
            style={{
              border: '1px solid #ef4444',
              borderRadius: 14,
              padding: 16,
              background: '#fef2f2',
              color: '#991b1b',
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 18 }}>Directory API error</h2>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{JSON.stringify(error, null, 2)}</pre>
          </section>
        ) : (
          <>
            <section
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 14,
                padding: 16,
                background: '#fff',
                marginBottom: 18,
              }}
            >
              <p style={{ margin: 0, color: '#374151' }}>
                Results: <strong>{directory?.count || 0}</strong> | Map context:{' '}
                <strong>{directory?.map?.context || '-'}</strong> | Map ID:{' '}
                <strong>#{directory?.map?.mapId || '-'}</strong>
              </p>
            </section>

            <section
              style={{
                display: 'grid',
                gap: 14,
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              }}
            >
              {(directory?.dealers || []).map((dealer) => (
                <article
                  key={dealer.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 14,
                    padding: 14,
                    background: '#fff',
                  }}
                >
                  {dealer.logoUrl ? (
                    <img
                      src={dealer.logoUrl}
                      alt={dealer.name}
                      style={{
                        width: '100%',
                        height: 140,
                        objectFit: 'cover',
                        borderRadius: 10,
                        marginBottom: 10,
                        background: '#f3f4f6',
                      }}
                    />
                  ) : null}
                  <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{dealer.name}</h3>
                  <p style={{ margin: '0 0 8px', color: '#4b5563' }}>{dealer.location || 'Location pending'}</p>
                  <p style={{ margin: '0 0 10px', color: '#6b7280', fontSize: 13 }}>
                    Type: {dealer.directoryType} | Region: {dealer.region}
                  </p>
                  <a href={dealer.profileUrl} style={{ color: '#111827', textDecoration: 'underline' }}>
                    View dealer profile
                  </a>
                </article>
              ))}
            </section>

            {(directory?.dealers || []).length === 0 ? (
              <section
                style={{
                  border: '1px dashed #cbd5e1',
                  borderRadius: 14,
                  padding: 18,
                  background: '#fff',
                  marginTop: 16,
                }}
              >
                <p style={{ margin: 0, color: '#475569' }}>No dealers found for current filters.</p>
              </section>
            ) : null}
          </>
        )}
      </main>
    </>
  )
}

function makeDirectoryPage({ type, canonicalPath }) {
  async function getServerSideProps({ query, req }) {
    const q = toStringParam(query?.q)
    const region = toStringParam(query?.region)

    try {
      const directory = await getDealersDirectory({
        type,
        q,
        region,
        requestHeaders: {
          cookie: req?.headers?.cookie || '',
        },
      })

      return {
        props: {
          directory,
          error: null,
          canonicalPath,
        },
      }
    } catch (error) {
      return {
        props: {
          directory: null,
          canonicalPath,
          error: {
            code: error?.code || 'internal_error',
            status: error?.status || 500,
            message: error?.message || 'Unexpected API error.',
            details: error?.details || {},
          },
        },
      }
    }
  }

  return { DealersDirectoryPage, getServerSideProps }
}

export { makeDirectoryPage }
