import { z } from 'zod'
import { SuccessEnvelopeSchema } from './common'

const DealerSchema = z.object({
  id: z.number().int(),
  slug: z.string(),
  name: z.string(),
  region: z.string(),
  directoryType: z.enum(['used', 'accident', 'both']),
  logoUrl: z.string(),
  coverUrl: z.string(),
  location: z.string(),
  phone: z.string(),
  salesHours: z.string(),
  email: z.string(),
  website: z.string(),
  socials: z.record(z.string(), z.string()),
  notes: z.string(),
  tagline: z.string(),
  canonicalUrl: z.string(),
})

const DealerProfileDataSchema = z.object({
  dealer: DealerSchema,
  stats: z.object({
    inventoryCount: z.number().int(),
    reviewsCount: z.number().int(),
    averageRating: z.union([z.string(), z.null()]),
  }),
  inventoryPreview: z.object({
    count: z.number().int(),
    items: z.array(z.unknown()),
  }),
  reviewsPreview: z.object({
    count: z.number().int(),
    items: z.array(z.unknown()),
  }),
})

export const DealerProfileResponseSchema = SuccessEnvelopeSchema(
  DealerProfileDataSchema
)
