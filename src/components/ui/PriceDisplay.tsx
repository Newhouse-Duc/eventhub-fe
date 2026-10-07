import React from 'react';
import { cn } from '@/lib/utils'; // Assuming cn exists or can use template literals

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
};

import type { PriceDisplayProps } from '@/components/ui/types/ui.types';

export function PriceDisplay({
  price,
  originalPrice,
  minPrice,
  maxPrice,
  isContact,
  className = '',
  size = 'md',
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg md:text-xl',
    xl: 'text-2xl md:text-3xl font-extrabold',
  };

  if (isContact || (price === undefined && minPrice === undefined)) {
    return (
      <span className={`font-semibold text-stone-900 ${sizeClasses[size]} ${className}`}>
        Liên hệ
      </span>
    );
  }

  // Hiển thị khoảng giá (biến thể)
  if (minPrice !== undefined && maxPrice !== undefined && minPrice !== maxPrice) {
    return (
      <div className={`font-mono tabular-nums font-semibold text-stone-900 ${sizeClasses[size]} ${className}`}>
        {formatCurrency(minPrice)} – {formatCurrency(maxPrice)}
      </div>
    );
  }

  const currentPrice = price ?? minPrice ?? 0;
  
  // Hiển thị giá giảm
  if (originalPrice && originalPrice > currentPrice) {
    const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    return (
      <div className={`flex items-center gap-2 flex-wrap ${className}`}>
        <span className={`font-mono tabular-nums font-bold text-amber-700 ${sizeClasses[size]}`}>
          {formatCurrency(currentPrice)}
        </span>
        <span className="font-mono tabular-nums line-through text-stone-400 text-sm">
          {formatCurrency(originalPrice)}
        </span>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 uppercase tracking-wider">
          -{discountPercent}%
        </span>
      </div>
    );
  }

  // Hiển thị giá thường
  return (
    <div className={`font-mono tabular-nums font-semibold text-stone-900 ${sizeClasses[size]} ${className}`}>
      {formatCurrency(currentPrice)}
    </div>
  );
}
