'use client';

import React from 'react';
import { RatingStars } from './RatingStars';
import type { RatingBreakdownProps } from '@/features/review/types/review.types';

export function RatingBreakdown({ average, totalReviews, distribution }: RatingBreakdownProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 bg-white rounded-[20px] ring-1 ring-[color:var(--color-hairline)] shadow-[var(--shadow-soft)]">
      
      {/* Cột Điểm trung bình */}
      <div className="flex flex-col items-center justify-center min-w-[140px] text-center">
        <span className="text-5xl font-bold text-stone-900 font-mono tabular-nums tracking-tight">
          {average.toFixed(1)}
        </span>
        <div className="mt-2 mb-1">
          <RatingStars rating={average} showAriaLabel={false} />
        </div>
        <span className="text-sm text-stone-500 font-medium">
          {totalReviews} đánh giá
        </span>
      </div>

      <div className="hidden md:block w-px h-24 bg-stone-200"></div>

      {/* Cột Phân bổ */}
      <div className="flex-1 w-full flex flex-col gap-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = distribution[star as keyof typeof distribution];
          const percentage = totalReviews === 0 ? 0 : Math.round((count / totalReviews) * 100);

          return (
            <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-8 text-xs font-semibold text-stone-600">
                <span className="font-mono tabular-nums leading-none">{star}</span>
                <span className="text-[10px] leading-none mb-[1px]">★</span>
              </div>
              
              <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              <div className="w-10 text-right text-xs font-mono tabular-nums text-stone-500">
                {count}
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
