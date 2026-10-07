import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailView } from '@/features/product/components/ProductDetailView';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MOCK_PRODUCTS } from '@/features/product/data/mockProducts';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return { title: 'Sản phẩm không tìm thấy — Pet Luxury' };
  }

  return {
    title: `${product.name} — Pet Luxury`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.images,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/products' },
    { label: product.name, isCurrent: true },
  ];

  // JSON-LD structured data for Google Search SEO (Mục 13.2 spec)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.variants?.[0]?.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://petluxury.vn/products/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ProductDetailView product={product} />
      </div>
    </div>
  );
}
