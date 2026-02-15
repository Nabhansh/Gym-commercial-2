
import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { useApp } from '../store';
import ProductCard from '../components/ProductCard';
import { ChevronRight } from '../components/Icons';

const Home: React.FC = () => {
  const { products } = useApp();
  
  // Group products
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 5);
  const proteinProducts = products.filter(p => p.category === 'Protein').slice(0, 5);
  const equipmentProducts = products.filter(p => p.category === 'Equipment').slice(0, 5);

  return (
    <div className="pb-32 bg-gray-50/50 min-h-screen">
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 mb-8">
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-[2/1] md:aspect-[3/1]">
           <img 
             src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" 
             alt="Banner" 
             className="w-full h-full object-cover opacity-60" 
           />
           <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
             <span className="text-[#FFD700] font-bold tracking-wider text-xs md:text-sm uppercase mb-2">Summer Sale Live</span>
             <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">Get 40% OFF <br/> on Whey Protein</h2>
             <Link to="/category/Protein" className="bg-white text-black w-fit px-6 py-2 md:px-8 md:py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
               Shop Now
             </Link>
           </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Shop by Category</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
          {CATEGORIES.map(cat => (
            <Link key={cat.name} to={`/category/${cat.name}`} className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-all border border-gray-100">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <Section title="Featured Products" link="/category/Protein" products={featuredProducts} />

      {/* Banner 2 */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
         <div className="bg-[#E8F8EE] rounded-xl p-6 md:p-10 flex items-center justify-between border border-[#0c831f]/10">
            <div className="flex-1">
               <h3 className="text-2xl font-bold text-[#0c831f] mb-2">Essential Vitamins</h3>
               <p className="text-gray-600 text-sm mb-6 max-w-md">Boost your immunity and performance with our daily essential multivitamins.</p>
               <Link to="/category/Vitamins" className="bg-[#0c831f] text-white px-6 py-2 rounded-lg text-sm font-bold">Explore</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300" className="w-32 md:w-48 object-contain mix-blend-multiply" />
         </div>
      </div>

      {/* Protein Section */}
      <Section title="Best Selling Proteins" link="/category/Protein" products={proteinProducts} />

      {/* Equipment Section */}
      <Section title="Home Gym Setup" link="/category/Equipment" products={equipmentProducts} />

    </div>
  );
};

const Section: React.FC<{ title: string; link: string; products: any[] }> = ({ title, link, products }) => (
  <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-xl text-gray-900">{title}</h3>
      <Link to={link} className="text-[#0c831f] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
        See all <ChevronRight />
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
      {products.map(product => (
        <div key={product.id} className="h-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </div>
);

export default Home;
