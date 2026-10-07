'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles, HeartHandshake } from 'lucide-react';
import { ProductCard } from '@/features/product/components/ProductCard';
import type { ProductCardProps } from '@/features/product/types/product.types';
import type { ProductTabKey } from '@/features/home/types/home.types';

const PRODUCTS_DATA: Record<ProductTabKey, ProductCardProps[]> = {
  bestseller: [
    {
      id: 'p-1',
      slug: 'hat-cho-orijen-original-adult',
      name: 'Hạt dinh dưỡng Orijen Original Cho Cún Lớn',
      brand: 'Orijen',
      price: 850000,
      originalPrice: 990000,
      thumbnail: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600',
      rating: 5,
      reviewCount: 328,
      badge: 'bestseller',
    },
    {
      id: 'p-2',
      slug: 'pate-royal-canin-hairball-care-meo',
      name: 'Pate Royal Canin Hairball Care Ngừa Búi Lông',
      brand: 'Royal Canin',
      price: 36000,
      originalPrice: 42000,
      thumbnail: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      reviewCount: 214,
      badge: 'bestseller',
    },
    {
      id: 'p-3',
      slug: 'men-vi-sinh-tieu-hoa-vet-curi-cho-meo',
      name: 'Men vi sinh hữu cơ hỗ trợ đường ruột VetCuri',
      brand: 'VetCuri',
      price: 245000,
      originalPrice: 290000,
      thumbnail: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=600',
      rating: 5,
      reviewCount: 184,
      badge: 'bestseller',
    },
    {
      id: 'p-4',
      slug: 'dem-nam-cong-thai-hoc-pet-luxury-comfort',
      name: 'Đệm nằm công thái học nâng đỡ cột sống Pet Luxury',
      brand: 'Pet Luxury',
      price: 1250000,
      originalPrice: 1490000,
      thumbnail: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=600',
      rating: 5,
      reviewCount: 76,
      badge: 'bestseller',
    },
  ],
  new: [
    {
      id: 'p-5',
      slug: 'hat-say-thang-hoa-freeze-dried-acana-beef',
      name: 'Thịt sấy thăng hoa Freeze-Dried Bò Wagyu Acana',
      brand: 'Acana',
      price: 495000,
      thumbnail: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600',
      rating: 5,
      reviewCount: 18,
      badge: 'new',
    },
    {
      id: 'p-6',
      slug: 'pate-cho-con-taste-of-the-wild-pacific-stream',
      name: 'Pate Vị Cá Hồi Khói Taste of the Wild',
      brand: 'Taste of the Wild',
      price: 68000,
      thumbnail: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600',
      rating: 4.8,
      reviewCount: 12,
      badge: 'new',
    },
    {
      id: 'p-7',
      slug: 'binh-nuoc-uong-tu-dong-khu-khuan-uv-xiaomi',
      name: 'Đài phun nước lọc tuần hoàn khử khuẩn UV Ultra',
      brand: 'Petkit',
      price: 780000,
      originalPrice: 890000,
      thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      reviewCount: 35,
      badge: 'new',
    },
    {
      id: 'p-8',
      slug: 'vong-co-da-thu-cong-y-kem-the-ten-ma-vang',
      name: 'Vòng cổ da Ý dập tên thủ công mạ vàng 18K',
      brand: 'Pet Luxury Atelier',
      price: 650000,
      thumbnail: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=600',
      rating: 5,
      reviewCount: 22,
      badge: 'new',
    },
  ],
  recommended: [
    {
      id: 'p-9',
      slug: 'dau-ca-hoi-hoang-da-alaska-wild-salmon-oil',
      name: 'Dầu cá hồi hoang dã Alaska bổ sung Omega 3 & 6',
      brand: 'Grizzly Salmon Oil',
      price: 520000,
      thumbnail: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600',
      rating: 5,
      reviewCount: 145,
    },
    {
      id: 'p-10',
      slug: 'xit-khu-mui-sinh-hoc-nano-bac-chuyen-dung',
      name: 'Xịt khử mùi sinh học ion bạc an toàn tuyệt đối',
      brand: 'Bioline Eco',
      price: 185000,
      thumbnail: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      reviewCount: 92,
    },
    {
      id: 'p-11',
      slug: 'ban-cao-mong-go-soi-kem-giuong-ngu-cho-meo',
      name: 'Cây cào móng gỗ sồi Bắc Âu kèm tổ ngủ bọc nhung',
      brand: 'Pet Luxury Studio',
      price: 1650000,
      originalPrice: 1950000,
      thumbnail: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=600',
      rating: 5,
      reviewCount: 48,
    },
    {
      id: 'p-12',
      slug: 'snack-thuong-thit-ga-say-gion-huu-co-100g',
      name: 'Snack thưởng ức gà sấy giòn nguyên chất 100g',
      brand: 'Pet Raw Kitchen',
      price: 95000,
      thumbnail: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=600',
      rating: 5,
      reviewCount: 260,
    },
  ],
};

export function FeaturedProductsTabs() {
  const [activeTab, setActiveTab] = useState<ProductTabKey>('bestseller');

  const tabs: { key: ProductTabKey; label: string; icon: React.ElementType }[] = [
    { key: 'bestseller', label: 'Bán chạy nhất', icon: Flame },
    { key: 'new', label: 'Mới cập bến', icon: Sparkles },
    { key: 'recommended', label: 'Dành cho bạn', icon: HeartHandshake },
  ];

  const currentProducts = PRODUCTS_DATA[activeTab];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Tabs Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
            Tuyển chọn chất lượng
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
            Sản phẩm nổi bật
          </h2>
        </div>

        {/* Tab Buttons Pill */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-stone-100/90 border border-stone-200/80 self-start md:self-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-sm font-bold scale-[1.02]'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 h-12 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <span>Khám phá toàn bộ 1.200+ sản phẩm</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
