import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import type { BlogPostItem } from '@/features/home/types/home.types';

const POSTS: BlogPostItem[] = [
  {
    id: 'b-1',
    title: 'Chế độ ăn Grain-Free là gì và khi nào cún cưng của bạn thật sự cần?',
    excerpt: 'Tìm hiểu chi tiết về cơ chế dị ứng protein thực vật và cách chọn hạt không ngũ cốc phù hợp theo độ tuổi của bé.',
    date: '04/10/2026',
    category: 'Dinh Dưỡng Thú Y',
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600',
    href: '/blog/grain-free-nutrition-guide',
  },
  {
    id: 'b-2',
    title: 'Bí quyết giúp mèo cưng uống đủ nước mỗi ngày để ngừa sỏi thận',
    excerpt: 'Mèo có thói quen lười uống nước đọng. Khám phá 5 mẹo từ bác sĩ thú y giúp kích thích bản năng uống nước tự nhiên của boss.',
    date: '29/09/2026',
    category: 'Chăm Sóc Mèo',
    readTime: '4 phút đọc',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
    href: '/blog/how-to-keep-cats-hydrated',
  },
  {
    id: 'b-3',
    title: 'Tại sao đệm nằm công thái học lại quan trọng đối với các dòng chó lớn?',
    excerpt: 'Cân nặng của các giống chó lớn tạo áp lực khổng lồ lên khớp gối và cột sống. Một chiếc đệm chuẩn y khoa sẽ tạo nên sự khác biệt.',
    date: '25/09/2026',
    category: 'Sức Khỏe & Vận Động',
    readTime: '6 phút đọc',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=600',
    href: '/blog/orthopedic-beds-for-large-dogs',
  },
];

export function BlogSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
            Cẩm nang nuôi cưng
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
            Kiến thức &amp; Lời khuyên từ Bác sĩ
          </h2>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 group"
        >
          <span>Xem tất cả bài viết</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POSTS.map((post) => (
          <Link key={post.id} href={post.href} className="group block h-full">
            <Bezel className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lift)]">
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden rounded-t-[20px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-semibold">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-stone-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1 text-xs font-bold text-amber-700">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Bezel>
          </Link>
        ))}
      </div>
    </section>
  );
}
