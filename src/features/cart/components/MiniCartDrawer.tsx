'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, X, Sparkles, Trash2 } from 'lucide-react';
import { AppDrawer } from '@/components/ui/AppDrawer';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { EmptyState } from '@/components/ui/EmptyState';
import type { MiniCartDrawerProps, CartItem } from '@/features/cart/types/cart.types';

const FREESHIP_THRESHOLD = 499000;

export function MiniCartDrawer({ isOpen, onClose }: MiniCartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Hạt hữu cơ Orijen Original cho chó trưởng thành',
      variant: 'Túi 2kg · Vị thịt gà & cá',
      price: 389000,
      quantity: 1,
      image: '🥩',
    },
    {
      id: '2',
      name: 'Pate cao cấp Royal Canin Kitten Instinctive',
      variant: 'Hộp 85g · Vị cá ngừ',
      price: 194500,
      quantity: 2,
      image: '🐟',
    },
  ]);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const amountLeftForFreeship = Math.max(0, FREESHIP_THRESHOLD - subtotal);
  const freeshipProgress = Math.min(100, Math.round((subtotal / FREESHIP_THRESHOLD) * 100));

  const handleQuantityChange = (id: string, newQty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const FooterContent = (
    <div className="flex flex-col gap-3">
      {/* Subtotal */}
      <div className="flex items-center justify-between py-1">
        <span className="text-stone-600 font-semibold text-sm">Tạm tính:</span>
        <PriceDisplay price={subtotal} size="lg" className="text-amber-800" />
      </div>

      <p className="text-[11px] text-stone-500 text-center">
        Phí vận chuyển và voucher khuyến mãi sẽ được tính ở bước thanh toán.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <Link
          href="/checkout"
          onClick={onClose}
          className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-[var(--shadow-brand)] cursor-pointer"
        >
          <span>Thanh toán ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/cart"
          onClick={onClose}
          className="w-full h-11 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/80 rounded-full font-semibold text-sm flex items-center justify-center transition-colors cursor-pointer"
        >
          <span>Xem chi tiết giỏ hàng</span>
        </Link>
      </div>
    </div>
  );

  return (
    <AppDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span>Giỏ hàng</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold tabular-nums">
            {totalQuantity}
          </span>
        </div>
      }
      placement="right"
      width={420}
      footer={items.length > 0 ? FooterContent : null}
    >
      <div className="flex flex-col h-full">
        {/* Freeship Progress Bar */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-100/60">
          <div className="flex items-center justify-between text-xs mb-2 font-medium">
            {amountLeftForFreeship > 0 ? (
              <span className="text-stone-700">
                Mua thêm <strong className="text-amber-800 tabular-nums">{amountLeftForFreeship.toLocaleString('vi-VN')}₫</strong> để được <strong className="text-emerald-700">Freeship</strong>
              </span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Chúc mừng! Bạn đã đạt điều kiện Miễn phí vận chuyển
              </span>
            )}
            <span className="font-bold text-amber-700 tabular-nums">{freeshipProgress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-amber-200/50 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                freeshipProgress >= 100 ? 'bg-emerald-600' : 'bg-amber-600'
              }`}
              style={{ width: `${freeshipProgress}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="py-12">
              <EmptyState
                icon={ShoppingBag}
                title="Giỏ hàng đang đợi bé cưng của bạn 🐾"
                description="Bạn chưa chọn sản phẩm nào. Hãy khám phá thức ăn ngon và phụ kiện xinh cho bé ngay nhé!"
                actionLabel="Khám phá sản phẩm ngay"
                onAction={onClose}
              />
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 rounded-2xl bg-white border border-stone-200/70 hover:border-amber-200 transition-all shadow-xs"
              >
                {/* Image / Icon */}
                <div className="w-20 h-20 rounded-xl bg-stone-100 flex items-center justify-center text-3xl shrink-0 border border-stone-200/60">
                  {item.image}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0 justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-2 leading-tight">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 -mr-1 -mt-1 transition-colors cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.variant && (
                      <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                        {item.variant}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 mt-auto">
                    <PriceDisplay price={item.price} size="sm" className="text-amber-800" />
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(newQty) => handleQuantityChange(item.id, newQty)}
                      min={1}
                      max={99}
                      className="h-8 scale-90 origin-right"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppDrawer>
  );
}
