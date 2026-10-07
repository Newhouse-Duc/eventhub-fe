'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, CheckCircle2, Save, User, ShieldAlert, Sparkles } from 'lucide-react';
import { App } from 'antd';
import { useGetProfileQuery } from '@/features/auth/api/authApiSlice';
import type { UserProfileFormData } from '@/features/account/types/account.types';

export default function AccountProfilePage() {
  const { message } = App.useApp();
  const { data: profile } = useGetProfileQuery();

  const [initialData, setInitialData] = useState<UserProfileFormData>({
    firstName: 'Đức',
    lastName: 'Nguyễn',
    email: 'duc.nguyen@example.com',
    isEmailVerified: true,
    phone: '0912345678',
    birthday: '1998-08-15',
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  });

  const [formData, setFormData] = useState<UserProfileFormData>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      const data: UserProfileFormData = {
        firstName: profile.firstName || 'Đức',
        lastName: profile.lastName || 'Nguyễn',
        email: profile.email || 'duc.nguyen@example.com',
        isEmailVerified: profile.isEmailVerified ?? true,
        phone: profile.phone || '0912345678',
        birthday: '1998-08-15',
        gender: 'male',
        avatarUrl: profile.avatarUrl || initialData.avatarUrl,
      };
      setInitialData(data);
      setFormData(data);
    }
  }, [profile]);

  // Dirty check: Only enable save when data has been modified
  const isDirty =
    formData.firstName !== initialData.firstName ||
    formData.lastName !== initialData.lastName ||
    formData.phone !== initialData.phone ||
    formData.birthday !== initialData.birthday ||
    formData.gender !== initialData.gender ||
    formData.avatarUrl !== initialData.avatarUrl;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setInitialData(formData);
      message.success('Cập nhật hồ sơ cá nhân thành công!');
    }, 600);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatarUrl: url }));
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
          Hồ sơ tài khoản
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Quản lý thông tin cá nhân và cài đặt bảo mật cho người chăm sóc thú cưng.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-5 pb-6 border-b border-stone-100">
          <div className="relative w-20 h-20 rounded-full bg-stone-100 border-2 border-stone-200 overflow-hidden shrink-0">
            {formData.avatarUrl ? (
              <Image
                src={formData.avatarUrl}
                alt="Avatar"
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                <User className="w-8 h-8" />
              </div>
            )}
            <label className="absolute inset-0 bg-stone-900/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
              <Camera className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-stone-900">Ảnh đại diện</h4>
            <p className="text-xs text-stone-500">Khuyến nghị ảnh vuông JPG, PNG dưới 2MB.</p>
            <label className="text-xs font-bold text-amber-700 hover:underline cursor-pointer inline-block pt-0.5">
              Đổi ảnh mới
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Họ và tên đệm
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Tên gọi
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Địa chỉ Email (Cố định)
            </label>
            <div className="relative">
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-500 cursor-not-allowed"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã xác thực</span>
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Ngày sinh
            </label>
            <input
              type="date"
              value={formData.birthday}
              onChange={(e) => setFormData((prev) => ({ ...prev, birthday: e.target.value }))}
              className="w-full h-11 px-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Giới tính
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value as any }))}
              className="w-full h-11 px-3 rounded-xl border border-stone-200 text-xs text-stone-900 bg-white focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        {/* Action Button: Only enabled when isDirty */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-400">
            {isDirty ? 'Bạn có thay đổi chưa lưu' : 'Thông tin đã được lưu mới nhất'}
          </span>

          <button
            type="submit"
            disabled={!isDirty || isSaving}
            className={`h-11 px-6 rounded-full font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isDirty && !isSaving
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs active:scale-98'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
