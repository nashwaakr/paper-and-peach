import { create } from 'zustand';
import { Product, ProductShape, ProductFinish } from '@/types/product';

export interface CartItem {
  id: string; // Unique ID for this cart entry
  productId: string;
  productName: string;
  category: string;
  shape: ProductShape;
  size: string;
  finish: ProductFinish;
  quantity: number;
  pricePerUnit: number;
  designImageUrl: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    // Basic logic for cart - doesn't group identical designs yet for simplicity
    return { items: [...state.items, item] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  clearCart: () => set({ items: [] }),
  getSubtotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.pricePerUnit * item.quantity), 0);
  },
}));
