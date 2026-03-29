import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, EyeIcon, MailIcon, XIcon, UserCircleIcon } from 'lucide-react';
const mockCustomers = [
{
  id: 'u1',
  name: 'Jane Austen',
  email: 'jane.austen@example.com',
  avatar: 'https://i.pravatar.cc/150?u=jane',
  joinDate: '2025-11-12',
  orders: 12,
  totalSpent: 345.5
},
{
  id: 'u2',
  name: 'Marcus Aurelius',
  email: 'marcus@example.com',
  avatar: 'https://i.pravatar.cc/150?u=marcus',
  joinDate: '2026-01-05',
  orders: 4,
  totalSpent: 120.0
},
{
  id: 'u3',
  name: 'Sarah Connor',
  email: 'sarah.c@example.com',
  avatar: 'https://i.pravatar.cc/150?u=sarah',
  joinDate: '2026-02-20',
  orders: 1,
  totalSpent: 24.99
},
{
  id: 'u4',
  name: 'Arthur Dent',
  email: 'arthur@hitchhiker.com',
  avatar: 'https://i.pravatar.cc/150?u=arthur',
  joinDate: '2025-08-14',
  orders: 8,
  totalSpent: 210.75
},
{
  id: 'u5',
  name: 'Ellen Ripley',
  email: 'ripley@weyland.com',
  avatar: 'https://i.pravatar.cc/150?u=ellen',
  joinDate: '2025-12-01',
  orders: 3,
  totalSpent: 85.2
}];

export function AdminCustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-serif text-3xl font-bold text-navy mb-8">
        Customers
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search customers by name or email..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber focus:border-transparent text-sm outline-none" />

            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Join Date</th>
                <th className="p-4 font-medium">Total Orders</th>
                <th className="p-4 font-medium">Total Spent</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCustomers.map((customer, idx) =>
              <motion.tr
                key={customer.id}
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
                    <div className="flex items-center gap-3">
                      <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full border border-gray-200" />

                      <div>
                        <p className="font-bold text-navy">{customer.name}</p>
                        <p className="text-xs text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-600">
                    {customer.orders}
                  </td>
                  <td className="p-4 font-bold text-navy">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                      className="p-1.5 text-gray-400 hover:text-amber transition-colors rounded-lg hover:bg-white border border-transparent hover:border-gray-200 shadow-sm"
                      title="Send Email">

                        <MailIcon className="w-4 h-4" />
                      </button>
                      <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-1.5 text-gray-400 hover:text-navy transition-colors rounded-lg hover:bg-white border border-transparent hover:border-gray-200 shadow-sm"
                      title="View Profile">

                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="font-serif text-xl font-bold text-navy flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5 text-amber" />
                Customer Profile
              </h2>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-gray-400 hover:text-navy transition-colors rounded-lg hover:bg-gray-100"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col items-center mb-6 text-center">
                <img 
                  src={selectedCustomer.avatar} 
                  alt={selectedCustomer.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4"
                />
                <h3 className="text-xl font-bold text-navy">{selectedCustomer.name}</h3>
                <p className="text-gray-500">{selectedCustomer.email}</p>
                <p className="text-sm text-gray-400 mt-1">ID: {selectedCustomer.id}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-sm font-medium text-gray-500">Member Since</span>
                  <span className="font-medium text-navy">{new Date(selectedCustomer.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-sm font-medium text-gray-500">Total Orders</span>
                  <span className="font-medium text-navy">{selectedCustomer.orders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Total Spent</span>
                  <span className="font-bold text-forest">${selectedCustomer.totalSpent.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="btn-primary py-2 px-6"
              >
                Close Profile
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>);

}