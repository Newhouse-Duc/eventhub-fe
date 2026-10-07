'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthShowcase } from '@/features/auth/components/AuthShowcase';
import { Home, UserPlus, LogIn, KeyRound } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Trang chủ', href: '/', icon: Home },
    { label: 'Đăng ký', href: '/register', icon: UserPlus },
    { label: 'Đăng nhập', href: '/login', icon: LogIn },
    { label: 'Xác thực OTP', href: '/verify-email?email=customer@example.com', icon: KeyRound },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-12 bg-[#FDFBF7]">
      {/* Left Column: Brand Showcase (Visible on desktop lg: 5 cols out of 12) */}
      <div className="hidden lg:block lg:col-span-5 xl:col-span-5 h-full">
        <AuthShowcase />
      </div>

      {/* Right Column: Interactive Auth Form (7 cols on lg, full on mobile) */}
      <div className="flex-1 lg:col-span-7 xl:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Top Header: Brand Logo & Navigation Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200/60">
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
              🐾
            </div>
            <div>
              <span className="font-extrabold text-base text-stone-900 tracking-tight block">
                Pet Luxury
              </span>
              <span className="text-[10px] uppercase font-semibold text-amber-700 tracking-widest block -mt-1">
                E-Commerce
              </span>
            </div>
          </Link>

          {/* Quick Page Switcher Buttons */}
          <nav className="flex items-center gap-1.5 flex-wrap">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href.split('?')[0];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-sm font-semibold'
                      : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50 hover:text-amber-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Central Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-2">
          {children}
        </div>

        {/* Auth Footer */}
        <div className="pt-6 mt-auto border-t border-stone-200/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© 2026 Pet Luxury E-Commerce. Bản quyền đã được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-amber-800 transition-colors">
              Chính sách bảo mật
            </a>
            <span>•</span>
            <a href="#" className="hover:text-amber-800 transition-colors">
              Điều khoản dịch vụ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
