import React, { useState } from 'react';
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  UsersIcon,
  PackageIcon,
  HelpCircleIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  ArrowLeftIcon } from
'lucide-react';
import { useAppContext } from '../../context/AppContext';
export function CSRSidebar() {
  const { currentPage, navigate, logout, user } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
  {
    id: 'csr-dashboard',
    label: 'Dashboard',
    icon: LayoutDashboardIcon
  },
  {
    id: 'csr-tickets',
    label: 'Support Tickets',
    icon: MessageSquareIcon
  },
  {
    id: 'csr-customers',
    label: 'Customers',
    icon: UsersIcon
  },
  {
    id: 'csr-orders',
    label: 'Orders',
    icon: PackageIcon
  },
  {
    id: 'csr-knowledge',
    label: 'Knowledge Base',
    icon: HelpCircleIcon
  }];

  const handleNav = (id: string) => {
    navigate(id);
    setIsOpen(false);
  };
  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-navy text-white rounded-lg shadow-md">

        {isOpen ?
        <XIcon className="w-6 h-6" /> :

        <MenuIcon className="w-6 h-6" />
        }
      </button>

      {/* Overlay */}
      {isOpen &&
      <div
        className="lg:hidden fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsOpen(false)} />

      }

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-navy text-cream z-40 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

        {/* Logo */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10">
          <BookOpenIcon className="w-8 h-8 text-burgundy" />
          <div>
            <span className="font-serif text-xl font-bold block leading-tight">
              BookVerse
            </span>
            <span className="text-xs text-burgundy font-medium tracking-wider uppercase">
              Support Portal
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-white/10 text-burgundy border-l-4 border-burgundy font-medium' : 'text-cream/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}>

                <Icon className="w-5 h-5" />
                {item.label}
              </button>);

          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full border-2 border-burgundy" />

            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-cream/50 truncate">Support Agent</p>
            </div>
          </div>

          <button
            onClick={() => navigate('home')}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-cream/70 hover:text-white transition-colors">

            <ArrowLeftIcon className="w-4 h-4" /> Back to Store
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-burgundy hover:text-red-400 transition-colors mt-1">

            <LogOutIcon className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>
    </>);

}