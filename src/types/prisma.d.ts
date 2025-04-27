import { PrismaClient } from '@prisma/client'

declare global {
  namespace Prisma {
    type InteractionType = 'call' | 'meeting' | 'email'
  }
} 