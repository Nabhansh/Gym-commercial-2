
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import { HomeIcon, MenuIcon, UserIcon, CartIcon } from './components/Icons';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart } = useApp();
  const location = useLocation();
  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  
  // Routes where we hide the bottom nav or specific footer elements
  const hideBottomNav = ['/product', '/checkout', '/order-success', '/cart', '/auth'].some(path => location.pathname.includes(path));
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
      
      {/* Mobile Sticky Cart Summary (Blinkit Style) */}
      {!location.pathname.includes('/cart') && !location.pathname.includes('/checkout') && totalItems > 0 && (
        <div className="fixed bottom-20 md:bottom-8 left-4 right-4 z-40 md:left-auto md:right-8 md:w-96">
            <Link to="/cart" className="bg-[#0c831f] text-white rounded-xl p-3 flex items-center justify-between shadow-xl animate-bounce-in cursor-pointer">
              <div className="flex flex-col pl-2">
                 <span className="text-[10px] font-bold uppercase opacity-80">{totalItems} ITEMS</span>
                 <span className="text-sm font-black">₹{totalAmount}</span>
              </div>
              <div className="flex items-center gap-2 pr-2 font-bold text-sm">
                View Cart <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
        </div>
      )}
      
      {/* Mobile Bottom Navigation */}
      {!hideBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-3 pb-safe z-50 md:hidden">
          <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-[#0c831f]' : 'text-gray-400'}`}>
            <HomeIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">Home</span>
          </Link>
          <Link to="/category/Protein" className={`flex flex-col items-center gap-1 ${location.pathname.includes('/category') ? 'text-[#0c831f]' : 'text-gray-400'}`}>
            <MenuIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">Categories</span>
          </Link>
          <Link to="/auth" className={`flex flex-col items-center gap-1 ${location.pathname === '/auth' ? 'text-[#0c831f]' : 'text-gray-400'}`}>
            <UserIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">Account</span>
          </Link>
        </div>
      )}

      {/* Desktop Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8 hidden md:block">
         <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8 mb-12">
            <div>
               <h2 className="text-2xl font-black text-[#0c831f] mb-4">FitKart</h2>
               <p className="text-gray-500 text-sm leading-relaxed">India's most trusted fitness delivery app. Authentic supplements, gym gear, and more delivered in minutes.</p>
            </div>
            <div>
               <h4 className="font-bold text-gray-900 mb-4">Categories</h4>
               <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link to="/category/Protein">Proteins</Link></li>
                  <li><Link to="/category/Vitamins">Vitamins</Link></li>
                  <li><Link to="/category/Equipment">Equipment</Link></li>
                  <li><Link to="/category/Clothing">Clothing</Link></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-gray-900 mb-4">Support</h4>
               <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link to="/auth">My Account</Link></li>
                  <li><Link to="/orders">My Orders</Link></li>
                  <li>Contact Us</li>
                  <li>FAQ</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-gray-900 mb-4">Download App</h4>
               <div className="flex gap-2">
                  <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
                     <span className="text-xl">🍎</span>
                     <div className="flex flex-col leading-none">
                        <span className="text-[8px]">Download on the</span>
                        <span className="text-xs font-bold">App Store</span>
                     </div>
                  </div>
                  <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
                     <span className="text-xl">🤖</span>
                     <div className="flex flex-col leading-none">
                        <span className="text-[8px]">GET IT ON</span>
                        <span className="text-xs font-bold">Google Play</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="border-t border-gray-100 pt-8 text-center text-xs text-gray-400">
            © 2024 FitKart Technologies Pvt. Ltd. All rights reserved.
         </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AppLayout>
      </Router>
    </AppProvider>
  );
};

export default App;
