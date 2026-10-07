'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Image as AntImage } from 'antd';
import { ZoomIn } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import type { ProductGalleryProps } from '@/features/product/types/product.types';

export function ProductGallery({ images, productName, className = '' }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];

  return (
    <div className={`flex flex-col-reverse sm:flex-row gap-4 ${className}`}>
      {/* Vertical Thumbnails (Desktop/Tablet) */}
      <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[540px] shrink-0 pb-1 sm:pb-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
              activeIndex === idx
                ? 'border-amber-600 ring-2 ring-amber-600/20 scale-102'
                : 'border-stone-200/80 hover:border-stone-300 opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Large Image with Zoom / Lightbox */}
      <div className="flex-1 relative">
        <Bezel className="relative aspect-[1/1] sm:aspect-[4/4.5] w-full overflow-hidden bg-stone-50 rounded-[28px] group">
          <div className="relative w-full h-full cursor-zoom-in">
            <Image
              src={activeImage}
              alt={productName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Overlay zoom icon */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        </Bezel>
      </div>
    </div>
  );
}
