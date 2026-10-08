'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { App } from 'antd';
import { ProductCard } from '@/features/product/components/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { MOCK_PRODUCTS } from '@/features/product/data/mockProducts';
import type { WishlistItem } from '../types/wishlist.types';

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    ...MOCK_PRODUCTS[0],
    addedAt: '2026-10-06T10:00:00Z',
  },
  {
    ...MOCK_PRODUCTS[1],
    addedAt: '2026-10-05T15:30:00Z',
  },
  {
    ...MOCK_PRODUCTS[2],
    addedAt: '2026-10-04T08:20:00Z',
  },
];

export function WishlistView() {
  const { message } = App.useApp();
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST);
  const [isAddingAll, setIsAddingAll] = useState(false);

  const handleClearAll = () => {
    setItems([]);
    message.info('Đã làm trống danh sách yêu thích.');
  };

  const handleAddAllToCart = () => {
    if (items.length === 0) return;
    setIsAddingAll(true);
    setTimeout(() => {
      setIsAddingAll(false);
      message.success(`Đã thêm ${items.length} sản phẩm yêu thích vào giỏ hàng!`);
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="py-16">
        <EmptyState
          title="Danh sách yêu thích đang trống 🐾"
          description="Hãy lưu lại các món thức ăn, đồ chơi dinh dưỡng yêu thích của bé cưng để mua sắm thuận tiện hơn."
          actionText="Khám phá sản phẩm ngay"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Danh sách Yêu thích
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
            Bạn đang lưu giữ <span className="font-semibold text-stone-900 tabular-nums">{items.length}</span> sản phẩm được tuyển chọn cho bé cưng.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleClearAll}
            className="h-10 px-4 rounded-full border border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-rose-50/50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Xóa tất cả
          </button>

          <button
            type="button"
            onClick={handleAddAllToCart}
            disabled={isAddingAll}
            className="h-10 px-5 rounded-full bg-amber-600 text-white hover:bg-amber-700 text-xs font-semibold inline-flex items-center gap-2 shadow-xs active:scale-[0.98] transition-all disabled:opacity-60"
          >
            <ShoppingBag className="w-4 h-4" />
            {isAddingAll ? 'Đang thêm...' : 'Thêm tất cả vào giỏ'}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>

      {/* Bottom Hint */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-between gap-4">
        <p className="text-xs text-stone-600">
          💡 Danh sách yêu thích được đồng bộ tự động khi bạn đăng nhập tài khoản Pet Luxury.
        </p>
        <Link
          href="/products"
          className="text-xs font-semibold text-amber-700 hover:text-amber-800 shrink-0 inline-flex items-center gap-1"
        >
          Tiếp tục xem hàng
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
