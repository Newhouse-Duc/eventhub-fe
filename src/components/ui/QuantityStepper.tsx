'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Tooltip } from 'antd';
import type { QuantityStepperProps } from '@/components/ui/types/ui.types';

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className = '',
  debounceMs = 300,
}: QuantityStepperProps) {
  const [internalValue, setInternalValue] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync prop value to internal state if changed externally
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const triggerChange = useCallback((newValue: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  }, [onChange, debounceMs]);

  const handleDecrease = () => {
    if (internalValue > min) {
      const newValue = internalValue - 1;
      setInternalValue(newValue);
      triggerChange(newValue);
    }
  };

  const handleIncrease = () => {
    if (internalValue < max) {
      const newValue = internalValue + 1;
      setInternalValue(newValue);
      triggerChange(newValue);
    }
  };

  return (
    <div className={`inline-flex items-center h-11 rounded-full ring-1 ring-[color:var(--color-hairline)] bg-white ${className}`}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={internalValue <= min}
        className="w-10 h-full flex items-center justify-center text-stone-600 hover:text-amber-700 disabled:opacity-40 disabled:hover:text-stone-600 transition-colors cursor-pointer rounded-l-full"
        aria-label="Giảm số lượng"
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <div className="w-10 text-center font-mono tabular-nums font-semibold text-stone-900 text-sm select-none">
        {internalValue < 10 ? `0${internalValue}` : internalValue}
      </div>

      <Tooltip title={internalValue >= max ? `Chỉ còn ${max} sản phẩm` : ''} placement="top">
        <button
          type="button"
          onClick={handleIncrease}
          disabled={internalValue >= max}
          className="w-10 h-full flex items-center justify-center text-stone-600 hover:text-amber-700 disabled:opacity-40 disabled:hover:text-stone-600 transition-colors cursor-pointer rounded-r-full"
          aria-label="Tăng số lượng"
        >
          <Plus className="w-4 h-4" />
        </button>
      </Tooltip>
    </div>
  );
}
