import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';

const COMMITMENTS = [
  {
    icon: Truck,
    title: 'Giao hỏa tốc 2 Giờ',
    desc: 'Nhận hàng ngay trong 120 phút tại nội thành Hà Nội & TP.HCM.',
    color: 'text-amber-700 bg-amber-100',
  },
  {
    icon: ShieldCheck,
    title: '100% Chính ngạch',
    desc: 'Hóa đơn VAT và giấy kiểm định an toàn thú y đầy đủ.',
    color: 'text-emerald-700 bg-emerald-100',
  },
  {
    icon: RotateCcw,
    title: 'Đổi trả trong 7 ngày',
    desc: 'Hỗ trợ đổi trả miễn phí tận nhà nếu bé không chịu ăn hoặc dị ứng.',
    color: 'text-sky-700 bg-sky-100',
  },
  {
    icon: Headphones,
    title: 'Tư vấn Thú y 24/7',
    desc: 'Đội ngũ bác sĩ thú y giàu kinh nghiệm sẵn sàng giải đáp thực đơn.',
    color: 'text-purple-700 bg-purple-100',
  },
];

export function CommitmentBar() {
  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {COMMITMENTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Bezel key={idx} className="p-6 bg-white flex flex-col gap-3">
              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Bezel>
          );
        })}
      </div>
    </section>
  );
}
