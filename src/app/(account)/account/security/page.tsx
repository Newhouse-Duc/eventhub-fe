'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Smartphone, Laptop, LogOut, AlertTriangle, KeyRound } from 'lucide-react';
import { PasswordStrengthMeter } from '@/features/auth/components/PasswordStrengthMeter';
import { App } from 'antd';
import type { LoginDevice } from '@/features/account/types/account.types';

export default function AccountSecurityPage() {
  const { message, modal } = App.useApp();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [devices, setDevices] = useState<LoginDevice[]>([
    {
      id: 'd1',
      deviceName: 'Chrome trên macOS (M3 Max)',
      browser: 'Chrome 128 • Mac OS X',
      location: 'Hà Nội, Việt Nam',
      lastActive: 'Đang hoạt động',
      isCurrent: true,
    },
    {
      id: 'd2',
      deviceName: 'iPhone 15 Pro Max',
      browser: 'Pet Luxury App 2.4 • iOS 18',
      location: 'Hà Nội, Việt Nam',
      lastActive: '2 giờ trước',
      isCurrent: false,
    },
    {
      id: 'd3',
      deviceName: 'Edge trên Windows 11',
      browser: 'Microsoft Edge 126 • Windows NT',
      location: 'TP. Hồ Chí Minh, Việt Nam',
      lastActive: '3 ngày trước',
      isCurrent: false,
    },
  ]);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword) {
      message.error('Vui lòng nhập mật khẩu hiện tại.');
      return;
    }
    if (newPassword.length < 8) {
      message.error('Mật khẩu mới phải có tối thiểu 8 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp.');
      return;
    }

    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      message.success('Đổi mật khẩu thành công! Hãy đăng nhập lại trên các thiết bị khác.');
    }, 800);
  };

  const handleLogoutOtherDevices = () => {
    modal.confirm({
      title: 'Đăng xuất khỏi thiết bị khác?',
      content: 'Tất cả các phiên đăng nhập khác (ngoại trừ thiết bị hiện tại) sẽ bị hủy ngay lập tức.',
      okText: 'Đăng xuất tất cả',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setDevices((prev) => prev.filter((d) => d.isCurrent));
        message.success('Đã đăng xuất khỏi tất cả các thiết bị khác.');
      },
    });
  };

  const handleDeleteAccount = () => {
    modal.confirm({
      title: 'Yêu cầu xóa tài khoản?',
      content: 'Hành động này không thể hoàn tác. Mọi điểm tích lũy PawPoints và lịch sử đơn hàng sẽ bị xóa vĩnh viễn.',
      okText: 'Tôi hiểu và muốn xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        message.info('Yêu cầu xóa tài khoản đã được gửi đến quản trị viên xử lý trong 48h.');
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Change Password Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            Đổi mật khẩu đăng nhập
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Khuyến nghị sử dụng mật khẩu mạnh bao gồm chữ hoa, chữ số và ký tự đặc biệt.
          </p>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Mật khẩu hiện tại *
            </label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Mật khẩu mới *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Tối thiểu 8 ký tự..."
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Password Strength Meter */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
            <PasswordStrengthMeter password={newPassword} />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Xác nhận lại mật khẩu mới *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu mới..."
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="h-11 px-6 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>{isUpdatingPassword ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}</span>
          </button>
        </form>
      </div>

      {/* 2. Login Devices */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-stone-900">
              Thiết bị đã đăng nhập
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Danh sách các thiết bị gần đây đã truy cập vào tài khoản của bạn.
            </p>
          </div>

          {devices.length > 1 && (
            <button
              type="button"
              onClick={handleLogoutOtherDevices}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
            >
              Đăng xuất khỏi thiết bị khác
            </button>
          )}
        </div>

        <div className="space-y-3">
          {devices.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 shrink-0">
                  {d.deviceName.toLowerCase().includes('phone') ? (
                    <Smartphone className="w-5 h-5" />
                  ) : (
                    <Laptop className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-stone-900">{d.deviceName}</span>
                    {d.isCurrent && (
                      <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Thiết bị hiện tại
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500">
                    {d.browser} • {d.location}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-stone-400 font-medium shrink-0">
                {d.lastActive}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Danger Zone */}
      <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/50 border border-rose-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-700">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-base font-extrabold">Vùng nguy hiểm</h3>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          Sau khi tài khoản bị xóa, tất cả dữ liệu đơn hàng, thông tin thú cưng và voucher giảm giá sẽ không thể khôi phục lại.
        </p>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="h-10 px-5 rounded-full bg-white border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
        >
          Yêu cầu xóa vĩnh viễn tài khoản
        </button>
      </div>
    </div>
  );
}
