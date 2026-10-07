'use client';

import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import { ChevronDown } from 'lucide-react';
import type { PaginationProps } from '@/components/ui/types/ui.types';

export function Pagination({
  current,
  total,
  pageSize = 12,
  onChange,
  onLoadMore,
  hasMore = false,
  className = '',
}: PaginationProps) {
  if (total <= pageSize && !hasMore) return null;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Mobile: Xem thêm sản phẩm (Load more) */}
      <div className="md:hidden w-full px-4">
        {hasMore ? (
          <button
            type="button"
            onClick={onLoadMore}
            className="w-full h-11 rounded-full bg-stone-100 text-stone-700 font-semibold text-sm hover:bg-stone-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Xem thêm sản phẩm</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        ) : (
          <p className="text-center text-xs text-stone-400 font-medium py-3">
            Đã hiển thị hết sản phẩm
          </p>
        )}
      </div>

      {/* Desktop: Antd Pagination */}
      <div className="hidden md:block custom-pagination">
        <AntdPagination
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={onChange}
          showSizeChanger={false}
          showLessItems
        />
      </div>

      <style jsx global>{`
        .custom-pagination .ant-pagination-item {
          border-radius: 50%;
          border: none;
          background: transparent;
        }
        .custom-pagination .ant-pagination-item a {
          color: #78716C; /* stone-500 */
          font-weight: 500;
        }
        .custom-pagination .ant-pagination-item:hover a {
          color: #D97706; /* amber-600 */
        }
        .custom-pagination .ant-pagination-item-active {
          background-color: #D97706; /* amber-600 */
        }
        .custom-pagination .ant-pagination-item-active a {
          color: #FFFFFF !important;
        }
        .custom-pagination .ant-pagination-prev .ant-pagination-item-link,
        .custom-pagination .ant-pagination-next .ant-pagination-item-link {
          border: none;
          border-radius: 50%;
          background: transparent;
        }
      `}</style>
    </div>
  );
}
