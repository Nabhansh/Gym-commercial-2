
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order } from './types';
import { INITIAL_PRODUCTS } from './constants';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  login: (email: string) => void;
  logout: () => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (product: Product) => void;
  placeOrder: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load state from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('fitkart_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedUser = localStorage.getItem('fitkart_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedOrders = localStorage.getItem('fitkart_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('fitkart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fitkart_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const login = (email: string) => {
    const newUser = { id: 'u1', name: 'User', email, isAdmin: email.includes('admin') };
    setUser(newUser);
    localStorage.setItem('fitkart_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitkart_user');
  };

  const addProduct = (p: Product) => setProducts(prev => [p, ...prev]);
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const updateProduct = (p: Product) => setProducts(prev => prev.map(old => old.id === p.id ? p : old));

  const placeOrder = () => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      totalAmount: cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0),
      date: new Date().toLocaleDateString(),
      status: 'Delivered'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  return (
    <AppContext.Provider value={{ 
      products, cart, user, orders, 
      addToCart, removeFromCart, updateQuantity, clearCart, 
      login, logout, addProduct, deleteProduct, updateProduct, placeOrder 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
