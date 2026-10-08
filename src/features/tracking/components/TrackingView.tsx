'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, PackageCheck, Truck, MapPin, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { OrderTimeline } from '@/features/checkout/components/OrderTimeline';
import type { TrackingOrderResult } from '../types/tracking.types';

const MOCK_TRACKING_RESULT: TrackingOrderResult = {
  orderCode: 'PET-240810-0042',
  customerName: 'Nguyễn Văn Đức',
  phoneMasked: '0987***678',
  shippingAddress: '123 Đường Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
  carrierName: 'Giao Hàng Tiết Kiệm (GHTK)',
  trackingNumber: 'GHTK-PET-984210',
  status: 'shipping',
  statusText: 'Đang vận chuyển',
  estimatedDelivery: '14/10/2026 (Trước 18:00)',
  items: [
    {
      id: 'i1',
      name: 'Hạt dinh dưỡng hữu cơ Orijen Original cho Cún 2kg',
      quantity: 1,
      price: 850000,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'i2',
      name: 'Pate Royal Canin Kitten Instinctive 85g',
      quantity: 3,
      price: 34000,
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800',
    },
  ],
  timeline: [
    {
      title: 'Đơn hàng đã được đặt',
      timestamp: '08/10/2026 09:12',
      description: 'Hệ thống đã ghi nhận đơn hàng thành công.',
      isCompleted: true,
    },
    {
      title: 'Đã chuẩn bị & đóng gói',
      timestamp: '08/10/2026 10:30',
      description: 'Kho Pet Luxury Cầu Giấy đã hoàn tất đóng gói chống sốc.',
      isCompleted: true,
    },
    {
      title: 'Đang giao hàng',
      timestamp: '08/10/2026 14:15',
      description: 'Shipper GHTK đang trên đường giao tới bạn.',
      isCompleted: false,
      isCurrent: true,
    },
    {
      title: 'Giao hàng thành công',
      timestamp: 'Dự kiến 14/10/2026',
      description: 'Khách hàng nhận bưu kiện và ký nhận.',
      isCompleted: false,
    },
  ],
};

export function TrackingView() {
  const [orderCode, setOrderCode] = useState('');
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrackingOrderResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCode.trim() || !contact.trim()) {
      setError('Vui lòng nhập đầy đủ mã đơn hàng và số điện thoại hoặc email.');
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Demo: luôn trả về mock result để trải nghiệm mượt mà
      setResult(MOCK_TRACKING_RESULT);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto mb-4">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Tra cứu Vận đơn Đơn hàng
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Theo dõi hành trình di chuyển của bưu kiện giao cho bé cưng theo thời gian thực mà không cần đăng nhập.
        </p>
      </div>

      {/* Form Bezel */}
      <Bezel className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="orderCode" className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">
                Mã đơn hàng *
              </label>
              <input
                id="orderCode"
                type="text"
                placeholder="VD: PET-240810-0042"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 text-sm font-mono"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">
                Số điện thoại / Email *
              </label>
              <input
                id="contact"
                type="text"
                placeholder="Nhập SĐT hoặc email đặt đơn"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto h-11 px-8 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 shadow-xs"
            >
              <Search className="w-4 h-4" />
              {isLoading ? 'Đang tra cứu...' : 'Tra cứu hành trình'}
            </button>
          </div>
        </form>
      </Bezel>

      {/* Result Section */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Bezel className="p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full">
                  {result.statusText}
                </span>
                <h2 className="text-xl font-bold text-stone-900 mt-2 font-mono tabular-nums">
                  Đơn hàng #{result.orderCode}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Đơn vị vận chuyển: <span className="font-semibold text-stone-700">{result.carrierName}</span> • Mã vận đơn: <span className="font-mono text-stone-900 font-semibold">{result.trackingNumber}</span>
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-stone-500 block">Dự kiến nhận hàng</span>
                <span className="text-sm font-bold text-emerald-700 font-mono tabular-nums">
                  {result.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Grid 2 cols: Timeline & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
              <div className="lg:col-span-7">
                <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-amber-600" />
                  Hành trình bưu kiện
                </h3>
                <OrderTimeline events={result.timeline} />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    Địa chỉ nhận hàng
                  </h4>
                  <p className="text-xs text-stone-700 font-medium leading-relaxed">
                    {result.customerName} ({result.phoneMasked})
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {result.shippingAddress}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Sản phẩm trong kiện ({result.items.length})
                  </h4>
                  <div className="space-y-2">
                    {result.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-white border border-stone-200 overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-stone-900 truncate">{item.name}</p>
                          <p className="text-[11px] text-stone-500 tabular-nums">x{item.quantity} • <PriceDisplay price={item.price} size="sm" /></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Bezel>
        </div>
      )}
    </div>
  );
}
