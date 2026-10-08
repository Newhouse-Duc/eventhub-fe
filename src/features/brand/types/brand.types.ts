export interface BrandItem {
  id: string;
  name: string;
  slug: string;
  country: string;
  logo: string;
  banner: string;
  description: string;
  story: string;
  productCount: number;
  featured: boolean;
  species: ('dog' | 'cat')[];
}
