'use client';

import React, { useState } from 'react';
import { Ticket, Sparkles, Award, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { VoucherTicketCard } from './VoucherTicketCard';
import type { VoucherItem, VoucherStatus, LoyaltyPointHistory } from '../types/voucher.types';

const MOCK_VOUCHERS: VoucherItem[] = [
  {
    id: 'v1',
    code: 'PAW15',
    title: 'Giảm 15% Đơn Hàng Đầu Tiên',
    description: 'Áp dụng cho khách hàng mới gia nhập Pawfect Club, giảm tối đa 150.000₫.',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 300000,
    maxDiscount: 150000,
    expiresAt: '31/12/2026',
    status: 'available',
  },
  {
    id: 'v2',
    code: 'FREESHIP50',
    title: 'Miễn Phí Vận Chuyển Hỏa Tốc',
    description: 'Tài trợ 100% phí giao hàng 2 Giờ nội thành cho đơn dinh dưỡng thú cưng.',
    discountType: 'shipping',
    discountValue: 60000,
    minOrderValue: 500000,
    expiresAt: '15/11/2026',
    status: 'available',
  },
  {
    id: 'v3',
    code: 'ORIJEN50K',
    title: 'Giảm 50.000₫ Thương Hiệu Orijen',
    description: 'Áp dụng trực tiếp cho tất cả các mã hạt cao cấp Orijen từ 2kg trở lên.',
    discountType: 'fixed',
    discountValue: 50000,
    minOrderValue: 800000,
    expiresAt: '20/10/2026',
    status: 'available',
  },
  {
    id: 'v4',
    code: 'AUTUMN10',
    title: 'Ưu Đãi Mùa Thu Vàng 10%',
    description: 'Đã sử dụng cho đơn hàng #PET-240810-0042.',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 200000,
    expiresAt: '01/10/2026',
    status: 'used',
  },
  {
    id: 'v5',
    code: 'SUMMER20',
    title: 'Đại Tiệc Mùa Hè 20%',
    description: 'Hết hạn sử dụng vào ngày 31/08/2026.',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 600000,
    expiresAt: '31/08/2026',
    status: 'expired',
  },
];

const MOCK_POINT_HISTORY: LoyaltyPointHistory[] = [
  { id: 'p1', date: '08/10/2026', description: 'Tích điểm đơn hàng #PET-240810-0042', points: 65, type: 'earn' },
  { id: 'p2', date: '01/10/2026', description: 'Đổi voucher PAW15 giảm giá', points: -100, type: 'redeem' },
  { id: 'p3', date: '15/09/2026', description: 'Thưởng sinh nhật bé cưng Bông', points: 150, type: 'bonus' },
];

export function AccountVouchersView() {
  const [activeTab, setActiveTab] = useState<VoucherStatus>('available');

  const filteredVouchers = MOCK_VOUCHERS.filter((v) => v.status === activeTab);

  return (
    <div className="space-y-8">
      {/* Top Banner: Loyalty Points Overview */}
      <Bezel className="p-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-200" />
              <span className="text-xs uppercase tracking-widest font-bold text-amber-200">
                Pawfect Member Club
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Điểm tích luỹ: <span className="font-mono tabular-nums">480</span> PawPoints
            </h2>
            <p className="text-xs text-amber-100 max-w-md leading-relaxed">
              Tích luỹ 10 điểm cho mỗi 100.000₫ mua sắm. Đổi điểm lấy voucher giảm giá và quà tặng sinh nhật cho thú cưng.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white border border-white/30">
              Hạng: Vàng (Gold VIP)
            </span>
            <span className="text-[11px] text-amber-100 font-mono tabular-nums">
              Cần thêm 120 điểm để lên Platinum
            </span>
          </div>
        </div>
      </Bezel>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'available'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Khả dụng ({MOCK_VOUCHERS.filter((v) => v.status === 'available').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('used')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'used'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Đã sử dụng ({MOCK_VOUCHERS.filter((v) => v.status === 'used').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('expired')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'expired'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Hết hạn ({MOCK_VOUCHERS.filter((v) => v.status === 'expired').length})
        </button>
      </div>

      {/* Voucher list */}
      {filteredVouchers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredVouchers.map((voucher) => (
            <VoucherTicketCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-stone-500 text-xs">
          Không có voucher nào trong danh mục này.
        </div>
      )}

      {/* Points History */}
      <div className="pt-6 border-t border-stone-200">
        <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Lịch sử tích & đổi điểm gần nhất
        </h3>

        <div className="bg-white rounded-2xl border border-stone-200/90 divide-y divide-stone-100 overflow-hidden">
          {MOCK_POINT_HISTORY.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    item.points > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {item.points > 0 ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">{item.description}</p>
                  <p className="text-[11px] text-stone-500 font-mono tabular-nums">{item.date}</p>
                </div>
              </div>

              <span
                className={`text-xs font-bold font-mono tabular-nums ${
                  item.points > 0 ? 'text-emerald-700' : 'text-stone-700'
                }`}
              >
                {item.points > 0 ? `+${item.points}` : item.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
