
import React, { useState } from 'react';
import { useApp } from '../store';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login, user, logout } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/');
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full max-w-sm text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">👤</div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-8">{user.email}</p>
          
          <div className="space-y-3">
             <button onClick={() => navigate('/orders')} className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-3 rounded-xl transition-colors text-sm">My Orders</button>
             {user.isAdmin && (
               <button onClick={() => navigate('/admin')} className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-3 rounded-xl transition-colors text-sm">Admin Dashboard</button>
             )}
             <button onClick={logout} className="w-full text-red-600 font-bold py-3 text-sm hover:bg-red-50 rounded-xl transition-colors">Log Out</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-black text-[#0c831f] mb-2">FitKart</h1>
        <p className="text-gray-500 mb-10 font-medium">Login to continue your fitness journey</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Mobile Number or Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#0c831f]/20 focus:border-[#0c831f] transition-all font-bold text-gray-900"
              placeholder="user@example.com"
            />
          </div>
          <button type="submit" className="w-full bg-[#0c831f] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-100 hover:shadow-green-200 transition-all text-sm">
            Continue
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs text-gray-400">
           By continuing, you agree to our <a href="#" className="underline text-gray-600">Terms of Service</a> & <a href="#" className="underline text-gray-600">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
