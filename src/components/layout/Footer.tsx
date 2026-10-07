'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Cột 1: Về chúng tôi */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white text-xl">
                🐾
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Pet Luxury
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Cung cấp thức ăn hữu cơ, pate nhập khẩu và phụ kiện công thái học cao cấp cho những người bạn bốn chân.
            </p>
            <div className="text-sm mt-2">
              <p className="font-semibold text-stone-300">Hotline: <span className="text-amber-500">1900 6868</span></p>
              <p className="mt-1">Email: hello@petluxury.vn</p>
            </div>
          </div>

          {/* Cột 2: Danh mục */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Danh mục</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/products?category=dog" className="hover:text-amber-500 transition-colors">Dành cho Chó</Link></li>
              <li><Link href="/products?category=cat" className="hover:text-amber-500 transition-colors">Dành cho Mèo</Link></li>
              <li><Link href="/products?tag=organic" className="hover:text-amber-500 transition-colors">Dinh dưỡng Hữu cơ</Link></li>
              <li><Link href="/products?category=toys" className="hover:text-amber-500 transition-colors">Phụ kiện &amp; Đồ chơi</Link></li>
            </ul>
          </div>

          {/* Cột 3: Chính sách */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Chính sách</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/shipping" className="hover:text-amber-500 transition-colors">Chính sách Vận chuyển</Link></li>
              <li><Link href="/returns" className="hover:text-amber-500 transition-colors">Đổi trả &amp; Hoàn tiền</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-500 transition-colors">Bảo mật thông tin</Link></li>
              <li><Link href="/terms" className="hover:text-amber-500 transition-colors">Điều khoản sử dụng</Link></li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký nhận tin */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Đăng ký nhận tin</h4>
            <p className="text-sm mb-4">
              Nhận ngay voucher 15% và thông tin ưu đãi mới nhất dành cho hội viên Pawfect Club.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="flex-1 h-10 px-3 rounded-l-lg bg-stone-800 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <button 
                type="submit"
                className="h-10 px-4 bg-amber-600 text-white font-semibold text-sm rounded-r-lg hover:bg-amber-700 transition-colors"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Pet Luxury. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}
