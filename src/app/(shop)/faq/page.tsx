'use client';

import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Bezel } from '@/components/ui/bezel';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Vận chuyển',
    question: 'Thời gian giao hàng Hỏa tốc 2 Giờ áp dụng cho những khu vực nào?',
    answer: 'Dịch vụ Hỏa tốc 2 Giờ hiện được áp dụng tại tất cả các quận nội thành Hà Nội và TP. Hồ Chí Minh đối với các đơn hàng phát sinh trước 18:00 hàng ngày thông qua đối tác GrabExpress và Ahamove.',
  },
  {
    id: 'faq-2',
    category: 'Vận chuyển',
    question: 'Đơn hàng giá trị bao nhiêu thì được miễn phí vận chuyển toàn quốc?',
    answer: 'Pet Luxury miễn phí 100% phí giao hàng tiêu chuẩn toàn quốc cho mọi đơn hàng có giá trị thanh toán từ 500.000₫ trở lên.',
  },
  {
    id: 'faq-3',
    category: 'Đặt hàng',
    question: 'Tôi có thể thay đổi địa chỉ hoặc số điện thoại sau khi đã đặt hàng không?',
    answer: 'Có thể! Miễn là đơn hàng chưa chuyển sang trạng thái "Đang giao", bạn có thể vào mục Tài khoản > Quản lý đơn hàng hoặc gọi ngay hotline 1900 6868 để nhân viên kho hỗ trợ đổi thông tin.',
  },
  {
    id: 'faq-4',
    category: 'Thanh toán',
    question: 'Pet Luxury hỗ trợ những hình thức thanh toán nào?',
    answer: 'Chúng tôi hỗ trợ đa dạng phương thức: Thanh toán khi nhận hàng (COD), Chuyển khoản ngân hàng VietQR tự động, Ví MoMo, VNPay-QR và thẻ tín dụng Visa/MasterCard bảo mật quốc tế.',
  },
  {
    id: 'faq-5',
    category: 'Đổi trả',
    question: 'Chính sách đổi trả sản phẩm thức ăn thú cưng được quy định như thế nào?',
    answer: 'Khách hàng được quyền đổi trả miễn phí trong vòng 7 ngày kể từ ngày nhận hàng nếu bao bì còn nguyên seal, hạn sử dụng tối thiểu 6 tháng và có video mở hộp xác thực sản phẩm lỗi từ nhà sản xuất.',
  },
  {
    id: 'faq-6',
    category: 'Dinh dưỡng',
    question: 'Làm thế nào để chuyển đổi sang dòng thức ăn mới cho chó mèo mà không bị tiêu chảy?',
    answer: 'Bạn nên tuân thủ quy tắc 7 ngày chuyển đổi: Ngày 1-2 (25% hạt mới + 75% hạt cũ), Ngày 3-4 (50% hạt mới + 50% hạt cũ), Ngày 5-6 (75% hạt mới + 25% hạt cũ), Ngày 7 (100% thức ăn mới).',
  },
];

const CATEGORIES = ['Tất cả', 'Vận chuyển', 'Đặt hàng', 'Thanh toán', 'Đổi trả', 'Dinh dưỡng'];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Câu hỏi thường gặp', isCurrent: true },
  ];

  const toggleOpen = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFAQs = FAQ_LIST.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'Tất cả' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-8 space-y-10">
      <Breadcrumb items={breadcrumbItems} />

      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full inline-block mb-3">
          Trung Tâm Trợ Giúp
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Câu Hỏi Thường Gặp (FAQ)
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Giải đáp nhanh các thắc mắc phổ biến nhất về mua sắm, vận chuyển và chế độ dinh dưỡng cho thú cưng.
        </p>

        {/* Search */}
        <div className="mt-6 relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi hoặc từ khóa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-full border border-stone-200 bg-white text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 max-w-2xl mx-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`h-8 px-4 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <Bezel key={item.id} className="overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleOpen(item.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
                >
                  <span className="text-sm font-bold text-stone-900 leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-amber-100 text-amber-800' : 'text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3 animate-in fade-in duration-300">
                    {item.answer}
                  </div>
                )}
              </Bezel>
            );
          })
        ) : (
          <div className="py-12 text-center text-xs text-stone-500">
            Không tìm thấy câu hỏi phù hợp với từ khóa tìm kiếm.
          </div>
        )}
      </div>
    </div>
  );
}
