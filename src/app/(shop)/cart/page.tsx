'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  Heart, 
  ArrowRight, 
  Tag, 
  X, 
  Sparkles, 
  Truck, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductCard } from '@/features/product/components/ProductCard';
import { VoucherModal } from '@/features/cart/components/VoucherModal';
import { MOCK_PRODUCTS } from '@/features/product/data/mockProducts';
import type { CartItem, VoucherItem } from '@/features/cart/types/cart.types';

const FREESHIP_THRESHOLD = 499000;

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      slug: 'hat-orijen-original-cho-cho-2kg',
      name: 'Hạt dinh dưỡng hữu cơ Orijen Original cho Cún 2kg',
      variant: 'Túi 2kg · Vị Gà & Cá Hồi',
      price: 850000,
      originalPrice: 990000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400',
      stock: 24,
      selected: true,
    },
    {
      id: 'cart-2',
      slug: 'pate-royal-canin-kitten-instinctive-85g',
      name: 'Pate Royal Canin Kitten Instinctive 85g cho mèo con',
      variant: 'Lốc 12 gói · Nước xốt Gravy',
      price: 395000,
      originalPrice: 480000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=400',
      stock: 45,
      selected: true,
    },
    {
      id: 'cart-3',
      slug: 'cat-ve-sinh-cature-dau-nanh-tu-nhien-6l',
      name: 'Cát vệ sinh Cature đậu nành hữu cơ 6L vón cục siêu tốc',
      variant: 'Túi 6L (2.4kg)',
      price: 135000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
      stock: 40,
      selected: true,
    },
  ]);

  const [appliedVoucher, setAppliedVoucher] = useState<VoucherItem | undefined>({
    code: 'PAW15',
    title: 'Giảm 15% cho Đơn Hàng Đầu Tiên',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 300000,
    description: 'Ưu đãi hội viên Pawfect Club',
    expiryDate: '31/12/2026',
  });

  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  // Calculation
  const selectedItems = items.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const voucherDiscount = appliedVoucher
    ? appliedVoucher.discountType === 'percentage'
      ? Math.round(subtotal * (appliedVoucher.discountValue / 100))
      : appliedVoucher.discountValue
    : 0;

  const shippingFee = subtotal >= FREESHIP_THRESHOLD || subtotal === 0 ? 0 : 30000;
  const total = Math.max(0, subtotal - voucherDiscount + shippingFee);

  const isAllSelected = items.length > 0 && items.every((i) => i.selected);

  const toggleSelectAll = () => {
    const nextVal = !isAllSelected;
    setItems((prev) => prev.map((item) => ({ ...item, selected: nextVal })));
  };

  const toggleSelectItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleQuantityChange = (id: string, newQty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giỏ hàng của bạn', isCurrent: true },
  ];

  const suggestedProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Giỏ hàng của bạn
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Bạn đang có <strong className="text-stone-800 tabular-nums">{items.length}</strong> sản phẩm trong giỏ.
            </p>
          </div>

          <Link
            href="/products"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 underline"
          >
            ← Tiếp tục mua sắm
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-20 bg-white rounded-3xl border border-stone-200 shadow-xs max-w-xl mx-auto">
            <EmptyState
              icon={ShoppingBag}
              title="Giỏ hàng đang đợi bé cưng của bạn 🐾"
              description="Hiện chưa có sản phẩm nào trong giỏ. Hãy dạo quanh cửa hàng để chọn những món ăn bổ dưỡng và đồ chơi yêu thích cho bé nhé!"
              actionLabel="Khám phá ngay"
              onAction={() => window.location.href = '/products'}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items List (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Select All Bar */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-between text-xs">
                <label className="flex items-center gap-2.5 font-bold text-stone-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                  />
                  <span>Chọn tất cả ({items.length} món)</span>
                </label>

                {selectedItems.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setItems((prev) => prev.filter((i) => !i.selected))}
                    className="text-stone-400 hover:text-rose-600 font-semibold transition-colors cursor-pointer"
                  >
                    Xóa các mục đã chọn
                  </button>
                )}
              </div>

              {/* Items Card List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center ${
                      item.selected ? 'border-stone-200/90 shadow-xs' : 'border-stone-100 opacity-60'
                    }`}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={!!item.selected}
                      onChange={() => toggleSelectItem(item.id)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer shrink-0 mt-1 sm:mt-0"
                    />

                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-stone-50 border border-stone-200 overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <Link
                        href={item.slug ? `/products/${item.slug}` : '/products'}
                        className="text-sm font-bold text-stone-900 hover:text-amber-700 transition-colors line-clamp-2 leading-snug"
                      >
                        {item.name}
                      </Link>

                      {item.variant && (
                        <p className="text-xs text-stone-500">{item.variant}</p>
                      )}

                      <div className="flex items-baseline gap-2 pt-1">
                        <PriceDisplay price={item.price} size="md" className="text-amber-800" />
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-stone-400 line-through">
                            {item.originalPrice.toLocaleString('vi-VN')}₫
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(qty) => handleQuantityChange(item.id, qty)}
                        min={1}
                        max={item.stock || 99}
                        className="h-9 scale-95"
                      />

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-2 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Lưu vào yêu thích"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Xóa khỏi giỏ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Freeship notification */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="text-stone-700">
                    {subtotal >= FREESHIP_THRESHOLD ? (
                      <strong className="text-emerald-700">Đơn hàng của bạn đã đủ điều kiện Freeship toàn quốc!</strong>
                    ) : (
                      <>Mua thêm <strong className="text-amber-800 tabular-nums">{(FREESHIP_THRESHOLD - subtotal).toLocaleString('vi-VN')}₫</strong> để nhận Miễn phí vận chuyển.</>
                    )}
                  </span>
                </div>
                <Link href="/products" className="font-bold text-amber-700 hover:underline shrink-0">
                  Mua thêm →
                </Link>
              </div>

            </div>

            {/* Right Column: Order Summary (lg:col-span-4, sticky top-28) */}
            <div className="lg:col-span-4 sticky top-28 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-5">
                <h3 className="font-extrabold text-stone-900 text-base tracking-tight uppercase border-b border-stone-100 pb-3">
                  Tóm tắt đơn hàng
                </h3>

                {/* Subtotals */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Tạm tính ({selectedItems.length} món):</span>
                    <PriceDisplay price={subtotal} size="sm" />
                  </div>

                  <div className="flex items-center justify-between text-stone-600">
                    <span>Phí vận chuyển:</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-700">Miễn phí</strong> : '30.000₫'}</span>
                  </div>

                  {voucherDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-700 font-semibold">
                      <span>Giảm giá Voucher:</span>
                      <span>-{voucherDiscount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
                    <span className="font-extrabold text-sm text-stone-900">Tổng thanh toán:</span>
                    <PriceDisplay price={total} size="lg" className="text-amber-800" />
                  </div>
                </div>

                {/* Voucher pill or apply trigger */}
                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <span className="text-xs font-semibold text-stone-700 block">Mã khuyến mãi:</span>

                  {appliedVoucher ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-mono font-bold text-xs text-emerald-800">
                          {appliedVoucher.code}
                        </span>
                        <span className="text-[11px] text-emerald-700">
                          (-{voucherDiscount.toLocaleString('vi-VN')}₫)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAppliedVoucher(undefined)}
                        className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Bỏ voucher"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsVoucherModalOpen(true)}
                      className="w-full h-10 px-3 rounded-xl border border-dashed border-amber-400 hover:bg-amber-50/50 text-amber-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                      <span>Chọn hoặc nhập mã ưu đãi</span>
                    </button>
                  )}
                </div>

                {/* Checkout CTA */}
                <Link
                  href={selectedItems.length === 0 ? '#' : '/checkout'}
                  className={`w-full h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[var(--shadow-brand)] transition-all cursor-pointer ${
                    selectedItems.length === 0 ? 'opacity-50 pointer-events-none' : 'active:scale-98'
                  }`}
                >
                  <span>Tiến hành đặt hàng ({selectedItems.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Trust guarantee */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bảo mật thanh toán SSL 256-bit</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* You May Also Like Section */}
        <div className="mt-20 pt-12 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Có thể bạn cũng thích
            </h3>
            <Link href="/products" className="text-xs font-bold text-amber-700 hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {suggestedProducts.map((prod) => (
              <ProductCard key={prod.id} {...prod} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Total Bar */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 flex items-center justify-between gap-3 shadow-lg">
          <div className="min-w-0">
            <span className="text-[10px] text-stone-500 block">Tổng tiền ({selectedItems.length} món):</span>
            <PriceDisplay price={total} size="sm" className="text-amber-800" />
          </div>
          <Link
            href={selectedItems.length === 0 ? '#' : '/checkout'}
            className={`h-11 px-6 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer ${
              selectedItems.length === 0 ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <span>Đặt hàng ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Voucher Selection Modal */}
      <VoucherModal
        isOpen={isVoucherModalOpen}
        onClose={() => setIsVoucherModalOpen(false)}
        currentSubtotal={subtotal}
        selectedCode={appliedVoucher?.code}
        onSelectVoucher={(v) => setAppliedVoucher(v)}
      />
    </div>
  );
}
