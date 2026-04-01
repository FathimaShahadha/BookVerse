import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, PlusIcon, EditIcon, Trash2Icon, FilterIcon, XIcon, SaveIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Book } from '../../data/mockData';

export function InventoryPage() {
  const { books, addBook, updateBook, deleteBook, categories } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [coverImageDraft, setCoverImageDraft] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  React.useEffect(() => {
    if (editingBook) {
      setCoverImageDraft(editingBook.coverImage || null);
    } else if (!isAddModalOpen) {
      setCoverImageDraft(null);
    }
  }, [editingBook, isAddModalOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setCoverImageDraft(`http://localhost:5000${data.image}`);
        } else {
          console.error('Failed to upload image');
          alert('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image', error);
        alert('Error uploading image');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const filteredBooks = books.filter(
    (book) =>
    (categoryFilter === 'All' || book.category === categoryFilter) &&
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm))
  );

  const handleSaveBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookData = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      availability: formData.get('availability') as 'In Stock' | 'Low Stock' | 'Out of Stock',
      isbn: formData.get('isbn') as string || `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      coverImage: coverImageDraft || undefined,
    };

    if (editingBook) {
      updateBook(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      addBook({
        ...bookData,
        id: `b-${Date.now()}`,
        description: formData.get('description') as string || 'A new book added from the dashboard.',
        rating: 0,
        reviewCount: 0,
        genre: 'General',
        coverGradient: 'bg-gradient-to-br from-gray-700 to-gray-900',
        publisher: 'Self Published',
        publishDate: new Date().toISOString().split('T')[0],
        pages: 300,
        language: 'English',
        isNew: true
      });
      setIsAddModalOpen(false);
    }
  };
  const getStockColor = (availability: string) => {
    if (availability === 'In Stock') return 'bg-green-500';
    if (availability === 'Low Stock') return 'bg-amber';
    return 'bg-burgundy';
  };
  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-serif text-3xl font-bold text-navy">
          Inventory Management
        </h1>
        <button onClick={() => setIsAddModalOpen(true)} className="btn-primary flex items-center gap-2 py-2.5">
          <PlusIcon className="w-4 h-4" /> Add New Book
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber focus:border-transparent text-sm outline-none" />

            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
            >
              <FilterIcon className="w-4 h-4" /> {categoryFilter === 'All' ? 'Filters' : categoryFilter}
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                <button 
                  onClick={() => { setCategoryFilter('All'); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${categoryFilter === 'All' ? 'text-amber font-bold' : 'text-gray-700'}`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => { setCategoryFilter(cat.name); setIsFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${categoryFilter === cat.name ? 'text-amber font-bold' : 'text-gray-700'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="p-4 font-medium">Book</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock Level</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBooks.map((book, idx) =>
              <motion.tr
                key={book.id}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: idx * 0.05
                }}
                className="hover:bg-gray-50 transition-colors group">

                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                      className={`w-10 h-14 rounded shadow-sm shrink-0 overflow-hidden relative ${book.coverImage ? '' : book.coverGradient}`}>
                        {book.coverImage && <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />}
                      </div>

                      <div>
                        <p className="font-bold text-navy line-clamp-1">
                          {book.title}
                        </p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                          {book.isbn}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{book.category}</td>
                  <td className="p-4 font-bold text-navy">
                    ${book.price.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                        className={`h-full ${getStockColor(book.availability)}`}
                        style={{
                          width:
                          book.availability === 'In Stock' ?
                          '80%' :
                          book.availability === 'Low Stock' ?
                          '20%' :
                          '0%'
                        }} />

                      </div>
                      <span className="text-xs text-gray-500">
                        {book.availability === 'In Stock' ?
                      '124' :
                      book.availability === 'Low Stock' ?
                      '12' :
                      '0'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${book.availability === 'In Stock' ? 'bg-green-100 text-forest' : book.availability === 'Low Stock' ? 'bg-amber/20 text-amber' : 'bg-red-100 text-burgundy'}`}>

                      {book.availability}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingBook(book)} className="p-1.5 text-gray-400 hover:text-navy transition-colors rounded-lg hover:bg-white border border-transparent hover:border-gray-200 shadow-sm">
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteBook(book.id)} className="p-1.5 text-gray-400 hover:text-burgundy transition-colors rounded-lg hover:bg-white border border-transparent hover:border-gray-200 shadow-sm">
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <span className="text-sm text-gray-500">
            Showing 1 to {filteredBooks.length} of {books.length} entries
          </span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-500 hover:bg-white disabled:opacity-50">
              Prev
            </button>
            <button className="px-3 py-1 border border-amber bg-amber text-white rounded text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-white">
              2
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-white">
              3
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-500 hover:bg-white">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Book Form Modal */}
      {(isAddModalOpen || editingBook) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="font-serif text-xl font-bold text-navy">
                {editingBook ? 'Edit Book Details' : 'Add New Book'}
              </h2>
              <button 
                onClick={() => { setIsAddModalOpen(false); setEditingBook(null); }}
                className="p-2 text-gray-400 hover:text-navy transition-colors rounded-lg hover:bg-gray-100"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveBook} className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-navy mb-1">Title</label>
                  <input name="title" type="text" defaultValue={editingBook?.title} required className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber focus:border-transparent text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Author</label>
                  <input name="author" type="text" defaultValue={editingBook?.author} required className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber focus:border-transparent text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Price ($)</label>
                  <input name="price" type="number" step="0.01" defaultValue={editingBook?.price || 19.99} required className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber focus:border-transparent text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Category</label>
                  <select name="category" defaultValue={editingBook?.category || categories[0]?.name} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber focus:border-transparent text-sm outline-none bg-white">
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Availability</label>
                  <select name="availability" defaultValue={editingBook?.availability || 'In Stock'} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber focus:border-transparent text-sm outline-none bg-white">
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-navy mb-1">Cover Image</label>
                  <div className="flex items-center gap-4">
                    {coverImageDraft && (
                      <img src={coverImageDraft} alt="Cover preview" className="w-12 h-16 object-cover rounded shadow-sm" />
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-burgundy hover:file:bg-red-100 disabled:opacity-50" />
                    {isUploading && <span className="text-sm text-gray-400">Uploading...</span>}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => { setIsAddModalOpen(false); setEditingBook(null); }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary py-2 px-6 flex items-center gap-2 text-sm"
                >
                  <SaveIcon className="w-4 h-4" /> Save Book
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>);

}