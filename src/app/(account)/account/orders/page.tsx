'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Eye, RotateCcw, Package, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { EmptyState } from '@/components/ui/EmptyState';
import type { AccountOrder } from '@/features/account/types/account.types';

export const MOCK_ORDERS: AccountOrder[] = [
  {
    id: 'ord-1',
    orderCode: 'PET-261006-8899',
    date: '06/10/2026',
    status: 'shipping',
    statusText: 'Đang vận chuyển',
    totalAmount: 1128300,
    subtotal: 1245000,
    discount: 116700,
    shippingFee: 0,
    trackingCode: 'GHTK-HN-998822',
    trackingUrl: 'https://i.ghtk.vn',
    paymentMethod: 'Chuyển khoản VietQR',
    shippingMethod: 'Hỏa tốc 2 Giờ',
    recipientName: 'Nguyễn Văn An',
    recipientPhone: '0912345678',
    shippingAddress: 'Số 18, Ngõ 86 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    items: [
      {
        id: '1',
        slug: 'hat-orijen-original-cho-cho-2kg',
        name: 'Hạt dinh dưỡng hữu cơ Orijen Original cho Cún 2kg',
        variant: 'Túi 2kg',
        quantity: 1,
        price: 850000,
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=200',
      },
      {
        id: '2',
        slug: 'pate-royal-canin-kitten-instinctive-85g',
        name: 'Pate Royal Canin Kitten Instinctive 85g cho mèo con',
        variant: 'Lốc 12 gói',
        quantity: 1,
        price: 395000,
        image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=200',
      },
    ],
    events: [
      { status: 'pending', title: 'Chờ xác nhận', timestamp: '09:12 06/10', isCompleted: true },
      { status: 'processing', title: 'Đang đóng gói', timestamp: '10:30 06/10', isCompleted: true },
      { status: 'shipping', title: 'Đang giao hàng', timestamp: '11:45 06/10', isCurrent: true },
      { status: 'delivered', title: 'Hoàn tất', timestamp: 'Dự kiến 14:00 hôm nay' },
    ],
  },
  {
    id: 'ord-2',
    orderCode: 'PET-260928-1120',
    date: '28/09/2026',
    status: 'delivered',
    statusText: 'Giao hàng thành công',
    totalAmount: 495000,
    subtotal: 495000,
    discount: 0,
    shippingFee: 0,
    paymentMethod: 'Tiền mặt khi nhận hàng (COD)',
    shippingMethod: 'Tiêu chuẩn',
    recipientName: 'Nguyễn Văn An',
    recipientPhone: '0912345678',
    shippingAddress: 'Số 18, Ngõ 86 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    items: [
      {
        id: '3',
        slug: 'cat-ve-sinh-cature-dau-nanh-tu-nhien-6l',
        name: 'Cát vệ sinh Cature đậu nành hữu cơ 6L vón cục siêu tốc',
        variant: 'Thùng 4 túi (24L)',
        quantity: 1,
        price: 495000,
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200',
      },
    ],
    events: [
      { status: 'pending', title: 'Chờ xác nhận', timestamp: '14:20 28/09', isCompleted: true },
      { status: 'processing', title: 'Đang đóng gói', timestamp: '16:00 28/09', isCompleted: true },
      { status: 'shipping', title: 'Đang giao hàng', timestamp: '08:30 29/09', isCompleted: true },
      { status: 'delivered', title: 'Hoàn tất', timestamp: '15:10 30/09', isCompleted: true },
    ],
  },
  {
    id: 'ord-3',
    orderCode: 'PET-260910-0455',
    date: '10/09/2026',
    status: 'cancelled',
    statusText: 'Đã hủy đơn',
    totalAmount: 1250000,
    subtotal: 1250000,
    discount: 0,
    shippingFee: 0,
    paymentMethod: 'Chuyển khoản VietQR',
    shippingMethod: 'Tiêu chuẩn',
    recipientName: 'Nguyễn Văn An',
    recipientPhone: '0912345678',
    shippingAddress: 'Số 18, Ngõ 86 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    items: [
      {
        id: '4',
        slug: 'dem-nam-cong-thai-hoc-pet-luxury-comfort',
        name: 'Đệm nằm công thái học Memory Foam Pet Luxury',
        variant: 'Size L (80x60cm)',
        quantity: 1,
        price: 1250000,
        image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=200',
      },
    ],
    events: [
      { status: 'pending', title: 'Đã hủy', description: 'Hủy theo yêu cầu của khách hàng', isCompleted: true },
    ],
  },
];

const TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ xác nhận' },
  { key: 'shipping', label: 'Đang giao' },
  { key: 'delivered', label: 'Hoàn tất' },
  { key: 'cancelled', label: 'Đã hủy' },
];

export default function AccountOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchCode, setSearchCode] = useState('');

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeTab !== 'all' && order.status !== activeTab) return false;
    if (searchCode.trim()) {
      return order.orderCode.toLowerCase().includes(searchCode.toLowerCase().trim());
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'shipping':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            Quản lý đơn hàng
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Xem lại lịch sử mua sắm và theo dõi tiến trình giao hàng.
          </p>
        </div>

        {/* Search by Order Code */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="w-full h-10 pl-8 pr-3 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-stone-200/80 overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Order Cards List */}
      {filteredOrders.length === 0 ? (
        <div className="py-16 bg-white rounded-3xl border border-stone-200">
          <EmptyState
            icon={Package}
            title="Không tìm thấy đơn hàng nào"
            description="Bạn chưa có đơn hàng nào ở trạng thái này hoặc mã đơn tìm kiếm không khớp."
            actionLabel="Khám phá cửa hàng"
            onAction={() => window.location.href = '/products'}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4 hover:border-amber-200 transition-colors"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sm font-extrabold text-stone-900">
                    {order.orderCode}
                  </span>
                  <span className="text-xs text-stone-400">• Ngày đặt: {order.date}</span>
                </div>

                <span
                  className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.statusText}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl bg-stone-50 border border-stone-200 overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill sizes="60px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] text-stone-500">
                        {item.variant} • Số lượng: <strong className="text-stone-800 font-mono">{item.quantity}</strong>
                      </p>
                    </div>
                    <PriceDisplay price={item.price * item.quantity} size="sm" className="font-bold" />
                  </div>
                ))}
              </div>

              {/* Footer row: Total & Actions */}
              <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-stone-500">Tổng thanh toán:</span>
                  <PriceDisplay price={order.totalAmount} size="md" className="text-amber-800 font-extrabold" />
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="h-9 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem chi tiết</span>
                  </Link>

                  <Link
                    href="/products"
                    className="h-9 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Mua lại</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
