
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { useApp } from '../store';
import { StarIcon, TimerIcon, ShareIcon } from './Icons';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useApp();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showShareFeedback, setShowShareFeedback] = useState(false);
  const cartItem = cart.find(item => item.id === product.id);

  if (!isOpen) return null;

  const handleAdd = () => {
    addToCart(product);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#/product/${product.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on FitKart!`,
          url: url
        });
      } catch (error) {
        // Ignore abort errors
        console.log('Share aborted');
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShowShareFeedback(true);
        setTimeout(() => setShowShareFeedback(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  // Prevent clicks inside modal from closing it or navigating
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl md:rounded-3xl w-full max-w-3xl overflow-hidden relative z-10 shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] md:h-auto"
        onClick={handleContentClick}
      >
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2 z-20">
          <button 
            onClick={handleShare}
            className="p-2 bg-white/90 hover:bg-gray-100 rounded-full transition-colors shadow-sm backdrop-blur border border-gray-100 active:scale-90 relative"
            title="Share"
          >
            <ShareIcon className="w-5 h-5 text-gray-500" />
            <AnimatePresence>
              {showShareFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full mt-2 right-0 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap"
                >
                  Link Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="p-2 bg-white/90 hover:bg-gray-100 rounded-full transition-colors shadow-sm backdrop-blur border border-gray-100 active:scale-90"
            title="Close"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 md:p-8 flex items-center justify-center relative shrink-0 min-h-[220px] md:min-h-0">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              src={product.image} 
              alt={product.name} 
              className="h-48 md:h-64 w-full object-contain mix-blend-multiply" 
            />
            {product.originalPrice > product.price && (
              <div className="absolute top-0 left-0 bg-[#4a7cfa] text-white text-[10px] font-bold px-3 py-1.5 rounded-br-xl z-10">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col overflow-y-auto">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 md:mb-2">{product.brand}</div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-tight">{product.name}</h2>
            <div className="text-sm font-medium text-gray-500 mb-4">{product.weight}</div>

            <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="bg-green-100 text-[#0c831f] px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 w-fit">
                    {product.rating} <StarIcon className="w-3 h-3 text-[#0c831f]" />
                </div>
                <span className="text-xs text-gray-400">({product.reviewsCount} reviews)</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-4 md:line-clamp-none">{product.description}</p>

            <div className="mt-auto pt-4 border-t border-gray-50 sticky bottom-0 bg-white pb-1 md:static md:pb-0 z-10">
                <div className="flex items-center justify-between mb-4">
                     <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                        <span className="text-xl font-black text-gray-900">₹{product.price}</span>
                     </div>
                     <div className="w-36 h-11 relative">
                        <AnimatePresence>
                           {showFeedback && (
                             <motion.div
                               initial={{ opacity: 0, y: 5 }}
                               animate={{ opacity: 1, y: -40 }}
                               exit={{ opacity: 0 }}
                               className="absolute left-1/2 -translate-x-1/2 bg-[#0c831f] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#0c831f]"
                             >
                               Added to Cart!
                             </motion.div>
                           )}
                        </AnimatePresence>

                        <AnimatePresence initial={false} mode="wait">
                          {!cartItem ? (
                             <motion.button 
                               key="add-btn"
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.8 }}
                               whileTap={{ scale: 0.95 }}
                               onClick={handleAdd} 
                               className="absolute inset-0 w-full h-full bg-[#0c831f] text-white font-bold rounded-lg uppercase text-sm hover:bg-[#096316] transition-colors shadow-lg shadow-green-100"
                             >
                               Add
                             </motion.button>
                          ) : (
                             <motion.div 
                               key="counter"
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.8 }}
                               transition={{ type: "spring", stiffness: 500, damping: 15 }}
                               className="absolute inset-0 w-full h-full bg-[#0c831f] text-white flex items-center justify-between rounded-lg px-3 font-bold shadow-lg shadow-green-100"
                             >
                                <button onClick={() => cartItem.quantity > 1 ? updateQuantity(product.id, -1) : removeFromCart(product.id)} className="w-8 h-full text-xl hover:scale-125 transition-transform flex items-center justify-center">-</button>
                                <span>{cartItem.quantity}</span>
                                <button onClick={() => addToCart(product)} className="w-8 h-full text-xl hover:scale-125 transition-transform flex items-center justify-center">+</button>
                             </motion.div>
                          )}
                        </AnimatePresence>
                     </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl justify-center border border-gray-100">
                   <TimerIcon className="w-3 h-3 text-gray-400" />
                   <span className="font-semibold">Delivered in {product.deliveryTime || '15 mins'}</span>
                </div>
            </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default QuickViewModal;
