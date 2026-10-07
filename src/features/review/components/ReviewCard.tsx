'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, CheckCircle2 } from 'lucide-react';
import { Image as AntImage } from 'antd'; // For Lightbox
import { Bezel } from '@/components/ui/bezel';
import { RatingStars } from './RatingStars';
import type { ReviewProps } from '@/features/review/types/review.types';

export function ReviewCard({
  id,
  authorName,
  authorAvatar,
  isVerifiedPurchase,
  rating,
  dateStr,
  content,
  images = [],
  helpfulCount = 0,
  petTag,
}: ReviewProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [currentHelpfulCount, setCurrentHelpfulCount] = useState(helpfulCount);

  // Ẩn bớt tên: Nguyễn T***
  const obfuscateName = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      const n = parts[0];
      return n.length > 2 ? `${n.substring(0, 1)}***` : n;
    }
    const lastWord = parts[parts.length - 1];
    return `${parts.slice(0, -1).join(' ')} ${lastWord.substring(0, 1)}***`;
  };

  const handleHelpfulClick = () => {
    setIsHelpful(!isHelpful);
    setCurrentHelpfulCount((prev) => (isHelpful ? prev - 1 : prev + 1));
  };

  const speciesEmoji = {
    dog: '🐶',
    cat: '🐱',
    bird: '🐦',
    fish: '🐟',
    small_pet: '🐹',
  };

  return (
    <Bezel className="w-full">
      <div className="p-4 sm:p-5 flex flex-col gap-4">
        {/* Header: Avatar, Name, Rating */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center overflow-hidden shrink-0 border border-stone-200">
              {authorAvatar ? (
                <Image src={authorAvatar} alt={authorName} width={40} height={40} className="object-cover" />
              ) : (
                <span className="text-stone-500 font-bold text-sm">
                  {authorName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-stone-900 text-sm">
                  {obfuscateName(authorName)}
                </span>
                {isVerifiedPurchase && (
                  <div className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-medium leading-none">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Đã mua hàng</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={rating} />
                <span className="text-xs text-stone-400 font-medium">{dateStr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pet Tag */}
        {petTag && (
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs px-2.5 py-1.5 rounded-lg w-fit font-medium">
            <span>{speciesEmoji[petTag.species]}</span>
            <span>
              {petTag.breed || 'Thú cưng'}
              {petTag.ageText ? ` · ${petTag.ageText}` : ''}
              {petTag.weightStr ? ` · ${petTag.weightStr}` : ''}
            </span>
          </div>
        )}

        {/* Content */}
        <p className="text-sm text-stone-700 leading-relaxed">
          {content}
        </p>

        {/* Images (Lightbox) */}
        {images.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-1">
            <AntImage.PreviewGroup>
              {images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-stone-200 cursor-zoom-in relative">
                  <AntImage
                    src={img}
                    alt={`Review image ${idx + 1}`}
                    width={80}
                    height={80}
                    className="object-cover"
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // grey placeholder
                  />
                  {idx === 3 && images.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold pointer-events-none">
                      +{images.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </AntImage.PreviewGroup>
          </div>
        )}

        {/* Footer: Helpful button */}
        <div className="flex items-center justify-end border-t border-stone-100 pt-3 mt-1">
          <button
            type="button"
            onClick={handleHelpfulClick}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors active:scale-95 ${
              isHelpful 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>Hữu ích ({currentHelpfulCount})</span>
          </button>
        </div>
      </div>
    </Bezel>
  );
}
