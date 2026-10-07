import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import type { RatingStarsProps } from '@/features/review/types/review.types';

export function RatingStars({ rating, className = '', showAriaLabel = true }: RatingStarsProps) {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(roundedRating);

  return (
    <div 
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={showAriaLabel ? `${rating.toFixed(1)} trên 5 sao` : undefined}
      title={`${rating.toFixed(1)} / 5 sao`}
    >
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
      ))}
      
      {hasHalfStar && (
        <div className="relative w-3.5 h-3.5">
          <Star className="w-3.5 h-3.5 text-stone-300 fill-stone-300 absolute inset-0" />
          <StarHalf className="w-3.5 h-3.5 text-amber-500 fill-amber-500 absolute inset-0 z-10" />
        </div>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-3.5 h-3.5 text-stone-300 fill-stone-300" />
      ))}
    </div>
  );
}
