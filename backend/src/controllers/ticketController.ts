import { Request, Response } from 'express';
import Ticket from '../models/Ticket';
import { UserRequest } from '../middleware/authMiddleware';

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
export const createTicket = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const { subject, priority, category, message } = req.body;

    const ticket = new Ticket({
      userId: req.user._id,
      subject,
      priority,
      category,
      messages: [
        {
          senderId: req.user._id,
          text: message,
          isStaff: req.user.role === 'csr' || req.user.role === 'admin',
        },
      ],
    });

    const createdTicket = await ticket.save();
    res.status(201).json(createdTicket);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user tickets
// @route   GET /api/tickets/mytickets
// @access  Private
export const getMyTickets = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private/CSR or Admin
export const getTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('messages.senderId', 'name role');

    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add message to ticket
// @route   POST /api/tickets/:id/messages
// @access  Private
export const addTicketMessage = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (ticket) {
      const message = {
        senderId: req.user._id,
        text: req.body.text,
        isStaff: req.user.role === 'csr' || req.user.role === 'admin',
      };

      ticket.messages.push(message);
      
      if (req.body.status) {
        ticket.status = req.body.status;
      }

      await ticket.save();
      res.status(201).json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
