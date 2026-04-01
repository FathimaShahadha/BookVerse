import express from 'express';
import {
  createTicket,
  getMyTickets,
  getTickets,
  getTicketById,
  addTicketMessage,
} from '../controllers/ticketController';
import { protect, csrOrAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, createTicket).get(protect, csrOrAdmin, getTickets);
router.route('/mytickets').get(protect, getMyTickets);
router.route('/:id').get(protect, getTicketById);
router.route('/:id/messages').post(protect, addTicketMessage);

export default router;
