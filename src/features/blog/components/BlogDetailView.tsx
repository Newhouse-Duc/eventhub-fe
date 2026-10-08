'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Share2, ArrowLeft, Bookmark, ShoppingBag } from 'lucide-react';
import { App } from 'antd';
import { Bezel } from '@/components/ui/bezel';
import { ProductCard } from '@/features/product/components/ProductCard';
import { MOCK_PRODUCTS } from '@/features/product/data/mockProducts';
import type { BlogPost } from '../types/blog.types';

interface BlogDetailViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogDetailView({ post, relatedPosts }: BlogDetailViewProps) {
  const { message } = App.useApp();

  const recommendedProduct = post.recommendedProductSlug
    ? MOCK_PRODUCTS.find((p) => p.slug === post.recommendedProductSlug)
    : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('Đã sao chép liên kết bài viết vào clipboard!');
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Tất cả bài viết
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white inline-block">
          {post.category}
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-stone-200">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-stone-200">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" sizes="44px" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">{post.author.name}</p>
              <p className="text-[11px] text-stone-500">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-500 font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
              title="Chia sẻ bài viết"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cover Image Bezel */}
      <Bezel className="overflow-hidden p-0">
        <div className="relative aspect-[16/9] w-full bg-stone-100">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="(min-width: 1024px) 800px, 100vw" />
        </div>
      </Bezel>

      {/* Body Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
        <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
          {post.content}
        </div>

        {/* Embedded Recommended Product Card */}
        {recommendedProduct && (
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Sản phẩm được khuyên dùng trong bài viết
              </h3>
            </div>
            <div className="max-w-xs">
              <ProductCard {...recommendedProduct} />
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-stone-100">
          <span className="text-xs font-semibold text-stone-500">Chủ đề:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-stone-100 text-stone-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-8 space-y-6">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Bài Viết Liên Quan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <Link key={rel.id} href={`/blog/${rel.slug}`} className="block group">
                <Bezel className="p-4 flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <Image src={rel.coverImage} alt={rel.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-700">{rel.category}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-700 line-clamp-2 mt-0.5">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-mono mt-1 block">{rel.readTime}</span>
                  </div>
                </Bezel>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
