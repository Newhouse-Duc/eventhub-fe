import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AntdProvider } from '@/components/providers/AntdProvider';
import StoreProvider from '@/app/StoreProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Pet Luxury — Cửa hàng thú cưng cao cấp & Đồ dùng chính hãng',
    template: '%s | Pet Luxury',
  },
  description: 'Nền tảng thương mại điện tử chuyên cung cấp thức ăn, phụ kiện và dịch vụ chăm sóc thú cưng cao cấp hàng đầu.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FDFBF7] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
        <StoreProvider>
          <AntdProvider>{children}</AntdProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
