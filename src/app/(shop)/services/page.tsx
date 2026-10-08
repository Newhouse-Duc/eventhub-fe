import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ServicesCatalogView } from '@/features/service';

export const metadata: Metadata = {
  title: 'Dịch Vụ Spa & Khám Sức Khỏe Thú Cưng',
  description: 'Trải nghiệm dịch vụ tắm spa thư giãn tinh dầu, grooming tạo kiểu và khám thú y chuyên khoa tận tâm tại Pet Luxury.',
};

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Dịch vụ Spa & Y tế', isCurrent: true },
  ];

  return (
    <div className="py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ServicesCatalogView />
    </div>
  );
}
