'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  
  const subtotal = getSubtotal();
  const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { 
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 
  }).format(price);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-24 h-24 bg-[var(--color-paper)] rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-[var(--color-peach-deep)]" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-[var(--color-cocoa)] mb-4">
          Keranjangmu masih kosong 🍑
        </h1>
        <p className="text-[var(--color-cocoa-70)] mb-8">
          It looks like you haven't added any designs to your cart yet.
        </p>
        <Link href="/shop">
          <Button variant="primary">Start Designing</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-heading font-bold text-[var(--color-cocoa)] mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row bg-[var(--color-paper)] p-6 rounded-[24px] border-[1.5px] border-[var(--color-border-warm)] gap-6">
              <div className="w-32 h-32 bg-[var(--color-cream)] rounded-[16px] flex-shrink-0 flex items-center justify-center border-[1.5px] border-[var(--color-border-warm)] p-2">
                <img src={item.designImageUrl} alt={item.productName} className="max-w-full max-h-full object-contain" />
              </div>
              
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-heading font-bold text-lg text-[var(--color-cocoa)]">{item.productName}</h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[var(--color-cocoa-70)] hover:text-[var(--color-berry)] transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-[var(--color-cocoa-70)] capitalize mb-4">
                    {item.size} • {item.shape} • {item.finish}
                  </p>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3 bg-[var(--color-cream)] rounded-full p-1 border-[1.5px] border-[var(--color-border-warm)]">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-cocoa)] hover:bg-[var(--color-paper)] transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-sm w-4 text-center text-[var(--color-cocoa)]">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-cocoa)] hover:bg-[var(--color-paper)] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-lg text-[var(--color-peach-deep)]">
                      {formatPrice(item.pricePerUnit * item.quantity)}
                    </p>
                    <p className="text-xs text-[var(--color-cocoa-70)]">
                      {formatPrice(item.pricePerUnit)} / ea
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-[var(--color-paper)] p-6 rounded-[24px] border-[1.5px] border-[var(--color-border-warm)] sticky top-6">
            <h2 className="font-heading font-bold text-xl text-[var(--color-cocoa)] mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between text-[var(--color-cocoa-70)]">
                <span>Subtotal ({items.length} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--color-cocoa-70)]">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t-[1.5px] border-[var(--color-border-warm)] pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-heading font-bold text-lg text-[var(--color-cocoa)]">Total</span>
                <span className="font-heading font-bold text-2xl text-[var(--color-peach-deep)]">{formatPrice(subtotal)}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="w-full block">
              <Button variant="primary" className="w-full py-4 text-lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
