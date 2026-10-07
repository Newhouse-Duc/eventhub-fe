'use client';

import React, { useState } from 'react';
import { Tag, Check, AlertCircle, Sparkles } from 'lucide-react';
import { AppModal } from '@/components/ui/AppModal';
import type { VoucherItem, VoucherModalProps } from '@/features/cart/types/cart.types';

export const AVAILABLE_VOUCHERS: VoucherItem[] = [
  {
    code: 'PAW15',
    title: 'Giảm 15% cho Đơn Hàng Đầu Tiên',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 300000,
    description: 'Áp dụng cho khách hàng mới gia nhập câu lạc bộ Pawfect Club.',
    expiryDate: '31/12/2026',
  },
  {
    code: 'FREESHIP',
    title: 'Miễn Phí Vận Chuyển Toàn Quốc',
    discountType: 'fixed',
    discountValue: 30000,
    minOrderValue: 499000,
    description: 'Hỗ trợ tối đa 30.000₫ phí vận chuyển cho đơn hàng từ 499k.',
    expiryDate: '31/10/2026',
  },
  {
    code: 'PETVIP50',
    title: 'Giảm 50.000₫ Cho Đơn Hàng Dinh Dưỡng',
    discountType: 'fixed',
    discountValue: 50000,
    minOrderValue: 700000,
    description: 'Dành cho đơn hàng mua các dòng hạt Orijen, Royal Canin hoặc Acana.',
    expiryDate: '15/11/2026',
  },
];

export function VoucherModal({
  isOpen,
  onClose,
  onSelectVoucher,
  currentSubtotal,
  selectedCode,
}: VoucherModalProps) {
  const [customCode, setCustomCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleApplyCustom = () => {
    setErrorMsg('');
    const clean = customCode.trim().toUpperCase();
    const found = AVAILABLE_VOUCHERS.find((v) => v.code === clean);
    if (!found) {
      setErrorMsg('Mã voucher không tồn tại hoặc đã hết hạn.');
      return;
    }
    if (currentSubtotal < found.minOrderValue) {
      setErrorMsg(`Đơn hàng tối thiểu ${found.minOrderValue.toLocaleString('vi-VN')}₫ để áp dụng mã này.`);
      return;
    }
    onSelectVoucher(found);
    onClose();
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-600" />
          <span>Voucher Ưu Đãi Của Bạn</span>
        </div>
      }
      width={480}
    >
      <div className="space-y-5">
        {/* Custom Input */}
        <div className="space-y-1.5">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nhập mã voucher (vd: PAW15)..."
              value={customCode}
              onChange={(e) => {
                setCustomCode(e.target.value);
                setErrorMsg('');
              }}
              className="flex-1 h-11 px-3.5 rounded-xl border border-stone-200 text-xs font-mono uppercase text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
            <button
              type="button"
              onClick={handleApplyCustom}
              className="h-11 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
            >
              Áp dụng
            </button>
          </div>
          {errorMsg && (
            <p className="text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </p>
          )}
        </div>

        {/* Voucher List */}
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
            Mã ưu đãi khả dụng
          </span>

          {AVAILABLE_VOUCHERS.map((voucher) => {
            const isEligible = currentSubtotal >= voucher.minOrderValue;
            const isSelected = selectedCode === voucher.code;

            return (
              <div
                key={voucher.code}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : isEligible
                    ? 'border-stone-200 bg-white hover:border-amber-300'
                    : 'border-stone-200/60 bg-stone-50/50 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded-md border border-stone-200">
                        {voucher.code}
                      </span>
                      {isSelected && (
                        <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Đang áp dụng</span>
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-stone-800 mt-1.5">{voucher.title}</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">{voucher.description}</p>
                  </div>

                  <button
                    type="button"
                    disabled={!isEligible || isSelected}
                    onClick={() => {
                      onSelectVoucher(voucher);
                      onClose();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-amber-100 text-amber-800 cursor-default'
                        : isEligible
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-2xs'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {isSelected ? 'Đã chọn' : 'Dùng ngay'}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-100 text-stone-400">
                  <span>Đơn tối thiểu: {voucher.minOrderValue.toLocaleString('vi-VN')}₫</span>
                  <span>HSD: {voucher.expiryDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppModal>
  );
}
