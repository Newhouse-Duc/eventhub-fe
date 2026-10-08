'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Sparkles, Scissors, Stethoscope } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Bezel } from '@/components/ui/bezel';

interface StoreItem {
  id: string;
  name: string;
  city: 'hanoi' | 'hcm' | 'danang';
  cityLabel: string;
  address: string;
  phone: string;
  openingHours: string;
  hasSpa: boolean;
  hasVet: boolean;
  mapQuery: string;
}

const STORES: StoreItem[] = [
  {
    id: 'store-1',
    name: 'Pet Luxury Flagship Cầu Giấy',
    city: 'hanoi',
    cityLabel: 'Hà Nội',
    address: '123 Phố Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
    phone: '024 3888 6688',
    openingHours: '08:00 - 21:30 (Mở cửa tất cả các ngày)',
    hasSpa: true,
    hasVet: true,
    mapQuery: '123 Cau Giay Hanoi',
  },
  {
    id: 'store-2',
    name: 'Pet Luxury Boutique Hoàn Kiếm',
    city: 'hanoi',
    cityLabel: 'Hà Nội',
    address: '45 Phố Lý Thường Kiệt, Phường Hàng Bài, Quận Hoàn Kiếm, Hà Nội',
    phone: '024 3999 7788',
    openingHours: '08:30 - 22:00 (Mở cửa tất cả các ngày)',
    hasSpa: true,
    hasVet: false,
    mapQuery: '45 Ly Thuong Kiet Hanoi',
  },
  {
    id: 'store-3',
    name: 'Pet Luxury Mega Mall Thảo Điền',
    city: 'hcm',
    cityLabel: 'TP. Hồ Chí Minh',
    address: '88 Đường Xuân Thủy, Phường Thảo Điền, Thành phố Thủ Đức, TP.HCM',
    phone: '028 6222 9900',
    openingHours: '08:00 - 22:00 (Mở cửa tất cả các ngày)',
    hasSpa: true,
    hasVet: true,
    mapQuery: '88 Xuan Thuy Thao Dien HCM',
  },
  {
    id: 'store-4',
    name: 'Pet Luxury Boutique Quận 1',
    city: 'hcm',
    cityLabel: 'TP. Hồ Chí Minh',
    address: '12 Pasteur, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    phone: '028 6333 8811',
    openingHours: '08:30 - 21:30 (Mở cửa tất cả các ngày)',
    hasSpa: false,
    hasVet: false,
    mapQuery: '12 Pasteur Quan 1 HCM',
  },
];

export default function StoresPage() {
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Hệ thống cửa hàng', isCurrent: true },
  ];

  const filteredStores = STORES.filter((store) => {
    return selectedCity === 'all' || store.city === selectedCity;
  });

  return (
    <div className="py-8 space-y-10">
      <Breadcrumb items={breadcrumbItems} />

      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full inline-block mb-3">
          Mạng Lưới Showroom Cao Cấp
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Hệ Thống Cửa Hàng Pet Luxury
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Ghé thăm không gian mua sắm boutique hiện đại, trải nghiệm phòng spa tinh dầu và dịch vụ y tế thú y chuyên nghiệp.
        </p>

        {/* City Filter Pills */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'hanoi', label: 'Hà Nội' },
            { id: 'hcm', label: 'TP. Hồ Chí Minh' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedCity(item.id)}
              className={`h-9 px-5 rounded-full text-xs font-semibold transition-all ${
                selectedCity === item.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stores Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStores.map((store) => (
          <Bezel key={store.id} className="p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                  {store.cityLabel}
                </span>

                <div className="flex items-center gap-2">
                  {store.hasSpa && (
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Scissors className="w-3 h-3 text-emerald-600" />
                      Spa
                    </span>
                  )}
                  {store.hasVet && (
                    <span className="text-[10px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Stethoscope className="w-3 h-3 text-sky-600" />
                      Bác sĩ Thú y
                    </span>
                  )}
                </div>
              </div>

              <h2 className="text-lg font-bold text-stone-900">{store.name}</h2>

              <div className="space-y-2 text-xs text-stone-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{store.address}</span>
                </p>

                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                  <span className="font-mono font-semibold text-stone-800">{store.phone}</span>
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>{store.openingHours}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center gap-3">
              <a
                href={`tel:${store.phone.replace(/\s+/g, '')}`}
                className="flex-1 h-9 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Gọi showroom
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 h-9 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                Chỉ đường
              </a>
            </div>
          </Bezel>
        ))}
      </div>
    </div>
  );
}
