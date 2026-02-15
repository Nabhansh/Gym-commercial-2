
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../store';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { motion } from 'framer-motion';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { products } = useApp();
  const [sortBy, setSortBy] = useState('popular');
  const [filterBrand, setFilterBrand] = useState<string | null>(null);

  let filteredProducts = products.filter(p => p.category === categoryName);
  
  if (filterBrand) {
    filteredProducts = filteredProducts.filter(p => p.brand === filterBrand);
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.rating - a.rating;
  });

  const uniqueBrands = Array.from(new Set(products.filter(p => p.category === categoryName).map(p => p.brand)));

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32">
      {/* Category Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-[135px] md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
           
           {/* Breadcrumb & Title */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
             <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <Link to="/">Home</Link> / <span>{categoryName}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">{categoryName} <span className="text-gray-400 font-medium text-lg">({filteredProducts.length})</span></h1>
             </div>
             
             {/* Sort Dropdown */}
             <select 
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
               className="bg-gray-100 border-none rounded-lg py-2 px-3 text-xs font-bold outline-none cursor-pointer"
             >
               <option value="popular">Popularity</option>
               <option value="price-low">Price: Low to High</option>
               <option value="price-high">Price: High to Low</option>
             </select>
           </div>

           {/* Quick Filters */}
           <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
             <button 
                onClick={() => setFilterBrand(null)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold border ${!filterBrand ? 'bg-[#0c831f] text-white border-[#0c831f]' : 'bg-white text-gray-600 border-gray-200'}`}
             >
               All
             </button>
             {uniqueBrands.map(brand => (
               <button 
                 key={brand}
                 onClick={() => setFilterBrand(brand === filterBrand ? null : brand)}
                 className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold border ${filterBrand === brand ? 'bg-[#0c831f] text-white border-[#0c831f]' : 'bg-white text-gray-600 border-gray-200'}`}
               >
                 {brand}
               </button>
             ))}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-gray-800">No products found</h3>
              <p className="text-sm text-gray-500">Try clearing your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
