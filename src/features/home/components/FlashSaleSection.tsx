import React from 'react';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/features/product/components/ProductCard';
import { FlashSaleCountdown } from '@/features/home/components/FlashSaleCountdown';
import type { FlashSaleProductItem } from '@/features/home/types/home.types';

const FLASH_SALE_ITEMS: FlashSaleProductItem[] = [
  {
    id: 'fs-1',
    slug: 'hat-huu-co-orijen-original-cho-cho-2kg',
    name: 'Hạt hữu cơ Orijen Original cho Cún 2kg',
    brand: 'Orijen',
    price: 680000,
    originalPrice: 850000,
    thumbnail: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600',
    rating: 5,
    reviewCount: 142,
    badge: 'sale',
    soldCount: 78,
    totalStock: 100,
  },
  {
    id: 'fs-2',
    slug: 'pate-royal-canin-kitten-instinctive-85g',
    name: 'Pate Royal Canin Kitten Instinctive 85g',
    brand: 'Royal Canin',
    price: 32000,
    originalPrice: 42000,
    thumbnail: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 210,
    badge: 'sale',
    soldCount: 92,
    totalStock: 100,
  },
  {
    id: 'fs-3',
    slug: 'cat-ve-sinh-cature-dau-nanh-tu-nhien',
    name: 'Cát vệ sinh Cature đậu nành tự nhiên 6L',
    brand: 'Cature',
    price: 135000,
    originalPrice: 175000,
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewCount: 95,
    badge: 'sale',
    soldCount: 45,
    totalStock: 60,
  },
  {
    id: 'fs-4',
    slug: 'sua-tam-duong-long-y-te-duoxo-s3',
    name: 'Sữa tắm trị liệu & dưỡng lông Douxo S3 200ml',
    brand: 'Douxo S3',
    price: 390000,
    originalPrice: 480000,
    thumbnail: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=600',
    rating: 5,
    reviewCount: 68,
    badge: 'sale',
    soldCount: 28,
    totalStock: 40,
  },
];

export function FlashSaleSection() {
  return (
    <section className="py-14 bg-amber-50/40 border-y border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flash Sale Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>FLASH SALE</span>
            </div>
            <FlashSaleCountdown initialSeconds={8040} />
          </div>

          <Link
            href="/products?tag=flash-sale"
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900 group"
          >
            <span>Xem tất cả Deal Sốc</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards with Sold Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLASH_SALE_ITEMS.map((item) => {
            const soldPercent = Math.min(100, Math.round((item.soldCount / item.totalStock) * 100));
            return (
              <div key={item.id} className="flex flex-col">
                <ProductCard {...item} />
                
                {/* Progress bar: "Đã bán 72/100" màu amber */}
                <div className="mt-3 px-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600 mb-1">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                      <span>Đang bán chạy</span>
                    </span>
                    <span className="tabular-nums font-mono text-amber-800">
                      Đã bán {item.soldCount}/{item.totalStock}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-amber-200/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                      style={{ width: `${soldPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
