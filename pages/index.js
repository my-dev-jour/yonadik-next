import Head from 'next/head'
import { getHomepage } from '../lib/api/web'

export default function Home({ homepage, error }) {
  const hero = homepage?.hero

  return (
    <>
      <Head>
        <title>{homepage?.seo?.title || 'Yonadik Next'}</title>
      </Head>
      <main style={{ maxWidth: 980, margin: '0 auto', padding: '32px 20px' }}>
        <h1 style={{ marginBottom: 8 }}>{hero?.title || 'Yonadik Headless Frontend'}</h1>
        <p style={{ marginTop: 0 }}>{hero?.subtitle || 'Story 002 API layer wired.'}</p>

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
          <section
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 16,
              background: '#fafafa',
            }}
          >
            <h2 style={{ marginTop: 0 }}>Homepage payload snapshot</h2>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
              {JSON.stringify(homepage, null, 2)}
            </pre>
          </section>
        )}
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const homepage = await getHomepage({ region: query?.region })
    return { props: { homepage, error: null } }
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
    }
  }
}
