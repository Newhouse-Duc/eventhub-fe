import React from 'react';
import { Crown, Sparkles } from 'lucide-react';
import type { VipMemberCardProps } from '@/features/account/types/account.types';

export function VipMemberCard({
  tier = 'Gold',
  points = 1850,
  nextTierPoints = 3000,
  memberCode = 'PET-VIP-8899',
}: Partial<VipMemberCardProps>) {
  const percent = Math.min(100, Math.round((points / nextTierPoints) * 100));

  return (
    <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white shadow-md border border-amber-500/20">
      {/* Decorative Blur Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

      {/* Top Header: Badge & Tier */}
      <div className="flex items-center justify-between relative z-10 mb-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5 fill-current" />
          <span>Hội Viên {tier}</span>
        </div>
        <span className="font-mono text-[10px] text-stone-400 font-bold">{memberCode}</span>
      </div>

      {/* Points info */}
      <div className="relative z-10 space-y-1 mb-3">
        <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block">
          Điểm tích lũy PawPoints
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold font-mono text-amber-400 tabular-nums">
            {points.toLocaleString('vi-VN')}
          </span>
          <span className="text-xs text-stone-400 font-medium">/ {nextTierPoints.toLocaleString('vi-VN')} điểm</span>
        </div>
      </div>

      {/* Progress Bar to next tier */}
      <div className="relative z-10 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-stone-400">
          <span>Tiến độ lên hạng Kim Cương</span>
          <span className="font-bold text-amber-400 font-mono tabular-nums">{percent}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-stone-700/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
