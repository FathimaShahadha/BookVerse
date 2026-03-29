import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, BookIcon, HelpCircleIcon, VideoIcon, FileTextIcon, ChevronRightIcon } from 'lucide-react';

export function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'c1', title: 'Getting Started', icon: BookIcon, articles: 12 },
    { id: 'c2', title: 'Order Management', icon: FileTextIcon, articles: 8 },
    { id: 'c3', title: 'Customer Policies', icon: HelpCircleIcon, articles: 15 },
    { id: 'c4', title: 'Video Tutorials', icon: VideoIcon, articles: 6 },
  ];

  const popularArticles = [
    'How to process a refund request',
    'Updating customer shipping addresses',
    'Handling lost or damaged shipments',
    'Escalating tickets to management'
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Knowledge Base</h1>
        <p className="text-gray-500 mb-8">Search for articles, policies, and standard operating procedures.</p>

        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search the knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-burgundy focus:ring-0 text-lg outline-none shadow-sm transition-colors"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        </div>

        <h2 className="font-bold text-navy text-xl mb-6">Browse Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer flex items-start gap-4 hover:border-burgundy/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-burgundy flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-navy mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{category.articles} articles</p>
                  <span className="text-sm text-burgundy font-medium flex items-center gap-1 group">
                    Browse <ChevronRightIcon className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-bold text-navy text-xl">Popular Articles</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {popularArticles.map((article, idx) => (
              <div key={idx} className="p-4 px-6 hover:bg-gray-50 cursor-pointer flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <FileTextIcon className="w-5 h-5 text-gray-400 group-hover:text-burgundy transition-colors" />
                  <span className="font-medium text-navy">{article}</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-burgundy transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
