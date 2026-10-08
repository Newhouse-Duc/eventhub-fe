'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          {/* Cột 1: Về chúng tôi (2 cols on large screen) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white text-xl">
                🐾
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Pet Luxury
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Cung cấp thức ăn hữu cơ, pate nhập khẩu và phụ kiện công thái học cao cấp cho những người bạn bốn chân.
            </p>
            <div className="text-sm mt-1">
              <p className="font-semibold text-stone-300">Hotline: <span className="text-amber-500 font-mono">1900 6868</span></p>
              <p className="mt-0.5">Email: cskh@petluxury.vn</p>
            </div>
          </div>

          {/* Cột 2: Danh mục */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Mua sắm</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link href="/products?category=dog" className="hover:text-amber-400 transition-colors">Dành cho Chó</Link></li>
              <li><Link href="/products?category=cat" className="hover:text-amber-400 transition-colors">Dành cho Mèo</Link></li>
              <li><Link href="/brands" className="hover:text-amber-400 transition-colors">Thương hiệu</Link></li>
              <li><Link href="/promotions" className="hover:text-amber-400 transition-colors">Khuyến mãi &amp; Flash Sale</Link></li>
              <li><Link href="/wishlist" className="hover:text-amber-400 transition-colors">Danh sách yêu thích</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ & Khách hàng */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Hỗ trợ</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link href="/track-order" className="hover:text-amber-400 transition-colors">Tra cứu đơn hàng</Link></li>
              <li><Link href="/faq" className="hover:text-amber-400 transition-colors">Câu hỏi thường gặp (FAQ)</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Liên hệ &amp; Showroom</Link></li>
            </ul>
          </div>

          {/* Cột 4: Chính sách */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Chính sách</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link href="/policies/shipping" className="hover:text-amber-400 transition-colors">Chính sách Vận chuyển</Link></li>
              <li><Link href="/policies/returns" className="hover:text-amber-400 transition-colors">Đổi trả &amp; Hoàn tiền</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-amber-400 transition-colors">Bảo mật thông tin</Link></li>
              <li><Link href="/policies/terms" className="hover:text-amber-400 transition-colors">Điều khoản dịch vụ</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Pet Luxury. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4 text-stone-500 font-mono text-[11px]">
            <span>VNPay</span> • <span>MoMo</span> • <span>VietQR</span> • <span>Visa/MasterCard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
