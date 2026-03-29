import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BookCard } from '../components/ui/BookCard';
export function WishlistPage() {
  const { wishlist, navigate, addToCart } = useAppContext();
  const handleAddAllToCart = () => {
    wishlist.forEach((book) => addToCart(book, 1));
  };
  if (wishlist.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-cream flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="text-center max-w-md">

          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <HeartIcon className="w-12 h-12 text-gray-300" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-3">
            Your wishlist is empty
          </h1>
          <p className="text-gray-500 mb-8">
            Start browsing to save books you love for later.
          </p>
          <button
            onClick={() => navigate('catalog')}
            className="btn-primary w-full sm:w-auto">

            Browse Books
          </button>
        </motion.div>
      </div>);

  }
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy flex items-center gap-3">
              <HeartIcon className="w-8 h-8 text-burgundy fill-burgundy" />
              My Wishlist
            </h1>
            <p className="text-gray-500 mt-2">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          <button
            onClick={handleAddAllToCart}
            className="btn-primary flex items-center gap-2">

            <ShoppingCartIcon className="w-5 h-5" />
            Add All to Cart
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((book, idx) =>
          <BookCard key={book.id} book={book} index={idx} />
          )}
        </div>
      </div>
    </div>);

}