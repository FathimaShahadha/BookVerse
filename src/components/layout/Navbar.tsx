import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpenIcon,
  SearchIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  LogOutIcon,
  LayoutDashboardIcon,
  PackageIcon,
  SettingsIcon,
  HeadsetIcon } from
'lucide-react';
import { useAppContext } from '../../context/AppContext';
export function Navbar() {
  const {
    navigate,
    cartCount,
    wishlist,
    user,
    logout,
    searchQuery,
    setSearchQuery,
    currentPage,
    userRole
  } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate('catalog');
    setIsMobileMenuOpen(false);
  };
  const navLinks = [
  {
    id: 'home',
    label: 'Home'
  },
  {
    id: 'catalog',
    label: 'Catalog'
  },
  {
    id: 'bestsellers',
    label: 'Bestsellers'
  },
  {
    id: 'new-arrivals',
    label: 'New Arrivals'
  }];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-warm' : 'bg-cream'}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('home')}>

            <BookOpenIcon className="w-8 h-8 text-navy group-hover:text-amber transition-colors" />
            <span className="font-serif text-2xl font-bold text-navy tracking-tight">
              BookVerse
            </span>
          </div>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex items-center flex-1 justify-center px-8">
            <nav className="flex items-center gap-6 mr-8">
              {navLinks.map((link) =>
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === 'bestsellers' || link.id === 'new-arrivals') {
                    navigate('home');
                    setTimeout(() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    navigate(link.id);
                  }
                }}
                className={`text-sm font-medium transition-colors relative py-2 ${currentPage === link.id ? 'text-amber' : 'text-navy hover:text-amber'}`}>

                  {link.label}
                  {currentPage === link.id &&
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber rounded-full" />

                }
                </button>
              )}
            </nav>

            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search books, authors, ISBN..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber focus:border-transparent text-sm transition-all outline-none" />

              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => navigate('wishlist')}
              className="relative p-2 text-navy hover:text-amber transition-colors"
              aria-label="Wishlist">

              <HeartIcon className="w-6 h-6" />
              {wishlist.length > 0 &&
              <span className="absolute top-0 right-0 bg-burgundy text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlist.length}
                </span>
              }
            </button>

            <button
              onClick={() => navigate('cart')}
              className="relative p-2 text-navy hover:text-amber transition-colors"
              aria-label="Cart">

              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 &&
              <motion.span
                key={cartCount}
                initial={{
                  scale: 0.5,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                className="absolute top-0 right-0 bg-amber text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">

                  {cartCount}
                </motion.span>
              }
            </button>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors">

                {user?.avatar ?
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-gray-200" /> :


                <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center">
                    <UserIcon className="w-4 h-4" />
                  </div>
                }
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen &&
                <motion.div
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
                    y: 10
                  }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-warm border border-gray-100 py-2 z-50">

                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                      <p className="text-sm font-bold text-navy truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <button
                    onClick={() => {
                      if (userRole === 'admin') navigate('admin-dashboard');
                      else if (userRole === 'csr') navigate('csr-dashboard');
                      else navigate('customer-dashboard');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber transition-colors">

                      <LayoutDashboardIcon className="w-4 h-4" /> Dashboard
                    </button>
                    <button
                    onClick={() => {
                      navigate('orders');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber transition-colors">

                      <PackageIcon className="w-4 h-4" /> My Orders
                    </button>
                    <button 
                      onClick={() => {
                        navigate('settings');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber transition-colors"
                    >
                      <SettingsIcon className="w-4 h-4" /> Settings
                    </button>
                    <button 
                      onClick={() => {
                        navigate('support');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber transition-colors"
                    >
                      <HeadsetIcon className="w-4 h-4" /> Support
                    </button>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-burgundy hover:bg-red-50 transition-colors">

                        <LogOutIcon className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => navigate('cart')}
              className="relative p-2 text-navy">

              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 &&
              <span className="absolute top-0 right-0 bg-amber text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              }
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-navy">

              {isMobileMenuOpen ?
              <XIcon className="w-6 h-6" /> :

              <MenuIcon className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            height: 0,
            opacity: 0
          }}
          animate={{
            height: 'auto',
            opacity: 1
          }}
          exit={{
            height: 0,
            opacity: 0
          }}
          className="md:hidden bg-white border-t border-gray-100 overflow-hidden">

            <div className="px-4 py-6 space-y-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                type="text"
                placeholder="Search books..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber focus:border-transparent outline-none" />

                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </form>

              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) =>
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === 'bestsellers' || link.id === 'new-arrivals') {
                    navigate('home');
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    navigate(link.id);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`text-left text-lg font-medium ${currentPage === link.id ? 'text-amber' : 'text-navy'}`}>

                    {link.label}
                  </button>
              )}
              </nav>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <button
                onClick={() => {
                  if (userRole === 'admin') navigate('admin-dashboard');
                  else if (userRole === 'csr') navigate('csr-dashboard');
                  else navigate('customer-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-navy font-medium">

                  <UserIcon className="w-5 h-5 text-gray-400" /> My Account
                </button>
                <button
                onClick={() => {
                  navigate('wishlist');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-navy font-medium">

                  <HeartIcon className="w-5 h-5 text-gray-400" /> Wishlist (
                  {wishlist.length})
                </button>
                <button 
                  onClick={() => {
                    navigate('support');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-navy font-medium"
                >
                  <HeadsetIcon className="w-5 h-5 text-gray-400" /> Support
                </button>
                <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-burgundy font-medium">

                  <LogOutIcon className="w-5 h-5" /> Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}