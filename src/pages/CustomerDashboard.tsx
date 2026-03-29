import React from 'react';
import { motion } from 'framer-motion';
import {
  PackageIcon,
  HeartIcon,
  AwardIcon,
  CalendarIcon,
  ChevronRightIcon } from
'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BookCard } from '../components/ui/BookCard';
export function CustomerDashboard() {
  const { user, orders, wishlist, navigate, books } = useAppContext();
  const statCards = [
  {
    label: 'Total Orders',
    value: orders.length,
    icon: PackageIcon,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    label: 'Wishlist Items',
    value: wishlist.length,
    icon: HeartIcon,
    color: 'text-burgundy',
    bg: 'bg-red-50'
  },
  {
    label: 'Reward Points',
    value: user?.rewardPoints || 0,
    icon: AwardIcon,
    color: 'text-amber',
    bg: 'bg-amber/10'
  },
  {
    label: 'Member Since',
    value: new Date(user?.joinDate || Date.now()).getFullYear(),
    icon: CalendarIcon,
    color: 'text-forest',
    bg: 'bg-green-50'
  }];

  const recentOrders = orders.slice(0, 3);
  const recommendedBooks = books.slice(2, 6);
  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex items-center gap-6 mb-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-20 h-20 rounded-full border-4 border-amber/20" />

          <div>
            <h1 className="font-serif text-3xl font-bold text-navy mb-1">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-500">
              Manage your orders, reviews, and account settings.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: idx * 0.1
                }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>

                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-navy">{stat.value}</p>
                </div>
              </motion.div>);

          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-serif text-xl font-bold text-navy">
                  Recent Orders
                </h2>
                <button
                  onClick={() => navigate('order-tracking')}
                  className="text-sm text-amber hover:text-navy font-medium">

                  View All
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {recentOrders.length > 0 ?
                recentOrders.map((order) =>
                <div
                  key={order.id}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      <div>
                        <p className="font-bold text-navy mb-1">{order.id}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(order.date).toLocaleDateString()} •{' '}
                          {order.items.length} items
                        </p>
                        <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-forest' : order.status === 'Processing' ? 'bg-amber/20 text-amber' : order.status === 'Cancelled' ? 'bg-red-100 text-burgundy' : 'bg-blue-100 text-blue-800'}`}>

                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-navy">
                          ${order.total.toFixed(2)}
                        </span>
                        <button
                      onClick={() => navigate('order-tracking')}
                      className="btn-outline py-2 px-4 text-sm">

                          Track
                        </button>
                      </div>
                    </div>
                ) :

                <div className="p-8 text-center text-gray-500">
                    No recent orders found.
                  </div>
                }
              </div>
            </div>

            {/* Recommended Books */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy mb-6">
                Recommended for You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recommendedBooks.map((book, idx) =>
                <BookCard key={book.id} book={book} index={idx} />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-serif text-xl font-bold text-navy mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('wishlist')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-burgundy">
                      <HeartIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-navy">My Wishlist</span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-amber transition-colors" />
                </button>
                <button
                  onClick={() => navigate('catalog')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center text-amber">
                      <PackageIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-navy">
                      Browse Catalog
                    </span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-amber transition-colors" />
                </button>
                <button
                  onClick={() => navigate('order-tracking')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <PackageIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-navy">Track Order</span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-amber transition-colors" />
                </button>
              </div>
            </div>

            {/* Promo Card */}
            <div className="bg-navy text-cream rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber/20 rounded-full blur-2xl" />
              <h3 className="font-serif text-xl font-bold mb-2 relative z-10">
                Join BookVerse Premium
              </h3>
              <p className="text-sm text-cream/70 mb-4 relative z-10">
                Get free expedited shipping and exclusive early access to new
                releases.
              </p>
              <button className="bg-amber text-navy font-medium px-4 py-2 rounded-lg text-sm w-full hover:bg-[#c39463] transition-colors relative z-10">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}