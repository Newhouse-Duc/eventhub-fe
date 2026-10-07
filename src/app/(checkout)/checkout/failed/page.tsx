'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, RefreshCw, CreditCard, Headphones, ArrowLeft } from 'lucide-react';

function CheckoutFailedContent() {
  const searchParams = useSearchParams();
  const reasonCode = searchParams.get('reason') || 'cancelled';

  const reasonMap: Record<string, { title: string; desc: string }> = {
    timeout: {
      title: 'Hết thời gian thanh toán',
      desc: 'Phiên giao dịch trực tuyến đã hết hạn 15 phút. Toàn bộ giỏ hàng của bạn vẫn được lưu giữ an toàn.',
    },
    declined: {
      title: 'Giao dịch bị từ chối',
      desc: 'Tài khoản hoặc thẻ của bạn bị từ chối bởi cổng thanh toán. Vui lòng kiểm tra lại số dư hoặc hạn mức giao dịch.',
    },
    cancelled: {
      title: 'Giao dịch chưa hoàn tất',
      desc: 'Bạn đã hủy quá trình thanh toán hoặc đường truyền bị gián đoạn. Các sản phẩm trong giỏ hàng vẫn được bảo lưu.',
    },
  };

  const reasonInfo = reasonMap[reasonCode] || reasonMap.cancelled;

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-6">
      {/* Rose warning badge */}
      <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mx-auto shadow-sm">
        <AlertCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
          Thanh toán chưa thành công
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {reasonInfo.title}
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
          {reasonInfo.desc}
        </p>
      </div>

      {/* Helpful hint box */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-xs text-stone-700 text-left space-y-1.5">
        <p className="font-bold text-amber-900">💡 Gợi ý giải pháp:</p>
        <ul className="list-disc pl-4 space-y-1 text-stone-600">
          <li>Thử lại với phương thức Chuyển khoản QR (VietQR) hoặc COD khi nhận hàng.</li>
          <li>Kiểm tra xem ứng dụng ngân hàng đã bật tính năng thanh toán trực tuyến chưa.</li>
          <li>Liên hệ Hotline <strong>1900 6868</strong> để được hỗ trợ thủ công trong 5 phút.</li>
        </ul>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href="/checkout"
          className="w-full sm:w-auto h-12 px-7 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Thử thanh toán lại</span>
        </Link>

        <Link
          href="/cart"
          className="w-full sm:w-auto h-12 px-6 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span>Đổi giỏ hàng</span>
        </Link>

        <a
          href="tel:19006868"
          className="w-full sm:w-auto h-12 px-5 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Headphones className="w-4 h-4" />
          <span>Hotline hỗ trợ</span>
        </a>
      </div>
    </div>
  );
}

export default function CheckoutFailedPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500">Đang tải...</div>}>
      <CheckoutFailedContent />
    </Suspense>
  );
}
