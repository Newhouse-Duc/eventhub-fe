'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  Check, 
  Copy, 
  CheckCheck, 
  Calendar, 
  Truck, 
  ArrowRight, 
  QrCode, 
  Clock, 
  UserPlus,
  ShoppingBag
} from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { PriceDisplay } from '@/components/ui/PriceDisplay';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get('orderCode') || '#PET-261006-8899';
  const total = parseInt(searchParams.get('total') || '1128300', 10);
  const paymentMethod = searchParams.get('method') || 'vietqr';

  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(900); // 15 phút thanh toán QR

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-8 text-center sm:text-left">
      
      {/* Success Badge & Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Animated Emerald Tick Circle */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-md">
          <svg className="w-10 h-10 animate-in zoom-in-75 duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Thao tác hoàn tất
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
            Đặt hàng thành công!
          </h1>
          <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
            Cảm ơn bạn đã tin tưởng lựa chọn Pet Luxury. Chúng tôi đã gửi email xác nhận kèm hóa đơn chi tiết vào hòm thư của bạn.
          </p>
        </div>

        {/* Order Code Box with 1-click Copy */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-semibold">Mã đơn hàng:</span>
          <strong className="font-mono text-sm text-stone-900 font-extrabold tracking-wide">
            {orderCode}
          </strong>
          <button
            type="button"
            onClick={handleCopyCode}
            className="p-1 text-stone-400 hover:text-amber-700 transition-colors cursor-pointer"
            title="Sao chép mã đơn"
          >
            {copied ? (
              <CheckCheck className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* QR Bank Transfer Section (nếu chọn VietQR) */}
      {paymentMethod === 'vietqr' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-sm">
                  Quét mã VietQR để kích hoạt đơn ngay
                </h3>
                <p className="text-xs text-stone-500">Đơn hàng tự động xác nhận sau 30 giây thanh toán</p>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-mono tabular-nums font-bold self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Thời gian giữ đơn: {pad(minutes)}:{pad(seconds)}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
            {/* Simulated VietQR code */}
            <div className="p-4 rounded-2xl bg-white border-2 border-stone-200 shadow-inner flex flex-col items-center">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                alt="VietQR Payment Code"
                width={160}
                height={160}
                className="rounded-lg"
              />
              <span className="text-[10px] text-stone-400 font-mono mt-2">Quét bằng App Ngân Hàng</span>
            </div>

            {/* Transfer details */}
            <div className="space-y-3 text-xs flex-1 w-full sm:w-auto">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <span className="text-stone-500">Ngân hàng:</span>
                <strong className="text-stone-900">MBBank (Quân Đội)</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <span className="text-stone-500">Số tài khoản:</span>
                <strong className="font-mono text-amber-800 font-bold text-sm">09123456789</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <span className="text-stone-500">Chủ tài khoản:</span>
                <strong className="text-stone-900">CONG TY TNHH PET LUXURY</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <span className="text-stone-500">Số tiền:</span>
                <strong className="text-amber-800 font-bold text-sm">{total.toLocaleString('vi-VN')}₫</strong>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <span className="text-amber-900 font-semibold">Nội dung CK:</span>
                <strong className="font-mono text-amber-900 font-extrabold text-sm">{orderCode.replace('#', '')}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Delivery Card */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-tight border-b border-stone-100 pb-3 flex items-center gap-2">
          <Truck className="w-4 h-4 text-amber-600" />
          <span>Thông tin vận chuyển</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-stone-400 block font-medium">Thời gian nhận hàng dự kiến:</span>
            <p className="font-bold text-stone-900 text-sm">Thứ Năm, 08/10/2026 (Trong giờ hành chính)</p>
          </div>
          <div className="space-y-1">
            <span className="text-stone-400 block font-medium">Đơn vị vận chuyển:</span>
            <p className="font-bold text-stone-900 text-sm">Giao Hàng Tiết Kiệm (GHTK) • Hỏa tốc</p>
          </div>
        </div>
      </div>

      {/* Guest registration prompt */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-600/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
            <UserPlus className="w-4 h-4" />
          </div>
          <div className="text-stone-800">
            <span className="font-bold block">Tạo tài khoản để tích ngay 5% điểm thưởng</span>
            <span>Đơn hàng này sẽ giúp bạn tích lũy {(total * 0.05).toLocaleString('vi-VN')} điểm PawPoints.</span>
          </div>
        </div>
        <Link
          href="/register"
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors shrink-0"
        >
          Kích hoạt ngay
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/products"
          className="w-full sm:w-auto h-12 px-7 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Tiếp tục mua sắm</span>
        </Link>

        <Link
          href="/products"
          className="w-full sm:w-auto h-12 px-8 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[var(--shadow-brand)] transition-all cursor-pointer"
        >
          <span>Xem chi tiết danh mục</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500">Đang tải thông tin đơn...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
