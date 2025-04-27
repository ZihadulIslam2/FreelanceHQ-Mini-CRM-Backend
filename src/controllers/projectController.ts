import { Response } from 'express'
import { prisma } from '../lib/prisma'
import {
  createProjectSchema,
  updateProjectSchema,
} from '../lib/validations/projectSchema'
import { AuthRequest } from '../middlewares/auth'

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const clientId = Number(req.params.clientId)

    // Verify client belongs to user
    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: req.user.id,
      },
    })

    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }

    const projects = await prisma.project.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
    })
    res.json(projects)
  } catch (error) {
    console.error('Get Projects Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getProject = async (req: AuthRequest, res: Response) => {
  try {
    const clientId = Number(req.params.clientId)
    const projectId = Number(req.params.id)

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        clientId,
        client: {
          userId: req.user.id,
        },
      },
    })

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json(project)
  } catch (error) {
    console.error('Get Project Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const clientId = Number(req.params.clientId)

    // Verify client belongs to user
    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: req.user.id,
      },
    })

    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }

    const validationResult = createProjectSchema.safeParse({
      ...req.body,
      clientId,
    })

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.issues,
      })
    }

    const project = await prisma.project.create({
      data: validationResult.data,
    })

    res.status(201).json(project)
  } catch (error) {
    console.error('Create Project Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const projectId = Number(req.params.id)
    const clientId = Number(req.params.clientId)

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        clientId,
        client: {
          userId: req.user.id,
        },
      },
    })

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    const validationResult = updateProjectSchema.safeParse(req.body)

    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.issues,
      })
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: validationResult.data,
    })

    res.json(updatedProject)
  } catch (error) {
    console.error('Update Project Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const projectId = Number(req.params.id)
    const clientId = Number(req.params.clientId)

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        clientId,
        client: {
          userId: req.user.id,
        },
      },
    })

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    await prisma.project.delete({
      where: { id: projectId },
    })

    res.status(204).send()
  } catch (error) {
    console.error('Delete Project Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
