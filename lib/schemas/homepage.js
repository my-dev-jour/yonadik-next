import { z } from 'zod'
import { SuccessEnvelopeSchema, RegionOptionSchema } from './common'

const HomepageDataSchema = z.object({
  region: z.object({
    active: z.string(),
    default: z.string(),
    source: z.enum(['query', 'cookie', 'wordpress_logic', 'default']),
    supported: z.array(RegionOptionSchema),
  }),
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    subtitle: z.string(),
    primaryCta: z.object({
      label: z.string(),
      url: z.string(),
    }),
    secondaryCta: z.object({
      label: z.string(),
      url: z.string(),
    }),
  }),
  featuredSections: z.array(
    z.object({
      key: z.string(),
      title: z.string(),
      url: z.string(),
    })
  ),
  stats: z.array(z.unknown()),
  maps: z.array(
    z.object({
      context: z.string(),
      mapId: z.number().int(),
    })
  ),
  explorer: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    canonicalUrl: z.string(),
  }),
})

export const HomepageResponseSchema = SuccessEnvelopeSchema(HomepageDataSchema)
