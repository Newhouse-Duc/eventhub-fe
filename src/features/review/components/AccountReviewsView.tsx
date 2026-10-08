'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, MessageSquare, Camera, Sparkles, Check } from 'lucide-react';
import { App, Modal, Rate } from 'antd';
import { Bezel } from '@/components/ui/bezel';
import { ReviewCard } from './ReviewCard';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import type { ReviewProps } from '../types/review.types';

interface PendingReviewItem {
  id: string;
  orderId: string;
  orderCode: string;
  orderDate: string;
  productId: string;
  productName: string;
  variantName: string;
  price: number;
  image: string;
}

const MOCK_PENDING_REVIEWS: PendingReviewItem[] = [
  {
    id: 'pr-1',
    orderId: 'ord-101',
    orderCode: 'PET-240810-0042',
    orderDate: '08/10/2026',
    productId: 'prod-1',
    productName: 'Hạt dinh dưỡng hữu cơ Orijen Original cho Cún 2kg',
    variantName: 'Túi 2kg • Gà & Cá Hồi',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'pr-2',
    orderId: 'ord-102',
    orderCode: 'PET-240801-0019',
    orderDate: '01/10/2026',
    productId: 'prod-2',
    productName: 'Pate Royal Canin Kitten Instinctive 85g cho mèo con',
    variantName: 'Hộp 85g • Thạch Jelly',
    price: 34000,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800',
  },
];

const MOCK_MY_REVIEWS: ReviewProps[] = [
  {
    id: 'my-rev-1',
    authorName: 'Bạn',
    rating: 5,
    dateStr: '25/09/2026',
    isVerifiedPurchase: true,
    content: 'Bé Poodle nhà mình cực kỳ thích dòng hạt này! Ăn ngon miệng, tiêu hóa tốt và lông mượt thấy rõ sau 2 tuần sử dụng. Shop đóng gói cẩn thận 2 lớp chống sốc.',
    helpfulCount: 8,
    petTag: {
      species: 'dog',
      breed: 'Poodle Toy',
      ageText: '2 tuổi',
      weightStr: '3.8kg',
    },
  },
];

export function AccountReviewsView() {
  const { message } = App.useApp();
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed'>('pending');
  const [pendingList, setPendingList] = useState<PendingReviewItem[]>(MOCK_PENDING_REVIEWS);
  const [myReviews, setMyReviews] = useState<ReviewProps[]>(MOCK_MY_REVIEWS);

  // Review modal form state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PendingReviewItem | null>(null);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [petBreed, setPetBreed] = useState('Poodle');

  const handleOpenReviewModal = (item: PendingReviewItem) => {
    setSelectedItem(item);
    setRating(5);
    setContent('');
    setReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (!content.trim()) {
      message.error('Vui lòng chia sẻ cảm nhận trải nghiệm sản phẩm.');
      return;
    }

    if (!selectedItem) return;

    const newReview: ReviewProps = {
      id: `rev-${Date.now()}`,
      authorName: 'Bạn',
      rating,
      dateStr: 'Hôm nay',
      isVerifiedPurchase: true,
      content,
      helpfulCount: 0,
      petTag: {
        species: 'dog',
        breed: petBreed,
      },
    };

    setMyReviews([newReview, ...myReviews]);
    setPendingList(pendingList.filter((p) => p.id !== selectedItem.id));
    setReviewModalOpen(false);
    message.success('Cảm ơn bạn! Đánh giá đã được ghi nhận và cộng 50 PawPoints.');
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'pending'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Chờ đánh giá ({pendingList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reviewed')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'reviewed'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Đã đánh giá ({myReviews.length})
        </button>
      </div>

      {/* Tab 1: Pending Reviews */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingList.length > 0 ? (
            pendingList.map((item) => (
              <Bezel key={item.id} className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.productName} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-stone-500">
                        Đơn #{item.orderCode} • Ngày giao: {item.orderDate}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 mt-0.5 line-clamp-1">
                        {item.productName}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {item.variantName} • <PriceDisplay price={item.price} size="sm" />
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenReviewModal(item)}
                    className="h-10 px-5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shadow-xs shrink-0"
                  >
                    <Star className="w-4 h-4 fill-current" />
                    Viết đánh giá (+50 pts)
                  </button>
                </div>
              </Bezel>
            ))
          ) : (
            <div className="py-12 text-center text-stone-500 text-xs">
              Tuyệt vời! Bạn không còn sản phẩm nào đang chờ đánh giá.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Reviewed List */}
      {activeTab === 'reviewed' && (
        <div className="space-y-4">
          {myReviews.length > 0 ? (
            myReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))
          ) : (
            <div className="py-12 text-center text-stone-500 text-xs">
              Bạn chưa có đánh giá nào. Hãy trải nghiệm sản phẩm và chia sẻ cảm nhận nhé!
            </div>
          )}
        </div>
      )}

      {/* Review Modal Form */}
      <Modal
        open={reviewModalOpen}
        onCancel={() => setReviewModalOpen(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden"
      >
        <div className="p-4 space-y-5">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full">
              Đánh giá sản phẩm
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-2">
              {selectedItem?.productName}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Đánh giá kèm hình ảnh giúp cộng đồng sen chọn đúng thức ăn ngon cho bé!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 py-3 bg-stone-50 rounded-2xl">
            <span className="text-xs font-semibold text-stone-700">Mức độ hài lòng của bé cưng:</span>
            <Rate value={rating} onChange={setRating} className="text-amber-500 text-2xl" />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Cảm nhận chi tiết *
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chia sẻ về độ ngon miệng, phản ứng của bé cưng, bao bì và thời gian giao hàng..."
              className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Giống thú cưng của bạn:
            </label>
            <input
              type="text"
              value={petBreed}
              onChange={(e) => setPetBreed(e.target.value)}
              placeholder="VD: Corgi 2 tuổi, Mèo Anh lông ngắn..."
              className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setReviewModalOpen(false)}
              className="h-10 px-4 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmitReview}
              className="h-10 px-6 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
