import { ZodError } from 'zod'
import { ApiError, normalizeApiError } from './errors'

const DEFAULT_TIMEOUT_MS = 12000

function getWpApiBaseUrl() {
  return (
    process.env.WP_API_BASE_URL ||
    process.env.NEXT_PUBLIC_WP_BASE_URL ||
    'https://yonadik.com'
  ).replace(/\/$/, '')
}

function toQueryString(params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    search.set(key, String(value))
  })
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

/**
 * @template T
 * @param {{endpoint:string, schema: import('zod').ZodType<T>, query?:Record<string, unknown>, cacheMode?:RequestCache, revalidateSeconds?:number, requestHeaders?:Record<string, string | undefined>}} input
 * @returns {Promise<T>}
 */
export async function fetchApi(input) {
  const {
    endpoint,
    schema,
    query = {},
    cacheMode = 'no-store',
    revalidateSeconds,
    requestHeaders = {},
  } = input

  const url = `${getWpApiBaseUrl()}${endpoint}${toQueryString(query)}`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

  try {
    /** @type {RequestInit & { next?: { revalidate: number } }} */
    const init = {
      method: 'GET',
      cache: cacheMode,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...Object.fromEntries(
          Object.entries(requestHeaders).filter(([, value]) => typeof value === 'string' && value)
        ),
      },
    }

    if (typeof revalidateSeconds === 'number') {
      init.next = { revalidate: revalidateSeconds }
    }

    const response = await fetch(url, init)
    const json = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new ApiError(
        typeof json?.message === 'string' ? json.message : 'API request failed.',
        {
          status: Number(json?.code || response.status || 500),
          code: typeof json?.error === 'string' ? json.error : 'internal_error',
          details: typeof json?.details === 'object' && json?.details ? json.details : {},
          endpoint,
        }
      )
    }

    return schema.parse(json)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiError('API schema validation failed.', {
        status: 500,
        code: 'internal_error',
        details: { issues: error.issues },
        endpoint,
      })
    }
    throw normalizeApiError(error, endpoint)
  } finally {
    clearTimeout(timer)
  }
}
