'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Sparkles, MapPin, ArrowUpRight } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { MOCK_BRANDS } from '../data/mockBrands';
import type { BrandItem } from '../types/brand.types';

export function BrandsIndexView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  // Compute available letters
  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    MOCK_BRANDS.forEach((brand) => {
      letters.add(brand.name.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, []);

  const filteredBrands = useMemo(() => {
    return MOCK_BRANDS.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.country.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLetter =
        selectedLetter === 'ALL' || brand.name.charAt(0).toUpperCase() === selectedLetter;

      return matchesSearch && matchesLetter;
    });
  }, [searchQuery, selectedLetter]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full inline-block mb-3">
          Đối Tác Phân Phối Chính Hãng
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Thương Hiệu Toàn Cầu
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Pet Luxury liên kết trực tiếp với hơn 20+ nhà sản xuất dinh dưỡng & phụ kiện danh tiếng từ Bắc Mỹ, Châu Âu và Nhật Bản.
        </p>
      </div>

      {/* Search and Alphabet Controls */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên thương hiệu hoặc quốc gia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-full border border-stone-200 bg-white text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 shadow-xs"
          />
        </div>

        {/* Sticky Alphabet Filter Bar */}
        <div className="sticky top-20 z-30 py-2 bg-[#FDFBF7]/90 backdrop-blur-md">
          <div className="flex items-center justify-center flex-wrap gap-1 max-w-2xl mx-auto px-4">
            <button
              type="button"
              onClick={() => setSelectedLetter('ALL')}
              className={`h-8 px-3 rounded-full text-xs font-bold transition-all ${
                selectedLetter === 'ALL'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              TẤT CẢ
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(letter)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  selectedLetter === letter
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.slug}`} className="group block">
              <Bezel className="p-6 h-full flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lift)]">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl bg-white border border-stone-200/80 p-1.5 overflow-hidden shrink-0 shadow-xs">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-cover rounded-xl"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {brand.country}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span>{brand.productCount} sản phẩm có sẵn</span>
                  {brand.featured && (
                    <span className="text-amber-700 font-semibold flex items-center gap-1 font-sans">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Nổi bật
                    </span>
                  )}
                </div>
              </Bezel>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-xs text-stone-500">
          Không tìm thấy thương hiệu phù hợp với từ khoá &quot;{searchQuery}&quot;.
        </div>
      )}
    </div>
  );
}
