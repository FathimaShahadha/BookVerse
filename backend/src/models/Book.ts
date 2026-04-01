import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    originalPrice: {
      type: Number,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviewCount: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },
    isbn: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: 'English',
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
    },
    coverGradient: {
      type: String,
      default: 'bg-gradient-to-br from-gray-700 to-gray-900',
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);
export default Book;
