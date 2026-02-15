
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon, UserIcon, SearchIcon } from './Icons';
import { useApp } from '../store';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { cart, user } = useApp();
  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center gap-8 justify-between">
        
        {/* Logo & Location */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex flex-col items-start group">
            <h1 className="text-2xl font-black tracking-tight text-[#0c831f]">FitKart</h1>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider group-hover:text-[#0c831f] transition-colors">Fitness Delivered</span>
          </Link>
          
          <div className="hidden lg:flex flex-col">
             <span className="text-xs font-bold text-gray-900">Delivery in 15 minutes</span>
             <span className="text-xs text-gray-500 truncate max-w-[200px]">H-404, Royal Palms, Goregaon East, Mumbai...</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-2xl hidden md:block relative">
           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
             <SearchIcon className="w-5 h-5" />
           </div>
           <input 
             type="text"
             placeholder="Search for 'whey protein'"
             className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#0c831f]/20 focus:border-[#0c831f] transition-all text-sm font-medium"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && navigate(`/category/Protein`)} // Mock search
           />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link to={user ? "/auth" : "/auth"} className="hidden md:flex items-center gap-2 text-gray-700 hover:text-[#0c831f] font-medium text-sm">
             <span className="text-lg">{user ? '👤' : 'Login'}</span> 
          </Link>

          {/* Desktop Cart Button */}
          {totalItems > 0 ? (
            <Link to="/cart" className="hidden md:flex items-center gap-3 bg-[#0c831f] hover:bg-[#096316] text-white px-5 py-3 rounded-xl transition-all shadow-md">
              <CartIcon className="w-5 h-5" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-xs font-bold">{totalItems} items</span>
                <span className="text-sm font-bold">₹{totalAmount}</span>
              </div>
            </Link>
          ) : (
             <Link to="/cart" className="hidden md:flex items-center gap-2 text-gray-700 hover:text-[#0c831f] font-bold text-sm">
                <CartIcon className="w-6 h-6" />
                <span>My Cart</span>
             </Link>
          )}
        </div>
      </div>
      
      {/* Mobile Search Bar (Below Header) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
           <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
             <SearchIcon className="w-4 h-4" />
           </div>
           <input 
             type="text"
             placeholder="Search products..."
             className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 outline-none text-sm font-medium"
           />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
