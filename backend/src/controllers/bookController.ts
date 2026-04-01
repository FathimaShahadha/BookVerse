import { Request, Response } from 'express';
import Book from '../models/Book';

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const keywordParam = req.query.keyword as string;
    const keyword = keywordParam
      ? {
          $or: [
            { title: { $regex: keywordParam, $options: 'i' } },
            { author: { $regex: keywordParam, $options: 'i' } },
          ],
        }
      : {};

    const categoryParam = req.query.category as string;
    const category = categoryParam && categoryParam !== 'All'
      ? { category: categoryParam }
      : {};

    const books = await Book.find({ ...keyword, ...category });
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = new Book({
      ...req.body
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = req.body.title || book.title;
      book.author = req.body.author || book.author;
      book.price = req.body.price || book.price;
      book.originalPrice = req.body.originalPrice || book.originalPrice;
      book.category = req.body.category || book.category;
      book.description = req.body.description || book.description;
      book.availability = req.body.availability || book.availability;
      book.isbn = req.body.isbn || book.isbn;
      book.pages = req.body.pages || book.pages;
      book.publisher = req.body.publisher || book.publisher;
      book.publishDate = req.body.publishDate || book.publishDate;
      book.coverImage = req.body.coverImage || book.coverImage;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await Book.deleteOne({ _id: req.params.id });
      res.json({ message: 'Book removed' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
