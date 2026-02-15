
import React, { useState } from 'react';
import { useApp } from '../store';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Checkout: React.FC = () => {
  const { cart, placeOrder, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const itemTotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const total = Math.round(itemTotal * 1.18) + 54; // Rough calc with taxes

  const handleFinish = () => {
    placeOrder();
    navigate('/order-success');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <h2 className="text-xl font-bold mb-4">Please login to continue</h2>
        <button onClick={() => navigate('/auth')} className="bg-[#0c831f] text-white px-8 py-3 rounded-xl font-bold">Login Now</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => navigate(-1)} className="mr-4 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
           <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#0c831f]' : 'bg-gray-200'}`}></div>
           <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#0c831f]' : 'bg-gray-200'}`}></div>
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">Select Address</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-green-50 border border-[#0c831f] flex items-start gap-3 cursor-pointer">
                  <div className="mt-1 text-[#0c831f]">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-900 text-sm">Home</p>
                      <span className="bg-white text-gray-600 text-[10px] px-2 border border-gray-200 rounded">Default</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-snug">H-404, Royal Palms, Aarey Colony, Goregaon East, Mumbai - 400065</p>
                  </div>
                </div>
                
                <button className="w-full py-3 text-[#0c831f] font-bold text-sm bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">+ Add New Address</button>
              </div>
              <button onClick={() => setStep(2)} className="w-full mt-8 bg-[#0c831f] text-white font-bold py-3.5 rounded-xl shadow-lg">Proceed to Payment</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Options</h2>
              <div className="space-y-3">
                <PaymentOption icon="UPI" title="UPI (GPay, PhonePe)" recommended />
                <PaymentOption icon="💳" title="Credit / Debit Card" />
                <PaymentOption icon="🏦" title="Net Banking" />
                <PaymentOption icon="💵" title="Cash on Delivery" />
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center mb-6">
                <span className="font-medium text-gray-500 text-sm">Amount to pay</span>
                <span className="text-xl font-black text-gray-900">₹{total}</span>
              </div>
              <button onClick={handleFinish} className="w-full bg-[#0c831f] text-white font-bold py-3.5 rounded-xl shadow-lg">Pay Securely</button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const PaymentOption = ({ icon, title, recommended = false }: { icon: string, title: string, recommended?: boolean }) => (
  <label className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#0c831f] hover:bg-green-50 transition-all cursor-pointer group bg-white">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg text-lg group-hover:bg-white">{icon}</div>
      <div>
         <span className="font-bold text-gray-800 text-sm block">{title}</span>
         {recommended && <span className="text-[10px] text-[#0c831f] font-bold uppercase tracking-wide">Recommended</span>}
      </div>
    </div>
    <input type="radio" name="payment" className="w-5 h-5 accent-[#0c831f]" defaultChecked={recommended} />
  </label>
);

export default Checkout;
