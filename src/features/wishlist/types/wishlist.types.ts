import type { ProductCardProps } from '@/features/product/types/product.types';

export interface WishlistItem extends ProductCardProps {
  addedAt: string;
}
