'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service (e.g., Sentry)
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        <Bezel className="p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-rose-700 bg-rose-500/10 px-3 py-1 rounded-full inline-block mb-3">
            Lỗi Hệ Thống {error.digest ? `• #${error.digest.slice(0, 8)}` : ''}
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-3">
            Có gì đó trục trặc rồi!
          </h1>

          <p className="text-sm text-stone-600 leading-relaxed max-w-sm mx-auto mb-8">
            Hệ thống gặp sự cố không mong muốn trong khi xử lý yêu cầu của bạn. Đội ngũ kỹ thuật đã được thông báo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto h-11 px-6 rounded-full bg-stone-900 text-white font-medium text-sm inline-flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-[0.98] transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Thử lại ngay
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto h-11 px-6 rounded-full border border-stone-200 text-stone-700 font-medium text-sm inline-flex items-center justify-center gap-2 hover:bg-stone-50 active:scale-[0.98] transition-all"
            >
              <Home className="w-4 h-4" />
              Về trang chủ
            </Link>
          </div>
        </Bezel>
      </div>
    </div>
  );
}
