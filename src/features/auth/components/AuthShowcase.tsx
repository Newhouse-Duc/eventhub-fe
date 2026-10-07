import React from 'react';
import { ShieldCheck, Truck, Sparkles, Heart, Star } from 'lucide-react';

export function AuthShowcase() {
  return (
    <div className="relative flex flex-col justify-between h-full p-8 lg:p-12 overflow-hidden bg-gradient-to-br from-amber-50/70 via-stone-50 to-orange-50/40 border-r border-stone-200/60">
      {/* Decorative ambient subtle warm light (Not AI slop mesh - realistic soft backlight) */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header & Brand */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/15 mb-6">
          <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          <span className="text-xs font-semibold tracking-wide uppercase text-amber-800">
            Pawfect Luxury Boutique
          </span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-stone-900 leading-snug">
          Dinh dưỡng thuần khiết &amp; <br />
          <span className="text-amber-700 italic font-serif">trải nghiệm mua sắm</span> đẳng cấp cho thú cưng
        </h1>
        <p className="mt-3 text-sm text-stone-600 max-w-md leading-relaxed">
          Tham gia cộng đồng hơn 20,000+ người nuôi thú cưng văn minh để mở khóa các đặc quyền mua sắm và ưu đãi tích điểm trọn đời.
        </p>
      </div>

      {/* Center: Double-Bezel VIP Membership & Welcome Card */}
      <div className="relative z-10 my-8">
        <div className="p-2 rounded-3xl bg-stone-900/5 border border-stone-200/80 shadow-sm backdrop-blur-sm">
          <div className="p-6 rounded-[calc(1.5rem-0.5rem)] bg-white border border-stone-100 shadow-sm flex flex-col gap-5">
            {/* Card Header with Voucher */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 block">
                  Đặc quyền thành viên mới
                </span>
                <span className="text-lg font-bold text-stone-900">
                  Giảm 15% đơn hàng đầu
                </span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-amber-50 border border-dashed border-amber-300 font-mono font-bold text-amber-800 text-sm tracking-wider shadow-inner">
                PAW15
              </div>
            </div>

            {/* Pet customer snapshot */}
            <div className="flex items-center gap-3.5 bg-stone-50/80 p-3 rounded-xl border border-stone-100">
              <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center text-xl shrink-0 shadow-sm">
                🐶
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-stone-900 truncate">
                    Mochi &amp; Milo
                  </h4>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    VIP Member
                  </span>
                </div>
                <p className="text-xs text-stone-500 truncate mt-0.5">
                  Golden Retriever • 420 điểm thưởng
                </p>
              </div>
            </div>

            {/* Customer review excerpt */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-semibold text-stone-800 ml-1.5">4.9/5</span>
                <span className="text-xs text-stone-400">(2,480 đánh giá)</span>
              </div>
              <p className="text-xs text-stone-600 italic leading-relaxed">
                &ldquo;Đóng gói siêu kỹ, hạt hữu cơ và pate tươi các bé nhà mình mê tít. Dịch vụ chăm sóc và giao hàng cực nhanh!&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Badges */}
      <div className="relative z-10 pt-4 border-t border-stone-200/60 grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-900">Hỏa tốc 2H</p>
            <p className="text-[11px] text-stone-500">Nội thành HN &amp; HCM</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-900">Chính hãng 100%</p>
            <p className="text-[11px] text-stone-500">Bảo hành đổi trả 30 ngày</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-stone-500/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-stone-700" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-900">Bác sĩ đồng hành</p>
            <p className="text-[11px] text-stone-500">Tư vấn dinh dưỡng free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
