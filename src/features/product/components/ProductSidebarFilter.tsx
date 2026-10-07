'use client';

import React, { useState } from 'react';
import { Search, RotateCcw, Check, ChevronDown } from 'lucide-react';
import type { ProductSidebarFilterProps } from '@/features/product/types/product.types';

const SPECIES_OPTIONS = [
  { id: 'dog', label: 'Cún cưng 🐶' },
  { id: 'cat', label: 'Mèo cưng 🐱' },
  { id: 'fish', label: 'Cá & Thủy sinh 🐟' },
  { id: 'bird', label: 'Chim cảnh 🐦' },
  { id: 'small-pet', label: 'Thú nhỏ 🐹' },
];

const CATEGORY_OPTIONS = [
  { id: 'food', label: 'Thức ăn hạt khô' },
  { id: 'pate', label: 'Pate & Thức ăn ướt' },
  { id: 'hygiene', label: 'Vệ sinh & Cát vệ sinh' },
  { id: 'accessories', label: 'Đệm nằm & Phụ kiện' },
  { id: 'health', label: 'Sức khỏe & Chăm sóc lông' },
];

const BRAND_OPTIONS = [
  'Orijen',
  'Royal Canin',
  'Cature',
  'Pet Luxury',
  'Douxo S3',
  'Tetra',
  'Versele-Laga',
  'Acana',
];

const PRICE_TIERS: { label: string; range: [number, number] }[] = [
  { label: 'Tất cả mức giá', range: [0, 10000000] },
  { label: 'Dưới 200.000₫', range: [0, 200000] },
  { label: '200.000₫ - 500.000₫', range: [200000, 500000] },
  { label: '500.000₫ - 1.000.000₫', range: [500000, 1000000] },
  { label: 'Trên 1.000.000₫', range: [1000000, 10000000] },
];

export function ProductSidebarFilter({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  className = '',
}: ProductSidebarFilterProps) {
  const [brandSearch, setBrandSearch] = useState('');
  const [openSections, setOpenSections] = useState({
    species: true,
    category: true,
    brand: true,
    price: true,
    status: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSpeciesToggle = (id: string) => {
    const current = filters.species || [];
    const next = current.includes(id) ? current.filter((s) => s !== id) : [...current, id];
    onFilterChange({ species: next, page: 1 });
  };

  const handleCategoryToggle = (id: string) => {
    const current = filters.categories || [];
    const next = current.includes(id) ? current.filter((c) => c !== id) : [...current, id];
    onFilterChange({ categories: next, page: 1 });
  };

  const handleBrandToggle = (brand: string) => {
    const current = filters.brands || [];
    const next = current.includes(brand) ? current.filter((b) => b !== brand) : [...current, brand];
    onFilterChange({ brands: next, page: 1 });
  };

  const filteredBrands = BRAND_OPTIONS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase().trim())
  );

  return (
    <aside className={`w-full space-y-6 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-stone-900 text-sm tracking-tight uppercase">
            Bộ lọc sản phẩm
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold tabular-nums">
            {totalResults}
          </span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-amber-700 font-semibold cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* 1. Loài (Species) */}
      <div className="space-y-3 pb-4 border-b border-stone-200/80">
        <button
          type="button"
          onClick={() => toggleSection('species')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
        >
          <span>Dành cho loài</span>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform ${
              openSections.species ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.species && (
          <div className="space-y-2 pt-1">
            {SPECIES_OPTIONS.map((item) => {
              const isChecked = filters.species?.includes(item.id);
              return (
                <label
                  key={item.id}
                  className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-900 cursor-pointer select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleSpeciesToggle(item.id)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer accent-amber-600"
                  />
                  <span>{item.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Danh mục (Category) */}
      <div className="space-y-3 pb-4 border-b border-stone-200/80">
        <button
          type="button"
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
        >
          <span>Danh mục</span>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform ${
              openSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.category && (
          <div className="space-y-2 pt-1">
            {CATEGORY_OPTIONS.map((item) => {
              const isChecked = filters.categories?.includes(item.id);
              return (
                <label
                  key={item.id}
                  className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-900 cursor-pointer select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(item.id)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer accent-amber-600"
                  />
                  <span>{item.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Thương hiệu (Brand with Search input) */}
      <div className="space-y-3 pb-4 border-b border-stone-200/80">
        <button
          type="button"
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
        >
          <span>Thương hiệu</span>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform ${
              openSections.brand ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.brand && (
          <div className="space-y-2.5 pt-1">
            {/* Quick search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm thương hiệu..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full h-8 pl-8 pr-2.5 rounded-lg bg-stone-100 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
              {filteredBrands.map((brand) => {
                const isChecked = filters.brands?.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-900 cursor-pointer select-none py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer accent-amber-600"
                    />
                    <span>{brand}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Khoảng giá (Price range) */}
      <div className="space-y-3 pb-4 border-b border-stone-200/80">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
        >
          <span>Khoảng giá</span>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform ${
              openSections.price ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.price && (
          <div className="space-y-2 pt-1">
            {PRICE_TIERS.map((tier, idx) => {
              const isSelected =
                filters.priceRange[0] === tier.range[0] &&
                filters.priceRange[1] === tier.range[1];
              return (
                <label
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-900 cursor-pointer select-none py-0.5"
                >
                  <input
                    type="radio"
                    name="priceRangeRadio"
                    checked={isSelected}
                    onChange={() => onFilterChange({ priceRange: tier.range, page: 1 })}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer accent-amber-600"
                  />
                  <span>{tier.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Tình trạng hàng & Khuyến mãi (Status) */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => toggleSection('status')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 cursor-pointer"
        >
          <span>Tình trạng</span>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform ${
              openSections.status ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.status && (
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-900 cursor-pointer select-none py-0.5">
              <input
                type="checkbox"
                checked={!!filters.inStockOnly}
                onChange={(e) => onFilterChange({ inStockOnly: e.target.checked, page: 1 })}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer accent-amber-600"
              />
              <span>Chỉ hiển thị còn hàng</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-900 cursor-pointer select-none py-0.5">
              <input
                type="checkbox"
                checked={!!filters.onSaleOnly}
                onChange={(e) => onFilterChange({ onSaleOnly: e.target.checked, page: 1 })}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 cursor-pointer accent-amber-600"
              />
              <span>Đang có ưu đãi / Giảm giá</span>
            </label>
          </div>
        )}
      </div>
    </aside>
  );
}
