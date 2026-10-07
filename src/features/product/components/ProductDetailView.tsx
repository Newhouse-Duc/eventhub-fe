'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  AlertTriangle, 
  Share2, 
  Star,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { ProductGallery } from '@/features/product/components/ProductGallery';
import { ProductBundle } from '@/features/product/components/ProductBundle';
import { ProductCard } from '@/features/product/components/ProductCard';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RatingStars } from '@/features/review/components/RatingStars';
import { RatingBreakdown } from '@/features/review/components/RatingBreakdown';
import { ReviewCard } from '@/features/review/components/ReviewCard';
import { MOCK_PRODUCTS } from '@/features/product/data/mockProducts';
import type { ProductDetail, ProductVariant, FlavorVariant } from '@/features/product/types/product.types';

export function ProductDetailView({ product }: { product: ProductDetail }) {
  // Selected variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants?.[0] || {
      id: 'default',
      name: 'Tiêu chuẩn',
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stockQuantity,
      sku: 'SKU-STD',
      inStock: product.inStock,
    }
  );

  const [selectedFlavor, setSelectedFlavor] = useState<FlavorVariant | undefined>(
    product.flavors?.[0]
  );

  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'reviews' | 'faq'>('desc');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice = selectedVariant.price;
  const currentOriginalPrice = selectedVariant.originalPrice;
  const currentStock = selectedVariant.stock;
  const isOutOfStock = !selectedVariant.inStock || currentStock <= 0;

  const discountPercent = currentOriginalPrice
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 400);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (item) => item.id !== product.id && (item.species === product.species || item.category === product.category)
  ).slice(0, 4);

  const bundleAddons = MOCK_PRODUCTS.filter(
    (item) => item.id !== product.id && item.species === product.species
  ).slice(0, 2);

  return (
    <div className="space-y-14">
      {/* Upper Grid: Gallery (55%) + Info (45%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Gallery Column (55% -> lg:col-span-7) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Info Column (45% -> lg:col-span-5, sticky top-24) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          {/* Eyebrow & Brand */}
          <div className="flex items-center justify-between">
            <Eyebrow>
              <span>{product.brand.toUpperCase()}</span>
            </Eyebrow>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsWished(!isWished)}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${
                  isWished
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-stone-200 text-stone-400 hover:text-stone-700 bg-white'
                }`}
                title="Lưu vào yêu thích"
              >
                <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full border border-stone-200 text-stone-400 hover:text-stone-700 bg-white transition-colors cursor-pointer"
                title="Chia sẻ sản phẩm"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
            {product.name}
          </h1>

          {/* Rating & Sold count */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-bold text-stone-900">{product.rating}</span>
            </div>
            <a
              href="#reviews"
              onClick={() => setActiveTab('reviews')}
              className="text-stone-500 hover:text-amber-700 underline cursor-pointer"
            >
              {product.reviewCount} đánh giá
            </a>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500 font-medium">
              Đã bán <strong className="text-stone-800 tabular-nums">{(product.soldCount / 1000).toFixed(1)}k</strong>
            </span>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-baseline gap-3">
            <PriceDisplay price={currentPrice} size="xl" className="text-amber-800" />
            {currentOriginalPrice && currentOriginalPrice > currentPrice && (
              <>
                <span className="text-sm text-stone-400 line-through">
                  {currentOriginalPrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Pet-aware Banner (nếu có thông tin tương thích) */}
          {product.petCompatibility && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-emerald-900 leading-relaxed">
                <span className="font-bold block">Khuyến nghị thú y:</span>
                <span>{product.petCompatibility.suitableBreed} • {product.petCompatibility.suitableAge}</span>
                {product.petCompatibility.allergenWarning && (
                  <span className="block text-emerald-700 font-medium mt-0.5">
                    {product.petCompatibility.allergenWarning}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Variant Selector (Khối lượng / Kích cỡ) */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700">Quy cách / Khối lượng:</span>
                <span className="font-mono text-stone-500 font-semibold">{selectedVariant.sku}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={!v.inStock}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        !v.inStock
                          ? 'opacity-40 line-through border-stone-200 bg-stone-50 text-stone-400 cursor-not-allowed'
                          : isSelected
                          ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-600/20 font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-400'
                      }`}
                    >
                      {v.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Flavors Selector */}
          {product.flavors && product.flavors.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-semibold text-stone-700 block">Hương vị lựa chọn:</span>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((f) => {
                  const isSelected = selectedFlavor?.id === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      disabled={!f.inStock}
                      onClick={() => setSelectedFlavor(f)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-600/20 font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-amber-400'
                      }`}
                    >
                      {f.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Stock status */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-700">Số lượng:</span>
              {currentStock <= 5 && currentStock > 0 ? (
                <span className="text-orange-600 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Chỉ còn {currentStock} sản phẩm
                </span>
              ) : isOutOfStock ? (
                <span className="text-rose-600 font-bold">Tạm hết hàng</span>
              ) : (
                <span className="text-stone-500 font-medium">Còn {currentStock} sản phẩm</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={Math.min(currentStock || 1, 99)}
              />
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="flex-1 h-12 rounded-full border-2 border-amber-600 hover:bg-amber-50 text-amber-700 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Đã thêm vào giỏ!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm vào giỏ</span>
                </>
              )}
            </button>

            <Link
              href={isOutOfStock ? '#' : '/checkout'}
              className={`flex-1 h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-all shadow-[var(--shadow-brand)] flex items-center justify-center gap-2 cursor-pointer ${
                isOutOfStock ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <span>Mua ngay</span>
            </Link>
          </div>

          {/* Golden Trust Badges */}
          <div className="pt-4 border-t border-stone-200/80 grid grid-cols-3 gap-2 text-[11px] text-stone-500 text-center font-medium">
            <div className="p-2 rounded-xl bg-stone-50 border border-stone-100 flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-amber-700" />
              <span>Hỏa tốc 2H</span>
            </div>
            <div className="p-2 rounded-xl bg-stone-50 border border-stone-100 flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-sky-700" />
              <span>Đổi trả 7 ngày</span>
            </div>
            <div className="p-2 rounded-xl bg-stone-50 border border-stone-100 flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Chính ngạch</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Section: Mô tả | Thành phần | Đánh giá | Hỏi đáp */}
      <div className="pt-8 border-t border-stone-200">
        <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
          {[
            { key: 'desc', label: 'Mô tả chi tiết' },
            { key: 'ingredients', label: 'Thành phần & Hướng dẫn' },
            { key: 'reviews', label: `Đánh giá (${product.reviewCount})` },
            { key: 'faq', label: 'Hỏi đáp & Tư vấn' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-5 py-3.5 text-sm font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === tab.key
                  ? 'border-amber-600 text-amber-700 font-extrabold'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'desc' && (
            <div className="prose prose-stone max-w-none space-y-4 text-sm leading-relaxed text-stone-700">
              <p>{product.description}</p>
              <h4 className="text-base font-bold text-stone-900 mt-4">Điểm nổi bật của sản phẩm:</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Nguyên liệu hữu cơ chọn lọc, đảm bảo tiêu chuẩn kiểm định nghiêm ngặt từ châu Âu.</li>
                <li>Công thức mô phỏng thức ăn tự nhiên, hỗ trợ chuyển hóa năng lượng hoàn hảo.</li>
                <li>Tăng cường hệ miễn dịch tự nhiên và bảo vệ sức khỏe hệ tiêu hóa non nớt.</li>
              </ul>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-6 text-sm text-stone-700">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900">Bảng thành phần dinh dưỡng:</h4>
                <p className="leading-relaxed">{product.ingredients}</p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900">Khẩu phần &amp; Hướng dẫn cho ăn:</h4>
                <p className="leading-relaxed">{product.feedingGuide}</p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900">Hướng dẫn bảo quản:</h4>
                <p className="leading-relaxed">{product.storageInstructions}</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div id="reviews" className="space-y-8">
              <RatingBreakdown
                average={product.rating || 5}
                totalReviews={product.reviewCount || 0}
                distribution={{ 5: 280, 4: 35, 3: 10, 2: 2, 1: 1 }}
              />

              <div className="space-y-4 pt-4">
                <h4 className="text-base font-bold text-stone-900">Đánh giá từ khách hàng:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ReviewCard
                    id="rev-p1"
                    authorName="Hoàng Trọng Nghĩa"
                    rating={5}
                    dateStr="03/10/2026"
                    isVerifiedPurchase
                    content="Đúng chuẩn hàng nhập khẩu chính hãng, cún nhà mình cực mê vị này. Giao hàng hỏa tốc trong 1 tiếng rưỡi rất tiện lợi!"
                    petTag={{ species: 'dog', breed: 'Poodle', ageText: '2 tuổi', weightStr: '4.5kg' }}
                  />
                  <ReviewCard
                    id="rev-p2"
                    authorName="Lê Phương Anh"
                    rating={5}
                    dateStr="28/09/2026"
                    isVerifiedPurchase
                    content="Sản phẩm đóng gói kỹ càng, túi zip kín mùi không lo ẩm mốc. Shop tư vấn rất có tâm!"
                    petTag={{ species: 'dog', breed: 'Corgi', ageText: '1 tuổi', weightStr: '10kg' }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4 max-w-2xl">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <h5 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  Bé cún bao nhiêu tháng tuổi thì có thể dùng sản phẩm này?
                </h5>
                <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                  Sản phẩm được thiết kế tối ưu cho các bé từ 12 tháng tuổi trở lên. Nếu bé nhà bạn dưới 12 tháng, bạn có thể tham khảo dòng Puppy chuyên biệt của cùng hãng.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <h5 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  Nếu đổi hạt từ hãng khác sang Orijen thì cho ăn thế nào để không bị tiêu chảy?
                </h5>
                <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                  Bạn nên chuyển đổi từ từ trong 7 ngày: Ngày 1-2 trộn 25% hạt mới, ngày 3-4 trộn 50%, ngày 5-6 trộn 75% và ngày thứ 7 cho ăn 100% hạt mới.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frequently Bought Together (Bundle) */}
      {bundleAddons.length > 0 && (
        <ProductBundle
          mainProduct={product}
          bundleAddons={bundleAddons}
          discountPercent={10}
        />
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Sản phẩm tương tự có thể bạn quan tâm
            </h3>
            <Link
              href="/products"
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Add-to-cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-stone-900 truncate">{product.name}</p>
          <PriceDisplay price={currentPrice} size="sm" className="text-amber-800" />
        </div>
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="h-11 px-5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer disabled:opacity-50"
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Đã thêm</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Thêm vào giỏ</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
