
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { StarIcon, CheckIcon, TimerIcon } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addToCart, cart, updateQuantity, removeFromCart } = useApp();
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();

  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (!product) return <div>Not Found</div>;

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, -1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleAdd = () => {
    addToCart(product);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-100">
          
          {/* Left: Image */}
          <div className="flex items-center justify-center bg-white rounded-2xl p-4 md:p-10 relative">
             <motion.img 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               src={product.image} 
               alt={product.name} 
               className="w-full max-w-md object-contain mix-blend-multiply" 
             />
             <div className="absolute top-4 left-4 bg-green-100 text-[#0c831f] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
               {product.rating} <StarIcon />
             </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{product.brand}</div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight">{product.name}</h1>
            <div className="text-sm font-medium text-gray-500 mb-6">{product.weight}</div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
               <div className="flex items-center gap-4">
                 <div className="text-3xl font-bold text-gray-900">₹{product.price}</div>
                 {product.originalPrice > product.price && (
                   <div className="flex flex-col">
                     <span className="text-sm text-gray-400 line-through">MRP ₹{product.originalPrice}</span>
                     <span className="text-[10px] font-bold text-[#4a7cfa] bg-[#4a7cfa]/10 px-2 py-0.5 rounded">
                       {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Discount
                     </span>
                   </div>
                 )}
               </div>
               
               {/* Desktop Add Button */}
               <div className="hidden lg:block w-40 h-12 relative">
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
                       key="add-desktop"
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.8 }}
                       whileTap={{ scale: 0.95 }}
                       onClick={handleAdd}
                       className="absolute inset-0 w-full h-full bg-[#0c831f] text-white font-bold rounded-xl uppercase text-sm shadow-lg shadow-green-100 hover:bg-[#096316] transition-colors"
                     >
                       Add to Cart
                     </motion.button>
                   ) : (
                     <motion.div
                       key="counter-desktop"
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.8 }}
                       transition={{ type: "spring", stiffness: 500, damping: 15 }}
                       className="absolute inset-0 w-full h-full bg-[#0c831f] text-white flex items-center justify-between rounded-xl px-4 font-bold shadow-lg shadow-green-100"
                     >
                       <button onClick={handleDecrement} className="w-8 text-xl hover:scale-125 transition-transform">-</button>
                       <span className="text-lg">{cartItem.quantity}</span>
                       <button onClick={() => addToCart(product)} className="w-8 text-xl hover:scale-125 transition-transform">+</button>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </div>

            <div className="flex flex-col gap-3 mb-8">
               <div className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                  <div className="bg-white p-2 rounded-full shadow-sm"><TimerIcon className="w-4 h-4 text-blue-600" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">Superfast Delivery</span>
                    <span className="text-[10px] text-gray-500">Get it by {product.deliveryTime}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3 bg-green-50/50 p-3 rounded-xl border border-green-100">
                  <div className="bg-white p-2 rounded-full shadow-sm"><CheckIcon className="w-4 h-4 text-green-600" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">100% Authentic</span>
                    <span className="text-sm font-medium text-gray-500">Sourced directly from brand</span>
                  </div>
               </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Product Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {product.nutritionFacts && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Nutrition Facts <span className="text-gray-400 font-normal text-xs">(Per Serving)</span></h3>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(product.nutritionFacts).map(([key, val]) => (
                    <div key={key} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                      <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">{key}</div>
                      <div className="text-sm font-black text-gray-800">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Bar (Mobile only essentially, but styling here for all) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 lg:hidden z-50 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
          <span className="text-xl font-black text-gray-900">₹{product.price}</span>
        </div>
        
        <div className="w-32 h-10 relative">
          <AnimatePresence>
             {showFeedback && (
               <motion.div
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: -40 }}
                 exit={{ opacity: 0 }}
                 className="absolute left-1/2 -translate-x-1/2 bg-[#0c831f] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#0c831f]"
               >
                 Added!
               </motion.div>
             )}
          </AnimatePresence>

          <AnimatePresence initial={false} mode="wait">
            {!cartItem ? (
              <motion.button 
                key="add-mobile"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="absolute inset-0 w-full h-full bg-[#0c831f] text-white font-bold rounded-lg uppercase text-sm"
              >
                Add to Cart
              </motion.button>
            ) : (
              <motion.div 
                key="counter-mobile"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute inset-0 w-full h-full bg-[#0c831f] text-white flex items-center justify-between rounded-lg px-3 font-bold"
              >
                 <button onClick={handleDecrement} className="w-6 text-lg">-</button>
                 <span>{cartItem.quantity}</span>
                 <button onClick={() => addToCart(product)} className="w-6 text-lg">+</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
