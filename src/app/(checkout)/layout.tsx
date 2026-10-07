import React from 'react';
import Link from 'next/link';
import { ShieldCheck, PhoneCall, ArrowLeft } from 'lucide-react';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      {/* Minimal Header */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white text-lg shadow-sm">
              🐾
            </div>
            <div>
              <span className="font-extrabold text-base text-stone-900 tracking-tight block">
                Pet Luxury
              </span>
              <span className="text-[10px] uppercase font-semibold text-amber-700 tracking-widest block -mt-1">
                Thanh toán an toàn
              </span>
            </div>
          </Link>

          {/* Right helper */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bảo mật SSL 256-bit</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-600 font-semibold bg-stone-100 px-3 py-1.5 rounded-full">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>Hotline: 1900 6868</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-stone-200/60 bg-white py-6 text-center text-xs text-stone-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Pet Luxury E-Commerce. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-stone-700 transition-colors">
              Chính sách bảo mật
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-stone-700 transition-colors">
              Điều khoản giao dịch
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
