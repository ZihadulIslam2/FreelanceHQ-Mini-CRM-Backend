import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middlewares/auth'

const prisma = new PrismaClient()

// Get all reminders
export const getReminders = async (req: AuthRequest, res: Response) => {
  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        userId: Number(req.user?.id)
      },
      orderBy: {
        dueDate: 'asc'
      }
    })
    res.json(reminders)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reminders' })
  }
}

// Get a single reminder
export const getReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const reminder = await prisma.reminder.findUnique({
      where: { 
        id: Number(id),
        userId: Number(req.user?.id)
      }
    })
    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' })
    }
    res.json(reminder)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reminder' })
  }
}

// Get reminders due this week
export const getRemindersDueThisWeek = async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date()
    const endOfWeek = new Date(today)
    endOfWeek.setDate(today.getDate() + 7)

    const reminders = await prisma.reminder.findMany({
      where: {
        userId: Number(req.user?.id),
        dueDate: {
          gte: today,
          lte: endOfWeek
        }
      },
      orderBy: {
        dueDate: 'asc'
      }
    })
    res.json(reminders)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reminders due this week' })
  }
}

// Create a new reminder
export const createReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, dueDate } = req.body

    const reminder = await prisma.reminder.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        userId: Number(req.user?.id)
      }
    })
    res.status(201).json(reminder)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reminder' })
  }
}

// Update a reminder
export const updateReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, dueDate } = req.body

    const reminder = await prisma.reminder.update({
      where: { 
        id: Number(id),
        userId: Number(req.user?.id)
      },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined
      }
    })
    res.json(reminder)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update reminder' })
  }
}

// Delete a reminder
export const deleteReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    await prisma.reminder.delete({
      where: { 
        id: Number(id),
        userId: Number(req.user?.id)
      }
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reminder' })
  }
} 