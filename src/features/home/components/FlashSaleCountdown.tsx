'use client';

import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import type { FlashSaleCountdownProps } from '@/features/home/types/home.types';

export function FlashSaleCountdown({ initialSeconds = 8049 }: FlashSaleCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (secondsLeft <= 0) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 bg-stone-900 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
      <Timer className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
      <span className="text-stone-300 hidden sm:inline">Kết thúc trong:</span>
      <div className="flex items-center gap-1 font-mono tabular-nums text-sm font-bold text-amber-400">
        <span className="bg-stone-800 px-1.5 py-0.5 rounded text-center min-w-[24px]">
          {pad(hours)}
        </span>
        <span>:</span>
        <span className="bg-stone-800 px-1.5 py-0.5 rounded text-center min-w-[24px]">
          {pad(minutes)}
        </span>
        <span>:</span>
        <span className="bg-stone-800 px-1.5 py-0.5 rounded text-center min-w-[24px]">
          {pad(seconds)}
        </span>
      </div>
    </div>
  );
}
