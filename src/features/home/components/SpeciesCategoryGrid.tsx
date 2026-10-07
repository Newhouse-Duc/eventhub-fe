import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { SpeciesCategory } from '@/features/home/types/home.types';

const SPECIES: SpeciesCategory[] = [
  {
    id: 'dog',
    name: 'Dành cho Cún',
    emoji: '🐶',
    count: '320+ sản phẩm',
    href: '/products?species=dog',
    badge: 'Phổ biến',
    bgGradient: 'from-amber-100/70 to-orange-50/50',
  },
  {
    id: 'cat',
    name: 'Dành cho Mèo',
    emoji: '🐱',
    count: '280+ sản phẩm',
    href: '/products?species=cat',
    badge: 'Yêu thích',
    bgGradient: 'from-rose-100/70 to-orange-50/50',
  },
  {
    id: 'fish',
    name: 'Cá cảnh & Thủy sinh',
    emoji: '🐟',
    count: '95+ sản phẩm',
    href: '/products?species=fish',
    bgGradient: 'from-sky-100/70 to-cyan-50/50',
  },
  {
    id: 'bird',
    name: 'Chim cảnh',
    emoji: '🐦',
    count: '64+ sản phẩm',
    href: '/products?species=bird',
    bgGradient: 'from-teal-100/70 to-emerald-50/50',
  },
  {
    id: 'small-pet',
    name: 'Thú nhỏ (Hamster, Thỏ)',
    emoji: '🐹',
    count: '110+ sản phẩm',
    href: '/products?species=small-pet',
    bgGradient: 'from-purple-100/70 to-pink-50/50',
  },
];

export function SpeciesCategoryGrid() {
  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
            Danh mục theo loài
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
            Mua sắm theo người bạn nhỏ
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 group"
        >
          <span>Xem tất cả danh mục</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {SPECIES.map((species) => (
          <Link
            key={species.id}
            href={species.href}
            className="group relative p-5 rounded-[22px] bg-white border border-stone-200/80 hover:border-amber-300 hover:shadow-[var(--shadow-lift)] transition-all duration-300 flex flex-col items-center text-center cursor-pointer overflow-hidden"
          >
            {/* Subtle Gradient Glow */}
            <div className={`absolute inset-0 bg-gradient-to-b ${species.bgGradient} opacity-30 group-hover:opacity-60 transition-opacity`} />

            {/* Badge */}
            {species.badge && (
              <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-amber-800 shadow-2xs border border-amber-200/60">
                {species.badge}
              </span>
            )}

            {/* Emoji Bubble */}
            <div className="relative w-16 h-16 rounded-full bg-white border border-stone-200/70 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 mb-3 mt-1">
              <span>{species.emoji}</span>
            </div>

            {/* Name & Count */}
            <h3 className="relative text-sm font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
              {species.name}
            </h3>
            <p className="relative text-xs text-stone-500 mt-0.5">
              {species.count}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
