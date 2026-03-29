import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import { Book } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';
import { ReviewStars } from './ReviewStars';
interface BookCardProps {
  book: Book;
  index?: number;
  featured?: boolean;
}
export function BookCard({ book, index = 0, featured = false }: BookCardProps) {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const inWishlist = isInWishlist(book.id);
  const handleCardClick = () => {
    navigate('book-detail', {
      bookId: book.id
    });
  };
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(book);
  };
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(book);
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05
      }}
      whileHover={{
        y: -4
      }}
      className={`group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-warm-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 ${featured ? 'md:flex-row md:col-span-2' : ''}`}
      onClick={handleCardClick}>

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {book.isBestseller &&
        <span className="bg-amber text-navy text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            Bestseller
          </span>
        }
        {book.isNew &&
        <span className="bg-burgundy text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            New
          </span>
        }
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-burgundy hover:bg-white transition-colors shadow-sm"
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>

        <HeartIcon
          className={`w-4 h-4 ${inWishlist ? 'fill-burgundy text-burgundy' : ''}`} />

      </button>

      {/* Book Cover (Gradient Placeholder) */}
      <div
        className={`${featured ? 'md:w-1/3 md:h-auto' : 'w-full aspect-[2/3]'} ${book.coverGradient} relative flex items-center justify-center p-6 overflow-hidden`}>

        {/* Decorative spine line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/20" />
        <div className="absolute left-5 top-0 bottom-0 w-px bg-black/10" />

        <div className="text-center transform group-hover:scale-105 transition-transform duration-500">
          <h3 className="font-serif text-white text-xl font-bold leading-tight mb-2 drop-shadow-md">
            {book.title}
          </h3>
          <p className="text-white/80 text-sm font-medium tracking-wider uppercase">
            {book.author}
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className={`p-5 flex flex-col flex-grow ${featured ? 'md:w-2/3' : ''}`}>

        <div className="text-xs text-amber font-semibold uppercase tracking-wider mb-1">
          {book.category}
        </div>

        <h3 className="font-serif text-lg font-bold text-navy line-clamp-2 mb-1 group-hover:text-amber transition-colors">
          {book.title}
        </h3>

        <p className="text-sm text-gray-500 mb-3">{book.author}</p>

        {featured &&
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 hidden md:block">
            {book.description}
          </p>
        }

        <div className="mb-4">
          <ReviewStars rating={book.rating} reviewCount={book.reviewCount} />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-navy">
              ${book.price.toFixed(2)}
            </span>
            {book.originalPrice &&
            <span className="text-xs text-gray-400 line-through">
                ${book.originalPrice.toFixed(2)}
              </span>
            }
          </div>

          <button
            onClick={handleAddToCart}
            disabled={book.availability === 'Out of Stock'}
            className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${book.availability === 'Out of Stock' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-navy text-white hover:bg-amber hover:text-navy shadow-sm hover:shadow-md'}`}
            aria-label="Add to cart">

            <ShoppingCartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>);

}