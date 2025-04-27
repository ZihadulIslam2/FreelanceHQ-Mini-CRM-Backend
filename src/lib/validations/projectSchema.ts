import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  details: z.string().optional(),
  status: z
    .enum(['not_started', 'in_progress', 'completed'])
    .default('not_started'),
  clientId: z.number(),
})

export const updateProjectSchema = createProjectSchema.partial()
