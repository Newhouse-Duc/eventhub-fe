'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { ProductCard } from '@/features/product/components/ProductCard';
import { MOCK_PRODUCTS } from '@/features/product/data/mockProducts';
import type { BrandItem } from '../types/brand.types';

interface BrandDetailViewProps {
  brand: BrandItem;
}

export function BrandDetailView({ brand }: BrandDetailViewProps) {
  // Filter mock products that match brand name or fallback
  const brandProducts = MOCK_PRODUCTS.filter(
    (p) => p.brand.toLowerCase() === brand.name.toLowerCase()
  );
  const displayProducts = brandProducts.length > 0 ? brandProducts : MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/brands"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Tất cả thương hiệu
        </Link>
      </div>

      {/* Brand Hero Banner */}
      <Bezel className="overflow-hidden">
        <div className="relative h-48 sm:h-64 w-full bg-stone-900">
          <Image
            src={brand.banner}
            alt={brand.name}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Floating Logo & Info */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl bg-white border-2 border-white shadow-lg overflow-hidden shrink-0">
                <Image src={brand.logo} alt={brand.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="text-white">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{brand.name}</h1>
                  <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Chính hãng
                  </span>
                </div>
                <p className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                  <span>Xuất xứ: {brand.country}</span> • <span>{brand.productCount} sản phẩm phân phối</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Story Prose */}
        <div className="p-6 sm:p-8 bg-white border-t border-stone-100">
          <h2 className="text-xs uppercase font-bold tracking-widest text-amber-700 mb-2">
            Câu chuyện thương hiệu
          </h2>
          <p className="text-sm text-stone-700 leading-relaxed max-w-3xl">
            {brand.story}
          </p>
        </div>
      </Bezel>

      {/* Brand Products Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900">
            Sản phẩm từ {brand.name} ({displayProducts.length})
          </h2>
          <span className="text-xs text-stone-500 font-mono">
            Cam kết 100% nguyên seal nhập khẩu
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
