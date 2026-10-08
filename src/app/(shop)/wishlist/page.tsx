import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { WishlistView } from '@/features/wishlist';

export const metadata: Metadata = {
  title: 'Danh sách Yêu thích',
  description: 'Các sản phẩm thức ăn, phụ kiện dinh dưỡng bạn đã lưu cho bé cưng tại Pet Luxury.',
};

export default function WishlistPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Yêu thích', isCurrent: true },
  ];

  return (
    <div className="py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <WishlistView />
    </div>
  );
}
