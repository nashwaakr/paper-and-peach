import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.startingPrice);

  return (
    <div className="group flex flex-col bg-[var(--color-paper)] rounded-[24px] border-[1.5px] border-[var(--color-border-warm)] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full bg-[var(--color-cream)] p-4 flex items-center justify-center">
        {/* Mock image for now */}
        <div className="relative w-full h-full">
          {/* Using img tag to skip Next.js Image config requirement for external urls during mockup */}
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.isBestSeller && <Badge variant="best-seller">Best Seller</Badge>}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-heading font-semibold text-lg text-[var(--color-cocoa)]">
            {product.name}
          </h3>
          <span className="font-semibold text-[var(--color-peach-deep)] whitespace-nowrap">
            From {formattedPrice}
          </span>
        </div>
        
        <p className="text-sm text-[var(--color-cocoa-70)] mb-6 flex-grow">
          Sizes: {product.sizes.join(', ')}
        </p>
        
        <Link href={`/studio?product=${product.id}`} className="w-full mt-auto">
          <Button variant="primary" className="w-full">
            Customize
          </Button>
        </Link>
      </div>
    </div>
  );
}
