import express, { Router } from 'express'
import { authenticate } from '../middlewares/auth'
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController'

const router: Router = express.Router({ mergeParams: true })

// Apply authentication middleware to all routes
router.use(authenticate as express.RequestHandler)

// Route handlers
router.get('/', getProjects as express.RequestHandler)
router.get('/:id', getProject as express.RequestHandler)
router.post('/', createProject as express.RequestHandler)
router.put('/:id', updateProject as express.RequestHandler)
router.delete('/:id', deleteProject as express.RequestHandler)

export default router
