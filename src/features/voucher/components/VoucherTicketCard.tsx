'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Ticket, Clock } from 'lucide-react';
import { App } from 'antd';
import type { VoucherItem } from '../types/voucher.types';

interface VoucherTicketCardProps {
  voucher: VoucherItem;
}

export function VoucherTicketCard({ voucher }: VoucherTicketCardProps) {
  const { message } = App.useApp();
  const [copied, setCopied] = useState(false);

  const isAvailable = voucher.status === 'available';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucher.code);
    setCopied(true);
    message.success(`Đã sao chép mã ${voucher.code}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative flex flex-col sm:flex-row bg-white rounded-2xl border transition-all ${
        isAvailable
          ? 'border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-md'
          : 'border-stone-200 opacity-60 bg-stone-50/50'
      }`}
    >
      {/* Left side: Voucher value */}
      <div className="sm:w-36 p-5 flex flex-col items-center justify-center text-center bg-amber-500/5 rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl border-b sm:border-b-0 sm:border-r border-dashed border-amber-200 relative">
        {/* Notches for ticket effect */}
        <div className="hidden sm:block absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#FDFBF7] border border-amber-200/80 -z-0" />
        <div className="hidden sm:block absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-[#FDFBF7] border border-amber-200/80 -z-0" />

        <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center mb-2">
          <Ticket className="w-5 h-5" />
        </div>
        <span className="text-xl font-black text-amber-700 tracking-tight font-mono tabular-nums">
          {voucher.discountType === 'percentage'
            ? `${voucher.discountValue}%`
            : voucher.discountType === 'shipping'
            ? 'FREESHIP'
            : `${(voucher.discountValue / 1000).toLocaleString('vi-VN')}k`}
        </span>
        <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider mt-0.5">
          GIẢM GIÁ
        </span>
      </div>

      {/* Right side: Details and Actions */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-stone-100 text-stone-800 border border-stone-200/80">
              {voucher.code}
            </span>
            <span className="text-xs text-stone-500 flex items-center gap-1 font-mono tabular-nums">
              <Clock className="w-3 h-3 text-stone-400" />
              HSD: {voucher.expiresAt}
            </span>
          </div>

          <h3 className="text-sm font-bold text-stone-900 mt-2">
            {voucher.title}
          </h3>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            {voucher.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <span className="text-[11px] text-stone-500">
            Đơn tối thiểu {voucher.minOrderValue.toLocaleString('vi-VN')}₫
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              disabled={!isAvailable}
              className="h-8 px-3 rounded-full border border-stone-200 hover:border-amber-400 hover:bg-amber-50 text-stone-700 hover:text-amber-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Đã sao chép' : 'Sao chép'}
            </button>

            {isAvailable && (
              <Link
                href="/products"
                className="h-8 px-3.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors active:scale-[0.98]"
              >
                Dùng ngay
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
