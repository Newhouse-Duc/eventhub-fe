import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductCatalogView } from '@/features/product/components/ProductCatalogView';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Tìm kiếm sản phẩm — Pet Luxury',
  description: 'Tìm kiếm nhanh các sản phẩm dinh dưỡng, phụ kiện và dịch vụ chăm sóc thú cưng.',
};

export default function SearchPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tìm kiếm', isCurrent: true },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <Suspense fallback={<div className="p-12 text-center text-stone-500">Đang tìm kiếm...</div>}>
        <ProductCatalogView />
      </Suspense>
    </div>
  );
}
