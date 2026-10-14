import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 'pin-custom',
    name: 'Custom Button Pin',
    category: 'pins',
    shapes: ['round', 'square', 'heart'],
    sizes: ['25mm', '32mm', '44mm', '58mm'],
    finishes: ['glossy', 'matte', 'holographic'],
    startingPrice: 5000,
    imageUrl: 'https://placehold.co/400x400/FFF6EC/4A2C2A?text=Custom+Pin',
    isBestSeller: true,
    pricingTiers: [
      { minQty: 1, maxQty: 9, pricePerUnit: 5000 },
      { minQty: 10, maxQty: 49, pricePerUnit: 4500 },
      { minQty: 50, maxQty: null, pricePerUnit: 4000 },
    ],
  },
  {
    id: 'sticker-diecut',
    name: 'Die-Cut Stickers',
    category: 'stickers',
    shapes: ['die-cut'],
    sizes: ['custom'],
    finishes: ['glossy', 'matte', 'holographic'],
    startingPrice: 3000,
    imageUrl: 'https://placehold.co/400x400/FFF6EC/4A2C2A?text=Die-Cut+Sticker',
    isBestSeller: true,
    pricingTiers: [
      { minQty: 1, maxQty: 49, pricePerUnit: 3000 },
      { minQty: 50, maxQty: null, pricePerUnit: 2500 },
    ],
  },
  {
    id: 'sticker-sheet',
    name: 'A5 Sticker Sheet',
    category: 'stickers',
    shapes: ['sheet'],
    sizes: ['A5'],
    finishes: ['glossy', 'matte'],
    startingPrice: 15000,
    imageUrl: 'https://placehold.co/400x400/FFF6EC/4A2C2A?text=Sticker+Sheet',
    isNew: true,
    pricingTiers: [
      { minQty: 1, maxQty: 9, pricePerUnit: 15000 },
      { minQty: 10, maxQty: null, pricePerUnit: 12000 },
    ],
  }
];
