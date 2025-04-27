import express, { Router } from 'express'
import { getDashboardData } from '../controllers/dashboardController'
import { authenticate } from '../middlewares/auth'

const router: Router = express.Router()

// All routes are protected and require authentication
router.use(authenticate as express.RequestHandler)

// Get dashboard data
router.get('/', getDashboardData as express.RequestHandler)

export default router 