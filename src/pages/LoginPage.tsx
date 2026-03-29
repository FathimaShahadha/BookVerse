import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpenIcon,
  UserIcon,
  ShieldIcon,
  HeadsetIcon,
  EyeIcon,
  EyeOffIcon } from
'lucide-react';
import { useAppContext, UserRole } from '../context/AppContext';
export function LoginPage() {
  const { loginAs } = useAppContext();
  const [activeTab, setActiveTab] = useState<UserRole>('customer');
  const [email, setEmail] = useState('jane.austen@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleTabChange = (role: UserRole) => {
    setActiveTab(role);
    if (role === 'admin') setEmail('admin@bookverse.com');else
    if (role === 'csr') setEmail('support@bookverse.com');else
    setEmail('jane.austen@example.com');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(activeTab, email);
  };
  const tabs = [
  {
    id: 'customer',
    label: 'Customer',
    icon: UserIcon,
    desc: 'Browse books, manage orders, and access your wishlist.'
  },
  {
    id: 'admin',
    label: 'Administrator',
    icon: ShieldIcon,
    desc: 'Manage inventory, view reports, and oversee store operations.'
  },
  {
    id: 'csr',
    label: 'Support Agent',
    icon: HeadsetIcon,
    desc: 'Handle customer inquiries, manage tickets, and assist with orders.'
  }] as
  const;
  const activeTabData = tabs.find((t) => t.id === activeTab);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cream">
      {/* Left Decorative Side */}
      <div className="md:w-5/12 lg:w-1/2 bg-navy text-cream p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber blur-3xl mix-blend-screen" />
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-burgundy blur-3xl mix-blend-screen" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <BookOpenIcon className="w-8 h-8 text-amber" />
          <span className="font-serif text-2xl font-bold tracking-tight">
            BookVerse
          </span>
        </div>

        <div className="relative z-10 mt-12 md:mt-0 max-w-md">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your next great adventure awaits.
          </h1>
          <p className="text-lg text-cream/80 font-serif italic border-l-4 border-amber pl-4">
            "A reader lives a thousand lives before he dies. The man who never
            reads lives only one."
            <span className="block mt-2 text-sm font-sans not-italic text-cream/60">
              — George R.R. Martin
            </span>
          </p>
        </div>

        <div className="relative z-10 hidden md:block text-sm text-cream/60">
          &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
        </div>
      </div>

      {/* Right Login Side */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold text-navy mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500">Please sign in to your account.</p>
          </div>

          {/* Role Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6 relative">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as UserRole)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all relative z-10 ${isActive ? 'text-navy' : 'text-gray-500 hover:text-navy'}`}>

                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {isActive &&
                  <motion.div
                    layoutId="login-tab-indicator"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6
                    }} />

                  }
                </button>);

            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -10
              }}
              transition={{
                duration: 0.2
              }}>

              <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
                {activeTabData?.desc}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required />

                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pr-10"
                      required />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors">

                      {showPassword ?
                      <EyeOffIcon className="w-5 h-5" /> :

                      <EyeIcon className="w-5 h-5" />
                      }
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-amber focus:ring-amber" />

                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-amber hover:text-navy transition-colors">

                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Sign In
                </button>

                {activeTab === 'customer' &&
                <div className="text-center mt-6">
                    <span className="text-sm text-gray-500">
                      Don't have an account?{' '}
                    </span>
                    <a
                    href="#"
                    className="text-sm font-medium text-amber hover:text-navy transition-colors">

                      Create Account
                    </a>
                  </div>
                }
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>);

}