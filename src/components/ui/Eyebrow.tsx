import React from 'react';
import type { EyebrowProps } from '@/components/ui/types/ui.types';

export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <span className={`text-[11px] uppercase tracking-[0.15em] text-stone-500 font-semibold ${className}`}>
      {children}
    </span>
  );
}
