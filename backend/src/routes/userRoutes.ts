import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { protect, admin, csrOrAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, csrOrAdmin, getUsers);
router
  .route('/:id')
  .get(protect, csrOrAdmin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
