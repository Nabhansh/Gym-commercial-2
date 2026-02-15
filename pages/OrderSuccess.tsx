
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const OrderSuccess: React.FC = () => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0c831f', '#FFD700', '#ffffff']
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-[#0c831f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        
        <h1 className="text-2xl font-black text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Your order has been confirmed. Our delivery partner is on their way to pick up your package.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-gray-700 uppercase">Arriving in 14 mins</span>
           </div>
           <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '30%' }}
               transition={{ duration: 1 }}
               className="h-full bg-[#0c831f]"
             />
           </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/" className="w-full bg-[#0c831f] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-green-100">Continue Shopping</Link>
          <button className="w-full bg-white text-gray-700 border border-gray-200 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50">View Order Details</button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
