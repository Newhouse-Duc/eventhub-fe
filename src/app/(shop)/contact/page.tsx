'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { App } from 'antd';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Bezel } from '@/components/ui/bezel';

export default function ContactPage() {
  const { message } = App.useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'tuvan_dinhduong',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Liên hệ', isCurrent: true },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.content) {
      message.error('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      message.success('Cảm ơn bạn! Đội ngũ tư vấn sẽ phản hồi trong vòng 2 giờ.');
    }, 800);
  };

  return (
    <div className="py-8 space-y-10">
      <Breadcrumb items={breadcrumbItems} />

      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full inline-block mb-3">
          Hỗ Trợ Khách Hàng 24/7
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Liên Hệ Pet Luxury
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Bạn cần tư vấn khẩu phần ăn cho bé cưng hay thắc mắc về đơn hàng? Chúng tôi luôn sẵn sàng lắng nghe!
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact info */}
        <div className="lg:col-span-5 space-y-6">
          <Bezel className="p-6 space-y-6">
            <h2 className="text-base font-bold text-stone-900">Thông Tin Trụ Sở &amp; Cửa Hàng</h2>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Showroom Flagship</p>
                  <p className="mt-0.5 leading-relaxed">
                    Tầng 1, Tòa tháp Luxury Pet, 123 Phố Cầu Giấy, Phường Dịch Vọng, Hà Nội
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Hotline &amp; Zalo</p>
                  <p className="mt-0.5 font-mono font-semibold text-amber-700">1900 6868 • 0988 888 999</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Hòm thư điện tử</p>
                  <p className="mt-0.5">cskh@petluxury.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Giờ hoạt động</p>
                  <p className="mt-0.5">08:00 - 21:30 (Thứ 2 - Chủ Nhật, kể cả lễ Tết)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="flex-1 h-10 px-4 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 font-semibold text-xs inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat Zalo tư vấn
              </a>
            </div>
          </Bezel>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <Bezel className="p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Tin Nhắn Đã Được Gửi Đi!</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Chúng tôi đã tiếp nhận yêu cầu từ bạn và sẽ liên hệ lại qua số điện thoại hoặc email trong thời gian sớm nhất.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-amber-700 hover:underline"
                >
                  Gửi thêm tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-stone-900 mb-2">Gửi Tin Nhắn Trực Tuyến</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Họ và tên của bạn *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Địa chỉ Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Chủ đề cần hỗ trợ
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 bg-white"
                    >
                      <option value="tuvan_dinhduong">Tư vấn dinh dưỡng cho bé cưng</option>
                      <option value="donhang">Tra cứu hoặc khiếu nại đơn hàng</option>
                      <option value="doitra">Chính sách đổi trả &amp; hoàn tiền</option>
                      <option value="hopdong">Hợp tác kinh doanh &amp; phân phối</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nội dung lời nhắn *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Mô tả cụ thể giống loài của bé, độ tuổi hoặc thắc mắc của bạn..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-11 px-8 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs inline-flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-60 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin ngay'}
                  </button>
                </div>
              </form>
            )}
          </Bezel>
        </div>
      </div>
    </div>
  );
}
