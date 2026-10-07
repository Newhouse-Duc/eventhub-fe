import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductCatalogView } from '@/features/product/components/ProductCatalogView';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_MAP: Record<string, { name: string; subtitle: string; species?: string; category?: string }> = {
  dog: {
    name: 'Dành Cho Cún Cưng 🐶',
    subtitle: 'Hạt dinh dưỡng hữu cơ, pate nhập khẩu, đệm y khoa và đồ chơi thông minh cho cún.',
    species: 'dog',
  },
  cat: {
    name: 'Dành Cho Mèo Cưng 🐱',
    subtitle: 'Thực phẩm dinh dưỡng, pate thượng hạng, cát đậu nành khử mùi và nhà cây cao cấp.',
    species: 'cat',
  },
  fish: {
    name: 'Cá Cảnh & Thủy Sinh 🐟',
    subtitle: 'Thức ăn dạng vảy BioActive tăng màu, lọc vi sinh và phụ kiện hồ cá.',
    species: 'fish',
  },
  bird: {
    name: 'Chim Cảnh & Vẹt 🐦',
    subtitle: 'Hạt ngũ cốc tổng hợp Bỉ, khoáng chất mài mỏ và lồng chim an toàn.',
    species: 'bird',
  },
  'small-pet': {
    name: 'Thú Nhỏ (Hamster, Thỏ) 🐹',
    subtitle: 'Cỏ khô Timothy đợt 1, thức ăn nén hữu cơ và chuồng gỗ tự nhiên.',
    species: 'small-pet',
  },
  food: {
    name: 'Thức Ăn Hạt Khô Hữu Cơ',
    subtitle: 'Công thức WholePrey giàu đạm tự nhiên, 100% không chất độn tinh bột.',
    category: 'food',
  },
  pate: {
    name: 'Pate & Thức Ăn Ướt Nhập Khẩu',
    subtitle: 'Cung cấp đủ độ ẩm, hỗ trợ thận và đường tiết niệu cho thú cưng.',
    category: 'pate',
  },
  hygiene: {
    name: 'Vệ Sinh & Khử Mùi Sinh Học',
    subtitle: 'Cát vệ sinh tự nhiên, xịt ion bạc khử khuẩn và tã lót chống tràn.',
    category: 'hygiene',
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug];
  if (!cat) return { title: 'Danh mục sản phẩm — Pet Luxury' };
  return {
    title: `${cat.name} — Pet Luxury`,
    description: cat.subtitle,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryInfo = CATEGORY_MAP[slug];

  if (!categoryInfo) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Danh mục', href: '/products' },
    { label: categoryInfo.name, isCurrent: true },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <Suspense fallback={<div className="p-12 text-center text-stone-500">Đang tải danh mục...</div>}>
        <ProductCatalogView
          initialSpecies={categoryInfo.species}
          initialCategory={categoryInfo.category}
          bannerTitle={categoryInfo.name}
          bannerSubtitle={categoryInfo.subtitle}
        />
      </Suspense>
    </div>
  );
}
