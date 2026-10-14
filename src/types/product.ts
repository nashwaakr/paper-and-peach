export type ProductCategory = 'pins' | 'stickers';
export type ProductShape = 'round' | 'square' | 'heart' | 'die-cut' | 'kiss-cut' | 'sheet';
export type ProductFinish = 'glossy' | 'matte' | 'holographic' | 'standard';

export interface ProductPricing {
  minQty: number;
  maxQty: number | null;
  pricePerUnit: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  shapes: ProductShape[];
  sizes: string[]; // e.g., '25mm', '32mm', '44mm', '58mm', 'custom'
  finishes: ProductFinish[];
  pricingTiers: ProductPricing[];
  startingPrice: number;
  imageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}
