
import React from 'react';
import { useApp } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { TimerIcon } from '../components/Icons';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, addToCart } = useApp();
  const navigate = useNavigate();

  const itemTotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = itemTotal > 999 ? 0 : 49;
  const platformFee = 5;
  const gst = Math.round(itemTotal * 0.18);
  const totalBill = itemTotal + deliveryFee + platformFee + gst;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" className="w-32 h-32 mb-6 opacity-50 grayscale" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-xs">You don't have any items in your cart yet. Browse categories to find the best deals!</p>
        <Link to="/" className="bg-[#0c831f] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-green-200">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 pt-6">
      <div className="max-w-3xl mx-auto px-4 lg:px-0 grid gap-6">
        
        {/* Delivery Tip / Time */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><TimerIcon className="w-5 h-5" /></div>
             <div>
               <h3 className="font-bold text-gray-900 text-sm">Delivery in 15 minutes</h3>
               <p className="text-xs text-gray-500">Shipment of {cart.length} items</p>
             </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 divide-y divide-gray-50">
           {cart.map(item => (
             <div key={item.id} className="py-4 flex gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-grow">
                   <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</h4>
                   <p className="text-xs text-gray-500 mb-2">{item.weight}</p>
                   <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">₹{item.price}</span>
                      
                      {/* Counter */}
                      <div className="bg-[#0c831f] text-white rounded-lg flex items-center px-2 py-1 h-8 text-xs font-bold gap-3 shadow-sm">
                        <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
           <h3 className="font-bold text-sm text-gray-900 mb-4">Bill Details</h3>
           <div className="space-y-3 text-xs md:text-sm text-gray-600">
             <div className="flex justify-between">
                <span>Item Total</span>
                <span className="font-medium text-gray-900">₹{itemTotal}</span>
             </div>
             <div className="flex justify-between">
                <span className="flex items-center gap-1">Delivery Charge {deliveryFee === 0 && <span className="bg-blue-100 text-blue-700 text-[9px] px-1 rounded font-bold uppercase">Free</span>}</span>
                <span className="font-medium text-gray-900">₹{deliveryFee}</span>
             </div>
             <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="font-medium text-gray-900">₹{gst}</span>
             </div>
             <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="font-medium text-gray-900">₹{platformFee}</span>
             </div>
             <div className="pt-3 border-t border-gray-100 flex justify-between text-base font-bold text-gray-900">
                <span>To Pay</span>
                <span>₹{totalBill}</span>
             </div>
           </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
           <h3 className="font-bold text-xs text-gray-600 mb-1">Cancellation Policy</h3>
           <p className="text-[10px] text-gray-400 leading-relaxed">Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
        </div>

      </div>

      {/* Sticky Bottom Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
           <div className="flex flex-col">
              <span className="text-sm font-black text-gray-900">₹{totalBill}</span>
              <span className="text-[10px] font-bold text-[#0c831f] uppercase">Total</span>
           </div>
           <button 
             onClick={() => navigate('/checkout')}
             className="flex-grow bg-[#0c831f] hover:bg-[#096316] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2"
           >
             Proceed to Pay
           </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
