import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  MailIcon,
  PackageIcon,
  MessageSquareIcon,
  AwardIcon } from
'lucide-react';
const mockCustomers = [
{
  id: 'u1',
  name: 'Jane Austen',
  email: 'jane.austen@example.com',
  avatar: 'https://i.pravatar.cc/150?u=jane',
  joinDate: '2025-11-12',
  orders: 12,
  totalSpent: 345.5,
  rewardPoints: 450
},
{
  id: 'u2',
  name: 'Marcus Aurelius',
  email: 'marcus@example.com',
  avatar: 'https://i.pravatar.cc/150?u=marcus',
  joinDate: '2026-01-05',
  orders: 4,
  totalSpent: 120.0,
  rewardPoints: 120
}];

export function CSRCustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0]);
  return (
    <div className="p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="font-serif text-3xl font-bold text-navy mb-6 shrink-0">
        Customer Lookup
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Search & List */}
        <div className="w-full lg:w-1/3 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-burgundy focus:border-transparent text-sm outline-none" />

              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
            {mockCustomers.map((customer) =>
            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${selectedCustomer.id === customer.id ? 'bg-red-50/50 border-l-4 border-burgundy' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}>

                <img
                src={customer.avatar}
                alt={customer.name}
                className="w-10 h-10 rounded-full border border-gray-200" />

                <div>
                  <p className="font-bold text-navy text-sm">{customer.name}</p>
                  <p className="text-xs text-gray-500">{customer.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Detail */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-y-auto">
          {/* Profile Header */}
          <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={selectedCustomer.avatar}
              alt={selectedCustomer.name}
              className="w-24 h-24 rounded-full border-4 border-red-50 shadow-sm" />

            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-serif text-3xl font-bold text-navy mb-1">
                {selectedCustomer.name}
              </h2>
              <p className="text-gray-500 mb-4">{selectedCustomer.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-burgundy text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors shadow-sm">
                  <MessageSquareIcon className="w-4 h-4" /> Create Ticket
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  <MailIcon className="w-4 h-4" /> Send Email
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100 border-b border-gray-100 bg-gray-50/30">
            <div className="p-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                Member Since
              </p>
              <p className="font-bold text-navy">
                {new Date(selectedCustomer.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                Total Orders
              </p>
              <p className="font-bold text-navy">{selectedCustomer.orders}</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                Total Spent
              </p>
              <p className="font-bold text-forest">
                ${selectedCustomer.totalSpent.toFixed(2)}
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                Reward Points
              </p>
              <p className="font-bold text-amber flex items-center justify-center gap-1">
                <AwardIcon className="w-4 h-4" />{' '}
                {selectedCustomer.rewardPoints}
              </p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-xl font-bold text-navy flex items-center gap-2">
                  <PackageIcon className="w-5 h-5 text-gray-400" /> Recent
                  Orders
                </h3>
                <button className="text-sm text-burgundy hover:underline">
                  View All
                </button>
              </div>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="p-3 font-medium">Order ID</th>
                      <th className="p-3 font-medium">Date</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className="p-3 font-medium text-navy">
                        ORD-2026-8932
                      </td>
                      <td className="p-3 text-gray-500">Mar 2, 2026</td>
                      <td className="p-3">
                        <span className="text-xs bg-green-100 text-forest px-2 py-0.5 rounded-full">
                          Delivered
                        </span>
                      </td>
                      <td className="p-3 text-right font-medium text-navy">
                        $32.97
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className="p-3 font-medium text-navy">
                        ORD-2026-9011
                      </td>
                      <td className="p-3 text-gray-500">Mar 6, 2026</td>
                      <td className="p-3">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          Shipped
                        </span>
                      </td>
                      <td className="p-3 text-right font-medium text-navy">
                        $14.50
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Tickets */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-xl font-bold text-navy flex items-center gap-2">
                  <MessageSquareIcon className="w-5 h-5 text-gray-400" /> Recent
                  Tickets
                </h3>
                <button className="text-sm text-burgundy hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-4 border border-gray-100 rounded-xl hover:border-gray-300 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold bg-red-100 text-burgundy px-2 py-0.5 rounded-full">
                      High
                    </span>
                    <span className="text-xs text-gray-400">Mar 7, 2026</span>
                  </div>
                  <p className="font-bold text-navy text-sm mb-1">
                    Order not received
                  </p>
                  <p className="text-xs text-gray-500">Status: Open</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}