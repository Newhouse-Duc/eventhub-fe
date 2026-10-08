import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BlogIndexView } from '@/features/blog';

export const metadata: Metadata = {
  title: 'Cẩm Nang Nuôi Cưng & Dinh Dưỡng Thú Y',
  description: 'Tổng hợp kiến thức chăm sóc chó mèo, hướng dẫn chọn hạt dinh dưỡng và phòng bệnh từ các chuyên gia thú y tại Pet Luxury.',
};

export default function BlogPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Cẩm nang nuôi cưng', isCurrent: true },
  ];

  return (
    <div className="py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <BlogIndexView />
    </div>
  );
}
