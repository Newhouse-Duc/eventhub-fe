'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User as UserIcon, Menu, Sparkles, MapPin } from 'lucide-react';
import { Dropdown, Badge, App } from 'antd';
import type { MenuProps } from 'antd';
import { useGetProfileQuery, useLogoutMutation } from '@/features/auth/api/authApiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout as logoutAction, setUser } from '@/store/authSlice';
import { api } from '@/store/baseApi';
import { AppDrawer } from '@/components/ui/AppDrawer';
import { MiniCartDrawer } from '@/features/cart/components/MiniCartDrawer';

export function Header() {
  const pathname = usePathname();
  const { message } = App.useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { user: currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();

  const { data: profile } = useGetProfileQuery(undefined, { skip: !!currentUser });

  useEffect(() => {
    if (profile) dispatch(setUser(profile));
  }, [profile, dispatch]);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } finally {
      dispatch(logoutAction());
      dispatch(api.util.resetApiState());
      message.success('Đã đăng xuất thành công.');
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <div className="px-1 py-1">
          <p className="font-semibold text-stone-900 text-sm">{currentUser?.firstName}</p>
          <p className="text-xs text-stone-500 truncate max-w-[180px]">{currentUser?.email}</p>
        </div>
      ),
    },
    { type: 'divider' },
    { key: 'orders', label: <Link href="/orders">Đơn hàng</Link> },
    { key: 'wishlist', label: <Link href="/wishlist">Yêu thích</Link> },
    { type: 'divider' },
    { key: 'logout', danger: true, label: 'Đăng xuất', onClick: handleLogout },
  ];

  const navLinks = [
    { label: 'Chó', href: '/products?category=dog' },
    { label: 'Mèo', href: '/products?category=cat' },
    { label: 'Thương hiệu', href: '/brands' },
    { label: 'Dịch vụ Spa', href: '/services' },
  ];

  return (
    <>
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-[color:var(--color-hairline)] sticky top-0 z-50 transition-all">
        {/* Top bar */}
        <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 flex items-center justify-center">
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Miễn phí vận chuyển cho đơn từ 500.000₫</span>
          </div>
        </div>

        {/* Main Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 -ml-2 text-stone-600"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-2xl">🐾</span>
            <span className="font-extrabold text-xl tracking-tight text-amber-700 hidden sm:block">
              Pet Luxury
            </span>
          </Link>

          {/* Mega Menu Center */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-stone-700 hover:text-amber-700 h-full flex items-center border-b-2 border-transparent hover:border-amber-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Tools */}
          <div className="flex items-center gap-3 shrink-0 ml-auto">
            <div className="hidden lg:flex items-center relative w-64">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full h-9 pl-9 pr-4 rounded-full bg-stone-100/50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <Link href="/wishlist" className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-rose-500 hover:bg-stone-50 rounded-full transition-colors hidden sm:flex">
              <Heart className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {currentUser ? (
              <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                <button className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold hover:bg-amber-200 transition-colors ml-1">
                  {currentUser.firstName?.[0]}
                </button>
              </Dropdown>
            ) : (
              <Link href="/login" className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-amber-700 hover:bg-stone-50 rounded-full transition-colors ml-1">
                <UserIcon className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mini Cart Drawer */}
      <MiniCartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Nav Drawer */}
      <AppDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Menu"
        placement="left"
        width={300}
      >
        <nav className="flex flex-col p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-4 border-b border-stone-100 text-stone-800 font-semibold"
            >
              {link.label}
            </Link>
          ))}
          <div className="py-6 mt-4 border-t border-stone-200 flex items-center gap-2 text-amber-600 font-medium">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Hệ thống 12 cửa hàng toàn quốc</span>
          </div>
        </nav>
      </AppDrawer>
    </>
  );
}
