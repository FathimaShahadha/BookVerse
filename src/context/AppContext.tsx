import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { Book, Order, Ticket, Category, Review, Promotion, CATEGORIES, PROMOTIONS, REVIEWS } from '../data/mockData';

export interface CartItem extends Book {
  quantity: number;
}

export type UserRole = 'customer' | 'admin' | 'csr' | null;

interface AppContextType {
  currentPage: string;
  navigate: (page: string, params?: any) => void;
  pageParams: any;
  
  // Data State
  books: Book[];
  addBook: (book: Book) => Promise<void>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  
  categories: Category[];
  
  orders: Order[];
  addOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  
  promotions: Promotion[];
  reviews: Review[];

  // Support Tickets
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => Promise<void>;
  updateTicketStatus: (id: string, status: Ticket['status']) => Promise<void>;

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
  loginAs: (role: UserRole, email: string, password?: string) => Promise<void>;
  registerAs: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api';

// Helper to normalize MongoDB _id to React id
const normalizeId = (obj: any) => {
  if (obj._id && !obj.id) {
    obj.id = obj._id;
  }
  return obj;
};

// LocalStorage Hook for user local preferences like cart & wishlist
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
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
  // Navigation
  const [currentPage, setCurrentPage] = useState('login');
  const [pageParams, setPageParams] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Static/Local Mock Data Maps (Categories, Promotions, Reviews) 
  // You can move these to DB later, kept static to minimize rewrite scope
  const [categories] = useState<Category[]>(CATEGORIES);
  const [promotions] = useState<Promotion[]>(PROMOTIONS);
  const [reviews] = useState<Review[]>(REVIEWS);

  // Dynamic Data State
  const [books, setBooks] = useState<Book[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Auth State
  const [user, setUser] = useLocalStorage<any | null>('bookverse_user', null);
  const [userRole, setUserRole] = useLocalStorage<UserRole>('bookverse_role', null);
  
  const [cart, setCart] = useLocalStorage<CartItem[]>('bookverse_cart', []);
  const [wishlist, setWishlist] = useLocalStorage<Book[]>('bookverse_wishlist', []);

  // Axios interceptor for JWT Auth
  useEffect(() => {
    if (user && user.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // Initial Fetch Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: booksData } = await axios.get(`${API_URL}/books`);
        setBooks(booksData.map(normalizeId));
        
        // If authenticated, fetch restricted content
        if (user && userRole) {
           if (userRole === 'admin' || userRole === 'csr') {
               const { data: ordersData } = await axios.get(`${API_URL}/orders`, { headers: { Authorization: `Bearer ${user.token}` }});
               setOrders(ordersData.map(normalizeId));
               
               const { data: ticketsData } = await axios.get(`${API_URL}/tickets`, { headers: { Authorization: `Bearer ${user.token}` }});
               setTickets(ticketsData.map(normalizeId));
           } else {
               const { data: userOrders } = await axios.get(`${API_URL}/orders/myorders`, { headers: { Authorization: `Bearer ${user.token}` }});
               setOrders(userOrders.map(normalizeId));
               
               const { data: userTickets } = await axios.get(`${API_URL}/tickets/mytickets`, { headers: { Authorization: `Bearer ${user.token}` }});
               setTickets(userTickets.map(normalizeId));
           }
        }
      } catch (err) {
        console.error('API Fetch Error:', err);
      }
    };
    
    fetchData();
  }, [userRole, user]);


  // Routing Redirects
  useEffect(() => {
    if (userRole && currentPage === 'login') {
      if (userRole === 'admin') navigate('admin-dashboard');
      else if (userRole === 'csr') navigate('csr-dashboard');
      else navigate('home');
    }
  }, []);

  const navigate = (page: string, params: any = null) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  // Auth Functions
  const loginAs = async (role: UserRole, email: string, inputPassword?: string) => {
    try {
      // Mock Passwords as defined in our DB seeder ('admin', 'csr', 'password')
      let password = inputPassword || 'password';
      if (role === 'admin') password = 'admin';
      if (role === 'csr') password = 'csr';

      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      setUser(data);
      setUserRole(role);
      
      if (role === 'admin') navigate('admin-dashboard');
      else if (role === 'csr') navigate('csr-dashboard');
      else navigate('home');
    } catch (err) {
      alert("Login Failed Check Console");
      console.error(err);
    }
  };

  const registerAs = async (name: string, email: string, password?: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password: password || 'password' });
      
      setUser(data);
      setUserRole('customer');
      
      navigate('home');
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration Failed Check Console");
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    setCart([]);
    navigate('login');
  };

  // Book API Handlers
  const addBook = async (book: Book) => {
    try {
      const { data } = await axios.post(`${API_URL}/books`, book);
      setBooks((prev) => [normalizeId(data), ...prev]);
    } catch (err) { console.error(err); }
  };

  const updateBook = async (id: string, updates: Partial<Book>) => {
    try {
      const { data } = await axios.put(`${API_URL}/books/${id}`, updates);
      setBooks(prev => prev.map(b => b.id === id ? normalizeId(data) : b));
    } catch (err) { console.error(err); }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      setBooks(prev => prev.filter(b => b.id !== id));
    } catch (err) { console.error(err); }
  };

  // Order API Handlers
  const addOrder = async (order: Order) => {
    try {
      const { data } = await axios.post(`${API_URL}/orders`, order);
      setOrders(prev => [normalizeId(data), ...prev]);
    } catch (err) { console.error(err); }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const { data } = await axios.put(`${API_URL}/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o.id === id ? normalizeId(data) : o));
    } catch (err) { console.error(err); }
  };

  // Ticket API Handlers
  const addTicket = async (ticket: Ticket) => {
    try {
       // Mapping ticket to schema
       const payload = {
         subject: ticket.subject,
         category: ticket.category,
         priority: ticket.priority,
         message: "Initial Ticket Creation" // Assuming messages flow handles true initial body
       };
       const { data } = await axios.post(`${API_URL}/tickets`, payload);
       setTickets(prev => [normalizeId(data), ...prev]);
    } catch (err) { console.error(err); }
  };

  const updateTicketStatus = async (id: string, status: Ticket['status']) => {
    try {
      // Tickets use message append route to update status, or standard direct update.
      // We send a generic status update message.
      const { data } = await axios.post(`${API_URL}/tickets/${id}/messages`, {
          text: `Status changed to ${status}`,
          status
      });
      setTickets(prev => prev.map(t => t.id === id ? normalizeId({ ...t, status }) : t));
    } catch (err) { console.error(err); }
  };

  // Cart Functions (Remains LocalStorage)
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
        
        user, userRole, loginAs, registerAs, logout
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