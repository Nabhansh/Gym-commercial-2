
import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TimerIcon, EyeIcon } from './Icons';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useApp();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const cartItem = cart.find(item => item.id === product.id);

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, -1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1500);
  };

  return (
    <>
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:border-gray-200 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col overflow-hidden relative group z-0 hover:z-10">
          
          {/* Discount Tag */}
          {product.originalPrice > product.price && (
            <div className="absolute top-0 left-0 bg-[#4a7cfa] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}

          {/* Image Area */}
          <div className="p-4 relative flex items-center justify-center aspect-[4/4] bg-white group-hover:bg-gray-50/30 transition-colors">
            <motion.img 
              layoutId={`product-image-${product.id}`}
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Quick View Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-black/5 backdrop-blur-[1px]">
               <button 
                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsQuickViewOpen(true); }}
                 className="bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg font-bold text-xs transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 pointer-events-auto hover:bg-[#0c831f] hover:text-white border border-gray-100 z-20"
               >
                 <EyeIcon className="w-3.5 h-3.5" />
                 Quick View
               </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-3 pb-4 flex flex-col flex-grow">
            {/* Delivery Badge */}
            <div className="flex items-center gap-1 bg-gray-100 w-fit px-1.5 py-0.5 rounded-[4px] mb-2">
              <TimerIcon className="w-3 h-3 text-gray-500" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">{product.deliveryTime || '15 MINS'}</span>
            </div>

            <h3 className="text-[13px] font-semibold text-gray-800 leading-tight line-clamp-2 mb-1 min-h-[34px] group-hover:text-[#0c831f] transition-colors">
              {product.name}
            </h3>
            
            <div className="text-xs text-gray-500 mb-4 font-medium">{product.weight}</div>

            <div className="mt-auto flex items-center justify-between relative z-20">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through decoration-gray-400">₹{product.originalPrice}</span>
                <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
              </div>

              {/* Add Button - Blinkit Style */}
              <div className="w-20 h-9 relative">
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: -30 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 bg-[#0c831f] text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-50 pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#0c831f]"
                    >
                      Added!
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false} mode="wait">
                  {!cartItem ? (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileTap={{ scale: 0.9 }}
                      key="add-btn"
                      onClick={handleAdd}
                      className="absolute inset-0 w-full h-full bg-[#f7fff9] border border-[#0c831f] text-[#0c831f] text-sm font-bold rounded-lg uppercase tracking-wide hover:bg-[#0c831f] hover:text-white transition-colors shadow-sm"
                    >
                      ADD
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      key="counter"
                      className="absolute inset-0 w-full h-full bg-[#0c831f] text-white flex items-center justify-between rounded-lg px-2 text-sm font-bold shadow-md"
                    >
                      <button onClick={handleDecrement} className="w-4 flex justify-center hover:scale-125 transition-transform">-</button>
                      <span>{cartItem.quantity}</span>
                      <button onClick={handleIncrement} className="w-4 flex justify-center hover:scale-125 transition-transform">+</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <AnimatePresence>
        {isQuickViewOpen && (
          <QuickViewModal 
            product={product} 
            isOpen={isQuickViewOpen} 
            onClose={() => setIsQuickViewOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
