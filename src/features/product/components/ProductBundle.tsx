'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Equal, ShoppingBag, Check } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import type { ProductCardProps, ProductBundleProps } from '@/features/product/types/product.types';

export function ProductBundle({
  mainProduct,
  bundleAddons,
  discountPercent = 10,
}: ProductBundleProps) {
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(
    bundleAddons.map((item) => item.id)
  );
  const [isAdded, setIsAdded] = useState(false);

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeAddons = bundleAddons.filter((item) => selectedAddonIds.includes(item.id));
  const rawTotal =
    mainProduct.price + activeAddons.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = Math.round(rawTotal * (1 - (selectedAddonIds.length > 0 ? discountPercent / 100 : 0)));

  const handleAddBundle = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="p-6 sm:p-8 rounded-[28px] bg-stone-50/80 border border-stone-200/80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
            Combo Tiết Kiệm
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
            Sản phẩm thường mua cùng nhau
          </h3>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
          Giảm thêm {discountPercent}% khi mua combo
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Products Visual Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 flex-1">
          {/* Main Product */}
          <div className="flex flex-col items-center max-w-[140px] text-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-2xs">
              <Image
                src={mainProduct.thumbnail}
                alt={mainProduct.name}
                fill
                sizes="120px"
                className="object-cover"
              />
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-600 text-white text-[9px] font-bold">
                Chính
              </span>
            </div>
            <p className="text-xs font-semibold text-stone-800 line-clamp-1 mt-2">
              {mainProduct.name}
            </p>
            <PriceDisplay price={mainProduct.price} size="sm" className="mt-0.5" />
          </div>

          {/* Addon Products */}
          {bundleAddons.map((addon) => {
            const isSelected = selectedAddonIds.includes(addon.id);
            return (
              <React.Fragment key={addon.id}>
                <Plus className="w-5 h-5 text-stone-400 shrink-0" />
                <div className="flex flex-col items-center max-w-[140px] text-center">
                  <div
                    onClick={() => toggleAddon(addon.id)}
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-2 overflow-hidden shadow-2xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-600 ring-2 ring-amber-600/20'
                        : 'border-stone-200 opacity-60'
                    }`}
                  >
                    <Image
                      src={addon.thumbnail}
                      alt={addon.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleAddon(addon.id)}
                      className="absolute top-2 left-2 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs font-semibold text-stone-800 line-clamp-1 mt-2">
                    {addon.name}
                  </p>
                  <PriceDisplay price={addon.price} size="sm" className="mt-0.5" />
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Calculation & Action Block */}
        <div className="w-full lg:w-72 p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between shrink-0 space-y-4">
          <div>
            <div className="text-xs text-stone-500">
              Tổng tiền combo ({1 + selectedAddonIds.length} món):
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <PriceDisplay price={discountedTotal} size="lg" className="text-amber-800" />
              {selectedAddonIds.length > 0 && (
                <span className="text-xs text-stone-400 line-through">
                  {rawTotal.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>
            {selectedAddonIds.length > 0 && (
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                Tiết kiệm {(rawTotal - discountedTotal).toLocaleString('vi-VN')}₫
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddBundle}
            className="w-full h-11 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Đã thêm combo vào giỏ!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm cả {1 + selectedAddonIds.length} vào giỏ hàng</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
