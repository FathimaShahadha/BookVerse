import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  SendIcon,
  UserIcon,
  ClockIcon } from
'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function TicketsPage() {
  const { tickets, updateTicketStatus } = useAppContext();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    updateTicketStatus(selectedTicket, 'In Progress');
    setReplyText('');
    alert('Reply sent successfully!');
  };
  const tabs = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];
  const filteredTickets =
  activeTab === 'All' ?
  tickets :
  tickets.filter((t) => t.status === activeTab);
  const ticketDetail = tickets.find((t) => t.id === selectedTicket);
  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'bg-red-100 text-burgundy';
    if (priority === 'Medium') return 'bg-amber/20 text-amber';
    return 'bg-green-100 text-forest';
  };
  return (
    <div className="p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="font-serif text-3xl font-bold text-navy mb-6 shrink-0">
        Support Tickets
      </h1>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Ticket List */}
        <div
          className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden ${selectedTicket ? 'hidden lg:flex lg:w-1/2 xl:w-5/12' : 'w-full'}`}>

          <div className="border-b border-gray-100 shrink-0">
            <div className="flex overflow-x-auto hide-scrollbar px-4">
              {tabs.map((tab) =>
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-4 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-burgundy' : 'text-gray-500 hover:text-navy'}`}>

                  {tab}
                  {activeTab === tab &&
                <motion.div
                  layoutId="csr-tickets-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy" />

                }
                </button>
              )}
            </div>
          </div>

          <div className="p-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-burgundy focus:border-transparent text-sm outline-none" />

              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {filteredTickets.map((ticket) =>
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedTicket === ticket.id ? 'bg-red-50/50 border-burgundy/30 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-300'}`}>

                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getPriorityColor(ticket.priority)}`}>

                      {ticket.priority}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      {ticket.id}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(ticket.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-navy mb-1 line-clamp-1">
                  {ticket.subject}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <UserIcon className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[120px]">
                      {ticket.customer}
                    </span>
                  </div>
                  <span
                  className={`text-xs font-medium px-2 py-1 rounded-md ${ticket.status === 'Open' ? 'bg-gray-100 text-gray-600' : ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-forest'}`}>

                    {ticket.status}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ticket Detail */}
        {selectedTicket && ticketDetail &&
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 shrink-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-serif text-2xl font-bold text-navy">
                      {ticketDetail.subject}
                    </h2>
                    <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getPriorityColor(ticketDetail.priority)}`}>

                      {ticketDetail.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-mono">
                    {ticketDetail.id} • {ticketDetail.category}
                  </p>
                </div>
                <button
                onClick={() => setSelectedTicket(null)}
                className="lg:hidden text-gray-400 hover:text-navy">

                  Close
                </button>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Status:</span>
                  <select
                    className="text-sm font-medium bg-white border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-burgundy"
                    value={ticketDetail.status}
                    onChange={(e) => updateTicketStatus(ticketDetail.id, e.target.value as any)}>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Assignee:</span>
                  <select className="text-sm font-medium bg-white border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-burgundy">
                    <option>Unassigned</option>
                    <option>Support Agent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
              {/* Customer Message */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center shrink-0 font-bold">
                  {ticketDetail.customer.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-navy">
                      {ticketDetail.customer}
                    </span>
                    <span className="text-xs text-gray-400">
                      Mar 7, 10:23 AM
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-gray-700 text-sm leading-relaxed">
                    Hello, I placed an order last week but haven't received any
                    shipping updates. Can you please check on this for me? The
                    order number is ORD-2026-8932.
                  </div>
                </div>
              </div>

              {/* Agent Reply (if In Progress) */}
              {ticketDetail.status !== 'Open' &&
            <div className="flex gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-burgundy text-white flex items-center justify-center shrink-0 font-bold">
                    SA
                  </div>
                  <div className="flex-1 flex flex-col items-end">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs text-gray-400">
                        Mar 7, 11:05 AM
                      </span>
                      <span className="font-bold text-navy">Support Agent</span>
                    </div>
                    <div className="bg-red-50 p-4 rounded-2xl rounded-tr-none border border-red-100 text-gray-800 text-sm leading-relaxed">
                      Hi {ticketDetail.customer.split(' ')[0]}, I apologize for
                      the delay. I've checked your order and it looks like it
                      was shipped this morning. You should receive a tracking
                      email shortly. Let me know if you need anything else!
                    </div>
                  </div>
                </div>
            }
            </div>

            {/* Reply Box */}
            <div className="p-4 border-t border-gray-100 bg-white shrink-0">
              <div className="relative">
                <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                className="w-full border border-gray-200 rounded-xl p-3 pr-12 focus:ring-2 focus:ring-burgundy focus:border-transparent outline-none resize-none h-24 text-sm" />

                <button 
                  onClick={handleSendReply}
                  className="absolute bottom-3 right-3 p-2 bg-burgundy text-white rounded-lg hover:bg-red-800 transition-colors">
                  <SendIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-burgundy focus:ring-burgundy" />

                  <span className="text-xs text-gray-500">
                    Add as internal note
                  </span>
                </label>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}