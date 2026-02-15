
export type CategoryType = 'Protein' | 'Pre-Workout' | 'Vitamins' | 'Equipment' | 'Accessories' | 'Clothing';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  brand: string;
  inStock: boolean;
  weight?: string;
  nutritionFacts?: Record<string, string>;
  isFeatured?: boolean;
  deliveryTime?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: 'Pending' | 'Delivered' | 'Cancelled';
}