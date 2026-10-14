import React from 'react';
import { FilterBar } from '@/components/shop/FilterBar';
import { ProductCard } from '@/components/shop/ProductCard';
import { mockProducts } from '@/lib/data';

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-cocoa)] mb-4">
          Shop Our Products
        </h1>
        <p className="text-lg text-[var(--color-cocoa-70)] max-w-2xl mx-auto">
          Choose a product below to start customizing. We offer high-quality custom pins and stickers perfect for your brand, art, or personal collection.
        </p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
