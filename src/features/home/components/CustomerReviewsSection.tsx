'use client';

import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { ReviewCard } from '@/features/review/components/ReviewCard';
import type { ReviewProps } from '@/features/review/types/review.types';

const REVIEWS: ReviewProps[] = [
  {
    id: 'rev-1',
    authorName: 'Hoàng Anh Tuấn',
    isVerifiedPurchase: true,
    rating: 5,
    dateStr: '02/10/2026',
    content: 'Bé Corgi nhà mình cực kỳ kén ăn hạt, đổi qua Orijen Original ở Pet Luxury thì ăn thun thút không chừa một viên nào. Lông bé mượt và bóng hẳn sau 3 tuần. Đóng gói rất cẩn thận!',
    images: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600'],
    helpfulCount: 42,
    petTag: {
      species: 'dog',
      breed: 'Corgi Pembroke',
      ageText: '2 tuổi',
      weightStr: '11kg',
    },
  },
  {
    id: 'rev-2',
    authorName: 'Trần Minh Thư',
    isVerifiedPurchase: true,
    rating: 5,
    dateStr: '28/09/2026',
    content: 'Pate Royal Canin date luôn mới tinh, giao hỏa tốc chưa tới 1 tiếng rưỡi là shipper đã gõ cửa rồi. Cảm ơn shop vì quà tặng đồ chơi cho bé Miu!',
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600'],
    helpfulCount: 28,
    petTag: {
      species: 'cat',
      breed: 'Mèo Anh Lông Ngắn',
      ageText: '1.5 tuổi',
      weightStr: '4.2kg',
    },
  },
  {
    id: 'rev-3',
    authorName: 'Đặng Quốc Huy',
    isVerifiedPurchase: true,
    rating: 5,
    dateStr: '20/09/2026',
    content: 'Đệm nằm Memory Foam chuẩn công thái học đỉnh thật sự. Bé Golden nhà mình bị thoái hóa khớp hông, từ ngày nằm đệm này ngủ ngon giấc không còn rên đêm nữa.',
    helpfulCount: 19,
    petTag: {
      species: 'dog',
      breed: 'Golden Retriever',
      ageText: '6 tuổi',
      weightStr: '32kg',
    },
  },
];

export function CustomerReviewsSection() {
  return (
    <section className="py-16 bg-stone-50/60 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
              Tâm sự từ cộng đồng Pawfect
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
              Đánh giá từ những người "Sen" yêu cưng
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-2xs self-start sm:self-auto">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-stone-900">4.9 / 5.0</span>
            <span className="text-xs text-stone-400">• (12.400+ Đánh giá xác thực)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>

      </div>
    </section>
  );
}
