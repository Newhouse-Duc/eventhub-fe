'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import { MOCK_BLOG_POSTS } from '../data/mockBlog';
import type { BlogPost } from '../types/blog.types';

const CATEGORIES = ['Tất cả', 'Dinh Dưỡng', 'Sức Khỏe', 'Phụ Kiện'];

export function BlogIndexView() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const featuredPost = MOCK_BLOG_POSTS.find((p) => p.featured) || MOCK_BLOG_POSTS[0];

  const filteredPosts = MOCK_BLOG_POSTS.filter((post) => {
    return activeCategory === 'Tất cả' || post.category === activeCategory;
  });

  return (
    <div className="space-y-12">
      {/* Top Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full inline-block mb-3">
          Cẩm Nang Chăm Sóc Thú Cưng
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Kiến Thức &amp; Tư Vấn Dinh Dưỡng
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Các bài viết chuyên sâu từ đội ngũ bác sĩ thú y và chuyên gia dinh dưỡng sinh học hàng đầu.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`h-8 px-4 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Big Post */}
      {featuredPost && (
        <div className="max-w-5xl mx-auto">
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <Bezel className="overflow-hidden p-0 transition-all duration-300 group-hover:shadow-[var(--shadow-lift)]">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 w-full bg-stone-100">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-600 text-white shadow-xs">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-stone-500 font-mono mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredPost.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-stone-200">
                        <Image src={featuredPost.author.avatar} alt={featuredPost.author.name} fill className="object-cover" sizes="32px" />
                      </div>
                      <span className="text-xs font-semibold text-stone-800">{featuredPost.author.name}</span>
                    </div>

                    <span className="text-xs font-bold text-amber-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Bezel>
          </Link>
        </div>
      )}

      {/* 3-Column Grid of other posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
            <Bezel className="p-0 overflow-hidden h-full flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lift)]">
              <div>
                <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur text-stone-800">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-stone-700">
                <span>{post.author.name}</span>
                <span className="text-amber-700 group-hover:translate-x-1 transition-transform">➜</span>
              </div>
            </Bezel>
          </Link>
        ))}
      </div>
    </div>
  );
}
