
import React from 'react';
import { useApp } from '../store';
import { Link } from 'react-router-dom';

const OrderHistory: React.FC = () => {
  const { orders, user } = useApp();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login to view orders</h2>
        <Link to="/auth" className="bg-[#0c831f] text-white px-8 py-3 rounded-xl font-bold">Login</Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-8">Start your fitness journey today!</p>
        <Link to="/" className="text-[#0c831f] font-bold hover:underline">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-black text-gray-900 mb-8">Your Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                 <div>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">{order.status}</span>
                    <div className="text-xs text-gray-400 mt-2 font-medium">Order #{order.id}</div>
                 </div>
                 <div className="text-right">
                    <div className="text-lg font-black text-gray-900">₹{order.totalAmount}</div>
                    <div className="text-xs text-gray-400">{order.date}</div>
                 </div>
              </div>
              
              <div className="space-y-3">
                 {order.items.map(item => (
                   <div key={item.id} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 flex-shrink-0">
                         <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-grow">
                         <div className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</div>
                         <div className="text-xs text-gray-500">{item.quantity} unit(s)</div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
