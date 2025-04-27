import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get total clients count
    const totalClients = await prisma.client.count()

    // Get total projects count
    const totalProjects = await prisma.project.count()

    // Get projects by status
    const projectsByStatus = await prisma.project.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })

    // Get upcoming reminders (due in the next 7 days)
    const upcomingReminders = await prisma.reminder.findMany({
      where: {
        dueDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        }
      },
      orderBy: {
        dueDate: 'asc'
      },
      take: 5 // Limit to 5 upcoming reminders
    })

    res.json({
      totalClients,
      totalProjects,
      projectsByStatus: projectsByStatus.map(status => ({
        status: status.status,
        count: status._count.status
      })),
      upcomingReminders
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    res.status(500).json({ error: 'Failed to fetch dashboard data' })
  }
} 