import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductCatalogView } from '@/features/product/components/ProductCatalogView';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Tất cả sản phẩm — Pet Luxury',
  description: 'Khám phá hơn 1.200 sản phẩm dinh dưỡng hữu cơ, pate nhập khẩu và phụ kiện công thái học cho thú cưng.',
};

export default function ProductsPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tất cả sản phẩm', isCurrent: true },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <Suspense fallback={<div className="p-12 text-center text-stone-500">Đang tải danh mục...</div>}>
        <ProductCatalogView
          bannerTitle="Khám Phá Toàn Bộ Sản Phẩm"
          bannerSubtitle="Thức ăn hữu cơ, đồ dùng chăm sóc và phụ kiện chuẩn y khoa nhập khẩu chính ngạch."
        />
      </Suspense>
    </div>
  );
}
