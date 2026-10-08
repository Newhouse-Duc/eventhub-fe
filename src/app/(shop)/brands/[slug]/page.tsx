import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BrandDetailView, MOCK_BRANDS } from '@/features/brand';

interface BrandDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BrandDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = MOCK_BRANDS.find((b) => b.slug === slug);
  if (!brand) {
    return { title: 'Thương hiệu không tìm thấy — Pet Luxury' };
  }

  return {
    title: `${brand.name} — Thương hiệu chính hãng`,
    description: brand.description,
  };
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = MOCK_BRANDS.find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Thương hiệu', href: '/brands' },
    { label: brand.name, isCurrent: true },
  ];

  return (
    <div className="py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <BrandDetailView brand={brand} />
    </div>
  );
}
