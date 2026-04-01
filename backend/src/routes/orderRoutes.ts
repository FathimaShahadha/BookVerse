import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  updateOrderNote,
} from '../controllers/orderController';
import { protect, admin, csrOrAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, csrOrAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, csrOrAdmin, updateOrderStatus);
router.route('/:id/note').put(protect, csrOrAdmin, updateOrderNote);

export default router;
