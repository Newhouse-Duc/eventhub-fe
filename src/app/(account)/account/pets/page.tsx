import type { Metadata } from 'next';
import { AccountPetsView } from '@/features/pet';

export const metadata: Metadata = {
  title: 'Hồ Sơ Thú Cưng Của Tôi',
  description: 'Quản lý thông tin thể trạng, ngày sinh, cân nặng và danh mục dị ứng của các bé cưng tại Pet Luxury.',
};

export default function AccountPetsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Hồ Sơ Thú Cưng
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Lưu thông tin các bé cưng để nhận cảnh báo dị ứng thành phần và khẩu phần dinh dưỡng gợi ý chính xác.
        </p>
      </div>

      <AccountPetsView />
    </div>
  );
}
