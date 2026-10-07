'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, LayoutGrid, ListFilter, RotateCcw, X, ArrowUpDown } from 'lucide-react';
import { ProductCard } from '@/features/product/components/ProductCard';
import { ProductSidebarFilter } from '@/features/product/components/ProductSidebarFilter';
import { FilterChip } from '@/components/ui/FilterChip';
import { Pagination } from '@/components/ui/Pagination';
import { AppDrawer } from '@/components/ui/AppDrawer';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductSkeleton } from '@/components/ui/ProductSkeleton';
import { MOCK_PRODUCTS } from '@/features/product/data/mockProducts';
import type { ProductFilterState } from '@/features/product/types/product.types';

const ITEMS_PER_PAGE = 8;

export function ProductCatalogView({
  initialSpecies,
  initialCategory,
  initialSearchQuery,
  bannerTitle,
  bannerSubtitle,
}: {
  initialSpecies?: string;
  initialCategory?: string;
  initialSearchQuery?: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Read state from URL query or defaults
  const [filters, setFilters] = useState<ProductFilterState>(() => {
    const speciesParam = searchParams.get('species') || initialSpecies;
    const categoryParam = searchParams.get('category') || initialCategory;
    const brandParam = searchParams.get('brand');
    const sortParam = (searchParams.get('sort') as any) || 'popular';
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const inStockParam = searchParams.get('inStock') === 'true';
    const saleParam = searchParams.get('onSale') === 'true';

    return {
      species: speciesParam ? [speciesParam] : [],
      categories: categoryParam ? [categoryParam] : [],
      brands: brandParam ? [brandParam] : [],
      priceRange: [0, 10000000],
      inStockOnly: inStockParam,
      onSaleOnly: saleParam,
      sortBy: sortParam,
      page: pageParam || 1,
      searchQuery: initialSearchQuery || searchParams.get('q') || '',
    };
  });

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((item) => {
      // 1. Search Query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchBrand = item.brand.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchDesc) return false;
      }

      // 2. Species
      if (filters.species.length > 0) {
        if (!item.species || !filters.species.includes(item.species)) return false;
      }

      // 3. Category
      if (filters.categories.length > 0) {
        if (!item.category || !filters.categories.includes(item.category)) return false;
      }

      // 4. Brands
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(item.brand)) return false;
      }

      // 5. Price Range
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
        return false;
      }

      // 6. In Stock
      if (filters.inStockOnly && !item.inStock) {
        return false;
      }

      // 7. On Sale
      if (filters.onSaleOnly && (!item.originalPrice || item.originalPrice <= item.price)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'discount':
          const discA = a.originalPrice ? a.originalPrice - a.price : 0;
          const discB = b.originalPrice ? b.originalPrice - b.price : 0;
          return discB - discA;
        case 'popular':
        default:
          return (b.soldCount || 0) - (a.soldCount || 0);
      }
    });
  }, [filters]);

  const totalResults = filteredProducts.length;
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (filters.page - 1) * ITEMS_PER_PAGE,
    filters.page * ITEMS_PER_PAGE
  );

  const updateFilters = (newFilters: Partial<ProductFilterState>) => {
    startTransition(() => {
      setFilters((prev) => {
        const next = { ...prev, ...newFilters };
        // Sync URL parameters
        const params = new URLSearchParams();
        if (next.species.length > 0) params.set('species', next.species[0]);
        if (next.categories.length > 0) params.set('category', next.categories[0]);
        if (next.brands.length > 0) params.set('brand', next.brands[0]);
        if (next.sortBy && next.sortBy !== 'popular') params.set('sort', next.sortBy);
        if (next.page > 1) params.set('page', next.page.toString());
        if (next.searchQuery) params.set('q', next.searchQuery);
        if (next.inStockOnly) params.set('inStock', 'true');
        if (next.onSaleOnly) params.set('onSale', 'true');

        const qs = params.toString();
        router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
        return next;
      });
    });
  };

  const handleResetFilters = () => {
    updateFilters({
      species: [],
      categories: [],
      brands: [],
      priceRange: [0, 10000000],
      inStockOnly: false,
      onSaleOnly: false,
      sortBy: 'popular',
      page: 1,
      searchQuery: '',
    });
  };

  // Active filter count for badge
  const activeFilterCount =
    filters.species.length +
    filters.categories.length +
    filters.brands.length +
    (filters.priceRange[1] < 10000000 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner nếu có (cho categories/[slug] hoặc search) */}
      {(bannerTitle || filters.searchQuery) && (
        <div className="mb-8 p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-amber-100/70 via-orange-50/50 to-white border border-amber-200/60 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
            {filters.searchQuery ? 'Tìm kiếm sản phẩm' : 'Danh mục chọn lọc'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            {filters.searchQuery ? `Kết quả cho "${filters.searchQuery}"` : bannerTitle}
          </h1>
          {bannerSubtitle && (
            <p className="text-sm text-stone-600 mt-1 max-w-xl">{bannerSubtitle}</p>
          )}
        </div>
      )}

      {/* Main Layout: Sticky Sidebar (Desktop) + Products (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sticky Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <ProductSidebarFilter
            filters={filters}
            onFilterChange={updateFilters}
            onResetFilters={handleResetFilters}
            totalResults={totalResults}
          />
        </div>

        {/* Right Product Grid Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Control Bar: Total Count, Active Chips, Sort Dropdown & View Mode */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-stone-700">
                Tìm thấy <strong className="text-stone-900 tabular-nums">{totalResults}</strong> sản phẩm
              </span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-white border border-stone-200 px-3 py-1.5 rounded-xl shadow-2xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value as any, page: 1 })}
                  className="bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="popular">Phổ biến nhất</option>
                  <option value="newest">Mới cập bến</option>
                  <option value="price_asc">Giá tăng dần</option>
                  <option value="price_desc">Giá giảm dần</option>
                  <option value="rating">Đánh giá cao</option>
                  <option value="discount">Giảm giá sâu</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/80">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-400'
                  }`}
                  title="Xem dạng lưới"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-400'
                  }`}
                  title="Xem dạng danh sách"
                >
                  <ListFilter className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Lọc ({activeFilterCount})</span>
              </button>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-stone-500 font-medium">Đang lọc theo:</span>
              {filters.species.map((sp) => (
                <FilterChip
                  key={sp}
                  label={`Loài: ${sp}`}
                  isSelected
                  onRemove={() =>
                    updateFilters({ species: filters.species.filter((s) => s !== sp), page: 1 })
                  }
                />
              ))}
              {filters.categories.map((cat) => (
                <FilterChip
                  key={cat}
                  label={`Danh mục: ${cat}`}
                  isSelected
                  onRemove={() =>
                    updateFilters({ categories: filters.categories.filter((c) => c !== cat), page: 1 })
                  }
                />
              ))}
              {filters.brands.map((b) => (
                <FilterChip
                  key={b}
                  label={`Hãng: ${b}`}
                  isSelected
                  onRemove={() =>
                    updateFilters({ brands: filters.brands.filter((brand) => brand !== b), page: 1 })
                  }
                />
              ))}
              {filters.priceRange[1] < 10000000 && (
                <FilterChip
                  label={`Giá: ≤ ${(filters.priceRange[1] / 1000).toLocaleString('vi-VN')}k`}
                  isSelected
                  onRemove={() => updateFilters({ priceRange: [0, 10000000], page: 1 })}
                />
              )}
              {filters.inStockOnly && (
                <FilterChip
                  label="Chỉ còn hàng"
                  isSelected
                  onRemove={() => updateFilters({ inStockOnly: false, page: 1 })}
                />
              )}
              {filters.onSaleOnly && (
                <FilterChip
                  label="Đang giảm giá"
                  isSelected
                  onRemove={() => updateFilters({ onSaleOnly: false, page: 1 })}
                />
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold underline ml-1 cursor-pointer"
              >
                Xóa tất cả
              </button>
            </div>
          )}

          {/* Product Items Grid */}
          {isPending ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="py-16">
              <EmptyState
                title="Không tìm thấy sản phẩm phù hợp"
                description="Thử đổi từ khóa tìm kiếm hoặc bỏ bớt các tiêu chí bộ lọc để xem nhiều sản phẩm hơn."
                actionLabel="Xóa toàn bộ bộ lọc"
                onAction={handleResetFilters}
              />
            </div>
          ) : (
            <div
              className={`grid ${
                viewMode === 'grid'
                  ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
                  : 'grid-cols-1 gap-4'
              }`}
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-10 flex justify-center">
              <Pagination
                current={filters.page}
                total={totalResults}
                pageSize={ITEMS_PER_PAGE}
                onChange={(p) => updateFilters({ page: p })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AppDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        title="Bộ lọc sản phẩm"
        placement="left"
        width={340}
        footer={
          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex-1 h-11 rounded-xl border border-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
            >
              Đặt lại
            </button>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex-2 h-11 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Áp dụng ({totalResults} kết quả)
            </button>
          </div>
        }
      >
        <div className="p-4">
          <ProductSidebarFilter
            filters={filters}
            onFilterChange={updateFilters}
            onResetFilters={handleResetFilters}
            totalResults={totalResults}
          />
        </div>
      </AppDrawer>
    </div>
  );
}
