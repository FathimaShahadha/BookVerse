import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  StarIcon,
  PlusIcon,
  SearchIcon,
  PackageIcon,
  MessageSquareIcon } from
'lucide-react';
import { useAppContext } from '../../context/AppContext';
export function CSRDashboard() {
  const { navigate, tickets } = useAppContext();
  const statCards = [
  {
    label: 'Open Tickets',
    value: tickets.filter(t => t.status === 'Open').length,
    icon: AlertCircleIcon,
    color: 'text-burgundy',
    bg: 'bg-red-50'
  },
  {
    label: 'Avg Response Time',
    value: '2.4h',
    icon: ClockIcon,
    color: 'text-amber',
    bg: 'bg-amber/10'
  },
  {
    label: 'Resolved Today',
    value: tickets.filter(t => t.status === 'Resolved').length,
    icon: CheckCircleIcon,
    color: 'text-forest',
    bg: 'bg-green-50'
  },
  {
    label: 'Customer Satisfaction',
    value: '94%',
    icon: StarIcon,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  }];

  const activeTickets = tickets.filter(t => t.status !== 'Closed').slice(0, 5);

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'bg-red-100 text-burgundy';
    if (priority === 'Medium') return 'bg-amber/20 text-amber';
    return 'bg-green-100 text-forest';
  };
  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-serif text-3xl font-bold text-navy mb-8">
        Support Dashboard
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
        {/* Active Tickets */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-serif text-xl font-bold text-navy">
              Active Tickets
            </h2>
            <button
              onClick={() => navigate('csr-tickets')}
              className="text-sm text-burgundy hover:text-navy font-medium">

              View All
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {activeTickets.map((ticket, idx) =>
            <div
              key={ticket.id}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">

                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-3">
                    <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getPriorityColor(ticket.priority)}`}>

                      {ticket.priority}
                    </span>
                    <span className="text-sm font-bold text-navy group-hover:text-burgundy transition-colors">
                      {ticket.subject}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(ticket.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">
                      {ticket.customer}
                    </span>{' '}
                    • {ticket.id}
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {ticket.status}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-serif text-xl font-bold text-navy mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-burgundy transition-colors text-navy font-medium border border-transparent hover:border-red-100">
                <PlusIcon className="w-5 h-5" /> New Ticket
              </button>
              <button
                onClick={() => navigate('csr-customers')}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-burgundy transition-colors text-navy font-medium border border-transparent hover:border-red-100">

                <SearchIcon className="w-5 h-5" /> Customer Lookup
              </button>
              <button
                onClick={() => navigate('csr-orders')}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-burgundy transition-colors text-navy font-medium border border-transparent hover:border-red-100">

                <PackageIcon className="w-5 h-5" /> Order Search
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-serif text-xl font-bold text-navy mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              {[
              {
                icon: CheckCircleIcon,
                text: 'Ticket T-1035 resolved',
                time: '10m ago',
                color: 'text-forest bg-green-50'
              },
              {
                icon: MessageSquareIcon,
                text: 'Replied to Jane Austen',
                time: '25m ago',
                color: 'text-blue-500 bg-blue-50'
              },
              {
                icon: AlertCircleIcon,
                text: 'New high priority ticket',
                time: '1h ago',
                color: 'text-burgundy bg-red-50'
              }].
              map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={idx}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${activity.color} z-10`}>

                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0 md:group-odd:pr-4 md:group-even:pl-4">
                      <p className="text-sm font-medium text-navy">
                        {activity.text}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </div>
    </div>);

}