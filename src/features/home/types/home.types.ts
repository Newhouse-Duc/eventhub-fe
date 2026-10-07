import type React from 'react';
import type { ProductCardProps } from '@/features/product/types/product.types';

export interface SpeciesCategory {
  id: string;
  name: string;
  emoji: string;
  count: string;
  href: string;
  badge?: string;
  bgGradient: string;
}

export interface FlashSaleProductItem extends ProductCardProps {
  soldCount: number;
  totalStock: number;
}

export interface FlashSaleCountdownProps {
  initialSeconds?: number;
}

export interface BentoBannerItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  ctaText: string;
  href: string;
  image: string;
  isLarge?: boolean;
}

export interface CommitmentItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface BrandPartnerItem {
  id: string;
  name: string;
  country: string;
  badge: string;
  description: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  href: string;
}

export type ProductTabKey = 'bestseller' | 'new' | 'recommended';
