'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, Input, Button, App } from 'antd';
import { Lock, CheckCircle2, ShieldCheck, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PasswordStrengthMeter } from '@/features/auth/components/PasswordStrengthMeter';
import { useResetPasswordMutation } from '@/features/auth/api/authApiSlice';
import type { ResetPasswordFormValues } from '@/features/auth/types/auth.types';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { message } = App.useApp();
  const [form] = Form.useForm<ResetPasswordFormValues>();

  const email = searchParams.get('email') || '';
  const code = searchParams.get('code') || '';

  const [passwordValue, setPasswordValue] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [expiredError, setExpiredError] = useState(false);

  const [resetApi, { isLoading: submitting }] = useResetPasswordMutation();

  // Kiểm tra nếu thiếu thông tin email hoặc mã OTP
  if (!email || !code) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-stone-900">Thiếu thông tin xác thực</h3>
        <p className="text-sm text-stone-500 leading-relaxed max-w-sm mx-auto">
          Liên kết đặt lại mật khẩu không hợp lệ hoặc đã thiếu mã xác thực. Vui lòng gửi lại yêu cầu để nhận mã OTP mới.
        </p>
        <div className="pt-2">
          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Yêu cầu mã mới</span>
          </Link>
        </div>
      </div>
    );
  }

  // Khi hết hạn hoặc lỗi token/OTP
  if (expiredError) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-stone-900">Mã xác thực đã hết hạn</h3>
        <p className="text-sm text-stone-500 leading-relaxed max-w-sm mx-auto">
          Mã OTP khôi phục chỉ có hiệu lực trong thời gian ngắn. Vui lòng yêu cầu cấp lại mã OTP mới.
        </p>
        <div className="pt-2">
          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Yêu cầu mã mới</span>
          </Link>
        </div>
      </div>
    );
  }

  // Khi cập nhật thành công
  if (isSuccess) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-stone-900">Đặt lại mật khẩu thành công!</h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Mật khẩu của bạn đã được cập nhật an toàn. Hệ thống đang tự động chuyển hướng về trang Đăng nhập...
        </p>
        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors"
          >
            <span>Đến trang Đăng nhập ngay</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    // Validate mật khẩu theo tiêu chí an toàn
    const hasMinLen = values.newPassword.length >= 8;
    const hasUpper = /[A-Z]/.test(values.newPassword);
    const hasNumber = /[0-9]/.test(values.newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(values.newPassword);

    if (!hasMinLen || !hasUpper || !hasNumber || !hasSpecial) {
      message.error('Vui lòng chọn mật khẩu đáp ứng đầy đủ tất cả các tiêu chí bảo mật bên dưới.');
      return;
    }

    try {
      const result = await resetApi({
        email,
        code,
        newPassword: values.newPassword,
      }).unwrap();

      message.success(result.message || 'Đặt lại mật khẩu thành công!');
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      const errorMsg = error.data?.message || error.message || '';
      if (
        errorMsg.toLowerCase().includes('hết hạn') ||
        errorMsg.toLowerCase().includes('expired') ||
        errorMsg.toLowerCase().includes('invalid code')
      ) {
        setExpiredError(true);
      } else {
        message.error(errorMsg || 'Không thể đặt lại mật khẩu. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div>
        <Eyebrow className="mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Bảo mật 2 lớp</span>
        </Eyebrow>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          Đặt lại mật khẩu mới
        </h2>
        <p className="text-sm text-stone-500 mt-1.5 leading-relaxed">
          Tạo mật khẩu an toàn cho tài khoản <strong className="text-stone-800">{email}</strong>.
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="space-y-4"
      >
        {/* Mật khẩu mới */}
        <Form.Item
          name="newPassword"
          label={<span className="text-xs font-semibold text-stone-700">Mật khẩu mới</span>}
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới' },
            { min: 8, message: 'Mật khẩu phải có tối thiểu 8 ký tự' },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Nhập mật khẩu mới..."
            prefix={<Lock className="w-4 h-4 text-stone-400 mr-2" />}
            className="rounded-xl h-12"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </Form.Item>

        {/* Password Strength Meter & Realtime Checklist */}
        <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/80">
          <PasswordStrengthMeter password={passwordValue} />
        </div>

        {/* Nhập lại mật khẩu */}
        <Form.Item
          name="confirmPassword"
          label={<span className="text-xs font-semibold text-stone-700">Xác nhận lại mật khẩu</span>}
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận lại mật khẩu' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Nhập lại mật khẩu mới..."
            prefix={<Lock className="w-4 h-4 text-stone-400 mr-2" />}
            className="rounded-xl h-12"
          />
        </Form.Item>

        {/* Nút Submit */}
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          block
          className="h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 mt-2"
        >
          <span>Lưu mật khẩu mới</span>
          <CheckCircle2 className="w-4 h-4" />
        </Button>
      </Form>

      {/* Back to Login */}
      <p className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
        <Link href="/login" className="inline-flex items-center gap-1.5 font-semibold text-amber-600 hover:text-amber-700 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại trang Đăng nhập</span>
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500 text-sm">Đang tải...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
