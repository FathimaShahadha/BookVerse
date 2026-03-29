import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  PackageIcon,
  TruckIcon,
  CreditCardIcon,
  AlertCircleIcon } from
'lucide-react';
import { ORDERS, BOOKS } from '../../data/mockData';
export function CSROrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(ORDERS[0]);
  return (
    <div className="p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="font-serif text-3xl font-bold text-navy mb-6 shrink-0">
        Order Management
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Search & List */}
        <div className="w-full lg:w-1/3 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-burgundy focus:border-transparent text-sm outline-none" />

              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
            {ORDERS.map((order) =>
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`p-4 cursor-pointer transition-colors ${selectedOrder.id === order.id ? 'bg-red-50/50 border-l-4 border-burgundy' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}>

                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-navy text-sm">{order.id}</p>
                  <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-forest' : order.status === 'Processing' ? 'bg-amber/20 text-amber' : order.status === 'Cancelled' ? 'bg-red-100 text-burgundy' : 'bg-blue-100 text-blue-800'}`}>

                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                  <span className="font-medium text-navy">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Detail */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-y-auto">
          <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/30">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy mb-1">
                {selectedOrder.id}
              </h2>
              <p className="text-sm text-gray-500">
                Placed on {new Date(selectedOrder.date).toLocaleDateString()} by{' '}
                <span className="font-medium text-navy">
                  {selectedOrder.userId === 'u1' ?
                  'Jane Austen' :
                  'Marcus Aurelius'}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="text-sm font-medium bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-burgundy"
                defaultValue={selectedOrder.status}>

                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button className="px-4 py-2 bg-burgundy text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors shadow-sm">
                Update
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100">
            <div className="flex gap-3">
              <TruckIcon className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <h3 className="font-bold text-navy text-sm mb-1">
                  Shipping Information
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedOrder.userId === 'u1' ?
                  'Jane Austen' :
                  'Marcus Aurelius'}
                  <br />
                  123 Bookworm Lane
                  <br />
                  Literary City, NY 10001
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Tracking:{' '}
                  <span className="font-mono text-navy">
                    {selectedOrder.trackingNumber || 'Pending'}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CreditCardIcon className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <h3 className="font-bold text-navy text-sm mb-1">
                  Payment Information
                </h3>
                <p className="text-sm text-gray-600">Visa ending in 4242</p>
                <div className="mt-3">
                  <button className="text-sm text-burgundy font-medium hover:underline flex items-center gap-1">
                    <AlertCircleIcon className="w-4 h-4" /> Issue Refund
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-bold text-navy mb-4">Order Items</h3>
            <div className="border border-gray-100 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="p-3 font-medium">Item</th>
                    <th className="p-3 font-medium text-center">Qty</th>
                    <th className="p-3 font-medium text-right">Price</th>
                    <th className="p-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedOrder.items.map((item, idx) => {
                    const book = BOOKS.find((b) => b.id === item.bookId);
                    if (!book) return null;
                    return (
                      <tr key={idx}>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-12 rounded shadow-sm ${book.coverGradient} shrink-0`} />

                            <span className="font-medium text-navy">
                              {book.title}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-center text-gray-600">
                          {item.quantity}
                        </td>
                        <td className="p-3 text-right text-gray-600">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-medium text-navy">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>);

                  })}
                </tbody>
              </table>
              <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
                <div className="w-48 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${(selectedOrder.total - 4.99).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>$4.99</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h3 className="font-bold text-navy text-sm mb-2">
                Add Internal Note
              </h3>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-burgundy outline-none resize-none h-20 mb-2"
                placeholder="Type note here..." />

              <div className="flex justify-end">
                <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}