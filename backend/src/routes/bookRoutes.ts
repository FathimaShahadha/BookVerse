import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getBooks).post(protect, admin, createBook);
router.route('/:id').get(getBookById).put(protect, admin, updateBook).delete(protect, admin, deleteBook);

export default router;
