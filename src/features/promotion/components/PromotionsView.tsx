'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Flame, Clock, ArrowRight, Tag } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { ProductCard } from '@/features/product/components/ProductCard';
import { VoucherTicketCard } from '@/features/voucher';
import { MOCK_PRODUCTS } from '@/features/product/data/mockProducts';
import type { VoucherItem } from '@/features/voucher';

const ACTIVE_PROMO_VOUCHERS: VoucherItem[] = [
  {
    id: 'pv-1',
    code: 'PAW15',
    title: 'Giảm 15% Đơn Hàng Đầu Tiên',
    description: 'Áp dụng cho mọi khách hàng mới, giảm tối đa 150.000₫ cho thức ăn hữu cơ.',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 300000,
    maxDiscount: 150000,
    expiresAt: '31/12/2026',
    status: 'available',
  },
  {
    id: 'pv-2',
    code: 'FREESHIP50',
    title: 'Miễn Phí Vận Chuyển Hỏa Tốc',
    description: 'Tài trợ 100% phí giao hàng 2 Giờ nội thành cho đơn hàng từ 500.000₫.',
    discountType: 'shipping',
    discountValue: 60000,
    minOrderValue: 500000,
    expiresAt: '15/11/2026',
    status: 'available',
  },
];

export function PromotionsView() {
  // Flash sale countdown timer: 2 hours 14 mins 09 secs
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 9 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // Filter discounted products
  const discountedProducts = MOCK_PRODUCTS.filter(
    (p) => p.originalPrice && p.originalPrice > p.price
  );

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <Bezel className="bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white p-8 sm:p-12">
        <div className="max-w-2xl space-y-4">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
            Lễ Hội Dinh Dưỡng Thú Cưng 2026
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ưu Đãi Đặc Quyền Tới 35% Cho Bé Cưng
          </h1>

          <p className="text-sm text-stone-300 leading-relaxed">
            Săn deal hạt nhập khẩu Orijen, pate cá hồi tươi Royal Canin và cát vệ sinh hữu cơ Cature cùng hàng ngàn voucher freeship có hạn.
          </p>

          {/* Flash sale timer */}
          <div className="pt-2 flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-400 flex items-center gap-1">
              <Clock className="w-4 h-4 text-amber-400" />
              Kết thúc sau:
            </span>
            <div className="flex items-center gap-1.5 font-mono tabular-nums text-sm font-bold text-amber-400">
              <span className="bg-white/10 px-2 py-1 rounded-md">{formatNumber(timeLeft.hours)}</span>:
              <span className="bg-white/10 px-2 py-1 rounded-md">{formatNumber(timeLeft.minutes)}</span>:
              <span className="bg-white/10 px-2 py-1 rounded-md">{formatNumber(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>
      </Bezel>

      {/* Hot Vouchers Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-600" />
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              Mã Giảm Giá Đang Mở
            </h2>
          </div>
          <Link
            href="/account/vouchers"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
          >
            Kho voucher của bạn
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACTIVE_PROMO_VOUCHERS.map((v) => (
            <VoucherTicketCard key={v.id} voucher={v} />
          ))}
        </div>
      </div>

      {/* Sale Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              Sản Phẩm Đang Giảm Giá ({discountedProducts.length})
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            Cập nhật realtime
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {discountedProducts.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
