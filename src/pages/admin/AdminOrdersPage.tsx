import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, FilterIcon, MoreVerticalIcon, EyeIcon, XIcon, PackageIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Order } from '../../data/mockData';

export function AdminOrdersPage() {
  const { orders, updateOrderStatus, books } = useAppContext();
  const [activeTab, setActiveTab] = useState('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const tabs = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const filteredOrders =
  activeTab === 'All' ? orders : orders.filter((o) => o.status === activeTab);

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    return sortOrder === 'desc' 
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-serif text-3xl font-bold text-navy mb-8">
        Order Management
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs & Toolbar */}
        <div className="border-b border-gray-100">
          <div className="flex overflow-x-auto hide-scrollbar px-4">
            {tabs.map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-4 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-amber' : 'text-gray-500 hover:text-navy'}`}>

                {tab}
                {activeTab === tab &&
              <motion.div
                layoutId="admin-orders-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber" />

              }
              </button>
            )}
          </div>
        </div>

        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber focus:border-transparent text-sm outline-none" />

            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <button 
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
          >
            <FilterIcon className="w-4 h-4" /> Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedOrders.map((order, idx) =>
              <motion.tr
                key={order.id}
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
                className="hover:bg-gray-50 transition-colors">

                  <td className="p-4 font-bold text-navy">{order.id}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">
                    {order.userId === 'u1' ? 'Jane Austen' : 'Marcus Aurelius'}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {order.items.length} items
                  </td>
                  <td className="p-4 font-bold text-navy">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <select
                    className={`text-xs font-medium px-2.5 py-1 rounded-full outline-none cursor-pointer border-none appearance-none ${order.status === 'Delivered' ? 'bg-green-100 text-forest' : order.status === 'Processing' ? 'bg-amber/20 text-amber' : order.status === 'Cancelled' ? 'bg-red-100 text-burgundy' : 'bg-blue-100 text-blue-800'}`}
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}>

                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-gray-400 hover:text-navy transition-colors rounded-lg hover:bg-white border border-transparent hover:border-gray-200 shadow-sm">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-navy transition-colors rounded-lg hover:bg-white border border-transparent hover:border-gray-200 shadow-sm">
                        <MoreVerticalIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="font-serif text-xl font-bold text-navy flex items-center gap-2">
                  <PackageIcon className="w-5 h-5 text-amber" />
                  Order {selectedOrder.id}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on {new Date(selectedOrder.date).toLocaleString()}
                </p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-navy transition-colors rounded-lg hover:bg-gray-100"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Customer Details</h3>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="font-medium text-navy">{selectedOrder.userId === 'u1' ? 'Jane Austen' : 'Marcus Aurelius'}</p>
                    <p className="text-sm text-gray-500">customer@example.com</p>
                    <p className="text-sm text-gray-500 mt-2">123 Bookworm Lane</p>
                    <p className="text-sm text-gray-500">Literary City, NY 10001</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy mb-2 uppercase tracking-wider">Order Status</h3>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${selectedOrder.status === 'Delivered' ? 'bg-green-100 text-forest' : selectedOrder.status === 'Processing' ? 'bg-amber/20 text-amber' : selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-burgundy' : 'bg-blue-100 text-blue-800'}`}>
                      {selectedOrder.status}
                    </span>
                    <p className="text-sm font-bold text-navy mt-1">Total: ${selectedOrder.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.items.length} items</p>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-navy mb-3 uppercase tracking-wider">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, i) => {
                  const book = books.find(b => b.id === item.bookId);
                  return (
                  <div key={i} className="flex gap-4 p-3 border border-gray-100 rounded-xl">
                    <div className={`w-12 h-16 rounded shadow-sm shrink-0 overflow-hidden relative ${book?.coverImage ? '' : (book?.coverGradient || 'bg-gray-200')}`}>
                      {book?.coverImage && <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-navy text-sm">{book?.title || 'Unknown Book'}</p>
                      <p className="text-xs text-gray-500">{book?.author || 'Unknown Author'}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium text-navy">${item.price.toFixed(2)}</span>
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="btn-primary py-2 px-6"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>);

}