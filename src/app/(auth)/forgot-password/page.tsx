'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, App } from 'antd';
import { Mail, ArrowRight, ShieldAlert, KeyRound, ArrowLeft } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { 
  useForgotPasswordMutation, 
  useVerifyResetPasswordMutation 
} from '@/features/auth/api/authApiSlice';
import type { ForgotPasswordFormValues } from '@/features/auth/types/auth.types';

const MAX_RESEND_PER_HOUR = 5;
const ONE_HOUR_MS = 60 * 60 * 1000;

function checkRateLimit(email: string): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const key = `forgot_pwd_resend_${email.toLowerCase()}`;
    const raw = localStorage.getItem(key);
    const now = Date.now();
    if (!raw) {
      localStorage.setItem(key, JSON.stringify({ count: 1, resetAt: now + ONE_HOUR_MS }));
      return true;
    }
    const data = JSON.parse(raw);
    if (now > data.resetAt) {
      localStorage.setItem(key, JSON.stringify({ count: 1, resetAt: now + ONE_HOUR_MS }));
      return true;
    }
    if (data.count >= MAX_RESEND_PER_HOUR) {
      return false;
    }
    localStorage.setItem(key, JSON.stringify({ count: data.count + 1, resetAt: data.resetAt }));
    return true;
  } catch {
    return true;
  }
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const [form] = Form.useForm<ForgotPasswordFormValues>();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const [forgotApi, { isLoading: sending }] = useForgotPasswordMutation();
  const [verifyApi, { isLoading: verifying }] = useVerifyResetPasswordMutation();

  // Đếm ngược 60s
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendEmail = async (values: ForgotPasswordFormValues) => {
    const cleanEmail = values.email.trim();
    
    // Kiểm tra giới hạn gửi lại
    if (!checkRateLimit(cleanEmail)) {
      message.warning('Bạn đã vượt quá giới hạn gửi lại mã (tối đa 5 lần/giờ). Vui lòng thử lại sau 1 giờ.');
      return;
    }

    try {
      await forgotApi({ email: cleanEmail }).unwrap();
    } catch {
      // Bảo mật: Không để lộ email có tồn tại hay không (chống dò tài khoản)
    }

    setEmail(cleanEmail);
    message.info('Nếu email tồn tại trên hệ thống, bạn sẽ nhận được mã OTP xác thực khôi phục mật khẩu.');
    setStep(2);
    setCountdown(60);
  };

  const handleVerifyOtp = async (otpCode: string = code) => {
    if (!otpCode || otpCode.length !== 6) {
      message.error('Vui lòng nhập đầy đủ 6 chữ số mã OTP.');
      return;
    }

    try {
      await verifyApi({ email, code: otpCode }).unwrap();
      message.success('Xác thực OTP thành công!');
      // Chuyển sang trang đặt lại mật khẩu với email và mã đã xác thực
      router.push(`/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(otpCode)}`);
    } catch (error: any) {
      message.error(error.data?.message || 'Mã OTP không đúng hoặc đã hết hạn.');
    }
  };

  const handleResendOtp = async () => {
    if (!email || countdown > 0) return;

    if (!checkRateLimit(email)) {
      message.warning('Bạn đã vượt quá giới hạn gửi lại mã (tối đa 5 lần/giờ). Vui lòng thử lại sau 1 giờ.');
      return;
    }

    try {
      await forgotApi({ email }).unwrap();
    } catch {
      // Giữ kín thông tin tài khoản
    }

    message.info('Nếu email tồn tại trên hệ thống, bạn sẽ nhận được mã OTP mới.');
    setCountdown(60);
    setCode('');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div>
        <Eyebrow className="mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Khôi phục tài khoản</span>
        </Eyebrow>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          {step === 1 ? 'Quên mật khẩu?' : 'Xác thực mã OTP'}
        </h2>
        <p className="text-sm text-stone-500 mt-1.5 leading-relaxed">
          {step === 1
            ? 'Nhập email của bạn, chúng tôi sẽ gửi mã OTP gồm 6 chữ số để đặt lại mật khẩu.'
            : `Mã OTP đã được gửi đến hòm thư ${email}. Vui lòng nhập mã để tiếp tục.`}
        </p>
      </div>

      {step === 1 ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSendEmail}
          requiredMark={false}
          className="space-y-4"
        >
          <Form.Item
            name="email"
            label={<span className="text-xs font-semibold text-stone-700">Email tài khoản</span>}
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ email' },
              { type: 'email', message: 'Địa chỉ email không hợp lệ' },
            ]}
          >
            <Input
              size="large"
              placeholder="customer@domain.com"
              prefix={<Mail className="w-4 h-4 text-stone-400 mr-2" />}
              className="rounded-xl h-12"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={sending}
            block
            className="h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2"
          >
            <span>Gửi mã xác nhận</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Form>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-5 text-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
              Nhập mã OTP gồm 6 chữ số
            </label>
            <div className="flex justify-center">
              <Input.OTP
                length={6}
                size="large"
                value={code}
                onChange={(val) => {
                  setCode(val);
                  if (val.length === 6) {
                    handleVerifyOtp(val);
                  }
                }}
                className="text-lg font-mono font-bold"
              />
            </div>

            <Button
              type="primary"
              onClick={() => handleVerifyOtp()}
              loading={verifying}
              disabled={code.length !== 6}
              block
              className="h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2"
            >
              <span>Xác thực &amp; Tiếp tục</span>
              <KeyRound className="w-4 h-4" />
            </Button>

            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
              <span>Chưa nhận được mã?</span>
              {countdown > 0 ? (
                <span className="font-mono tabular-nums text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                  Gửi lại sau <strong className="text-stone-800">{countdown}s</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-amber-600 hover:text-amber-700 font-semibold cursor-pointer underline"
                >
                  Gửi lại mã OTP
                </button>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setCode('');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Nhập lại email khác</span>
            </button>
          </div>
        </div>
      )}

      {/* Back to Login */}
      <p className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
        Bạn đã nhớ lại mật khẩu?{' '}
        <Link href="/login" className="font-semibold text-amber-600 hover:text-amber-700 hover:underline">
          Quay lại Đăng nhập
        </Link>
      </p>
    </div>
  );
}
