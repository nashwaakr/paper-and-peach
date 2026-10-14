import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function FilterBar() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--color-paper)] p-4 rounded-[24px] border-[1.5px] border-[var(--color-border-warm)] mb-8">
      <div className="flex-1 w-full max-w-md relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-cocoa-70)]" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-12 pr-4 py-3 bg-[var(--color-cream)] text-[var(--color-cocoa)] border-[1.5px] border-transparent rounded-[16px] focus:outline-none focus:border-[var(--color-peach-deep)] focus:ring-1 focus:ring-[var(--color-peach-deep)] transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <Button variant="secondary" className="whitespace-nowrap flex gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
        
        <div className="flex bg-[var(--color-cream)] p-1 rounded-full border-[1.5px] border-[var(--color-border-warm)]">
          <button className="px-6 py-2 rounded-full text-sm font-semibold bg-[var(--color-peach-soft)] text-[var(--color-cocoa)] transition-colors">
            All
          </button>
          <button className="px-6 py-2 rounded-full text-sm font-semibold text-[var(--color-cocoa-70)] hover:text-[var(--color-cocoa)] hover:bg-[var(--color-paper)] transition-colors">
            Pins
          </button>
          <button className="px-6 py-2 rounded-full text-sm font-semibold text-[var(--color-cocoa-70)] hover:text-[var(--color-cocoa)] hover:bg-[var(--color-paper)] transition-colors">
            Stickers
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-[var(--color-cocoa-70)] ml-2 whitespace-nowrap">
          <span>Sort by:</span>
          <select className="bg-transparent font-semibold text-[var(--color-cocoa)] focus:outline-none cursor-pointer">
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
