export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  hoverImage?: string;
  rating?: number;
  reviewCount?: number;
  isOutOfStock?: boolean;
  inStock?: boolean;
  hasVariants?: boolean;
  badge?: 'new' | 'sale' | 'bestseller';
  species?: 'dog' | 'cat' | 'bird' | 'fish' | 'small-pet';
  category?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
  inStock: boolean;
}

export interface FlavorVariant {
  id: string;
  name: string;
  inStock: boolean;
}

export interface PetCompatibility {
  suitableBreed?: string;
  suitableAge?: string;
  allergenWarning?: string;
}

export interface ProductDetail extends ProductCardProps {
  images: string[];
  soldCount: number;
  stockQuantity: number;
  variants: ProductVariant[];
  flavors?: FlavorVariant[];
  description: string;
  ingredients: string;
  feedingGuide: string;
  storageInstructions: string;
  petCompatibility?: PetCompatibility;
}

export interface ProductFilterState {
  species: string[];
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  minRating?: number;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  sortBy: 'popular' | 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'discount';
  page: number;
  searchQuery?: string;
}

export interface ProductSidebarFilterProps {
  filters: ProductFilterState;
  onFilterChange: (newFilters: Partial<ProductFilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  className?: string;
}

export interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export interface ProductBundleProps {
  mainProduct: ProductCardProps;
  bundleAddons: ProductCardProps[];
  discountPercent: number;
}
