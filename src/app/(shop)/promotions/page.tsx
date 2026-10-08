import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PromotionsView } from '@/features/promotion';

export const metadata: Metadata = {
  title: 'Chương Trình Khuyến Mãi & Flash Sale',
  description: 'Tổng hợp ưu đãi giảm giá, mã voucher quà tặng và chương trình Flash Sale hàng đầu tại Pet Luxury.',
};

export default function PromotionsPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Khuyến mãi', isCurrent: true },
  ];

  return (
    <div className="py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <PromotionsView />
    </div>
  );
}
