import React from 'react';
import { X } from 'lucide-react';
import type { FilterChipProps } from '@/components/ui/types/ui.types';

export function FilterChip({
  label,
  isSelected = false,
  onClick,
  onRemove,
  className = '',
}: FilterChipProps) {
  const isRemovable = isSelected && onRemove;

  return (
    <button
      type="button"
      onClick={isRemovable ? onRemove : onClick}
      className={`inline-flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 whitespace-nowrap ${
        isSelected
          ? 'bg-amber-600 text-white ring-0 shadow-sm'
          : 'bg-white text-stone-600 ring-1 ring-[color:var(--color-hairline)] hover:ring-amber-500/50 hover:bg-amber-50/50'
      } ${className}`}
    >
      <span>{label}</span>
      {isRemovable && (
        <X className="w-3.5 h-3.5 ml-1.5 -mr-1 opacity-80 hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}
