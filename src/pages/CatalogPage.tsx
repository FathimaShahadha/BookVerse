import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGridIcon, ListIcon, ChevronDownIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BookCard } from '../components/ui/BookCard';
import { FilterSidebar } from '../components/ui/FilterSidebar';
export function CatalogPage() {
  const { searchQuery, books, selectedCategory } = useAppContext();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Simple mock filtering
  let filteredBooks = books.filter(
    (book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCategory && selectedCategory !== 'All') {
    filteredBooks = filteredBooks.filter(book => book.category === selectedCategory);
  }
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            Home / <span className="text-navy font-medium">Catalog</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-navy mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Books'}
          </h1>
          <p className="text-gray-600">
            Showing 1-{filteredBooks.length} of {filteredBooks.length} results
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-navy text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-navy'}`}>

                  <LayoutGridIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-navy text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-navy'}`}>

                  <ListIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 text-navy text-sm rounded-lg focus:ring-amber focus:border-amber block w-full p-2.5 pr-8 outline-none cursor-pointer">

                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Book Grid */}
            <div
              className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>

              {filteredBooks.map((book, idx) =>
              <BookCard
                key={book.id}
                book={book}
                index={idx}
                featured={viewMode === 'list'} />

              )}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  Previous
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-navy text-white font-medium">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium">
                  3
                </button>
                <span className="text-gray-400">...</span>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>);

}