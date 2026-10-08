'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Trash2, ShoppingBag, ArrowLeft, Check, X } from 'lucide-react';
import { App } from 'antd';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Bezel } from '@/components/ui/bezel';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { RatingStars } from '@/features/review';
import { MOCK_PRODUCTS } from '@/features/product/data/mockProducts';
import type { ProductDetail } from '@/features/product/types/product.types';

export default function ComparePage() {
  const { message } = App.useApp();
  // Default compare top 2 products
  const [comparedProducts, setComparedProducts] = useState<ProductDetail[]>(
    MOCK_PRODUCTS.slice(0, 3)
  );

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'So sánh sản phẩm', isCurrent: true },
  ];

  const handleRemove = (id: string) => {
    setComparedProducts(comparedProducts.filter((p) => p.id !== id));
    message.info('Đã gỡ sản phẩm khỏi bảng so sánh.');
  };

  const handleAddToCart = (name: string) => {
    message.success(`Đã thêm ${name} vào giỏ hàng!`);
  };

  if (comparedProducts.length === 0) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Bảng so sánh đang trống 🐾</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Hãy chọn ít nhất 2 sản phẩm thức ăn hoặc phụ kiện từ danh mục để bắt đầu đối chiếu dinh dưỡng.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-amber-600 text-white text-xs font-semibold"
        >
          Khám phá sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            So Sánh Dinh Dưỡng Sản Phẩm ({comparedProducts.length}/4)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Đối chiếu thành phần thịt tươi, độ tuổi thích hợp và mức giá để chọn giải pháp dinh dưỡng tối ưu nhất cho bé cưng.
          </p>
        </div>

        <Link
          href="/products"
          className="text-xs font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Chọn thêm sản phẩm khác
        </Link>
      </div>

      {/* Comparison Table */}
      <Bezel className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[650px]">
          <tbody>
            {/* Row 1: Product Basic Card */}
            <tr className="border-b border-stone-200">
              <td className="p-4 font-bold text-stone-500 w-44 bg-stone-50 sticky left-0 z-10">
                Sản phẩm
              </td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 align-top w-64">
                  <div className="space-y-3">
                    <div className="relative aspect-[4/5] w-full rounded-2xl bg-stone-100 overflow-hidden">
                      <Image src={p.thumbnail} alt={p.name} fill className="object-cover" sizes="240px" />
                      <button
                        type="button"
                        onClick={() => handleRemove(p.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur text-stone-500 hover:text-rose-600 flex items-center justify-center transition-colors"
                        title="Xóa khỏi so sánh"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        {p.brand}
                      </span>
                      <h3 className="font-bold text-stone-900 text-xs line-clamp-2 mt-0.5">
                        {p.name}
                      </h3>
                    </div>

                    <PriceDisplay price={p.price} originalPrice={p.originalPrice} size="sm" />

                    <button
                      type="button"
                      onClick={() => handleAddToCart(p.name)}
                      className="w-full h-9 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Thêm giỏ hàng
                    </button>
                  </div>
                </td>
              ))}
            </tr>

            {/* Row 2: Brand & Origin */}
            <tr className="border-b border-stone-100 hover:bg-amber-50/40 transition-colors">
              <td className="p-4 font-semibold text-stone-500 bg-stone-50 sticky left-0">
                Thương hiệu
              </td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 font-bold text-stone-900">
                  {p.brand}
                </td>
              ))}
            </tr>

            {/* Row 3: Species & Age */}
            <tr className="border-b border-stone-100 hover:bg-amber-50/40 transition-colors">
              <td className="p-4 font-semibold text-stone-500 bg-stone-50 sticky left-0">
                Đối tượng phù hợp
              </td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-stone-700">
                  {p.species === 'dog' ? '🐶 Loài Chó' : '🐱 Loài Mèo'} • {p.petCompatibility.suitableAge}
                </td>
              ))}
            </tr>

            {/* Row 4: Rating & Reviews */}
            <tr className="border-b border-stone-100 hover:bg-amber-50/40 transition-colors">
              <td className="p-4 font-semibold text-stone-500 bg-stone-50 sticky left-0">
                Đánh giá khách hàng
              </td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={p.rating} />
                    <span className="font-mono tabular-nums text-stone-600">
                      ({p.reviewCount})
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Row 5: Ingredients */}
            <tr className="border-b border-stone-100 hover:bg-amber-50/40 transition-colors">
              <td className="p-4 font-semibold text-stone-500 bg-stone-50 sticky left-0">
                Thành phần chính
              </td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-stone-600 leading-relaxed text-[11px]">
                  {p.ingredients}
                </td>
              ))}
            </tr>

            {/* Row 6: Allergen Warning */}
            <tr className="hover:bg-amber-50/40 transition-colors">
              <td className="p-4 font-semibold text-stone-500 bg-stone-50 sticky left-0">
                Cảnh báo dị ứng
              </td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-4 text-stone-700 text-[11px]">
                  {p.petCompatibility.allergenWarning}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Bezel>
    </div>
  );
}
