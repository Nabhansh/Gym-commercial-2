
import React, { useState } from 'react';
import { useApp } from '../store';
import { Product, CategoryType } from '../types';

const Admin: React.FC = () => {
  const { products, user, addProduct, deleteProduct } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: '',
    category: 'Protein',
    price: 0,
    originalPrice: 0,
    brand: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=400'
  });

  if (!user?.isAdmin) {
    return <div className="p-20 text-center font-bold text-red-600">Access Denied. Admins Only.</div>;
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const p = {
      ...newProd,
      id: `p-${Date.now()}`,
      rating: 4.5,
      reviewsCount: 0,
      inStock: true,
      weight: '1 Unit',
      deliveryTime: '24 hrs'
    } as Product;
    addProduct(p);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
             <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
             <p className="text-sm text-gray-500">Manage store inventory</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-[#0c831f] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm"
          >
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm mb-8 grid grid-cols-2 gap-4 border border-gray-100">
            <input placeholder="Name" className="input-field" value={newProd.name} onChange={e => setNewProd({...newProd, name: e.target.value})} required />
            <select className="input-field" value={newProd.category} onChange={e => setNewProd({...newProd, category: e.target.value as CategoryType})}>
                {['Protein', 'Pre-Workout', 'Vitamins', 'Equipment', 'Accessories', 'Clothing'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Price" className="input-field" value={newProd.price || ''} onChange={e => setNewProd({...newProd, price: Number(e.target.value)})} required />
            <input type="number" placeholder="MRP" className="input-field" value={newProd.originalPrice || ''} onChange={e => setNewProd({...newProd, originalPrice: Number(e.target.value)})} required />
            <input placeholder="Brand" className="input-field" value={newProd.brand} onChange={e => setNewProd({...newProd, brand: e.target.value})} required />
            <input placeholder="Image URL" className="input-field" value={newProd.image} onChange={e => setNewProd({...newProd, image: e.target.value})} required />
            <button type="submit" className="col-span-2 bg-black text-white py-3 rounded-lg font-bold">Save Product</button>
          </form>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-10 h-10 object-contain rounded bg-gray-50" />
                      <div>
                        <div className="text-sm font-bold text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">₹{p.price}</td>
                  <td className="px-6 py-3 text-xs font-bold text-gray-500">{p.category}</td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700 font-bold text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .input-field {
            width: 100%;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 0.75rem;
            font-size: 0.875rem;
            outline: none;
        }
        .input-field:focus {
            border-color: #0c831f;
            ring: 2px solid #0c831f;
        }
      `}</style>
    </div>
  );
};

export default Admin;
