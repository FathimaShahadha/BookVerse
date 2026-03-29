import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUpIcon,
  PackageIcon,
  UsersIcon,
  BookOpenIcon,
  EyeIcon } from
'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import { useAppContext } from '../../context/AppContext';
const chartData = [
{
  name: 'Mon',
  revenue: 4000
},
{
  name: 'Tue',
  revenue: 3000
},
{
  name: 'Wed',
  revenue: 5000
},
{
  name: 'Thu',
  revenue: 2780
},
{
  name: 'Fri',
  revenue: 6890
},
{
  name: 'Sat',
  revenue: 8390
},
{
  name: 'Sun',
  revenue: 7490
}];

export function AdminDashboard() {
  const { orders, books } = useAppContext();
  
  const statCards = [
  {
    label: 'Total Revenue',
    value: '$24,592',
    icon: TrendingUpIcon,
    trend: '+12.5%',
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  {
    label: 'Orders Today',
    value: orders.length,
    icon: PackageIcon,
    trend: '+5.2%',
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    label: 'Active Users',
    value: '1,204',
    icon: UsersIcon,
    trend: '+18.1%',
    color: 'text-amber',
    bg: 'bg-amber/10'
  },
  {
    label: 'Books in Stock',
    value: '3,650',
    icon: BookOpenIcon,
    trend: '-2.4%',
    color: 'text-burgundy',
    bg: 'bg-red-50'
  }];

  const lowStockAlerts = [
  {
    title: 'Dune',
    stock: 12
  },
  {
    title: 'Introduction to Algorithms',
    stock: 5
  },
  {
    title: 'Thinking, Fast and Slow',
    stock: 0
  }];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-serif text-3xl font-bold text-navy mb-8">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>

                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-forest' : 'bg-red-100 text-burgundy'}`}>

                  {stat.trend}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-navy">{stat.value}</p>
            </motion.div>);

        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-serif text-xl font-bold text-navy mb-6">
            Revenue Trend (Last 7 Days)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}>

                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4a574" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d4a574" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6" />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6b7280',
                    fontSize: 12
                  }}
                  dy={10} />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6b7280',
                    fontSize: 12
                  }}
                  tickFormatter={(value) => `$${value}`}
                  dx={-10} />

                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px -2px rgba(26, 26, 46, 0.1)'
                  }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']} />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1a1a2e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)" />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-serif text-xl font-bold text-navy mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
            Low Stock Alerts
          </h2>
          <div className="space-y-4">
            {lowStockAlerts.map((item, idx) =>
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50/50">

                <div>
                  <p className="font-bold text-navy text-sm line-clamp-1 mb-1">
                    {item.title}
                  </p>
                  <p
                  className={`text-xs font-medium ${item.stock === 0 ? 'text-burgundy' : 'text-amber'}`}>

                    {item.stock} in stock
                  </p>
                </div>
                <button className="text-xs font-bold text-navy bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                  Reorder
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-serif text-xl font-bold text-navy">
            Recent Orders
          </h2>
          <button className="text-sm text-amber hover:text-navy font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order) =>
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors">

                  <td className="p-4 font-medium text-navy">{order.id}</td>
                  <td className="p-4 text-gray-600">
                    {order.userId === 'u1' ? 'Jane Austen' : 'Marcus Aurelius'}
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-forest' : order.status === 'Processing' ? 'bg-amber/20 text-amber' : order.status === 'Cancelled' ? 'bg-red-100 text-burgundy' : 'bg-blue-100 text-blue-800'}`}>

                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-navy">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1.5 text-gray-400 hover:text-amber transition-colors rounded-lg hover:bg-white">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}