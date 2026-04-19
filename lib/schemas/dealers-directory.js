import { z } from 'zod'
import { SuccessEnvelopeSchema } from './common'

const DealerSchema = z.object({
  id: z.number().int(),
  slug: z.string(),
  name: z.string(),
  directoryType: z.enum(['used', 'accident', 'both']),
  region: z.string(),
  location: z.string(),
  summary: z.string(),
  logoUrl: z.string(),
  coverUrl: z.string(),
  profileUrl: z.string(),
  badgeLabel: z.string(),
})

const DealersDirectoryDataSchema = z.object({
  directoryType: z.enum(['used', 'accident']),
  region: z.object({
    code: z.string(),
    label: z.string(),
    source: z.enum(['query', 'cookie', 'wordpress_logic', 'default']),
  }),
  query: z.object({
    q: z.string(),
  }),
  title: z.string(),
  count: z.number().int(),
  map: z.object({
    context: z.string(),
    mapId: z.number().int(),
    shortcodeAvailable: z.boolean(),
  }),
  dealers: z.array(DealerSchema),
})

export const DealersDirectoryResponseSchema =
  SuccessEnvelopeSchema(DealersDirectoryDataSchema)
