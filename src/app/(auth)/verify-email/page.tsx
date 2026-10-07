'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Button, App } from 'antd';
import { MailCheck, RotateCcw, ArrowRight, ShieldAlert } from 'lucide-react';
import { useVerifyEmailMutation, useResendOtpMutation } from '@/features/auth/api/authApiSlice';
import { useAppDispatch } from '@/store/hooks';
import { setToken } from '@/store/authSlice';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { message } = App.useApp();

  const emailParam = searchParams.get('email') || '';
  const [email, setEmail] = useState(emailParam);
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(60);

  const [verifyApi, { isLoading: loading }] = useVerifyEmailMutation();
  const [resendApi, { isLoading: resending }] = useResendOtpMutation();
  const dispatch = useAppDispatch();

  // Đồng bộ email từ searchParams
  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  // Bộ đếm ngược thời gian cho nút gửi lại OTP
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Tự động submit khi nhập đủ 6 ký tự
  const handleOtpChange = (text: string) => {
    setCode(text);
    if (text.length === 6) {
      handleVerify(text);
    }
  };

  const handleVerify = async (otpCode: string = code) => {
    if (!email) {
      message.error('Vui lòng cung cấp email cần xác thực');
      return;
    }
    if (!otpCode || otpCode.length !== 6) {
      message.error('Mã OTP phải có đúng 6 chữ số');
      return;
    }

    try {
      const result = await verifyApi({
        email: email.trim(),
        code: otpCode.trim(),
      }).unwrap();

      if (result.tokens?.accessToken) {
        dispatch(setToken(result.tokens.accessToken));
      }

      message.success(result.message || 'Xác thực tài khoản thành công!');
      // Điều hướng về trang chủ sau khi xác thực thành công
      router.push('/');
    } catch (error: any) {
      message.error(error.data?.message || error.message || 'Mã xác thực không đúng hoặc đã hết hạn.');
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      message.error('Vui lòng nhập email');
      return;
    }

    try {
      const res = await resendApi({ email: email.trim() }).unwrap();
      message.success(res.message || 'Mã OTP mới đã được gửi vào hòm thư.');
      setCountdown(60);
      setCode('');
    } catch (error: any) {
      message.error(error.data?.message || error.message || 'Không thể gửi lại mã OTP. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Icon & Heading */}
      <div className="text-center sm:text-left">
        <div className="w-12 h-12 rounded-2xl bg-accent border border-border flex items-center justify-center text-primary mx-auto sm:mx-0 mb-4">
          <MailCheck className="w-6 h-6" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Xác thực hòm thư email
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến địa chỉ email:
        </p>

        {/* Highlighted email pill */}
        <div className="inline-flex items-center gap-2 mt-2.5 px-3 py-1 rounded-lg bg-secondary border border-border text-xs font-semibold text-foreground">
          <span>{email || 'Chưa cung cấp email'}</span>
          <Link
            href="/register"
            className="text-primary hover:underline ml-1 font-normal"
          >
            Đổi email
          </Link>
        </div>
      </div>

      {/* Main OTP Input Section */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-6 text-center">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
            Nhập 6 số mã OTP bảo mật
          </label>
          <div className="flex justify-center">
            <Input.OTP
              length={6}
              size="large"
              value={code}
              onChange={handleOtpChange}
              formatter={(str) => str.toUpperCase()}
              className="text-lg font-mono font-bold"
            />
          </div>
        </div>

        {/* Submit Verification Button */}
        <Button
          type="primary"
          onClick={() => handleVerify()}
          loading={loading}
          disabled={code.length !== 6}
          block
          className="h-12 bg-primary hover:bg-amber-700 text-primary-foreground font-semibold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Kích hoạt tài khoản</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        {/* Resend Code Section */}
        <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>Bạn vẫn chưa nhận được thư?</span>

          {countdown > 0 ? (
            <span className="font-mono tabular-nums text-muted-foreground bg-secondary px-2.5 py-1 rounded-md border border-border">
              Gửi lại sau <strong className="text-foreground">{countdown}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resending}
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-amber-800 cursor-pointer disabled:opacity-50 transition-colors"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
              <span>Gửi lại mã OTP</span>
            </button>
          )}
        </div>
      </div>

      {/* Spam reminder note */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-accent border border-border text-xs text-accent-foreground">
        <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p>
          Vui lòng kiểm tra cả thư mục <strong>Spam / Rác</strong> nếu bạn không thấy mã gửi về hòm thư chính trong vòng 1-2 phút.
        </p>
      </div>

      {/* Back to Login */}
      <p className="text-center text-xs text-muted-foreground">
        Đã kích hoạt tài khoản?{' '}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline underline-offset-4"
        >
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
