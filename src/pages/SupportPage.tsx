import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeadsetIcon, ClockIcon, CheckCircleIcon, SendIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function SupportPage() {
  const { user, tickets, addTicket } = useAppContext();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter tickets for the current logged-in customer
  const userTickets = tickets.filter(t => t.customer === user?.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newTicket = {
        id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
        priority: 'Normal' as 'High' | 'Medium' | 'Low',
        customer: user?.name || 'Guest',
        subject,
        category,
        date: new Date().toISOString().split('T')[0],
        agent: 'Unassigned',
        status: 'Open' as const
      };

      addTicket(newTicket);
      setIsSubmitting(false);
      setShowSuccess(true);
      setSubject('');
      setMessage('');
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-amber/20 text-amber';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Resolved':
      case 'Closed': return 'bg-green-100 text-forest';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
            <HeadsetIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-navy">Customer Support</h1>
            <p className="text-gray-500">We're here to help with any questions or issues.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Ticket Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-serif text-xl font-bold text-navy mb-6">Submit a Request</h2>
              
              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 text-forest rounded-xl flex items-center gap-3 border border-green-100"
                >
                  <CheckCircleIcon className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">Your support ticket has been submitted successfully. We will get back to you soon!</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-navy rounded-lg p-3 outline-none focus:ring-amber focus:border-amber transition-shadow cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="Return Request">Return Request</option>
                    <option value="Account Access">Account Access</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Briefly describe your issue..." 
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
                  <textarea 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide as much detail as possible..." 
                    rows={6}
                    className="w-full bg-gray-50 border border-gray-200 text-navy rounded-lg p-4 outline-none focus:ring-amber focus:border-amber transition-shadow resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <SendIcon className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Ticket History */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
              <h2 className="font-serif text-xl font-bold text-navy mb-6">Your Tickets</h2>
              
              {userTickets.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClockIcon className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-sm">You haven't submitted any support tickets yet.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {userTickets.map(ticket => (
                    <div key={ticket.id} className="p-4 border border-gray-100 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <h3 className="font-medium text-navy text-sm mb-1">{ticket.subject}</h3>
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                        <span>{ticket.category}</span>
                        <span>{new Date(ticket.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
