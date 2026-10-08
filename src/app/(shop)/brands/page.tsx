import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BrandsIndexView } from '@/features/brand';

export const metadata: Metadata = {
  title: 'Thương Hiệu Phân Phối Chính Hãng',
  description: 'Khám phá các thương hiệu dinh dưỡng và chăm sóc thú cưng cao cấp hàng đầu thế giới tại Pet Luxury.',
};

export default function BrandsPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Thương hiệu', isCurrent: true },
  ];

  return (
    <div className="py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <BrandsIndexView />
    </div>
  );
}
