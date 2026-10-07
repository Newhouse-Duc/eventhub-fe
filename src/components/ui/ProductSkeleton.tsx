import React from 'react';
import { Bezel } from '@/components/ui/bezel';

export function ProductSkeleton() {
  return (
    <Bezel className="h-full flex flex-col">
      {/* Vùng Ảnh */}
      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden rounded-t-[22px] rounded-b-md animate-pulse">
        <div className="absolute inset-0 bg-stone-200/50" />
      </div>

      {/* Nội dung */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Brand */}
        <div className="w-16 h-3 bg-stone-200 rounded animate-pulse" />
        
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <div className="w-full h-4 bg-stone-200 rounded animate-pulse" />
          <div className="w-2/3 h-4 bg-stone-200 rounded animate-pulse" />
        </div>
        
        {/* Rating */}
        <div className="w-24 h-3 bg-stone-200 rounded animate-pulse mt-auto" />

        {/* Price */}
        <div className="w-1/2 h-5 bg-stone-200 rounded animate-pulse" />

        {/* Nút thêm giỏ hàng */}
        <div className="w-full h-10 bg-stone-200 rounded-full animate-pulse mt-1" />
      </div>
    </Bezel>
  );
}
