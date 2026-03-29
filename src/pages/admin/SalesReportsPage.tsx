import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSignIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  RefreshCcwIcon } from
'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell } from
'recharts';
import { CATEGORIES } from '../../data/mockData';
const revenueData = [
{
  name: 'Jan',
  revenue: 12000
},
{
  name: 'Feb',
  revenue: 15000
},
{
  name: 'Mar',
  revenue: 18000
},
{
  name: 'Apr',
  revenue: 16000
},
{
  name: 'May',
  revenue: 21000
},
{
  name: 'Jun',
  revenue: 24592
}];

const categoryData = CATEGORIES.map((c) => ({
  name: c.name,
  sales: Math.floor(Math.random() * 5000) + 1000
}));
const colors = ['#1a1a2e', '#d4a574', '#8b2252', '#2d5016', '#e8c8a5'];
export function SalesReportsPage() {
  const [dateRange, setDateRange] = useState('This Month');
  const summaryCards = [
  {
    label: 'Total Sales',
    value: '$24,592',
    icon: DollarSignIcon,
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  {
    label: 'Avg Order Value',
    value: '$33.15',
    icon: TrendingUpIcon,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    label: 'Total Orders',
    value: '47',
    icon: ShoppingCartIcon,
    color: 'text-amber',
    bg: 'bg-amber/10'
  },
  {
    label: 'Return Rate',
    value: '2.1%',
    icon: RefreshCcwIcon,
    color: 'text-burgundy',
    bg: 'bg-red-50'
  }];

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-serif text-3xl font-bold text-navy">
          Sales Reports
        </h1>
        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          {['This Week', 'This Month', 'This Year'].map((range) =>
          <button
            key={range}
            onClick={() => setDateRange(range)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${dateRange === range ? 'bg-navy text-white' : 'text-gray-500 hover:text-navy'}`}>

              {range}
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((stat, idx) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-serif text-xl font-bold text-navy mb-6">
            Revenue Trend
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>

                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a1a2e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1a1a2e" stopOpacity={0} />
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
                  tickFormatter={(value) => `$${value / 1000}k`} />

                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1a1a2e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)" />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-serif text-xl font-bold text-navy mb-6">
            Sales by Category
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>

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
                  tickFormatter={(value) => `$${value / 1000}k`} />

                <Tooltip
                  cursor={{
                    fill: '#f9fafb'
                  }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} />

                <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]} />

                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Selling Books */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-serif text-xl font-bold text-navy">
            Top Selling Books
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium w-16 text-center">Rank</th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium text-right">Units Sold</th>
                <th className="p-4 font-medium text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
              {
                title: 'The Midnight Library',
                units: 342,
                rev: 5126.58
              },
              {
                title: 'Atomic Habits',
                units: 289,
                rev: 3462.22
              },
              {
                title: 'Project Hail Mary',
                units: 215,
                rev: 3117.5
              },
              {
                title: 'Dune',
                units: 184,
                rev: 2022.16
              }].
              map((book, idx) =>
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-center font-bold text-amber">
                    #{idx + 1}
                  </td>
                  <td className="p-4 font-medium text-navy">{book.title}</td>
                  <td className="p-4 text-right text-gray-600">{book.units}</td>
                  <td className="p-4 text-right font-bold text-forest">
                    ${book.rev.toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}