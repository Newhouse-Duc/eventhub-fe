'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, App } from 'antd';
import { User, Mail, Lock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { RegisterRequest } from '@/features/auth/types/auth.types';
import { useRegisterMutation } from '@/features/auth/api/authApiSlice';

export default function RegisterPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [registerApi, { isLoading: loading }] = useRegisterMutation();
  const [password, setPassword] = useState('');

  // Tính toán độ mạnh mật khẩu (0 to 4)
  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strength = calculatePasswordStrength(password);
  const strengthLabels = ['Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất an toàn'];
  const strengthColors = [
    'bg-border',
    'bg-destructive',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-emerald-600',
  ];

  const handleSubmit = async (values: any) => {
    try {
      const payload: RegisterRequest = {
        email: values.email.trim(),
        password: values.password,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone?.trim() || undefined,
      };

      const result = await registerApi(payload).unwrap();
      message.success(result.message || 'Đăng ký thành công! Vui lòng kiểm tra email để nhận mã OTP.');

      // Chuyển hướng sang trang nhập OTP xác thực email
      router.push(`/verify-email?email=${encodeURIComponent(payload.email)}`);
    } catch (error: any) {
      message.error(error.data?.message || error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <Badge variant="accent" className="mb-2.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          <span>Tặng ngay voucher 15% cho thành viên mới</span>
        </Badge>

        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Tạo tài khoản Pet Luxury
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Đăng ký để tích điểm đổi quà và theo dõi đơn hàng dễ dàng.
        </p>
      </div>

      {/* Main Register Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="space-y-4"
      >
        {/* Name Fields: 2 Columns (Họ & Tên) */}
        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            name="lastName"
            label={<span className="text-xs font-semibold text-foreground/80">Họ &amp; tên đệm</span>}
            rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
            className="mb-0"
          >
            <Input
              placeholder="Nguyễn Văn"
              prefix={<User className="w-4 h-4 text-muted-foreground mr-1.5" />}
            />
          </Form.Item>

          <Form.Item
            name="firstName"
            label={<span className="text-xs font-semibold text-foreground/80">Tên</span>}
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
            className="mb-0"
          >
            <Input
              placeholder="An"
            />
          </Form.Item>
        </div>

        {/* Email Field */}
        <Form.Item
          name="email"
          label={<span className="text-xs font-semibold text-foreground/80">Email</span>}
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không đúng định dạng' },
          ]}
        >
          <Input
            type="email"
            placeholder="example@domain.com"
            prefix={<Mail className="w-4 h-4 text-muted-foreground mr-1.5" />}
          />
        </Form.Item>

        {/* Phone Field */}
        <Form.Item
          name="phone"
          label={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-semibold text-foreground/80">Số điện thoại</span>
              <span className="text-[11px] text-muted-foreground font-normal">Tùy chọn</span>
            </div>
          }
        >
          <Input
            type="tel"
            placeholder="0912 345 678"
            prefix={<Phone className="w-4 h-4 text-muted-foreground mr-1.5" />}
          />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          name="password"
          label={<span className="text-xs font-semibold text-foreground/80">Mật khẩu</span>}
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
          ]}
        >
          <Input.Password
            placeholder="Tối thiểu 6 ký tự"
            prefix={<Lock className="w-4 h-4 text-muted-foreground mr-1.5" />}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        {/* Password Strength Indicator */}
        {password.length > 0 && (
          <div className="space-y-1.5 -mt-2 mb-4 p-2.5 rounded-lg bg-secondary border border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Độ mạnh mật khẩu:</span>
              <span className="font-semibold text-foreground">
                {strengthLabels[strength]}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-full rounded-full transition-all duration-300 ${
                    strength >= step ? strengthColors[strength] : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="h-12 bg-primary hover:bg-amber-700 text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
        >
          <span>Tạo tài khoản &amp; Nhận ưu đãi</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Form>

      {/* Social Login Separator */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground font-medium">
            Hoặc đăng ký nhanh với
          </span>
        </div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        className="w-full h-11 px-4 border border-border bg-card hover:bg-secondary text-foreground font-medium text-sm rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm cursor-pointer"
        onClick={() => message.info('Tính năng đăng nhập Google đang được tích hợp.')}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.28 21.43 7.35 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.57H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.43l4.03-3.11z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.28 2.57 1.25 6.57l4.03 3.11c.95-2.83 3.6-4.93 6.72-4.93z"
          />
        </svg>
        <span>Đăng ký bằng Google</span>
      </button>

      {/* Switch to Login */}
      <p className="text-center text-xs text-muted-foreground pt-2">
        Bạn đã có tài khoản rồi?{' '}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-amber-800 underline underline-offset-4"
        >
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
}
