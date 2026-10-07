'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Checkbox, App } from 'antd';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { LoginRequest } from '@/features/auth/types/auth.types';
import { useLoginMutation } from '@/features/auth/api/authApiSlice';
import { useAppDispatch } from '@/store/hooks';
import { setToken } from '@/store/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loginApi, { isLoading: loading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: any) => {
    try {
      const payload: LoginRequest = {
        email: values.email.trim(),
        password: values.password,
      };

      const result = await loginApi(payload).unwrap();

      if (result.accessToken) {
        dispatch(setToken(result.accessToken));
      }

      message.success(`Đăng nhập thành công! Chào mừng ${result.user?.firstName || 'bạn'} trở lại.`);
      router.push('/');
    } catch (error: any) {
      const errMsg = error.data?.message || error.message || '';
      // Nếu tài khoản chưa xác thực email, Backend trả về 401 yêu cầu xác thực
      if (
        errMsg.toLowerCase().includes('chưa được xác thực') ||
        errMsg.toLowerCase().includes('xác thực trước khi đăng nhập')
      ) {
        message.warning('Tài khoản chưa được kích hoạt. Đang chuyển hướng bạn đến trang nhập OTP...');
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(values.email.trim())}`);
        }, 1200);
        return;
      }

      message.error(errMsg || 'Đăng nhập không thành công. Vui lòng kiểm tra lại email hoặc mật khẩu.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <Badge variant="accent" className="mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Chào mừng bạn trở lại với Pet Luxury</span>
        </Badge>

        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Đăng nhập tài khoản
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Nhập thông tin đăng nhập để tiếp tục mua sắm và quản lý đơn hàng.
        </p>
      </div>

      {/* Main Login Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{ remember: true }}
        className="space-y-4"
      >
        {/* Email Field */}
        <Form.Item
          name="email"
          label={<span className="text-xs font-semibold text-foreground/80">Email</span>}
          rules={[
            { required: true, message: 'Vui lòng nhập email của bạn' },
            { type: 'email', message: 'Email không đúng định dạng' },
          ]}
        >
          <Input
            type="email"
            placeholder="customer@domain.com"
            prefix={<Mail className="w-4 h-4 text-muted-foreground mr-1.5" />}
          />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          name="password"
          label={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-semibold text-foreground/80">Mật khẩu</span>
              <Link
                href="/forgot-password"
                className="text-xs font-normal text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
          }
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            prefix={<Lock className="w-4 h-4 text-muted-foreground mr-1.5" />}
          />
        </Form.Item>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-xs text-muted-foreground">
              Ghi nhớ đăng nhập trên thiết bị này
            </Checkbox>
          </Form.Item>
        </div>

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="h-12 bg-primary hover:bg-amber-700 text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
        >
          <span>Đăng nhập</span>
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
            Hoặc tiếp tục với
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
        <span>Đăng nhập bằng Google</span>
      </button>

      {/* Switch to Register */}
      <p className="text-center text-xs text-muted-foreground pt-2">
        Bạn chưa có tài khoản?{' '}
        <Link
          href="/register"
          className="font-semibold text-primary hover:text-amber-800 underline underline-offset-4"
        >
          Đăng ký ngay &amp; Nhận voucher 15%
        </Link>
      </p>
    </div>
  );
}
