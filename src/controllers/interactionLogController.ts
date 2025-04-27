import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type InteractionType = 'call' | 'meeting' | 'email'

// Get all interaction logs
export const getInteractionLogs = async (req: Request, res: Response) => {
  try {
    const interactionLogs = await prisma.interactionLog.findMany({
      include: {
        client: true,
      },
    })
    res.json(interactionLogs)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch interaction logs' })
  }
}

// Get a single interaction log
export const getInteractionLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const interactionLog = await prisma.interactionLog.findUnique({
      where: { id: Number(id) },
      include: {
        client: true,
      },
    })
    if (!interactionLog) {
      return res.status(404).json({ error: 'Interaction log not found' })
    }
    res.json(interactionLog)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch interaction log' })
  }
}

// Create a new interaction log
export const createInteractionLog = async (req: Request, res: Response) => {
  try {
    const { content, date, interactionType, clientId } = req.body

    // Validate interaction type
    if (!['call', 'meeting', 'email'].includes(interactionType)) {
      return res.status(400).json({ error: 'Invalid interaction type' })
    }

    const interactionLog = await prisma.interactionLog.create({
      data: {
        content,
        date: new Date(date),
        interactionType: interactionType as any,
        clientId: Number(clientId),
      } as any,
      include: {
        client: true,
      },
    })
    res.status(201).json(interactionLog)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create interaction log' })
  }
}

// Update an interaction log
export const updateInteractionLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { content, date, interactionType, clientId } = req.body

    // Validate interaction type if provided
    if (interactionType && !['call', 'meeting', 'email'].includes(interactionType)) {
      return res.status(400).json({ error: 'Invalid interaction type' })
    }

    const interactionLog = await prisma.interactionLog.update({
      where: { id: Number(id) },
      data: {
        content,
        date: date ? new Date(date) : undefined,
        interactionType: interactionType as any,
        clientId: clientId ? Number(clientId) : undefined,
      } as any,
      include: {
        client: true,
      },
    })
    res.json(interactionLog)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update interaction log' })
  }
}

// Delete an interaction log
export const deleteInteractionLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.interactionLog.delete({
      where: { id: Number(id) },
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete interaction log' })
  }
} 