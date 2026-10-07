import React from 'react';
import type { FormItemProps } from '@/components/ui/types/ui.types';

export function FormItem({
  label,
  error,
  children,
  required = false,
  className = '',
  description,
}: FormItemProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-semibold text-stone-800 flex items-center gap-1">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      
      {description && (
        <p className="text-xs text-stone-500 mb-0.5">{description}</p>
      )}
      
      <div>{children}</div>
      
      {error && (
        <p className="text-xs text-rose-500 font-medium animate-in slide-in-from-top-1 fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
}
