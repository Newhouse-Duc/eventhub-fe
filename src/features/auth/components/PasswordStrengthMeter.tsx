'use client';

import React, { useMemo } from 'react';
import { Check, X } from 'lucide-react';
import type { PasswordStrengthMeterProps, PasswordCriterion, PasswordStrength } from '@/features/auth/types/auth.types';

export function PasswordStrengthMeter({
  password = '',
  className = '',
}: PasswordStrengthMeterProps) {
  const criteria: PasswordCriterion[] = useMemo(() => [
    {
      id: 'length',
      label: 'Tối thiểu 8 ký tự',
      isValid: password.length >= 8,
    },
    {
      id: 'uppercase',
      label: 'Có chữ hoa (A-Z)',
      isValid: /[A-Z]/.test(password),
    },
    {
      id: 'number',
      label: 'Có số (0-9)',
      isValid: /[0-9]/.test(password),
    },
    {
      id: 'special',
      label: 'Có ký tự đặc biệt (!@#$...)',
      isValid: /[^A-Za-z0-9]/.test(password),
    },
  ], [password]);

  const strength: PasswordStrength = useMemo(() => {
    if (!password) {
      return { score: 0, label: 'Chưa nhập', color: 'bg-stone-200', percent: 0 };
    }
    const validCount = criteria.filter((c) => c.isValid).length;
    switch (validCount) {
      case 1:
        return { score: 1, label: 'Yếu', color: 'bg-rose-500', percent: 25 };
      case 2:
        return { score: 2, label: 'Trung bình', color: 'bg-amber-500', percent: 50 };
      case 3:
        return { score: 3, label: 'Khá mạnh', color: 'bg-teal-500', percent: 75 };
      case 4:
        return { score: 4, label: 'Rất an toàn', color: 'bg-emerald-600', percent: 100 };
      default:
        return { score: 0, label: 'Rất yếu', color: 'bg-rose-400', percent: 10 };
    }
  }, [password, criteria]);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* 4-tier Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-stone-500 font-medium">Độ mạnh mật khẩu</span>
          <span className={`font-semibold tabular-nums ${
            strength.score >= 4 ? 'text-emerald-700' :
            strength.score === 3 ? 'text-teal-700' :
            strength.score === 2 ? 'text-amber-700' :
            strength.score === 1 ? 'text-rose-600' : 'text-stone-400'
          }`}>
            {password ? strength.label : 'Chưa nhập'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
          {[1, 2, 3, 4].map((tier) => {
            const isFilled = strength.score >= tier;
            return (
              <div
                key={tier}
                className={`h-full rounded-full transition-all duration-300 ${
                  isFilled ? strength.color : 'bg-stone-200'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Criteria Checklist with green ticks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
        {criteria.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-1.5 transition-colors duration-200 ${
              item.isValid ? 'text-emerald-700 font-medium' : 'text-stone-400'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                item.isValid ? 'bg-emerald-100 text-emerald-600' : 'bg-stone-100 text-stone-300'
              }`}
            >
              {item.isValid ? (
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              ) : (
                <X className="w-2.5 h-2.5 stroke-[2]" />
              )}
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
