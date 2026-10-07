import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Scissors, Heart, ShieldCheck } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';

export function BentoBanners() {
  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
          Khám phá thêm
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
          Đặc quyền &amp; Trải nghiệm
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card Lớn 1: Hội viên Pawfect Club & Voucher PAW15 (col-span-7) */}
        <div className="md:col-span-7">
          <Bezel className="h-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white relative overflow-hidden p-8 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>HỘI VIÊN PAWFECT CLUB</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Giảm ngay 15% cho đơn đầu tiên
              </h3>
              <p className="text-sm text-amber-100/90 max-w-md leading-relaxed">
                Nhập mã <strong className="font-mono bg-white/25 px-2 py-0.5 rounded text-white tracking-wider">PAW15</strong> khi thanh toán. Tích điểm 5% trọn đời và nhận quà sinh nhật bất ngờ cho boss!
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between">
              <Link
                href="/register"
                className="h-11 px-6 rounded-full bg-white text-stone-900 font-bold text-xs hover:bg-amber-50 transition-all shadow-md flex items-center gap-2 group-hover:scale-105"
              >
                <span>Đăng ký nhận mã</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="text-5xl opacity-40 select-none hidden sm:block">🐾</div>
            </div>
          </Bezel>
        </div>

        {/* Card Lớn 2: Spa & Grooming 5 Sao (col-span-5) */}
        <div className="md:col-span-5">
          <Bezel className="h-full bg-stone-900 text-white relative overflow-hidden p-8 flex flex-col justify-between group">
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-bold">
                <Scissors className="w-3.5 h-3.5 text-amber-400" />
                <span>DỊCH VỤ SPA &amp; CẮT TỈA</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Chăm sóc lông mượt chuẩn 5 sao
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Kỹ thuật viên chứng chỉ quốc tế, phòng tắm sục ozone khử khuẩn và mỹ phẩm thảo mộc an toàn.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                href="/services/spa"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-all"
              >
                <span>Đặt lịch hẹn ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Bezel>
        </div>

        {/* Card Nhỏ 1: Grain-Free Nutrition (col-span-6) */}
        <div className="md:col-span-6">
          <Bezel className="bg-emerald-950 text-white relative overflow-hidden p-6 flex items-center justify-between group">
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                <Heart className="w-3.5 h-3.5" />
                <span>DINH DƯỠNG HỮU CƠ</span>
              </div>
              <h4 className="text-lg font-bold text-white">
                100% Không ngũ cốc (Grain-Free)
              </h4>
              <p className="text-xs text-emerald-200/80 max-w-xs">
                Giảm dị ứng, mượt lông và bảo vệ hệ tiêu hóa non nớt của các bé.
              </p>
              <Link
                href="/products?tag=grain-free"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white pt-2"
              >
                <span>Xem bộ sưu tập</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="text-4xl select-none opacity-50 sm:opacity-90">🌿</div>
          </Bezel>
        </div>

        {/* Card Nhỏ 2: Chăm sóc Răng miệng & Lông (col-span-6) */}
        <div className="md:col-span-6">
          <Bezel className="bg-stone-100 text-stone-900 relative overflow-hidden p-6 flex items-center justify-between group border border-stone-200">
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>COMBO TIẾT KIỆM</span>
              </div>
              <h4 className="text-lg font-bold text-stone-900">
                Combo Răng Miệng &amp; Khớp Xương
              </h4>
              <p className="text-xs text-stone-600 max-w-xs">
                Bộ đôi canxi sinh học và gel làm sạch mảng bám không cần đánh răng.
              </p>
              <Link
                href="/products?category=health"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 pt-2"
              >
                <span>Mua ngay giảm 25%</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="text-4xl select-none opacity-60">🦷</div>
          </Bezel>
        </div>

      </div>
    </section>
  );
}
