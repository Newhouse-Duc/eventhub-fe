'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import type { ProductCardProps } from '@/features/product/types/product.types';

export function ProductCard({
  id,
  slug,
  name,
  brand,
  price,
  originalPrice,
  thumbnail,
  hoverImage,
  rating = 5,
  reviewCount = 0,
  isOutOfStock = false,
  hasVariants = false,
  badge,
}: ProductCardProps) {
  const [isWished, setIsWished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (hasVariants) {
      // Mở Quick View modal (tương lai)
      return;
    }
    
    setIsAdding(true);
    // Giả lập API call
    setTimeout(() => {
      setIsAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }, 600);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWished(!isWished);
  };

  return (
    <Link href={`/products/${slug}`} className="block group">
      <Bezel className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lift)] relative h-full flex flex-col">
        {/* Vùng Ảnh */}
        <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden rounded-t-[22px] rounded-b-md">
          <Image
            src={thumbnail}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
              isOutOfStock ? 'grayscale opacity-60' : ''
            }`}
          />
          {hoverImage && !isOutOfStock && (
            <Image
              src={hoverImage}
              alt={name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          )}

          {/* Badges */}
          {badge === 'sale' && originalPrice && originalPrice > price && (
            <div className="absolute top-3 left-3 rounded-full bg-rose-600 text-white text-[11px] font-semibold px-2.5 py-1 z-10 shadow-sm">
              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </div>
          )}
          {badge === 'new' && (
            <div className="absolute top-3 left-3 rounded-full bg-emerald-600 text-white text-[11px] font-semibold px-2.5 py-1 z-10 shadow-sm">
              Mới
            </div>
          )}
          {badge === 'bestseller' && (
            <div className="absolute top-3 left-3 rounded-full bg-amber-600 text-white text-[11px] font-semibold px-2.5 py-1 z-10 shadow-sm">
              Bán chạy
            </div>
          )}

          {/* Nút Wishlist */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur ring-1 ring-black/5 flex items-center justify-center z-10 hover:bg-white hover:scale-110 transition-all duration-300 active:scale-95"
            aria-label={isWished ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWished ? 'fill-rose-500 text-rose-500' : 'text-stone-600'
              }`}
            />
          </button>

          {/* Overlay Hết hàng */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-stone-900/10 flex items-center justify-center z-10">
              <span className="px-4 py-2 bg-stone-950/80 backdrop-blur-md text-white text-sm font-semibold rounded-full shadow-lg">
                Hết hàng
              </span>
            </div>
          )}
        </div>

        {/* Nội dung Card */}
        <div className="p-4 flex flex-col flex-1">
          <div className="text-[11px] uppercase tracking-[0.15em] text-stone-500 font-semibold mb-1.5">
            {brand}
          </div>
          <h3 className="text-sm font-medium text-stone-900 leading-snug line-clamp-2 mb-2 group-hover:text-amber-700 transition-colors">
            {name}
          </h3>
          
          {/* Đánh giá */}
          <div className="flex items-center gap-1.5 mb-3 mt-auto">
            <div className="flex items-center text-amber-500 text-[10px]">
              {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
            </div>
            {reviewCount > 0 && (
              <span className="text-[10px] text-stone-500 font-medium">{rating.toFixed(1)} ({reviewCount})</span>
            )}
          </div>

          <PriceDisplay 
            price={price} 
            originalPrice={originalPrice} 
            size="md" 
            className="mb-4"
          />

          {/* Nút Thêm vào giỏ */}
          <button
            type="button"
            disabled={isOutOfStock && !isAdding && !added}
            onClick={handleAddToCart}
            className={`w-full h-10 rounded-full font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] ${
              isOutOfStock
                ? 'border border-stone-300 text-stone-600 hover:bg-stone-50'
                : added
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 text-white hover:bg-amber-600 shadow-[var(--shadow-brand)] hover:shadow-lg'
            }`}
          >
            {isOutOfStock ? (
              'Báo khi có hàng'
            ) : added ? (
              <>
                <Check className="w-4 h-4 animate-in zoom-in duration-300" />
                <span>Đã thêm</span>
              </>
            ) : isAdding ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{hasVariants ? 'Chọn tùy chọn' : 'Thêm vào giỏ'}</span>
              </>
            )}
          </button>
        </div>
      </Bezel>
    </Link>
  );
}
