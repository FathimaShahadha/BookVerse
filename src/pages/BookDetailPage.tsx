import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCartIcon,
  HeartIcon,
  Share2Icon,
  TruckIcon,
  ShieldCheckIcon } from
'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ReviewStars } from '../components/ui/ReviewStars';
import { BookCard } from '../components/ui/BookCard';
export function BookDetailPage() {
  const { pageParams, addToCart, toggleWishlist, isInWishlist, books, reviews } =
  useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'description' | 'details' | 'reviews'>(
    'description');
  const bookId = pageParams?.bookId || 'b1';
  const book = books.find((b) => b.id === bookId) || books[0];
  const inWishlist = isInWishlist(book.id);
  const similarBooks = books.filter(
    (b) => b.category === book.category && b.id !== book.id
  ).slice(0, 4);
  const bookReviews = reviews.filter((r) => r.bookId === book.id);
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="text-sm text-gray-500">
            <button onClick={() => useAppContext().navigate('home')} className="hover:text-amber transition-colors">Home</button> /{' '}
            <button onClick={() => useAppContext().navigate('catalog')} className="hover:text-amber transition-colors">Catalog</button> / {book.category} /{' '}
            <span className="text-navy font-medium">{book.title}</span>
          </div>
          <button 
            onClick={() => useAppContext().navigate('catalog')} 
            className="text-sm font-medium text-navy hover:text-amber transition-colors flex items-center gap-2 w-fit"
          >
            &larr; Back to Catalog
          </button>
        </div>

        {/* Main Product Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            {/* Left: Cover Image */}
            <div className="md:w-2/5 lg:w-1/3 p-8 md:p-12 bg-gray-50 flex items-center justify-center border-r border-gray-100">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: 0.5
                }}
                className={`w-full max-w-sm aspect-[2/3] rounded-lg shadow-warm-lg relative flex items-center justify-center p-8 overflow-hidden ${book.coverImage ? 'bg-gray-100' : book.coverGradient}`}>
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-white/20" />
                    <div className="absolute left-7 top-0 bottom-0 w-px bg-black/10" />
                    <div className="text-center">
                      <h1 className="font-serif text-white text-3xl font-bold leading-tight mb-4 drop-shadow-md">
                        {book.title}
                      </h1>
                      <p className="text-white/80 font-medium tracking-widest uppercase text-sm">
                        {book.author}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Right: Product Info */}
            <div className="md:w-3/5 lg:w-2/3 p-8 md:p-12 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-amber uppercase tracking-wider">
                  {book.category}
                </span>
                <button className="text-gray-400 hover:text-navy transition-colors">
                  <Share2Icon className="w-5 h-5" />
                </button>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-2">
                {book.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                by{' '}
                <a
                  href="#"
                  className="text-navy font-medium hover:text-amber transition-colors underline underline-offset-4 decoration-gray-300">

                  {book.author}
                </a>
              </p>

              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <ReviewStars
                  rating={book.rating}
                  reviewCount={book.reviewCount}
                  size="md" />

                <span className="text-gray-300">|</span>
                <span
                  className={`text-sm font-medium px-2.5 py-1 rounded-full ${book.availability === 'In Stock' ? 'bg-green-100 text-forest' : book.availability === 'Low Stock' ? 'bg-amber/20 text-amber' : 'bg-red-100 text-burgundy'}`}>

                  {book.availability}
                </span>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold text-navy">
                    ${book.price.toFixed(2)}
                  </span>
                  {book.originalPrice &&
                  <span className="text-xl text-gray-400 line-through mb-1">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  }
                  {book.originalPrice &&
                  <span className="text-sm font-bold text-burgundy bg-red-50 px-2 py-1 rounded mb-1 ml-2">
                      Save ${(book.originalPrice - book.price).toFixed(2)}
                    </span>
                  }
                </div>
                <p className="text-sm text-gray-500">
                  Prices include VAT where applicable.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-xl bg-white h-12 w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 h-full text-gray-500 hover:text-navy hover:bg-gray-50 rounded-l-xl transition-colors">

                    -
                  </button>
                  <span className="w-10 text-center font-medium text-navy">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 h-full text-gray-500 hover:text-navy hover:bg-gray-50 rounded-r-xl transition-colors">

                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(book, quantity)}
                  disabled={book.availability === 'Out of Stock'}
                  className="flex-1 btn-primary h-12 gap-2">

                  <ShoppingCartIcon className="w-5 h-5" />
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(book)}
                  className={`h-12 px-6 rounded-xl border font-medium flex items-center justify-center gap-2 transition-all ${inWishlist ? 'border-burgundy text-burgundy bg-red-50' : 'border-gray-300 text-navy bg-white hover:bg-gray-50'}`}>

                  <HeartIcon
                    className={`w-5 h-5 ${inWishlist ? 'fill-burgundy' : ''}`} />

                  {inWishlist ? 'Saved' : 'Wishlist'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <TruckIcon className="w-5 h-5 text-amber" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheckIcon className="w-5 h-5 text-amber" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="flex border-b border-gray-100">
            {(['description', 'details', 'reviews'] as const).map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === tab ? 'text-navy' : 'text-gray-400 hover:text-navy'}`}>

                {tab === 'reviews' ? `Reviews (${book.reviewCount})` : tab}
                {activeTab === tab &&
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber" />

              }
              </button>
            )}
          </div>

          <div className="p-8 md:p-12">
            {activeTab === 'description' &&
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              className="prose prose-navy max-w-none">

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {book.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </motion.div>
            }

            {activeTab === 'details' &&
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 max-w-3xl">

                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Publisher</span>
                  <span className="font-medium text-navy">
                    {book.publisher}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Publication Date</span>
                  <span className="font-medium text-navy">
                    {new Date(book.publishDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">ISBN</span>
                  <span className="font-medium text-navy">{book.isbn}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Pages</span>
                  <span className="font-medium text-navy">{book.pages}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Language</span>
                  <span className="font-medium text-navy">{book.language}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Genre</span>
                  <span className="font-medium text-navy">{book.genre}</span>
                </div>
              </motion.div>
            }

            {activeTab === 'reviews' &&
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}>

                <div className="flex flex-col md:flex-row gap-12 mb-12">
                  <div className="md:w-1/3">
                    <h3 className="font-serif text-2xl font-bold text-navy mb-4">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-5xl font-bold text-navy">
                        {book.rating.toFixed(1)}
                      </span>
                      <div>
                        <ReviewStars rating={book.rating} size="md" />
                        <p className="text-sm text-gray-500 mt-1">
                          Based on {book.reviewCount} reviews
                        </p>
                      </div>
                    </div>
                    <button className="btn-outline w-full">
                      Write a Review
                    </button>
                  </div>

                  <div className="md:w-2/3 space-y-6">
                    {bookReviews.length > 0 ?
                  bookReviews.map((review) =>
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6 last:border-0">

                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-navy">
                                {review.userName}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <ReviewStars rating={review.rating} size="sm" />
                                <span className="text-xs text-gray-400">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mt-3">
                            {review.comment}
                          </p>
                        </div>
                  ) :

                  <p className="text-gray-500 italic">
                        No reviews yet for this book.
                      </p>
                  }
                  </div>
                </div>
              </motion.div>
            }
          </div>
        </div>

        {/* Similar Books */}
        {similarBooks.length > 0 &&
        <section>
            <h2 className="font-serif text-2xl font-bold text-navy mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarBooks.map((b, idx) =>
            <BookCard key={b.id} book={b} index={idx} />
            )}
            </div>
          </section>
        }
      </div>
    </div>);

}