import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:py-20 bg-gradient-to-b from-amber-50/60 via-[#FDFBF7] to-[#FDFBF7] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Asymmetric Typography & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <Eyebrow>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>BỘ SƯU TẬP MÙA THU 2026</span>
            </Eyebrow>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12]">
              Chăm bé yêu <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-amber-700">
                như người thân.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Cung cấp dinh dưỡng hữu cơ thượng hạng, pate nhập khẩu chính ngạch và phụ kiện công thái học cao cấp chuẩn châu Âu cho người bạn bốn chân.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/products"
                className="h-12 px-7 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-all shadow-[var(--shadow-brand)] hover:shadow-lg flex items-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <span>Mua ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products?tag=sale"
                className="h-12 px-6 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Xem khuyến mãi</span>
              </Link>
            </div>

            {/* Micro Trust Proof */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-stone-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span>Hỏa tốc 2H nội thành</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>100% Chính ngạch</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                  <RotateCcw className="w-3.5 h-3.5" />
                </div>
                <span>Đổi trả 7 ngày</span>
              </div>
            </div>
          </div>

          {/* Right Column: Double-Bezel Visual with Floating Card */}
          <div className="lg:col-span-5 relative">
            <Bezel className="relative overflow-hidden shadow-[var(--shadow-lift)] rounded-[28px]">
              <div className="relative aspect-[4/4.5] w-full bg-stone-100 overflow-hidden rounded-[20px]">
                <Image
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000"
                  alt="Pet Luxury Organic Food Collection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </Bezel>

            {/* Floating Price & Badge Tag */}
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-[var(--shadow-lift)] max-w-[240px] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-[11px] font-bold text-stone-800 ml-1">5.0 (2.4k+)</span>
              </div>
              <p className="text-xs font-bold text-stone-900 line-clamp-1">
                Pate Cá Hồi Tươi Nhập Khẩu
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm font-extrabold text-amber-700">195.000₫</span>
                <span className="text-[11px] text-stone-400 line-through">245.000₫</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700">
                  -20%
                </span>
              </div>
            </div>

            {/* Floating Badge top right */}
            <div className="absolute -top-3 -right-3 bg-stone-900 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
              <span>🐾 Best Choice 2026</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
