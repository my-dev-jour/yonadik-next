import { fetchApi } from './client'
import { RegionContextResponseSchema } from '../schemas/region-context'
import { DealersDirectoryResponseSchema } from '../schemas/dealers-directory'
import { DealerProfileResponseSchema } from '../schemas/dealer-profile'
import { HomepageResponseSchema } from '../schemas/homepage'

const WEB_API_BASE = '/wp-json/stm-mra/v1/web'

/**
 * @param {{region?: string}} [input]
 */
export async function getRegionContext(input = {}) {
  const res = await fetchApi({
    endpoint: `${WEB_API_BASE}/region-context/`,
    schema: RegionContextResponseSchema,
    query: { region: input.region },
    cacheMode: 'no-store',
  })
  return res.data
}

/**
 * @param {{type: 'used' | 'accident', q?: string, region?: string, requestHeaders?: Record<string, string | undefined>}} input
 */
export async function getDealersDirectory(input) {
  const res = await fetchApi({
    endpoint: `${WEB_API_BASE}/dealers-directory/`,
    schema: DealersDirectoryResponseSchema,
    query: { type: input.type, q: input.q, region: input.region },
    cacheMode: 'no-store',
    requestHeaders: input.requestHeaders,
  })
  return res.data
}

/**
 * @param {{slugOrId: string | number, region?: string, requestHeaders?: Record<string, string | undefined>}} input
 */
export async function getDealerProfile(input) {
  const res = await fetchApi({
    endpoint: `${WEB_API_BASE}/dealer-profile/${encodeURIComponent(String(input.slugOrId))}`,
    schema: DealerProfileResponseSchema,
    query: { region: input.region },
    cacheMode: 'no-store',
    requestHeaders: input.requestHeaders,
  })
  return res.data
}

/**
 * @param {{region?: string}} [input]
 */
export async function getHomepage(input = {}) {
  const res = await fetchApi({
    endpoint: `${WEB_API_BASE}/homepage/`,
    schema: HomepageResponseSchema,
    query: { region: input.region },
    cacheMode: 'force-cache',
    revalidateSeconds: 120,
  })
  return res.data
}
