import { z } from 'zod'

export const createClientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
})

export const updateClientSchema = createClientSchema.partial()
