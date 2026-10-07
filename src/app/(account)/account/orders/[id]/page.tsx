'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Truck, 
  ExternalLink, 
  RotateCcw, 
  Printer, 
  Star, 
  XCircle, 
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { OrderTimeline } from '@/features/checkout/components/OrderTimeline';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { MOCK_ORDERS } from '@/app/(account)/account/orders/page';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const order = MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];

  if (!order) {
    notFound();
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs">
        <div className="space-y-1">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-700 font-semibold mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại danh sách đơn hàng</span>
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Đơn hàng {order.orderCode}
            </h2>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {order.statusText}
            </span>
          </div>
          <p className="text-xs text-stone-400">Thời gian tạo: {order.date} 09:12</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="h-10 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In hóa đơn</span>
          </button>

          {order.status === 'pending' && (
            <button
              type="button"
              className="h-10 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Hủy đơn</span>
            </button>
          )}

          {order.status === 'delivered' && (
            <button
              type="button"
              className="h-10 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5" />
              <span>Viết đánh giá</span>
            </button>
          )}
        </div>
      </div>

      {/* Order Status Timeline Card */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-tight flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-600" />
            <span>Hành trình đơn hàng</span>
          </h3>

          {order.trackingCode && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500">Mã vận đơn:</span>
              <strong className="font-mono text-stone-800">{order.trackingCode}</strong>
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-700 hover:underline flex items-center gap-1 font-semibold ml-1"
                >
                  <span>Tra cứu</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>

        <OrderTimeline events={order.events} />
      </div>

      {/* Recipient & Shipping & Payment Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recipient Card */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3 text-xs">
          <h4 className="font-extrabold text-stone-900 uppercase tracking-tight border-b border-stone-100 pb-2.5">
            Thông tin người nhận
          </h4>
          <div className="space-y-1 text-stone-600">
            <p className="font-bold text-stone-900 text-sm">{order.recipientName}</p>
            <p>Số điện thoại: <strong className="text-stone-800">{order.recipientPhone}</strong></p>
            <p>Địa chỉ giao hàng: {order.shippingAddress}</p>
          </div>
        </div>

        {/* Shipping & Payment Method */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3 text-xs">
          <h4 className="font-extrabold text-stone-900 uppercase tracking-tight border-b border-stone-100 pb-2.5">
            Phương thức thanh toán &amp; Vận chuyển
          </h4>
          <div className="space-y-2 text-stone-600">
            <div>
              <span className="text-stone-400 block font-medium">Hình thức thanh toán:</span>
              <strong className="text-stone-900">{order.paymentMethod}</strong>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Đơn vị vận chuyển:</span>
              <strong className="text-stone-900">{order.shippingMethod}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Products & Cost Summary Card */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
        <h4 className="font-extrabold text-stone-900 text-sm uppercase tracking-tight border-b border-stone-100 pb-3">
          Danh sách sản phẩm ({order.items.length} món)
        </h4>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl bg-stone-50 border border-stone-200 overflow-hidden shrink-0">
                <Image src={item.image} alt={item.name} fill sizes="70px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-stone-900 line-clamp-1">{item.name}</h5>
                <p className="text-[11px] text-stone-500">{item.variant}</p>
                <p className="text-xs text-stone-700">
                  {item.price.toLocaleString('vi-VN')}₫ × <strong className="font-mono">{item.quantity}</strong>
                </p>
              </div>
              <PriceDisplay price={item.price * item.quantity} size="sm" className="font-bold" />
            </div>
          ))}
        </div>

        {/* Financial calculation */}
        <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
          <div className="flex items-center justify-between text-stone-600">
            <span>Tạm tính:</span>
            <span>{order.subtotal.toLocaleString('vi-VN')}₫</span>
          </div>

          <div className="flex items-center justify-between text-stone-600">
            <span>Phí vận chuyển:</span>
            <span>{order.shippingFee === 0 ? <strong className="text-emerald-700">Miễn phí</strong> : `${order.shippingFee.toLocaleString('vi-VN')}₫`}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex items-center justify-between text-emerald-700 font-semibold">
              <span>Giảm giá:</span>
              <span>-{order.discount.toLocaleString('vi-VN')}₫</span>
            </div>
          )}

          <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between text-sm font-extrabold text-stone-900">
            <span>Tổng thanh toán:</span>
            <PriceDisplay price={order.totalAmount} size="lg" className="text-amber-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
