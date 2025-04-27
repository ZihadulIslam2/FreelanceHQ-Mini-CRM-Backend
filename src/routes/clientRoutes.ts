import express, { Router } from 'express'
import { authenticate } from '../middlewares/auth'
import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clientController'

const router: Router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticate as express.RequestHandler)

// Route handlers
router.get('/', getClients as express.RequestHandler)
router.get('/:id', getClient as express.RequestHandler)
router.post('/', createClient as express.RequestHandler)
router.put('/:id', updateClient as express.RequestHandler)
router.delete('/:id', deleteClient as express.RequestHandler)

export default router
