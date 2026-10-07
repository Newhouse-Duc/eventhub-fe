'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  QrCode, 
  Wallet, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle,
  Clock
} from 'lucide-react';
import { CheckoutStepper } from '@/features/checkout/components/CheckoutStepper';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import type { 
  CheckoutStep, 
  ShippingMethod, 
  PaymentMethod, 
  ShippingMethodId, 
  PaymentMethodId 
} from '@/features/checkout/types/checkout.types';

const STEPS: CheckoutStep[] = [
  { id: 'shipping', title: 'Giao hàng', number: 1 },
  { id: 'payment', title: 'Thanh toán', number: 2 },
  { id: 'review', title: 'Xác nhận', number: 3 },
];

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Giao hàng Tiêu chuẩn',
    estimatedTime: '2 - 4 ngày làm việc',
    fee: 0,
    badge: 'Miễn phí',
    description: 'Vận chuyển qua GHTK / Viettel Post toàn quốc.',
  },
  {
    id: 'fast',
    name: 'Giao hàng Nhanh',
    estimatedTime: '1 - 2 ngày làm việc',
    fee: 25000,
    description: 'Ưu tiên xử lý đơn và giao hàng sớm trong 24-48h.',
  },
  {
    id: 'express_2h',
    name: 'Hỏa tốc 2 Giờ (Nội thành)',
    estimatedTime: 'Nhận hàng sau 120 phút',
    fee: 60000,
    badge: 'Hỏa tốc',
    description: 'Giao ngay bằng GrabExpress / Ahamove tại Hà Nội & TP.HCM.',
  },
];

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'vietqr',
    name: 'Chuyển khoản QR (VietQR)',
    description: 'Quét mã QR tự động bằng mọi ứng dụng ngân hàng, xác nhận tức thì.',
    icon: '📱',
    badge: 'Khuyên dùng',
  },
  {
    id: 'cod',
    name: 'Thanh toán khi nhận hàng (COD)',
    description: 'Kiểm tra hàng trước khi thanh toán tiền mặt cho shipper.',
    icon: '💵',
  },
  {
    id: 'vnpay',
    name: 'Cổng VNPAY-QR / Thẻ ATM nội địa',
    description: 'Hỗ trợ thẻ ATM 40+ ngân hàng Việt Nam và quét mã VNPAY.',
    icon: '💳',
  },
  {
    id: 'momo',
    name: 'Ví điện tử MoMo',
    description: 'Thanh toán nhanh chóng và an toàn qua ứng dụng MoMo.',
    icon: '👛',
  },
  {
    id: 'card',
    name: 'Thẻ Quốc tế (Visa, MasterCard, JCB)',
    description: 'Bảo mật 3D-Secure 2.0 chuẩn PCI DSS quốc tế.',
    icon: '🌐',
  },
];

const VIETNAM_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export default function CheckoutPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<string>('shipping');

  // Form states
  const [email, setEmail] = useState('customer@example.com');
  const [createAccount, setCreateAccount] = useState(false);
  const [fullName, setFullName] = useState('Nguyễn Văn An');
  const [phone, setPhone] = useState('0912345678');
  const [province, setProvince] = useState('Hà Nội');
  const [district, setDistrict] = useState('Quận Cầu Giấy');
  const [ward, setWard] = useState('Phường Dịch Vọng Hậu');
  const [streetAddress, setStreetAddress] = useState('Số 18, Ngõ 86 Duy Tân');
  const [orderNote, setOrderNote] = useState('Gọi trước khi giao 15 phút');

  const [shippingMethodId, setShippingMethodId] = useState<ShippingMethodId>('standard');
  const [paymentMethodId, setPaymentMethodId] = useState<PaymentMethodId>('vietqr');
  const [termsAgreed, setTermsAgreed] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sample order items
  const orderItems = [
    {
      id: '1',
      name: 'Hạt dinh dưỡng hữu cơ Orijen Original cho Cún 2kg',
      variant: 'Túi 2kg',
      price: 850000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: '2',
      name: 'Pate Royal Canin Kitten Instinctive 85g cho mèo con',
      variant: 'Lốc 12 gói',
      price: 395000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=200',
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const voucherDiscount = 116700; // Giảm voucher PAW15
  const selectedShipping = SHIPPING_METHODS.find((m) => m.id === shippingMethodId) || SHIPPING_METHODS[0];
  const shippingFee = selectedShipping.fee;
  const total = Math.max(0, subtotal - voucherDiscount + shippingFee);

  // Validate step 1
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên người nhận.');
      return;
    }
    if (!phone.trim() || !VIETNAM_PHONE_REGEX.test(phone.trim())) {
      setErrorMsg('Số điện thoại không đúng định dạng Việt Nam (10 số, bắt đầu bằng 03, 05, 07, 08, 09).');
      return;
    }
    if (!streetAddress.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ nhà chi tiết.');
      return;
    }

    setCurrentStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place Order
  const handlePlaceOrder = () => {
    if (!termsAgreed) {
      setErrorMsg('Vui lòng đồng ý với Điều khoản mua hàng để hoàn tất.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Tạo mã đơn và Idempotency
    const orderCode = `PET-${Date.now().toString().slice(-6)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(
        `/checkout/success?orderCode=${orderCode}&total=${total}&method=${paymentMethodId}`
      );
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Stepper Header */}
      <div className="max-w-xl mx-auto mb-10">
        <CheckoutStepper
          steps={STEPS}
          currentStepId={currentStep}
          onStepClick={(stepId) => setCurrentStep(stepId)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Multi-step Interactive Form (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: GIAO HÀNG */}
          {currentStep === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-8">
              {/* Customer Info Card */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Thông tin liên hệ</span>
                  </h3>
                  <Link href="/login" className="text-xs font-semibold text-amber-700 hover:underline">
                    Đã có tài khoản? Đăng nhập
                  </Link>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Địa chỉ Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={createAccount}
                      onChange={(e) => setCreateAccount(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600"
                    />
                    <span>Tạo tài khoản Pet Luxury để tự động tích điểm 5% và nhận quà sinh nhật cho bé</span>
                  </label>
                </div>
              </div>

              {/* Shipping Address Card */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-tight flex items-center gap-2 border-b border-stone-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Địa chỉ giao hàng</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Họ và tên người nhận *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn An"
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0912345678"
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Tỉnh / Thành phố
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-stone-200 text-xs text-stone-900 bg-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Quận / Huyện
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Địa chỉ cụ thể (Số nhà, tên đường, tòa nhà) *
                    </label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Số 18, Ngõ 86 Duy Tân, Phường Dịch Vọng Hậu"
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Ghi chú cho shipper (Tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method (Radio Cards) */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-tight flex items-center gap-2 border-b border-stone-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Phương thức vận chuyển</span>
                </h3>

                <div className="space-y-3">
                  {SHIPPING_METHODS.map((method) => {
                    const isSelected = shippingMethodId === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setShippingMethodId(method.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={isSelected}
                            onChange={() => setShippingMethodId(method.id)}
                            className="w-4 h-4 text-amber-600 focus:ring-amber-500 accent-amber-600"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-900">
                                {method.name}
                              </span>
                              {method.badge && (
                                <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                  {method.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              {method.description} • Thời gian: <strong className="text-stone-700">{method.estimatedTime}</strong>
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-stone-900 shrink-0">
                          {method.fee === 0 ? 'Miễn phí' : `${method.fee.toLocaleString('vi-VN')}₫`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[var(--shadow-brand)] transition-all cursor-pointer active:scale-98"
              >
                <span>Tiếp tục đến thanh toán</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: THANH TOÁN */}
          {currentStep === 'payment' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-tight flex items-center gap-2 border-b border-stone-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  <span>Chọn phương thức thanh toán</span>
                </h3>

                <div className="space-y-3">
                  {PAYMENT_METHODS.map((pm) => {
                    const isSelected = paymentMethodId === pm.id;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethodId(pm.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={isSelected}
                            onChange={() => setPaymentMethodId(pm.id)}
                            className="w-4 h-4 text-amber-600 focus:ring-amber-500 accent-amber-600"
                          />
                          <div className="text-2xl select-none">{pm.icon}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-900">{pm.name}</span>
                              {pm.badge && (
                                <span className="px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                                  {pm.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-500 mt-0.5">{pm.description}</p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep('shipping')}
                  className="flex-1 h-12 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại giao hàng</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep('review')}
                  className="flex-2 h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[var(--shadow-brand)] transition-all cursor-pointer"
                >
                  <span>Xác nhận thông tin đơn hàng</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: XÁC NHẬN VÀ ĐẶT HÀNG */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              {/* Review summary cards */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-tight border-b border-stone-100 pb-3">
                  Kiểm tra lại thông tin đơn hàng
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                    <span className="font-bold text-stone-500 block">Người nhận &amp; Địa chỉ:</span>
                    <p className="font-bold text-stone-900">{fullName} • {phone}</p>
                    <p className="text-stone-600">{streetAddress}, {ward}, {district}, {province}</p>
                    {orderNote && <p className="text-stone-400 italic">Ghi chú: {orderNote}</p>}
                    <button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      className="text-amber-700 font-bold hover:underline pt-1 inline-block cursor-pointer"
                    >
                      Sửa địa chỉ
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                    <span className="font-bold text-stone-500 block">Vận chuyển &amp; Thanh toán:</span>
                    <p className="font-bold text-stone-900">{selectedShipping.name}</p>
                    <p className="text-stone-600">{PAYMENT_METHODS.find((p) => p.id === paymentMethodId)?.name}</p>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('payment')}
                      className="text-amber-700 font-bold hover:underline pt-1 inline-block cursor-pointer"
                    >
                      Đổi hình thức
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600 shrink-0 mt-0.5"
                    />
                    <span>
                      Tôi đã đọc và đồng ý với <Link href="/terms" className="text-amber-700 underline font-semibold">Điều khoản mua hàng</Link> và <Link href="/returns" className="text-amber-700 underline font-semibold">Chính sách đổi trả 7 ngày</Link> của Pet Luxury.
                    </span>
                  </label>
                </div>
              </div>

              {/* Order Placement CTA */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep('payment')}
                  className="flex-1 h-12 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting || !termsAgreed}
                  onClick={handlePlaceOrder}
                  className="flex-2 h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-[var(--shadow-brand)] transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Đang khởi tạo đơn hàng...</span>
                  ) : (
                    <>
                      <span>Đặt hàng ngay • {total.toLocaleString('vi-VN')}₫</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Order Items Summary (lg:col-span-5, sticky top-24) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-5">
            <h3 className="font-extrabold text-stone-900 text-sm uppercase tracking-tight border-b border-stone-100 pb-3 flex items-center justify-between">
              <span>Đơn hàng của bạn ({orderItems.length} món)</span>
              <Link href="/cart" className="text-xs font-semibold text-amber-700 hover:underline">
                Sửa giỏ hàng
              </Link>
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-xl bg-stone-50 border border-stone-200 overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="60px" className="object-cover" />
                    <span className="absolute top-0 right-0 w-4 h-4 rounded-bl-lg bg-stone-900 text-white text-[9px] font-bold flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-stone-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-stone-500">{item.variant}</p>
                    <span className="text-xs font-bold text-amber-800">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial calculation */}
            <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Tạm tính:</span>
                <PriceDisplay price={subtotal} size="sm" />
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span>Phí vận chuyển ({selectedShipping.name}):</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">Miễn phí</strong> : `${shippingFee.toLocaleString('vi-VN')}₫`}</span>
              </div>

              <div className="flex items-center justify-between text-emerald-700 font-semibold">
                <span>Voucher giảm giá (PAW15):</span>
                <span>-{voucherDiscount.toLocaleString('vi-VN')}₫</span>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
                <span className="font-extrabold text-sm text-stone-900">Tổng thanh toán:</span>
                <PriceDisplay price={total} size="lg" className="text-amber-800 font-extrabold" />
              </div>
            </div>

            <div className="pt-2 text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Được bảo vệ bởi chính sách bồi hoàn 100% của Pet Luxury</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
