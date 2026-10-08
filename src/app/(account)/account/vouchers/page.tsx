import type { Metadata } from 'next';
import { AccountVouchersView } from '@/features/voucher';

export const metadata: Metadata = {
  title: 'Kho Voucher & Điểm thưởng',
  description: 'Quản lý mã giảm giá, voucher freeship và lịch sử tích điểm Pawfect Club tại Pet Luxury.',
};

export default function AccountVouchersPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Kho Voucher &amp; Điểm thưởng
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Lưu giữ các đặc quyền chiết khấu và điểm thưởng dành riêng cho thú cưng của bạn.
        </p>
      </div>

      <AccountVouchersView />
    </div>
  );
}
