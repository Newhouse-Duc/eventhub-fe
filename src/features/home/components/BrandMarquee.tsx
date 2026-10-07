import React from 'react';
import Link from 'next/link';

const BRANDS = [
  { name: 'Orijen', country: 'Canada', badge: 'Sinh học phù hợp' },
  { name: 'Royal Canin', country: 'Pháp', badge: 'Dinh dưỡng chính xác' },
  { name: 'Acana', country: 'Canada', badge: 'Nguyên liệu tươi sống' },
  { name: 'Taste of the Wild', country: 'Mỹ', badge: 'Thịt hun khói tự nhiên' },
  { name: 'Hill’s Science', country: 'Mỹ', badge: 'Chuyên gia khuyên dùng' },
  { name: 'Cature', country: 'Châu Âu', badge: 'Công nghệ sinh học' },
  { name: 'Wellness CORE', country: 'Mỹ', badge: 'Giàu đạm Grain-Free' },
  { name: 'Merrick', country: 'Mỹ', badge: 'Bữa ăn hữu cơ' },
];

export function BrandMarquee() {
  return (
    <section className="py-12 bg-white border-y border-stone-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
          ĐỐI TÁC THƯƠNG HIỆU HÀNG ĐẦU THẾ GIỚI
        </span>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="flex gap-8 items-center shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <Link
              key={`${brand.name}-${idx}`}
              href={`/products?brand=${encodeURIComponent(brand.name.toLowerCase())}`}
              className="flex flex-col items-center justify-center px-6 py-3 rounded-2xl bg-stone-50 border border-stone-200/70 hover:border-amber-400 hover:bg-amber-50/50 hover:shadow-xs transition-all shrink-0 min-w-[160px]"
            >
              <span className="font-extrabold text-stone-800 tracking-tight text-base">
                {brand.name}
              </span>
              <span className="text-[10px] text-stone-400 font-medium mt-0.5">
                {brand.country} • {brand.badge}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
