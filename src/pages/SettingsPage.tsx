import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  MapPinIcon, 
  LockIcon, 
  CreditCardIcon, 
  SaveIcon,
  CheckCircleIcon
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

type Tab = 'profile' | 'address' | 'security' | 'payment';

export function SettingsPage() {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile Details', icon: UserIcon },
    { id: 'address', label: 'Shipping Address', icon: MapPinIcon },
    { id: 'security', label: 'Password & Security', icon: LockIcon },
    { id: 'payment', label: 'Payment Methods', icon: CreditCardIcon },
  ] as const;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-navy mb-8">Account Settings</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as Tab)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-amber/10 text-amber font-medium' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="font-serif text-2xl font-bold text-navy mb-6">Profile Details</h2>
                      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                        <div className="flex items-center gap-6 mb-8">
                          <img 
                            src={user?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full border border-gray-200"
                          />
                          <button type="button" className="btn-outline text-sm py-2">
                            Change Avatar
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-navy mb-1.5">First Name</label>
                            <input 
                              type="text" 
                              className="input-field" 
                              defaultValue={user?.name?.split(' ')[0] || ''} 
                              required 
                              pattern="[A-Za-z\s]+"
                              title="Please enter letters only"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-navy mb-1.5">Last Name</label>
                            <input 
                              type="text" 
                              className="input-field" 
                              defaultValue={user?.name?.split(' ')[1] || ''} 
                              required 
                              pattern="[A-Za-z\s]+"
                              title="Please enter letters only"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-navy mb-1.5">Email Address</label>
                            <input 
                              type="email" 
                              className="input-field" 
                              defaultValue={user?.email || ''} 
                              required 
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-navy mb-1.5">Phone Number</label>
                            <input 
                              type="tel" 
                              className="input-field" 
                              placeholder="+1 (555) 000-0000"
                              pattern="[0-9\-\+\s\(\)]+"
                              title="Please enter a valid phone number"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-6 flex justify-end">
                          <button type="submit" className="btn-primary flex items-center gap-2">
                            {isSaved ? <CheckCircleIcon className="w-5 h-5" /> : <SaveIcon className="w-5 h-5" />}
                            {isSaved ? 'Saved!' : 'Save Changes'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Address Tab */}
                  {activeTab === 'address' && (
                    <motion.div
                      key="address"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="font-serif text-2xl font-bold text-navy mb-6">Shipping Address</h2>
                      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                        <div className="space-y-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-navy mb-1.5">Street Address</label>
                            <input type="text" className="input-field" required defaultValue="123 Bookworm Lane" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-navy mb-1.5">Apartment, suite, etc. (optional)</label>
                            <input type="text" className="input-field" defaultValue="Apt 4B" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                              <label className="block text-sm font-medium text-navy mb-1.5">City</label>
                              <input type="text" className="input-field" required defaultValue="Literary City" pattern="[A-Za-z\s]+" title="Please enter letters only" />
                            </div>
                            <div className="col-span-1">
                              <label className="block text-sm font-medium text-navy mb-1.5">State</label>
                              <input type="text" className="input-field" required defaultValue="NY" pattern="[A-Za-z\s]+" />
                            </div>
                            <div className="col-span-1">
                              <label className="block text-sm font-medium text-navy mb-1.5">ZIP Code</label>
                              <input type="text" className="input-field" required defaultValue="10001" pattern="[0-9]*" title="Please enter numbers only" />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                          <button type="submit" className="btn-primary flex items-center gap-2">
                            {isSaved ? <CheckCircleIcon className="w-5 h-5" /> : <SaveIcon className="w-5 h-5" />}
                            {isSaved ? 'Saved!' : 'Save Address'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Security Tab */}
                  {activeTab === 'security' && (
                    <motion.div
                      key="security"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="font-serif text-2xl font-bold text-navy mb-6">Password & Security</h2>
                      <form onSubmit={handleSave} className="space-y-6 max-w-xl">
                        <div>
                          <label className="block text-sm font-medium text-navy mb-1.5">Current Password</label>
                          <input type="password" className="input-field" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy mb-1.5">New Password</label>
                          <input type="password" className="input-field" required minLength={8} />
                          <p className="text-xs text-gray-500 mt-1.5">Password must be at least 8 characters long.</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy mb-1.5">Confirm New Password</label>
                          <input type="password" className="input-field" required minLength={8} />
                        </div>

                        <div className="pt-6 flex justify-end">
                          <button type="submit" className="btn-primary flex items-center gap-2">
                            {isSaved ? <CheckCircleIcon className="w-5 h-5" /> : <SaveIcon className="w-5 h-5" />}
                            {isSaved ? 'Updated!' : 'Update Password'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Payment Tab */}
                  {activeTab === 'payment' && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="font-serif text-2xl font-bold text-navy mb-6">Payment Methods</h2>
                      
                      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold italic text-sm">VISA</div>
                          <div>
                            <p className="font-medium text-navy">Visa ending in 4242</p>
                            <p className="text-xs text-gray-500">Expires 12/28</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded">Default</span>
                          <button className="text-sm text-burgundy hover:text-red-700">Remove</button>
                        </div>
                      </div>

                      <form onSubmit={handleSave} className="space-y-6 max-w-xl pt-4 border-t border-gray-100">
                        <h3 className="font-bold text-navy mb-4">Add New Card</h3>
                        <div>
                          <label className="block text-sm font-medium text-navy mb-1.5">Cardholder Name</label>
                          <input type="text" className="input-field" required pattern="[A-Za-z\s]+" title="Please enter letters only" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy mb-1.5">Card Number</label>
                          <input type="text" className="input-field" required pattern="[0-9\s]+" title="Please enter numbers only" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-navy mb-1.5">Expiry Date</label>
                            <input type="text" className="input-field" required placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-navy mb-1.5">CVV</label>
                            <input type="text" className="input-field" required pattern="[0-9]{3,4}" title="Please enter 3 or 4 digits" placeholder="123" />
                          </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                          <button type="submit" className="btn-primary flex items-center gap-2">
                            {isSaved ? <CheckCircleIcon className="w-5 h-5" /> : <SaveIcon className="w-5 h-5" />}
                            {isSaved ? 'Saved!' : 'Add Payment Method'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
