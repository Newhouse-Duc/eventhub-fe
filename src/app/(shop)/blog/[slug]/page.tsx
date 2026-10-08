import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { BlogDetailView, MOCK_BLOG_POSTS } from '@/features/blog';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Bài viết không tìm thấy — Pet Luxury' };
  }

  return {
    title: `${post.title} — Pet Luxury`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = MOCK_BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Cẩm nang nuôi cưng', href: '/blog' },
    { label: post.title, isCurrent: true },
  ];

  return (
    <div className="py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <BlogDetailView post={post} relatedPosts={relatedPosts} />
    </div>
  );
}
