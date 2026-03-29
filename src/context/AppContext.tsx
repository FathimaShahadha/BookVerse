import React, { useState, useEffect, createContext, useContext } from 'react';
import { Book, Order, MOCK_USER, BOOKS, ORDERS, CATEGORIES, Category, Review, REVIEWS, Promotion, PROMOTIONS } from '../data/mockData';

export interface CartItem extends Book {
  quantity: number;
}

export interface Ticket {
  id: string;
  priority: 'High' | 'Medium' | 'Low';
  customer: string;
  subject: string;
  category: string;
  date: string;
  agent: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
}

export type UserRole = 'customer' | 'admin' | 'csr' | null;

export const MOCK_ADMIN = {
  id: 'admin1',
  name: 'Admin Manager',
  email: 'admin@bookverse.com',
  role: 'admin' as const,
  avatar: 'https://i.pravatar.cc/150?u=admin'
};

export const MOCK_CSR = {
  id: 'csr1',
  name: 'Support Agent',
  email: 'support@bookverse.com',
  role: 'csr' as const,
  avatar: 'https://i.pravatar.cc/150?u=csr'
};

interface AppContextType {
  currentPage: string;
  navigate: (page: string, params?: any) => void;
  pageParams: any;
  
  // Data State
  books: Book[];
  addBook: (book: Book) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  
  categories: Category[];
  
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  promotions: Promotion[];
  reviews: Review[];

  // Support Tickets
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  updateTicketStatus: (id: string, status: Ticket['status']) => void;

  // Customer State
  cart: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateCartQuantity: (bookId: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  clearCart: () => void;
  
  wishlist: Book[];
  toggleWishlist: (book: Book) => void;
  isInWishlist: (bookId: string) => boolean;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Auth State
  user: any | null;
  userRole: UserRole;
  loginAs: (role: UserRole, email: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper hook for localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Navigation & UI State (Not persisted)
  const [currentPage, setCurrentPage] = useState('login');
  const [pageParams, setPageParams] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Persisted Data State
  const [books, setBooks] = useLocalStorage<Book[]>('bookverse_books', BOOKS);
  const [categories, setCategories] = useLocalStorage<Category[]>('bookverse_categories', CATEGORIES);
  const [orders, setOrders] = useLocalStorage<Order[]>('bookverse_orders', ORDERS);
  const [promotions, setPromotions] = useLocalStorage<Promotion[]>('bookverse_promotions', PROMOTIONS);
  const [reviews, setReviews] = useLocalStorage<Review[]>('bookverse_reviews', REVIEWS);
  const [tickets, setTickets] = useLocalStorage<Ticket[]>('bookverse_tickets', [
    {
      id: 'T-1042',
      priority: 'High',
      customer: 'Jane Austen',
      subject: 'Order not received',
      category: 'Order Issue',
      date: '2026-03-07',
      agent: 'Unassigned',
      status: 'Open'
    },
    {
      id: 'T-1041',
      priority: 'Medium',
      customer: 'Arthur Dent',
      subject: 'Return request',
      category: 'Return Request',
      date: '2026-03-07',
      agent: 'Support Agent',
      status: 'In Progress'
    }
  ]);
  
  // Persisted User State
  const [user, setUser] = useLocalStorage<any | null>('bookverse_user', null);
  const [userRole, setUserRole] = useLocalStorage<UserRole>('bookverse_role', null);
  const [cart, setCart] = useLocalStorage<CartItem[]>('bookverse_cart', []);
  const [wishlist, setWishlist] = useLocalStorage<Book[]>('bookverse_wishlist', [BOOKS[0], BOOKS[2]]);

  // Initialization check to handle refreshing on protected pages
  useEffect(() => {
    if (userRole && currentPage === 'login') {
      if (userRole === 'admin') navigate('admin-dashboard');
      else if (userRole === 'csr') navigate('csr-dashboard');
      else navigate('home');
    }
  }, []);

  // Navigation limits
  const navigate = (page: string, params: any = null) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  // Auth Functions
  const loginAs = (role: UserRole, email: string) => {
    setUserRole(role);
    if (role === 'admin') {
      setUser(MOCK_ADMIN);
      navigate('admin-dashboard');
    } else if (role === 'csr') {
      setUser(MOCK_CSR);
      navigate('csr-dashboard');
    } else {
      setUser({ ...MOCK_USER, email });
      navigate('home');
    }
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    setCart([]);
    navigate('login');
  };

  // Data Functions
  const addBook = (book: Book) => setBooks((prev) => [book, ...prev]);
  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(prev => prev.map(book => book.id === id ? { ...book, ...updates } : book));
  };
  const deleteBook = (id: string) => setBooks(prev => prev.filter(book => book.id !== id));

  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status } : order));
  };

  const addTicket = (ticket: Ticket) => setTickets(prev => [ticket, ...prev]);
  const updateTicketStatus = (id: string, status: Ticket['status']) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  // Cart Functions
  const addToCart = (book: Book, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...book, quantity }];
    });
  };

  const removeFromCart = (bookId: string) => setCart((prev) => prev.filter((item) => item.id !== bookId));
  
  const updateCartQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === bookId ? { ...item, quantity } : item)));
  };

  const clearCart = () => setCart([]);
  
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist Functions
  const toggleWishlist = (book: Book) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === book.id);
      if (exists) return prev.filter((item) => item.id !== book.id);
      return [...prev, book];
    });
  };

  const isInWishlist = (bookId: string) => wishlist.some((item) => item.id === bookId);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigate,
        pageParams,
        
        books, addBook, updateBook, deleteBook,
        categories,
        orders, addOrder, updateOrderStatus,
        promotions, reviews,
        tickets, addTicket, updateTicketStatus,

        cart, addToCart, removeFromCart, updateCartQuantity,
        cartTotal, cartCount, clearCart,
        
        wishlist, toggleWishlist, isInWishlist,
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        
        user, userRole, loginAs, logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}