import { z } from 'zod'

export const ErrorEnvelopeSchema = z.object({
  code: z.number().int(),
  error: z.string(),
  message: z.string(),
  details: z.record(z.string(), z.unknown()).default({}),
})

export const RegionOptionSchema = z.object({
  code: z.string(),
  label: z.string(),
})

export const RegionContextSchema = z.object({
  active: z.string(),
  default: z.string(),
  source: z.enum(['query', 'cookie', 'wordpress_logic', 'default']),
  supported: z.array(RegionOptionSchema),
})

export const SuccessEnvelopeSchema = (dataSchema) =>
  z.object({
    code: z.literal(200),
    data: dataSchema,
  })
