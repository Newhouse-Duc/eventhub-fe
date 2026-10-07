import React from 'react';
import { PackageOpen } from 'lucide-react';
import type { EmptyStateProps } from '@/components/ui/types/ui.types';

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[300px] ${className}`}>
      <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center mb-5 ring-1 ring-[color:var(--color-hairline)]">
        <Icon className="w-8 h-8 text-stone-400 stroke-1" />
      </div>
      
      <h3 className="text-lg font-semibold text-stone-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-stone-500 max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="h-10 px-6 rounded-full bg-stone-900 text-white font-medium text-sm hover:bg-amber-600 transition-colors active:scale-95 shadow-sm hover:shadow-[var(--shadow-brand)]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
