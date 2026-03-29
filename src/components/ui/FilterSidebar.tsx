import React from 'react';
import { CATEGORIES } from '../../data/mockData';
import { ReviewStars } from './ReviewStars';
import { useAppContext } from '../../context/AppContext';

interface FilterSidebarProps {
  className?: string;
}
export function FilterSidebar({ className = '' }: FilterSidebarProps) {
  const { selectedCategory, setSelectedCategory } = useAppContext();

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-navy">Filters</h2>
        <button 
          onClick={() => setSelectedCategory('All')}
          className="text-sm text-amber hover:text-navy transition-colors">
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">
          Categories
        </h3>
        <div className="space-y-3">
          <label className="flex items-center group cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === 'All'}
              onChange={() => setSelectedCategory('All')}
              className="w-4 h-4 rounded border-gray-300 text-amber focus:ring-amber cursor-pointer" />
            <span className={`ml-3 transition-colors text-sm flex-grow ${selectedCategory === 'All' ? 'text-navy font-bold' : 'text-gray-600 group-hover:text-navy'}`}>
              All Categories
            </span>
          </label>
          {CATEGORIES.map((category) =>
          <label
            key={category.id}
            className="flex items-center group cursor-pointer">

              <input
              type="radio"
              name="category"
              checked={selectedCategory === category.name}
              onChange={() => setSelectedCategory(category.name)}
              className="w-4 h-4 rounded border-gray-300 text-amber focus:ring-amber cursor-pointer" />

              <span className={`ml-3 transition-colors text-sm flex-grow ${selectedCategory === category.name ? 'text-navy font-bold' : 'text-gray-600 group-hover:text-navy'}`}>
                {category.name}
              </span>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                {category.bookCount}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">
          Price
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              placeholder="Min"
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-amber focus:border-amber" />

          </div>
          <span className="text-gray-400">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              placeholder="Max"
              className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-amber focus:border-amber" />

          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">
          Rating
        </h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) =>
          <label
            key={rating}
            className="flex items-center group cursor-pointer">

              <input
              type="radio"
              name="rating"
              className="w-4 h-4 border-gray-300 text-amber focus:ring-amber cursor-pointer" />

              <span className="ml-3 flex items-center gap-2">
                <ReviewStars rating={rating} size="sm" />
                <span className="text-sm text-gray-600">& Up</span>
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4">
          Availability
        </h3>
        <label className="flex items-center group cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-amber focus:ring-amber cursor-pointer" />

          <span className="ml-3 text-gray-600 group-hover:text-navy transition-colors text-sm">
            In Stock Only
          </span>
        </label>
      </div>
    </div>);

}