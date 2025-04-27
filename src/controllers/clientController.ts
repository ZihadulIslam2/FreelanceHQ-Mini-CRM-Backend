import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import {
  createClientSchema,
  updateClientSchema,
} from '../lib/validations/clientSchema'
import { AuthRequest } from '../middlewares/auth'

export const getClients = async (req: AuthRequest, res: Response) => {
  try {
    const clients = await prisma.client.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    })
    res.json(clients)
  } catch (error) {
    console.error('Get Clients Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getClient = async (req: AuthRequest, res: Response) => {
  try {
    const client = await prisma.client.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    })

    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }

    res.json(client)
  } catch (error) {
    console.error('Get Client Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createClient = async (req: AuthRequest, res: Response) => {
  try {
    const validationResult = createClientSchema.safeParse(req.body)

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.issues,
      })
    }

    const client = await prisma.client.create({
      data: {
        ...validationResult.data,
        userId: req.user.id,
      },
    })

    res.status(201).json(client)
  } catch (error: any) {
    console.error('Create Client Error:', error)
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Email already exists' })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateClient = async (req: AuthRequest, res: Response) => {
  try {
    const validationResult = updateClientSchema.safeParse(req.body)

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.issues,
      })
    }

    const client = await prisma.client.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    })

    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }

    const updatedClient = await prisma.client.update({
      where: { id: Number(req.params.id) },
      data: validationResult.data,
    })

    res.json(updatedClient)
  } catch (error: any) {
    console.error('Update Client Error:', error)
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Email already exists' })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteClient = async (req: AuthRequest, res: Response) => {
  try {
    const client = await prisma.client.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    })

    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }

    await prisma.client.delete({
      where: { id: Number(req.params.id) },
    })

    res.status(204).send()
  } catch (error) {
    console.error('Delete Client Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
