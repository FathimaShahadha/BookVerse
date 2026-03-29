import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { LoginPage } from './pages/LoginPage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AdminSidebar } from './components/layout/AdminSidebar';
import { CSRSidebar } from './components/layout/CSRSidebar';
// Customer Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { WishlistPage } from './pages/WishlistPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { SettingsPage } from './pages/SettingsPage';
import { SupportPage } from './pages/SupportPage';
// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { InventoryPage } from './pages/admin/InventoryPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { SalesReportsPage } from './pages/admin/SalesReportsPage';
// CSR Pages
import { CSRDashboard } from './pages/csr/CSRDashboard';
import { TicketsPage } from './pages/csr/TicketsPage';
import { CSRCustomersPage } from './pages/csr/CSRCustomersPage';
import { CSROrdersPage } from './pages/csr/CSROrdersPage';
function AppRouter() {
  const { userRole, currentPage } = useAppContext();
  // Render Login Page if not authenticated
  if (!userRole || currentPage === 'login') {
    return <LoginPage />;
  }
  // Render Admin Layout
  if (userRole === 'admin' && currentPage.startsWith('admin')) {
    const renderAdminPage = () => {
      switch (currentPage) {
        case 'admin-dashboard':
          return <AdminDashboard />;
        case 'admin-inventory':
          return <InventoryPage />;
        case 'admin-orders':
          return <AdminOrdersPage />;
        case 'admin-customers':
          return <AdminCustomersPage />;
        case 'admin-reports':
          return <SalesReportsPage />;
        case 'admin-settings':
          return <SettingsPage />;
        default:
          return <AdminDashboard />;
      }
    };
    return (
      <div className="flex h-screen bg-cream overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 overflow-y-auto">
          {renderAdminPage()}
        </main>
      </div>);
  }
  // Render CSR Layout
  if (userRole === 'csr' && currentPage.startsWith('csr')) {
    const renderCSRPage = () => {
      switch (currentPage) {
        case 'csr-dashboard':
          return <CSRDashboard />;
        case 'csr-tickets':
          return <TicketsPage />;
        case 'csr-customers':
          return <CSRCustomersPage />;
        case 'csr-orders':
          return <CSROrdersPage />;
        default:
          return <CSRDashboard />;
      }
    };
    return (
      <div className="flex h-screen bg-cream overflow-hidden">
        <CSRSidebar />
        <main className="flex-1 lg:ml-64 overflow-y-auto">
          {renderCSRPage()}
        </main>
      </div>);
  }
  // Render Customer Layout
  const renderCustomerPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <CatalogPage />;
      case 'book-detail':
        return <BookDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'wishlist':
        return <WishlistPage />;
      case 'orders':
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'support':
        return <SupportPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Navbar />
      <main className="flex-grow">{renderCustomerPage()}</main>
      <Footer />
    </div>);

}
export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>);

}