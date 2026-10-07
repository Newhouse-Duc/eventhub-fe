'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PawPrint, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <main className="w-full max-w-md mx-auto text-center flex flex-col items-center z-10">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
          <PawPrint className="w-10 h-10 text-primary" />
        </div>
        
        <p className="text-sm font-mono font-bold tracking-[0.2em] text-primary uppercase mb-4">
          Error 404
        </p>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Lạc đường rồi!
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-[320px]">
          Trang bạn đang tìm kiếm không tồn tại, đã bị xoá hoặc tên đã bị thay đổi. Hãy để chúng tôi đưa bạn về nhà nhé.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto h-12 px-6 rounded-full border border-border bg-background text-foreground text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto h-12 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </Link>
        </div>

        <nav aria-label="Các liên kết chính" className="mt-16 pt-8 border-t border-border w-full">
          <p className="text-sm text-muted-foreground mb-4">Có thể bạn quan tâm:</p>
          <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <li>
              <Link href="/products?category=dog" className="text-foreground hover:text-primary transition-colors hover:underline underline-offset-4">
                Sản phẩm cho Chó
              </Link>
            </li>
            <li>
              <Link href="/products?category=cat" className="text-foreground hover:text-primary transition-colors hover:underline underline-offset-4">
                Sản phẩm cho Mèo
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-foreground hover:text-primary transition-colors hover:underline underline-offset-4">
                Đăng nhập
              </Link>
            </li>
          </ul>
        </nav>
      </main>

      <footer className="absolute bottom-6 text-xs text-muted-foreground z-10">
        © {new Date().getFullYear()} Pet Luxury. All rights reserved.
      </footer>
    </div>
  );
}
