import express, { Router } from 'express'
import {
  getReminders,
  getReminder,
  getRemindersDueThisWeek,
  createReminder,
  updateReminder,
  deleteReminder
} from '../controllers/reminderController'
import { authenticate } from '../middlewares/auth'

const router: Router = express.Router()

// All routes are protected and require authentication
router.use(authenticate as express.RequestHandler)

// Get all reminders
router.get('/', getReminders as express.RequestHandler)

// Get reminders due this week
router.get('/due-this-week', getRemindersDueThisWeek as express.RequestHandler)

// Get a single reminder
router.get('/:id', getReminder as express.RequestHandler)

// Create a new reminder
router.post('/', createReminder as express.RequestHandler)

// Update a reminder
router.put('/:id', updateReminder as express.RequestHandler)

// Delete a reminder
router.delete('/:id', deleteReminder as express.RequestHandler)

export default router 