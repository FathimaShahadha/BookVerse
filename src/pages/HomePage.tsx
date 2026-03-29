import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, ArrowRightIcon, BookOpenIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BookCard } from '../components/ui/BookCard';
export function HomePage() {
  const { navigate, setSearchQuery, books, categories, promotions, setSelectedCategory } = useAppContext();
  const [localSearch, setLocalSearch] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate('catalog');
  };
  const featuredBooks = books.slice(0, 6);
  const newArrivals = books.filter((b) => b.isNew).slice(0, 4);
  const bestsellers = books.filter((b) => b.isBestseller).slice(0, 5);
  return (
    <div className="pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative bg-navy text-cream py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-amber blur-3xl mix-blend-screen" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-burgundy blur-3xl mix-blend-screen" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6
              }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">

              Discover Your Next Great Read
            </motion.h1>
            <motion.p
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.1
              }}
              className="text-lg md:text-xl text-cream/80 mb-10">

              Curated collections, timeless classics, and the latest
              bestsellers. Welcome to your new favorite independent bookshop.
            </motion.p>

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
                duration: 0.6,
                delay: 0.2
              }}
              className="flex flex-col sm:flex-row gap-4">

              <form onSubmit={handleSearch} className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by title, author, or genre..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-navy bg-white focus:outline-none focus:ring-2 focus:ring-amber shadow-lg" />

                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </form>
              <button
                onClick={() => navigate('catalog')}
                className="btn-primary whitespace-nowrap">

                Browse Catalog
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((promo, idx) =>
            <motion.div
              key={promo.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: idx * 0.1
              }}
              className="bg-cream p-6 rounded-2xl border border-amber/20 relative overflow-hidden group">

                <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                <h3 className="font-serif text-xl font-bold text-navy mb-2 relative z-10">
                  {promo.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 relative z-10">
                  {promo.description}
                </p>
                <div className="inline-block bg-white px-3 py-1 rounded-md border border-dashed border-amber text-amber font-mono text-sm font-bold relative z-10">
                  Code: {promo.code}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl font-bold text-navy mb-2">
              Browse by Category
            </h2>
            <p className="text-gray-500">
              Find exactly what you're looking for.
            </p>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className="text-amber font-medium hover:text-navy transition-colors flex items-center gap-1">

            View All <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) =>
          <motion.div
            key={cat.id}
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: idx * 0.05
            }}
            onClick={() => {
              setSelectedCategory(cat.name);
              navigate('catalog');
            }}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-warm border border-gray-100 cursor-pointer text-center group transition-all">

              <div className="w-12 h-12 mx-auto bg-cream rounded-full flex items-center justify-center mb-4 group-hover:bg-amber group-hover:text-white transition-colors text-navy">
                <BookOpenIcon className="w-6 h-6" />{' '}
                {/* Using BookOpenIcon as placeholder for all */}
              </div>
              <h3 className="font-serif font-bold text-navy mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400">{cat.bookCount} Books</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-navy text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-white mb-2">
                Featured Reads
              </h2>
              <p className="text-cream/70">
                Handpicked selections from our staff.
              </p>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-6 snap-x hide-scrollbar">
            {featuredBooks.map((book, idx) =>
            <div
              key={book.id}
              className="min-w-[280px] max-w-[280px] snap-start">

                <BookCard book={book} index={idx} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* New Arrivals & Bestsellers */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2" id="new-arrivals">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-serif text-3xl font-bold text-navy">
                New Arrivals
              </h2>
              <button
                onClick={() => navigate('catalog')}
                className="text-amber font-medium hover:text-navy transition-colors flex items-center gap-1">

                View All <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {newArrivals.map((book, idx) =>
              <BookCard key={book.id} book={book} index={idx} />
              )}
            </div>
          </div>

          <div id="bestsellers">
            <h2 className="font-serif text-3xl font-bold text-navy mb-8">
              Bestsellers
            </h2>
            <div className="space-y-6">
              {bestsellers.map((book, idx) =>
              <div
                key={book.id}
                className="flex gap-4 items-center group cursor-pointer"
                onClick={() =>
                navigate('book-detail', {
                  bookId: book.id
                })
                }>

                  <span className="font-serif text-4xl font-bold text-gray-200 group-hover:text-amber transition-colors w-8 text-center">
                    {idx + 1}
                  </span>
                  <div
                  className={`w-16 h-24 rounded shadow-sm ${book.coverGradient} shrink-0`} />

                  <div>
                    <h3 className="font-serif font-bold text-navy group-hover:text-amber transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <p className="text-sm font-bold text-navy mt-1">
                      ${book.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-cream border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <BookOpenIcon className="w-12 h-12 text-amber mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
            Join our literary community
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive updates on new releases, exclusive author
            interviews, and special promotions.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 input-field"
              required />

            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>);

}