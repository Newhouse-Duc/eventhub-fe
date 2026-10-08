'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Scissors, Stethoscope, Hotel, GraduationCap, Clock, Check, Calendar, ArrowRight } from 'lucide-react';
import { App, Modal } from 'antd';
import { Bezel } from '@/components/ui/bezel';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import type { PetServiceItem } from '../types/service.types';

const SERVICES: PetServiceItem[] = [
  {
    id: 's-1',
    name: 'Spa & Grooming Thư Giãn Tinh Dầu',
    category: 'spa',
    categoryLabel: 'Spa & Cắt Tỉa',
    priceFrom: 250000,
    durationMinutes: 90,
    description: 'Tắm bọt nano ozone kháng khuẩn, sấy mát tạo phồng lông, vệ sinh tai móng và tạo kiểu theo yêu cầu từ chuyên gia groomer 5 năm kinh nghiệm.',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    perks: ['Tắm thảo dược hữu cơ', 'Massage cơ khớp nhẹ', 'Xịt dưỡng thơm 72H'],
  },
  {
    id: 's-2',
    name: 'Khám Sức Khỏe Tổng Quát & Tiêm Chủng',
    category: 'veterinary',
    categoryLabel: 'Y Tế Thú Cưng',
    priceFrom: 350000,
    durationMinutes: 45,
    description: 'Kiểm tra lâm sàng mắt, tai, tim phổi, xét nghiệm máu tầm soát ký sinh trùng và tư vấn phác đồ tiêm vaccine phòng bệnh theo chuẩn hiệp hội thú y WSAVA.',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800',
    perks: ['Bác sĩ CK I trực tiếp khám', 'Sổ tiêm điện tử trọn đời', 'Tư vấn dinh dưỡng miễn phí'],
  },
  {
    id: 's-3',
    name: 'Khách Sạn Nghỉ Dưỡng Thú Cưng 5 Sao',
    category: 'hotel',
    categoryLabel: 'Lưu Trú Cao Cấp',
    priceFrom: 200000,
    durationMinutes: 1440,
    description: 'Phòng riêng máy lạnh 24/7 có camera theo dõi trực tiếp cho phụ huynh, sân cỏ chơi tự do 3 cữ mỗi ngày và thực đơn hạt Orijen/Pate theo khẩu vị bé.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800',
    perks: ['Camera IP xem 24/24', 'Sân chơi cỏ nhân tạo', 'Thức ăn chuẩn boutique'],
  },
  {
    id: 's-4',
    name: 'Huấn Luyện Hành Vi & Vệ Sinh Đúng Chỗ',
    category: 'training',
    categoryLabel: 'Huấn Luyện',
    priceFrom: 500000,
    durationMinutes: 60,
    description: 'Phương pháp huấn luyện tích cực (Positive Reinforcement) bằng bánh thưởng, không đòn roi, giúp bé hiểu mệnh lệnh cơ bản và khắc phục tật sủa bậy.',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=800',
    perks: ['Cam kết hiệu quả 100%', 'Huấn luyện viên chuyên nghiệp', 'Giáo án chuẩn quốc tế'],
  },
];

const TIME_SLOTS = ['09:00', '10:30', '14:00', '15:30', '17:00', '18:30'];

export function ServicesCatalogView() {
  const { message } = App.useApp();
  const [selectedService, setSelectedService] = useState<PetServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Booking states
  const [petName, setPetName] = useState('Bông (Poodle)');
  const [selectedDate, setSelectedDate] = useState('10/10/2026');
  const [selectedSlot, setSelectedSlot] = useState('14:00');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleOpenBooking = (service: PetServiceItem) => {
    setSelectedService(service);
    setBookingSuccess(false);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
    message.success('Đặt lịch thành công! Nhân viên chăm sóc sẽ liên hệ xác nhận trong 15 phút.');
  };

  return (
    <div className="space-y-12">
      {/* Top Banner */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full inline-block mb-3">
          Dịch Vụ Chăm Sóc Đẳng Cấp
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Spa &amp; Y Tế Thú Cưng Chuẩn Boutique
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Không gian thư giãn chuyên biệt, dụng cụ tiệt trùng y tế và chuyên viên yêu thương thú cưng vô điều kiện.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((service) => (
          <Bezel key={service.id} className="p-0 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-60 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur text-stone-800 shadow-xs">
                    {service.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{service.durationMinutes >= 60 ? `${service.durationMinutes / 60} giờ` : `${service.durationMinutes} phút`}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500">Giá từ: </span>
                    <PriceDisplay price={service.priceFrom} size="md" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 leading-snug">
                  {service.name}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {service.perks.map((perk, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => handleOpenBooking(service)}
                className="w-full h-11 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                Đặt lịch dịch vụ ngay
              </button>
            </div>
          </Bezel>
        ))}
      </div>

      {/* Booking Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden"
      >
        <div className="p-4 space-y-5">
          {bookingSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Đặt Lịch Thành Công!</h3>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                Lịch hẹn dịch vụ <span className="font-semibold text-stone-900">{selectedService?.name}</span> vào lúc <span className="font-mono font-bold text-amber-700">{selectedSlot}</span> ngày <span className="font-mono font-bold text-stone-900">{selectedDate}</span> cho bé <span className="font-semibold text-stone-900">{petName}</span> đã được chuyển tới spa.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-4 px-6 h-9 rounded-full bg-stone-900 text-white text-xs font-semibold"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <>
              <div className="text-center pb-3 border-b border-stone-100">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full">
                  Đặt lịch chăm sóc
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-2">
                  {selectedService?.name}
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Chọn bé cưng:
                </label>
                <select
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 bg-white"
                >
                  <option value="Bông (Poodle 3.8kg)">🐶 Bông (Poodle 3.8kg)</option>
                  <option value="Mochi (Mèo Anh 4.5kg)">🐱 Mochi (Mèo Anh 4.5kg)</option>
                  <option value="Bé khác">🐾 Bé cưng khác (sẽ điền thêm)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Chọn ngày hẹn:
                </label>
                <input
                  type="date"
                  defaultValue="2026-10-10"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Chọn khung giờ hẹn:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-9 rounded-xl text-xs font-mono font-bold transition-all ${
                        selectedSlot === slot
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Tạm tính:</span>
                  <PriceDisplay price={selectedService?.priceFrom || 0} size="md" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="h-10 px-4 rounded-full border border-stone-200 text-xs font-semibold text-stone-600"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="h-10 px-6 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
                  >
                    Xác nhận đặt lịch
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
