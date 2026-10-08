import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Award, Users, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Bezel } from '@/components/ui/bezel';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi — Câu Chuyện Pet Luxury',
  description: 'Khám phá hành trình và sứ mệnh mang tới tiêu chuẩn chăm sóc dinh dưỡng hữu cơ tốt nhất cho thú cưng tại Việt Nam.',
};

export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về chúng tôi', isCurrent: true },
  ];

  return (
    <div className="py-8 space-y-16">
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Editorial */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full inline-block">
          Câu Chuyện Thương Hiệu
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          Yêu Thương Bé Cưng Như Người Thân Trong Gia Đình
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-serif">
          &ldquo;Chúng tôi tin rằng mọi chú chó và mèo đều xứng đáng được tận hưởng nguồn dinh dưỡng tinh khiết nhất, không hóa chất độc hại và phụ gia nhân tạo.&rdquo;
        </p>
      </div>

      {/* Featured Image with Double-Bezel */}
      <div className="max-w-5xl mx-auto">
        <Bezel className="overflow-hidden">
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=1200"
              alt="Bác sĩ thú y chăm sóc mèo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Bezel>
      </div>

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Khách hàng tin tưởng', value: '50.000+' },
          { label: 'Sản phẩm chính hãng', value: '1.200+' },
          { label: 'Thương hiệu đối tác', value: '25+' },
          { label: 'Đánh giá 5 sao', value: '99.4%' },
        ].map((stat, idx) => (
          <Bezel key={idx} className="p-6 text-center">
            <p className="text-2xl sm:text-3xl font-black text-amber-700 font-mono tabular-nums">
              {stat.value}
            </p>
            <p className="text-xs text-stone-600 mt-1 font-medium">{stat.label}</p>
          </Bezel>
        ))}
      </div>

      {/* Brand Values */}
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Giá Trị Cốt Lõi Của Pet Luxury
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            3 nguyên tắc bất biến định hướng mọi quyết định lựa chọn sản phẩm của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Bezel className="p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">100% Chính Hãng Nhập Khẩu</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Mọi bao hạt, lon pate đều có tem phụ tiếng Việt, hóa đơn hải quan và chứng chỉ phân tích dinh dưỡng quốc tế.
            </p>
          </Bezel>

          <Bezel className="p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Chuẩn Hữu Cơ Sinh Học</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Ưu tiên công thức WholePrey, nguyên liệu không ngũ cốc (Grain-Free) và thịt tươi sạch đáp ứng hệ tiêu hóa tự nhiên.
            </p>
          </Bezel>

          <Bezel className="p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Chăm Sóc Tận Tâm 24/7</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Đội ngũ tư vấn viên am hiểu thể trạng từng giống chó mèo, sẵn sàng đồng hành cùng sen trong suốt hành trình nuôi dưỡng.
            </p>
          </Bezel>
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto">
        <Bezel className="p-8 sm:p-12 text-center bg-stone-900 text-white space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sẵn Sàng Mang Lại Bữa Ăn Thượng Hạng Cho Bé Cưng?
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
            Ghé thăm cửa hàng trực tuyến hoặc liên hệ hotline để nhận tư vấn chế độ ăn cá nhân hóa từ chuyên gia.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="h-11 px-8 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-2 active:scale-[0.98] transition-all"
            >
              Khám phá sản phẩm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Bezel>
      </div>
    </div>
  );
}
