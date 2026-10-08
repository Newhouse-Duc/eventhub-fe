import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TrackingView } from '@/features/tracking';

export const metadata: Metadata = {
  title: 'Tra cứu Vận đơn',
  description: 'Theo dõi trực tiếp hành trình đơn hàng và lịch giao kiện hàng thú cưng tại Pet Luxury.',
};

export default function TrackOrderPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tra cứu đơn hàng', isCurrent: true },
  ];

  return (
    <div className="py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <TrackingView />
    </div>
  );
}
