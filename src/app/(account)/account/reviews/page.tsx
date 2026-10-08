import type { Metadata } from 'next';
import { AccountReviewsView } from '@/features/review';

export const metadata: Metadata = {
  title: 'Đánh giá Sản phẩm',
  description: 'Quản lý lịch sử đánh giá và nhận xét sản phẩm thức ăn, phụ kiện thú cưng của bạn tại Pet Luxury.',
};

export default function AccountReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Đánh giá của tôi
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Chia sẻ cảm nhận về các sản phẩm bạn đã mua để giúp đỡ cộng đồng sen nuôi dưỡng bé tốt hơn.
        </p>
      </div>

      <AccountReviewsView />
    </div>
  );
}
