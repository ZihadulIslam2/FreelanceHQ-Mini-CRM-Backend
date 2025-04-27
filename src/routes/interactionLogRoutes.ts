import express, { Router } from 'express'
import { authenticate } from '../middlewares/auth'
import {
  getInteractionLogs,
  getInteractionLog,
  createInteractionLog,
  updateInteractionLog,
  deleteInteractionLog,
} from '../controllers/interactionLogController'

const router: Router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticate as express.RequestHandler)

// Route handlers
router.get('/', getInteractionLogs as express.RequestHandler)
router.get('/:id', getInteractionLog as express.RequestHandler)
router.post('/', createInteractionLog as express.RequestHandler)
router.put('/:id', updateInteractionLog as express.RequestHandler)
router.delete('/:id', deleteInteractionLog as express.RequestHandler)

export default router 