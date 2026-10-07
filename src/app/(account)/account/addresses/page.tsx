'use client';

import React, { useState } from 'react';
import { MapPin, Plus, Check, Trash2, Edit2, Home, Building2 } from 'lucide-react';
import { AppModal } from '@/components/ui/AppModal';
import { App } from 'antd';
import type { UserAddress } from '@/features/account/types/account.types';

export default function AccountAddressesPage() {
  const { modal, message } = App.useApp();

  const [addresses, setAddresses] = useState<UserAddress[]>([
    {
      id: 'addr-1',
      recipientName: 'Nguyễn Văn An',
      phone: '0912345678',
      province: 'Hà Nội',
      district: 'Quận Cầu Giấy',
      ward: 'Phường Dịch Vọng Hậu',
      streetAddress: 'Số 18, Ngõ 86 Duy Tân',
      isDefault: true,
      tag: 'home',
    },
    {
      id: 'addr-2',
      recipientName: 'Nguyễn Văn An (Công ty)',
      phone: '0987654321',
      province: 'Hà Nội',
      district: 'Quận Ba Đình',
      ward: 'Phường Liễu Giai',
      streetAddress: 'Tầng 12, Tòa nhà Lotte Center, 54 Liễu Giai',
      isDefault: false,
      tag: 'office',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('Hà Nội');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [tag, setTag] = useState<'home' | 'office'>('home');
  const [isDefault, setIsDefault] = useState(false);

  const openCreateModal = () => {
    setEditingAddress(null);
    setName('');
    setPhone('');
    setProvince('Hà Nội');
    setDistrict('');
    setWard('');
    setStreetAddress('');
    setTag('home');
    setIsDefault(false);
    setModalOpen(true);
  };

  const openEditModal = (addr: UserAddress) => {
    setEditingAddress(addr);
    setName(addr.recipientName);
    setPhone(addr.phone);
    setProvince(addr.province);
    setDistrict(addr.district);
    setWard(addr.ward);
    setStreetAddress(addr.streetAddress);
    setTag(addr.tag);
    setIsDefault(addr.isDefault);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !streetAddress.trim()) {
      message.error('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) => {
          if (a.id === editingAddress.id) {
            return {
              ...a,
              recipientName: name,
              phone,
              province,
              district,
              ward,
              streetAddress,
              tag,
              isDefault: isDefault ? true : a.isDefault,
            };
          }
          return isDefault ? { ...a, isDefault: false } : a;
        })
      );
      message.success('Cập nhật địa chỉ thành công!');
    } else {
      const newAddr: UserAddress = {
        id: `addr-${Date.now()}`,
        recipientName: name,
        phone,
        province,
        district,
        ward,
        streetAddress,
        tag,
        isDefault: isDefault || addresses.length === 0,
      };

      setAddresses((prev) => {
        if (isDefault) {
          return [...prev.map((a) => ({ ...a, isDefault: false })), newAddr];
        }
        return [...prev, newAddr];
      });
      message.success('Thêm địa chỉ mới thành công!');
    }

    setModalOpen(false);
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    message.success('Đã đặt làm địa chỉ mặc định!');
  };

  const handleDelete = (id: string) => {
    modal.confirm({
      title: 'Xóa địa chỉ nhận hàng?',
      content: 'Bạn có chắc chắn muốn xóa địa chỉ này khỏi sổ địa chỉ của mình không?',
      okText: 'Xóa ngay',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
        message.success('Đã xóa địa chỉ thành công.');
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            Sổ địa chỉ nhận hàng
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Quản lý danh sách các địa chỉ giao hàng để đặt hàng nhanh chóng hơn.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="h-10 px-5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm địa chỉ mới</span>
        </button>
      </div>

      {/* Address Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-3xl bg-white border transition-all flex flex-col justify-between gap-4 ${
              addr.isDefault
                ? 'border-amber-500 shadow-xs ring-2 ring-amber-500/10'
                : 'border-stone-200/90 hover:border-stone-300'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-stone-900">{addr.recipientName}</span>
                  <span className="p-1 rounded-md bg-stone-100 text-stone-600 text-xs">
                    {addr.tag === 'home' ? <Home className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                  </span>
                </div>

                {addr.isDefault && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Mặc định
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-500">
                Số điện thoại: <strong className="text-stone-800">{addr.phone}</strong>
              </p>

              <p className="text-xs text-stone-700 leading-relaxed">
                {addr.streetAddress}, {addr.ward}, {addr.district}, {addr.province}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              {!addr.isDefault ? (
                <button
                  type="button"
                  onClick={() => handleSetDefault(addr.id)}
                  className="text-stone-500 hover:text-amber-700 font-semibold cursor-pointer"
                >
                  Đặt làm mặc định
                </button>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Địa chỉ giao chính</span>
                </span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(addr)}
                  className="p-1.5 text-stone-400 hover:text-amber-700 transition-colors cursor-pointer"
                  title="Chỉnh sửa"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleDelete(addr.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Xóa địa chỉ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Address Create / Edit Modal */}
      <AppModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ nhận hàng mới'}
        width={500}
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Họ và tên người nhận *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
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
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Tỉnh/Thành</label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Quận/Huyện</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Cầu Giấy"
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Phường/Xã</label>
              <input
                type="text"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                placeholder="Dịch Vọng"
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Địa chỉ cụ thể (Số nhà, tên đường) *
            </label>
            <input
              type="text"
              required
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Số 18, Ngõ 86 Duy Tân"
              className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-stone-700">Loại địa chỉ:</label>
              <button
                type="button"
                onClick={() => setTag('home')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                  tag === 'home' ? 'border-amber-600 bg-amber-50 text-amber-800' : 'border-stone-200'
                }`}
              >
                Nhà riêng
              </button>
              <button
                type="button"
                onClick={() => setTag('office')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                  tag === 'office' ? 'border-amber-600 bg-amber-50 text-amber-800' : 'border-stone-200'
                }`}
              >
                Văn phòng
              </button>
            </div>

            <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600"
              />
              <span>Đặt làm mặc định</span>
            </label>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 h-10 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 h-10 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs"
            >
              Lưu địa chỉ
            </button>
          </div>
        </form>
      </AppModal>
    </div>
  );
}
