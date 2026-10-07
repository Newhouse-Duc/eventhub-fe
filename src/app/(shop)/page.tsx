import React from 'react';
import { HomeHero } from '@/features/home/components/HomeHero';
import { SpeciesCategoryGrid } from '@/features/home/components/SpeciesCategoryGrid';
import { FlashSaleSection } from '@/features/home/components/FlashSaleSection';
import { FeaturedProductsTabs } from '@/features/home/components/FeaturedProductsTabs';
import { BentoBanners } from '@/features/home/components/BentoBanners';
import { BrandMarquee } from '@/features/home/components/BrandMarquee';
import { CommitmentBar } from '@/features/home/components/CommitmentBar';
import { CustomerReviewsSection } from '@/features/home/components/CustomerReviewsSection';
import { BlogSection } from '@/features/home/components/BlogSection';

export const revalidate = 300; // Revalidate every 5 minutes according to DESIGN.md

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#FDFBF7] min-h-screen">
      {/* 1. Hero Asymmetric Section */}
      <HomeHero />

      {/* 2. Danh mục theo loài (5 thẻ tròn/bo lớn) */}
      <SpeciesCategoryGrid />

      {/* 3. Flash Sale với Live Countdown & Thanh tiến độ "Đã bán" */}
      <FlashSaleSection />

      {/* 4. Sản phẩm nổi bật với Tabs (Bán chạy | Mới về | Dành cho bạn) */}
      <FeaturedProductsTabs />

      {/* 5. Banner lệch (Bento grid 2 ô lớn + 2 ô nhỏ) */}
      <BentoBanners />

      {/* 6. Đối tác thương hiệu (Marquee dừng khi hover) */}
      <BrandMarquee />

      {/* 7. 4 Cam kết vàng */}
      <CommitmentBar />

      {/* 8. Đánh giá khách hàng kèm ảnh thú cưng & PetTag */}
      <CustomerReviewsSection />

      {/* 9. Blog - 3 bài viết mới nhất */}
      <BlogSection />
    </div>
  );
}
