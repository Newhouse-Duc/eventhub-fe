'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  Sparkles, 
  ChevronRight,
  Bell,
  Ticket,
  Star,
  PawPrint
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { VipMemberCard } from '@/features/account/components/VipMemberCard';
import { useLogoutMutation } from '@/features/auth/api/authApiSlice';
import { useAppDispatch } from '@/store/hooks';
import { logout as logoutAction } from '@/store/authSlice';
import { api } from '@/store/baseApi';

const NAV_ITEMS = [
  { id: 'profile', label: 'Hồ sơ cá nhân', href: '/account', icon: User },
  { id: 'orders', label: 'Quản lý đơn hàng', href: '/account/orders', icon: ShoppingBag, badge: 3 },
  { id: 'pets', label: 'Hồ sơ thú cưng', href: '/account/pets', icon: PawPrint },
  { id: 'vouchers', label: 'Kho Voucher & Điểm', href: '/account/vouchers', icon: Ticket, badge: 3 },
  { id: 'reviews', label: 'Đánh giá sản phẩm', href: '/account/reviews', icon: Star },
  { id: 'addresses', label: 'Sổ địa chỉ nhận hàng', href: '/account/addresses', icon: MapPin },
  { id: 'security', label: 'Bảo mật & Mật khẩu', href: '/account/security', icon: ShieldCheck },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch {
      // Ignore
    } finally {
      dispatch(logoutAction());
      dispatch(api.util.resetApiState());
      window.location.href = '/login';
    }
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tài khoản', href: '/account' },
    {
      label:
        pathname === '/account/orders'
          ? 'Đơn hàng'
          : pathname === '/account/pets'
          ? 'Thú cưng'
          : pathname === '/account/vouchers'
          ? 'Voucher & Điểm'
          : pathname === '/account/reviews'
          ? 'Đánh giá'
          : pathname === '/account/addresses'
          ? 'Sổ địa chỉ'
          : pathname === '/account/security'
          ? 'Bảo mật'
          : 'Hồ sơ',
      isCurrent: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header />

      <main className="flex-1 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Account Sidebar (lg:col-span-4) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* VIP Member Card */}
              <VipMemberCard />

              {/* Navigation Menu */}
              <div className="p-3 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-amber-600 text-white font-bold shadow-xs'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge !== undefined && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums ${
                              isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : ''}`} />
                      </div>
                    </Link>
                  );
                })}

                <div className="pt-2 border-t border-stone-100 mt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất tài khoản</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* Right Column: Dynamic Account Content (lg:col-span-8) */}
            <section className="lg:col-span-8 min-w-0">
              {children}
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
