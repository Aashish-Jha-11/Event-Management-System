import express from 'express';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventLogs,
} from '../controllers/eventController.js';

const router = express.Router();

router.route('/').get(getEvents).post(createEvent);
router.route('/:id').get(getEvent).put(updateEvent).delete(deleteEvent);
router.route('/:id/logs').get(getEventLogs);

export default router;
