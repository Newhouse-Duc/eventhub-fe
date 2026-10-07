import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import type { BreadcrumbProps } from '@/components/ui/types/ui.types';

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  // Trên mobile chỉ hiển thị mục áp chót (Danh mục cha)
  const mobileBackItem = items.length > 1 ? items[items.length - 2] : items[0];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      {/* Giao diện Mobile */}
      <div className="md:hidden">
        {mobileBackItem.href ? (
          <Link
            href={mobileBackItem.href}
            className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-amber-700 font-medium py-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{mobileBackItem.label}</span>
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-stone-600 font-medium py-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{mobileBackItem.label}</span>
          </span>
        )}
      </div>

      {/* Giao diện Desktop */}
      <ol className="hidden md:flex items-center gap-1.5 text-xs text-stone-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-stone-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link href={item.href} className="hover:text-amber-700 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              
              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
