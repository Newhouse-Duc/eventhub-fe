export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  category: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
  tags: string[];
  recommendedProductSlug?: string;
}
