# 🐾 Pet E-Commerce Platform — UI/UX Design System & Anti-AI-Slop Guidelines

> **Tài liệu chuẩn hóa thiết kế giao diện người dùng (UI/UX Design Specification)**
> Dự án: **Pet E-Commerce Platform** (`Pet-prj-fe`)  
> Nền tảng: **Next.js 16 (App Router)** + **Tailwind CSS v4** + **Ant Design 5+** + **Shadcn UI Primitives**  
> Định hướng thẩm mỹ: **Warm Editorial & Tactile Luxury (Chống rập khuôn AI Slop triệt để)**

---

## 🎯 1. Anti-AI-Slop Manifesto (Tuyên ngôn Chống Thiết kế Rập khuôn)

Hầu hết các giao diện do AI sinh ra tự động đều rơi vào "vết xe đổ" **AI Slop**:
* ❌ *Mesh gradient tím/xanh mờ ảo vô thưởng vô phạt ở background.*
* ❌ *Một chiếc Card trắng trơn lơ lửng giữa màn hình trống trải.*
* ❌ *Border 1px xám thô cứng, shadow đen đậm nhức mắt.*
* ❌ *Nút bấm mặc định góc vuông hoặc bo tròn đơn điệu không có độ nảy xúc giác (tactile feedback).*
* ❌ *Hình minh họa 3D trừu tượng (abstract blob/wave) không liên quan gì đến sản phẩm thực tế.*

### Triết lý thiết kế của Pet E-Commerce:
1. **Domain-Centric (Bám sát linh hồn Thương mại Thú cưng)**: Giao diện phải toát lên sự **ấm áp, tin cậy, cao cấp** giống như bước vào một boutique thú cưng sang trọng tại Paris hay Tokyo.
2. **Double-Bezel Architecture (Cấu trúc Viền đôi đồng tâm)**: Các card, container không đặt phẳng lì lên nền mà sử dụng cấu trúc lồng ghép concentric (vỏ ngoài viền hairline mờ + lõi nội dung bo cong tinh tế).
3. **Chuyển hóa Ant Design hoàn toàn**: Bỏ giao diện "phần mềm nội bộ" xanh lam mặc định của AntD (`#1677ff`), thay bằng hệ thống Semantic Tokens cao cấp mang sắc thái Warm Amber / Forest Emerald / Deep Slate.

---

## 🎨 2. Hệ Thống Màu Sắc & Tokens (Color System)

### A. Bảng màu chủ đạo (Brand Palette)
Sử dụng sự kết hợp giữa **ấm cúng tự nhiên** và **sự sang trọng hiện đại**:

| Tên Token | Mã Hex (Light Mode) | Mã Hex (Dark Mode) | Ứng dụng |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#FDFBF7` (Warm Oat / Ngà ấm) | `#0B0F17` (Deep Obsidian) | Nền tổng thể trang web |
| **Surface Core** | `#FFFFFF` (Pure White) | `#111827` (Rich Slate) | Nền của các Form, Card chính |
| **Primary Brand** | `#D97706` (Warm Amber Gold) | `#F59E0B` (Luminous Amber) | Nút bấm chính, Call-to-action, Highlights |
| **Secondary Accent** | `#059669` (Forest Emerald) | `#10B981` (Bright Emerald) | Huy hiệu ưu đãi, Trạng thái "Còn hàng", OTP hợp lệ |
| **Text Primary** | `#1C1917` (Deep Stone) | `#F8FAFC` (Pure Ice) | Tiêu đề H1, H2, nhãn quan trọng |
| **Text Muted** | `#78716C` (Warm Neutral) | `#94A3B8` (Cool Slate) | Mô tả phụ, placeholder, helper text |
| **Border Hairline** | `rgba(28, 25, 23, 0.08)` | `rgba(255, 255, 255, 0.08)` | Viền chia cách 1px siêu mỏng |

---

## 🔤 3. Typography & Nhịp Điệu Thị Giác (Spatial Hierarchy)

* **Font chữ chính (Body & UI)**: `Geist Sans` hoặc `Plus Jakarta Sans` — sạch sẽ, hình học, hiển thị số liệu rõ nét.
* **Font số (Monospace Numbers)**: `Geist Mono` với thuộc tính `tabular-nums` — bắt buộc cho bộ đếm thời gian OTP, giá tiền, số lượng tồn kho để không bị co giật khi số thay đổi.
* **Font tiêu đề nhấn (Brand Heading)**: Font Serif cao cấp (`Playfair Display` hoặc `PP Editorial New`) dùng cho các câu slogan chào đón tạo cảm giác tạp chí phong cách sống (Editorial Lifestyle).

### Tỷ lệ phân cấp chữ:
* **H1 Hero**: `text-3xl md:text-4xl font-semibold tracking-tight`
* **Eyebrow Tag (Huy hiệu nhỏ)**: `text-[11px] font-medium tracking-[0.15em] uppercase text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full`
* **Body Label**: `text-sm font-medium text-stone-700 dark:text-stone-300`
* **Caption / Footnote**: `text-xs text-stone-500`

---

## ⚙️ 4. Tinh Chỉnh Ant Design Token Blueprint (ConfigProvider)

Để Ant Design hòa hợp 100% với Tailwind CSS v4 và phong cách e-commerce sang trọng, file `AntdRegistry` / `ConfigProvider` sẽ cấu hình các token sau:

```tsx
import { ThemeConfig } from 'antd';

export const petEcommerceTheme: ThemeConfig = {
  token: {
    // Brand Colors
    colorPrimary: '#D97706',       // Warm Amber
    colorSuccess: '#059669',       // Emerald
    colorWarning: '#F59E0B',
    colorError: '#E11D48',
    
    // Geometry & Ergonomics
    borderRadius: 12,              // Bo góc mềm mại
    controlHeight: 46,             // Chiều cao chuẩn công thái học cho ngón tay
    fontSize: 14,
    fontFamily: 'var(--font-geist-sans), -apple-system, sans-serif',
    
    // Borders & Shadows
    lineWidth: 1,
    colorBorder: 'rgba(28, 25, 23, 0.12)',
    boxShadowSecondary: '0 8px 30px rgba(0, 0, 0, 0.04)',
  },
  components: {
    Button: {
      controlHeight: 46,
      borderRadius: 12,
      fontWeight: 600,
      defaultBorderColor: 'rgba(28, 25, 23, 0.15)',
      primaryShadow: '0 4px 14px rgba(217, 119, 6, 0.25)',
    },
    Input: {
      controlHeight: 46,
      borderRadius: 12,
      activeBorderColor: '#D97706',
      hoverBorderColor: '#F59E0B',
      paddingInline: 16,
    },
    Form: {
      itemMarginBottom: 20,
      labelFontSize: 13,
      labelColor: '#44403C',
    },
  },
};
```

---

## 📐 5. Chi Tiết Kiến Trúc Layout Các Trang Auth

Mô hình bố cục là **Asymmetrical Split (Chia 2 cột bất đối xứng)**:

```text
┌──────────────────────────────────────────────┬──────────────────────────────────────────────┐
│  CỘT SHOWCASE THƯƠNG HIỆU & ĐẶC QUYỀN (55%)  │         CỘT FORM AUTH TƯƠNG TÁC (45%)        │
│                                              │                                              │
│  - Logo Pet Luxury & Eyebrow badge           │  - Header chào mừng (Chào mừng bạn trở lại)  │
│  - Thẻ VIP Pet Member Card (Double-bezel)    │  - Tab chuyển đổi nhanh / Breadcrumb         │
│  - Voucher chào mừng: GIẢM 15% (PAW15)       │  - Ant Design Form fields                    │
│  - Dynamic Pet Avatar Preview                │  - Nút Submit với hiệu ứng xúc giác (Haptic) │
│  - Mini Perks: Hỏa tốc 2H • 100% Chính hãng  │  - Đăng nhập bên thứ 3 (Google 1-click)      │
└──────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

### 1. Trang Đăng ký (`/register`):
* **Cấu trúc trường nhập liệu**:
  1. `Họ & Tên đệm` (`lastName`) + `Tên` (`firstName`) tách biệt thành 2 cột song song.
  2. `Email` với gợi ý domain nhanh (`@gmail.com`, `@icloud.com`).
  3. `Số điện thoại` (tùy chọn nhưng có tooltip: *"Dùng để tích điểm và giao hàng hỏa tốc"*).
  4. `Mật khẩu` tích hợp thanh hiển thị độ mạnh mật khẩu (Password Strength Meter) theo 4 nấc (Yếu → Rất mạnh).
* **Nút bấm Đăng ký**: Pill button bo góc lớn, icon mũi tên lồng trong vòng tròn (Button-in-Button Pattern).

### 2. Trang Xác thực Email OTP (`/verify-email`):
* **Component trung tâm**: `<Input.OTP length={6} size="large" />` của AntD.
* **Bộ đếm ngược thời gian**: 
  - Đếm lùi 60 giây trước khi mở lại nút "Gửi lại mã OTP".
  - Font số cố định `font-mono tabular-nums`.
* **Trạng thái tự động**: Khi nhập đủ 6 ký tự, tự động kích hoạt animation kiểm tra mà không bắt buộc bấm Enter.

### 3. Trang Đăng nhập (`/login`):
* Đăng nhập nhanh qua Email/Mật khẩu.
* Checkbox *"Ghi nhớ đăng nhập trên thiết bị này"*.
* Nút *"Quên mật khẩu?"* đặt cạnh label mật khẩu.
* **Cơ chế chuyển hướng thông minh**: Nếu người dùng chưa xác thực email, bắt mã phản hồi từ Backend và tự động chuyển hướng mượt mà sang trang `/verify-email?email=...` kèm thông báo toast.

---

## ⚡ 6. Chuyển Động & Xúc Giác (Motion Dynamics & Haptics)

* **Timing Curve chuẩn**: Không dùng `linear` hay `ease-in-out` cơ bản. Tất cả chuyển động dùng đường cong quán tính tự nhiên:
  ```css
  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  ```
* **Nút bấm có phản hồi vật lý**: Khi bấm chuột xuống, nút co lại nhẹ `active:scale-[0.98]` tạo cảm giác đầm tay như bấm phím cơ học.
* **Trạng thái Input Focus**: Viền không đổi màu đột ngột mà bung tỏa một lớp quầng sáng mỏng nhẹ (`ring-4 ring-amber-500/10`).

---

## 📋 7. Danh Mục Kiểm Tra Pre-flight (Checklist)

- [x] Không sử dụng các gradient tím mờ kiểu AI Slop.
- [x] Token Ant Design đã được tùy biến sang phong cách E-commerce cao cấp.
- [x] Các trường Form khớp chính xác với Backend DTO (`firstName`, `lastName`, `email`, `phone`, `password`).
- [x] Bố cục thích ứng hoàn hảo (Responsive): Trên màn hình nhỏ (`< 768px`), cột Showcase tự động ẩn hoặc rút gọn thành banner mini phía trên, ưu tiên vùng nhập liệu Form hiển thị trọn vẹn không bị tràn màn hình.
- [x] Bộ đếm OTP sử dụng font số `tabular-nums` chống giật layout.

📚 PHẦN 2 — HỆ THỐNG COMPONENT, LAYOUT & TOÀN BỘ TRANG BÁN HÀNG
Phần này nối tiếp các mục 1–7 ở trên. Mọi trang/component đều dùng chung Tokens (mục 2), Typography (mục 3), AntD ConfigProvider (mục 4) và Motion (mục 6).


🧱 8. Design Tokens Bổ Sung
A. Radius, Spacing, Shadow, Z-index
Token
Giá trị
Ứng dụng
radius-sm
8px
Tag, badge nhỏ, input phụ
radius-md
12px
Input, Button thường (khớp AntD borderRadius)
radius-lg
20px
Card, Drawer, Modal
radius-xl
28px
Vỏ ngoài Double-Bezel, Hero card
radius-pill
9999px
Pill button, Eyebrow, chip lọc
space-section
py-16 md:py-24
Khoảng cách giữa các section trang chủ
space-container
max-w-7xl mx-auto px-4 md:px-6 lg:px-8
Container chuẩn mọi trang


/* globals.css (Tailwind v4) */

@theme {

  --color-canvas: #FDFBF7;

  --color-surface: #FFFFFF;

  --color-brand: #D97706;

  --color-brand-text: #B45309;      /* Amber đậm: dùng cho CHỮ nhỏ trên nền sáng (đạt AA) */

  --color-accent: #059669;

  --color-ink: #1C1917;

  --color-muted: #78716C;

  --color-hairline: rgba(28, 25, 23, 0.08);

  --shadow-soft: 0 8px 30px rgba(0, 0, 0, 0.04);

  --shadow-lift: 0 16px 40px rgba(28, 25, 23, 0.08);

  --shadow-brand: 0 4px 14px rgba(217, 119, 6, 0.25);

  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);

}
B. Z-index Scale
Lớp
Giá trị
Sticky header
z-40
Filter drawer / Mini-cart drawer
z-50
Modal
z-[60]
Toast
z-[70]
Cookie banner
z-[45]

C. Màu trạng thái đơn hàng & tồn kho
Trạng thái
Màu nền
Màu chữ
Chờ xác nhận
bg-amber-500/10
text-amber-700
Đang đóng gói
bg-sky-500/10
text-sky-700
Đang giao
bg-violet-500/10
text-violet-700
Hoàn tất / Còn hàng
bg-emerald-500/10
text-emerald-700
Đã hủy / Hết hàng
bg-rose-500/10
text-rose-700
Sắp hết (≤ 5)
bg-orange-500/10
text-orange-700



🧩 9. Thư Viện Component Dùng Chung
9.1 Double-Bezel Container (nền tảng của mọi Card)
// components/ui/bezel.tsx

export function Bezel({ children, className = '' }: { children: React.ReactNode; className?: string }) {

  return (

    <div className={`rounded-[28px] p-1.5 bg-stone-900/[0.03] ring-1 ring-[color:var(--color-hairline)] dark:bg-white/[0.04] ${className}`}>

      <div className="rounded-[22px] bg-white dark:bg-[#111827] shadow-[var(--shadow-soft)] overflow-hidden h-full">

        {children}

      </div>

    </div>

  );

}
9.2 Product Card
┌──────────────────────────┐

│ [-20%]              [♡]  │  ← Badge giảm giá (góc trái) + Wishlist (góc phải)

│                          │

│      ẢNH SẢN PHẨM        │  ← aspect-[4/5], object-cover, hover đổi sang ảnh thứ 2

│      (hover: zoom 1.05)  │

│                          │

│ [Hết hàng overlay]       │

├──────────────────────────┤

│ ROYAL CANIN  (eyebrow)   │  ← Thương hiệu: text-[11px] uppercase tracking-[0.15em]

│ Hạt cho chó con Mini 2kg │  ← 2 dòng, line-clamp-2, font-medium

│ ★★★★★ 4.8 (126)          │

│ 389.000₫  ~~480.000₫~~   │  ← font-mono tabular-nums, giá gốc gạch ngang

│ [  🛒 Thêm vào giỏ   ]   │  ← Hiện cố định trên mobile, trượt lên khi hover desktop

└──────────────────────────┘

Spec chi tiết:

Vỏ: <Bezel> + group + transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)].
Ảnh: aspect-[4/5] bg-stone-100, dùng next/image với sizes="(min-width:1024px) 25vw, 50vw", bắt buộc alt mô tả.
Badge giảm giá: absolute top-3 left-3 rounded-full bg-rose-600 text-white text-[11px] font-semibold px-2.5 py-1.
Badge "Mới": bg-emerald-600; "Bán chạy": bg-amber-600.
Nút Wishlist: size-9 rounded-full bg-white/90 backdrop-blur ring-1 ring-black/5, active đổi sang icon tim đầy text-rose-500 + animation scale-110 rồi trả về.
Nút Thêm giỏ: Pill button, active:scale-[0.98]; khi đang gọi API → hiện spinner; thành công → icon ✓ trong 1.2s rồi quay lại.
Trạng thái Hết hàng: ảnh grayscale opacity-60, overlay chữ "Hết hàng", nút đổi thành "Báo khi có hàng" (outline).
Sản phẩm có biến thể: nút đổi thành "Chọn tùy chọn" → mở Quick View modal thay vì thêm thẳng.
9.3 Price Display
Biến thể
Hiển thị
Giá thường
389.000₫ — font-mono tabular-nums font-semibold text-stone-900
Giá giảm
Giá mới text-amber-700 + giá cũ line-through text-stone-400 text-sm + -19% chip
Khoảng giá (biến thể)
250.000₫ – 520.000₫
Liên hệ
Liên hệ (khi chưa có giá)


Quy tắc: luôn format bằng Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }), không dùng dấu thập phân.
9.4 Quantity Stepper
 ┌────┬──────┬────┐

 │ −  │  02  │ +  │   h-11, rounded-full, ring-1 hairline

 └────┴──────┴────┘

Số ở giữa font-mono tabular-nums w-10 text-center.
Nút − disable khi = 1; nút + disable khi chạm tồn kho tối đa, kèm tooltip "Chỉ còn N sản phẩm".
Giữ chuột vào nút tăng/giảm liên tục có debounce 300ms trước khi gọi API cập nhật giỏ.
9.5 Rating & Review Card
Stars: 5 icon, hỗ trợ nửa sao; màu text-amber-500, nền sao rỗng text-stone-300. Kèm aria-label="4.8 trên 5 sao".
Rating Breakdown: 5 thanh ngang (5★ → 1★), thanh bg-amber-500 trên nền bg-stone-200, số lượng bên phải tabular-nums.
Review Card (<Bezel>): avatar + tên (ẩn bớt: Nguyễn T***) · badge ✓ Đã mua hàng (emerald) · sao · ngày · nội dung · tối đa 4 ảnh (lightbox) · nút Hữu ích (12).
Pet tag (đặc thù): hiển thị nhỏ 🐶 Poodle · 3 tuổi · 4.2kg giúp người đọc review tìm người có thú cưng tương tự.
9.6 Breadcrumb & Pagination
Breadcrumb: text-xs text-stone-500, phân cách /, mục cuối text-stone-900 font-medium, trên mobile chỉ hiện ← Danh mục cha.
Pagination: AntD Pagination với showSizeChanger={false}, nút hiện tại bg-amber-600 text-white rounded-full. Trên mobile dùng nút "Xem thêm sản phẩm" (load more) thay vì số trang.
9.7 Badge / Chip / Eyebrow
Eyebrow: dùng class ở mục 3.
Chip lọc: rounded-full px-4 h-9 ring-1 ring-hairline hover:ring-amber-500/50, đang chọn: bg-amber-600 text-white ring-0.
9.8 Toast, Modal, Drawer
Component
Spec
Toast
AntD message/notification, góc trên phải (desktop), trên giữa (mobile). Icon theo trạng thái, thời gian 3s. Toast thêm giỏ có ảnh thu nhỏ + nút "Xem giỏ".
Modal
rounded-[28px], backdrop bg-stone-950/40 backdrop-blur-sm, animation scale-95 → 100 bằng ease-spring. Nút đóng luôn có aria-label.
Drawer
Mini-cart (phải, 420px), Filter (trái, 85vw mobile). Khóa scroll body khi mở, đóng bằng Esc và click backdrop.
Confirm
Hủy đơn, xóa địa chỉ: dùng Modal xác nhận với nút nguy hiểm bg-rose-600.

9.9 Skeleton / Empty / Error States (bắt buộc cho MỌI danh sách)
Trạng thái
Spec
Loading
Skeleton đúng hình dạng thật (Product Card skeleton có khung ảnh aspect-[4/5] + 3 dòng). Animation animate-pulse màu bg-stone-200/70. Không dùng spinner toàn trang.
Empty
Minh họa line-art thú cưng (SVG đơn sắc amber, không dùng blob trừu tượng), tiêu đề, mô tả, 1 nút hành động. VD giỏ trống: "Giỏ hàng đang đợi bé cưng của bạn 🐾" + nút Khám phá sản phẩm.
Error
Icon cảnh báo, câu giải thích thân thiện, nút Thử lại (gọi lại query), không hiển thị stack trace.
Không tìm thấy
Gợi ý từ khóa khác + danh mục phổ biến.

9.10 Order Status Timeline
 ●━━━━━━●━━━━━━●┈┈┈┈┈┈○

 Chờ xác   Đóng    Đang    Hoàn

 nhận      gói     giao    tất

 09:12     10:30   (dự kiến 14/10)

Bước đã xong: bg-emerald-600 + icon ✓; bước hiện tại: bg-amber-500 + ring-4 ring-amber-500/20 nhấp nháy nhẹ; bước chưa tới: border-2 border-stone-300.
Mobile: chuyển thành timeline dọc, mỗi bước kèm thời gian + ghi chú vận chuyển.
Đơn hủy/hoàn: nhánh rẽ màu rose.
9.11 Checkout Stepper
3 bước: ① Giao hàng → ② Thanh toán → ③ Xác nhận.
Vòng số size-8 rounded-full, đường nối h-px; bước xong có thể click để quay lại sửa.
Mobile: thu gọn thành Bước 2/3 · Thanh toán + progress bar mảnh.
9.12 Form Controls Bổ Sung
Select / Combobox địa chỉ: AntD Select showSearch, 3 cấp Tỉnh/Thành → Quận/Huyện → Phường/Xã phụ thuộc nhau (reset cấp dưới khi đổi cấp trên).
Radio Card (chọn vận chuyển/thanh toán): thẻ viền hairline, chọn → ring-2 ring-amber-500 bg-amber-50, có icon tròn tick ở góc.
Price Range Slider: AntD Slider range, track #D97706, handle trắng viền amber; hai ô nhập min/max tabular-nums bên dưới.


🧭 10. Layout Toàn Cục
10.1 Header
┌────────────────────────────────────────────────────────────────────────────┐

│ 🚚 Miễn phí vận chuyển đơn từ 499.000₫  •  Hỏa tốc 2H nội thành   [VI|EN]  │ ← Announcement bar (amber-950, chữ cream)

├────────────────────────────────────────────────────────────────────────────┤

│ [Logo]   [ Tìm sản phẩm, thương hiệu...        🔍]   ♡   🔔   👤   🛒(3)   │ ← Header chính (sticky, backdrop-blur)

├────────────────────────────────────────────────────────────────────────────┤

│  🐶 Chó   🐱 Mèo   🐟 Cá   🐦 Chim   🐹 Thú nhỏ   Thương hiệu   Khuyến mãi │ ← Nav theo loài, hover mở Mega Menu

└────────────────────────────────────────────────────────────────────────────┘

Header sticky: sticky top-0 z-40 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-[color:var(--color-hairline)]; khi cuộn xuống > 80px thu gọn chiều cao (h-20 → h-16) và ẩn announcement bar.
Mega Menu (hover/focus nav "Chó"): 4 cột — Thức ăn · Đồ chơi & Phụ kiện · Vệ sinh & Làm đẹp · Sức khỏe, cột phải là ảnh banner khuyến mãi (<Bezel>). Mở bằng ease-spring, trễ 120ms để tránh giật.
Search: ô tìm kiếm mở rộng dạng Command Palette (Ctrl/⌘ + K): gợi ý sản phẩm (có ảnh nhỏ + giá), từ khóa phổ biến, lịch sử tìm kiếm; debounce 300ms.
Cart icon: badge số lượng bg-amber-600 text-white tabular-nums, nảy nhẹ khi thêm hàng. Click → mở Mini-cart Drawer.
User menu: chưa đăng nhập → nút Đăng nhập; đã đăng nhập → avatar dropdown (Tài khoản, Đơn hàng, Yêu thích, Thú cưng của tôi, Đăng xuất).
Mobile: ☰ Logo 🔍 🛒; menu hamburger là Drawer trái dạng accordion theo loài; thanh Bottom Tab Bar cố định (Trang chủ · Danh mục · Tìm kiếm · Yêu thích · Tài khoản) với padding-bottom: env(safe-area-inset-bottom).
10.2 Mini-cart Drawer
┌───────────────────────────────┐

│ Giỏ hàng (3)              ✕   │

│ ▓▓▓▓▓▓▓▓░░ Còn 110.000₫ để    │ ← Thanh tiến độ freeship

│            được miễn phí ship │

├───────────────────────────────┤

│ [ảnh] Hạt Royal Canin 2kg     │

│       Vị gà · [− 1 +]  389k ✕ │

│ [ảnh] Cát vệ sinh Cature      │

│       ...                     │

├───────────────────────────────┤

│ Tạm tính           778.000₫   │

│ [   Thanh toán →        ]     │ ← Primary pill

│ [   Xem giỏ hàng        ]     │ ← Ghost

└───────────────────────────────┘
10.3 Footer
5 cột: Thương hiệu + mạng xã hội · Mua sắm (danh mục) · Hỗ trợ (FAQ, đổi trả, vận chuyển, tra cứu đơn) · Về chúng tôi · Newsletter (input email + nút, tặng voucher PAW15).
Hàng dưới: logo cổng thanh toán (VNPay, MoMo, Visa...), mã số thuế/giấy phép kinh doanh, biểu tượng Bộ Công Thương.
Nền bg-stone-950 text-stone-300, link hover:text-amber-400. Mobile: các cột thu thành Accordion.
10.4 Cookie Consent Banner
Card nổi <Bezel> góc dưới trái (desktop) / full-width đáy (mobile), 3 nút: Chấp nhận tất cả · Chỉ cần thiết · Tùy chỉnh. Lưu lựa chọn vào localStorage + cookie.
10.5 Layout nhóm route (Next.js App Router)
app/

├─ (auth)/            → layout Split 55/45 (mục 5)

│   ├─ login · register · verify-email · forgot-password · reset-password

├─ (shop)/            → layout Header + Footer + MiniCart

│   ├─ page.tsx (Trang chủ)

│   ├─ products/ · categories/[slug]/ · brands/ · search/ · cart/ · wishlist/ ...

│   └─ products/[slug]/

├─ (checkout)/        → layout tối giản (logo + stepper, KHÔNG có mega menu để tăng tỉ lệ chốt đơn)

├─ (account)/account/ → layout Sidebar tài khoản + nội dung

├─ (admin)/admin/     → layout Dashboard (AntD Layout)

├─ not-found.tsx · error.tsx · maintenance/ · forbidden.tsx


🔐 11. Các Trang Auth Bổ Sung
11.1 /forgot-password
Dùng layout Split (mục 5). Cột form: tiêu đề "Quên mật khẩu?", mô tả "Nhập email, chúng tôi sẽ gửi mã OTP để đặt lại mật khẩu."
Trường: Email → nút Gửi mã xác nhận.
Sau khi gửi: chuyển sang bước nhập OTP (tái sử dụng <Input.OTP length={6} /> + đếm ngược 60s tabular-nums như /verify-email).
Bảo mật: luôn hiển thị cùng một thông báo "Nếu email tồn tại, bạn sẽ nhận được mã" dù email có tồn tại hay không (chống dò tài khoản).
Giới hạn gửi lại: tối đa 5 lần/giờ, hiện thông báo khi vượt.
11.2 /reset-password
Trường: Mật khẩu mới (kèm Password Strength Meter 4 nấc) + Nhập lại mật khẩu (validate khớp realtime).
Danh sách tiêu chí hiển thị tick xanh dần: ≥ 8 ký tự · có chữ hoa · có số · có ký tự đặc biệt.
Thành công → toast + tự chuyển /login sau 2s. Token hết hạn → trạng thái lỗi + nút Yêu cầu mã mới.


🏠 12. Trang Chủ /
┌─────────────────────────────────────────────────────────────────┐

│ HERO (asymmetric)                                               │

│  [Eyebrow: BỘ SƯU TẬP MÙA THU]             ┌─────────────────┐  │

│  Chăm bé yêu                                │  Ảnh thú cưng   │  │

│  như người thân                             │  (Bezel xl)     │  │

│  (Playfair Display, 5xl)                    │  + thẻ nổi giá  │  │

│  [Mua ngay ➜]  [Xem khuyến mãi]            └─────────────────┘  │

├─────────────────────────────────────────────────────────────────┤

│ DANH MỤC THEO LOÀI — 5 thẻ tròn/bo lớn: 🐶 🐱 🐟 🐦 🐹          │

├─────────────────────────────────────────────────────────────────┤

│ FLASH SALE  ⏱ 02:14:09 (tabular-nums)   [Product Card ×5 cuộn ngang] │

├─────────────────────────────────────────────────────────────────┤

│ SẢN PHẨM NỔI BẬT — Tabs: Bán chạy | Mới về | Dành cho bạn       │

├─────────────────────────────────────────────────────────────────┤

│ BANNER LỆCH (Bento grid 2 ô lớn + 2 ô nhỏ: Voucher, Dịch vụ spa)│

├─────────────────────────────────────────────────────────────────┤

│ THƯƠNG HIỆU — marquee logo chạy chậm, dừng khi hover             │

├─────────────────────────────────────────────────────────────────┤

│ CAM KẾT — Hỏa tốc 2H • 100% Chính hãng • Đổi trả 7 ngày • Hỗ trợ │

├─────────────────────────────────────────────────────────────────┤

│ ĐÁNH GIÁ KHÁCH HÀNG — carousel Review Card kèm ảnh thú cưng      │

├─────────────────────────────────────────────────────────────────┤

│ BLOG — 3 bài mới nhất                                           │

├─────────────────────────────────────────────────────────────────┤

│ NEWSLETTER — "Nhận PAW15 giảm 15% cho đơn đầu tiên"             │

└─────────────────────────────────────────────────────────────────┘

Hero: ảnh thú cưng thật (chụp/stock chất lượng cao), tuyệt đối không dùng blob 3D. Ảnh dùng priority + fetchPriority="high" (LCP).
Flash sale: đếm ngược dùng font-mono tabular-nums, hết giờ tự ẩn section; thanh "Đã bán 72/100" màu amber.
Mỗi section có hiệu ứng xuất hiện khi cuộn (opacity-0 translate-y-6 → 100, duration-700 ease-spring), tôn trọng prefers-reduced-motion.
Dữ liệu: Server Component fetch + revalidate: 300.


🛍️ 13. Khám Phá Sản Phẩm
13.1 /products và /categories/[slug]
┌─────────────────────────────────────────────────────────────────┐

│ Breadcrumb: Trang chủ / Chó / Thức ăn                           │

│ [Banner danh mục — chỉ có ở /categories/[slug]]                 │

├──────────────┬──────────────────────────────────────────────────┤

│ BỘ LỌC (260) │ 126 sản phẩm        [Sắp xếp ▾]   [▦ ▤]          │

│ ▸ Loài       │ [chip đã chọn: Royal Canin ✕  Dưới 500k ✕  Xóa tất cả]│

│ ▸ Danh mục   │ ┌────┐ ┌────┐ ┌────┐ ┌────┐                     │

│ ▸ Thương hiệu│ │Card│ │Card│ │Card│ │Card│                     │

│ ▸ Khoảng giá │ └────┘ └────┘ └────┘ └────┘                     │

│ ▸ Độ tuổi    │                                                  │

│ ▸ Kích cỡ    │ [Pagination / Xem thêm]                          │

│ ▸ Đánh giá   │                                                  │

│ ☐ Còn hàng   │                                                  │

│ ☐ Đang giảm  │                                                  │

└──────────────┴──────────────────────────────────────────────────┘

Sidebar sticky top-24, từng nhóm lọc là Accordion, nhóm Thương hiệu có ô tìm nhanh.
Bộ lọc đồng bộ URL (?species=dog&brand=royal-canin&price=0-500000&sort=price_asc&page=2) để chia sẻ link, SEO và nút Back hoạt động đúng.
Sắp xếp: Phổ biến · Mới nhất · Giá tăng · Giá giảm · Đánh giá cao · Giảm sâu.
Lưới: grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6.
Mobile: nút Bộ lọc (3) cố định đáy → mở Filter Drawer, nút Áp dụng (126 kết quả) cố định đáy drawer.
Cập nhật kết quả dùng useTransition + skeleton, giữ vị trí cuộn.
SEO: <link rel="canonical">, trang có filter → noindex trừ filter chính (loài/danh mục).
13.2 /products/[slug] — Chi tiết sản phẩm
┌─────────────────────────────────────────────────────────────────┐

│ Breadcrumb                                                      │

├────────────────────────────┬────────────────────────────────────┤

│ GALLERY (55%)              │ THÔNG TIN (45%, sticky)            │

│ ┌──┐ ┌────────────────┐    │ ROYAL CANIN (eyebrow)              │

│ │▫ │ │                │    │ Hạt cho chó con Mini Puppy 2kg     │

│ │▫ │ │  Ảnh chính     │    │ ★ 4.8 (126 đánh giá) · Đã bán 1,2k │

│ │▫ │ │  (zoom hover)  │    │ 389.000₫  ~~480.000₫~~  -19%       │

│ │▫ │ └────────────────┘    │ ─────────────────────────────      │

│ └──┘                       │ Khối lượng: [500g] [2kg] [8kg]     │

│                            │ Hương vị:   [Gà] [Cá hồi]          │

│                            │ Số lượng: [− 1 +]  Còn 24 sản phẩm │

│                            │ [ Thêm vào giỏ ]  [ Mua ngay ]  [♡]│

│                            │ 🚚 Giao hỏa tốc 2H · 🔄 Đổi trả 7 ngày│

│                            │ ✓ Chính hãng 100%                  │

├────────────────────────────┴────────────────────────────────────┤

│ Tabs: Mô tả | Thành phần & Hướng dẫn | Đánh giá | Hỏi đáp      │

├─────────────────────────────────────────────────────────────────┤

│ Sản phẩm thường mua cùng (Bundle)  ·  Sản phẩm liên quan        │

└─────────────────────────────────────────────────────────────────┘

Gallery: thumbnail dọc (desktop) / swipe + dot (mobile), lightbox toàn màn hình, hỗ trợ video.
Chọn biến thể: chip rounded-full, biến thể hết hàng bị gạch chéo + opacity-50; đổi biến thể cập nhật giá, ảnh, tồn kho ngay không reload.
Tồn kho: ≤ 5 hiện "Chỉ còn 3 sản phẩm" màu orange.
Sticky Add-to-cart bar trên mobile (tên + giá + nút) xuất hiện khi nút chính ra khỏi viewport.
Pet-aware: nếu người dùng đã lưu hồ sơ thú cưng → hiện dòng "Phù hợp với Bông (Poodle, 3 tuổi)" hoặc cảnh báo "Chứa gà — Bông có dị ứng gà" (màu rose).
SEO: JSON-LD Product (name, image, sku, brand, offers.price, offers.availability, aggregateRating), generateMetadata động, OG image.
13.3 /search?q=...
Giao diện giống /products + dòng "Kết quả cho 'hạt royal'".
Gợi ý sửa lỗi chính tả: "Có phải bạn muốn tìm 'royal canin'?".
Không có kết quả: Empty state + từ khóa phổ biến + sản phẩm bán chạy.


🛒 14. Luồng Mua Hàng
14.1 /cart
┌──────────────────────────────────────────┬──────────────────────┐

│ Giỏ hàng (3 sản phẩm)                    │ TÓM TẮT ĐƠN HÀNG     │

│ ☑ Chọn tất cả                            │ Tạm tính   778.000₫  │

│ ┌──────────────────────────────────────┐ │ Voucher    −116.700₫ │

│ │☑ [ảnh] Tên SP · Biến thể             │ │ Vận chuyển  Miễn phí │

│ │   [− 1 +]   389.000₫       🗑  ♡     │ │ ──────────────────── │

│ └──────────────────────────────────────┘ │ Tổng       661.300₫  │

│ ...                                      │ [Nhập mã voucher][Áp]│

│                                          │ [ Tiến hành đặt hàng ]│

│ Có thể bạn cũng thích: [Card ×4]         │ (sticky top-28)      │

└──────────────────────────────────────────┴──────────────────────┘

Voucher: ô nhập + danh sách voucher khả dụng (modal), mã hợp lệ → badge emerald PAW15 · Giảm 15%, sai → lỗi cụ thể ("Đơn tối thiểu 300.000₫").
Sản phẩm hết hàng/đổi giá: banner cảnh báo ngay trên dòng đó.
Giỏ hàng khách vãng lai lưu localStorage, tự gộp vào giỏ tài khoản sau khi đăng nhập.
Mobile: thanh tổng tiền + nút Đặt hàng cố định đáy.
14.2 /checkout
Layout tối giản (không nav), cột trái các bước, cột phải Tóm tắt đơn (Accordion trên mobile).
① Giao hàng: chọn địa chỉ đã lưu (Radio Card) hoặc thêm mới (Họ tên, SĐT, Tỉnh/Quận/Phường, địa chỉ cụ thể, ghi chú, đặt làm mặc định). Khách chưa đăng nhập: nhập email + tùy chọn Tạo tài khoản.
Vận chuyển (Radio Card): Tiêu chuẩn (2–4 ngày) · Nhanh (1–2 ngày) · Hỏa tốc 2H (nội thành) — hiện phí và ngày dự kiến.
② Thanh toán (Radio Card): COD · Chuyển khoản QR · VNPay · MoMo · Thẻ ATM/Visa. Mỗi phương thức có icon + mô tả ngắn.
③ Xác nhận: xem lại toàn bộ, checkbox đồng ý điều khoản, nút Đặt hàng · 661.300₫.
Chống đặt trùng: disable nút + idempotency key khi bấm; khôi phục dữ liệu form khi reload.
Validate SĐT Việt Nam: /^(0|\+84)(3|5|7|8|9)\d{8}$/.
14.3 /checkout/success
Animation tích ✓ emerald (SVG stroke draw 0.8s), tiêu đề "Đặt hàng thành công!", mã đơn #PET-240810-0042 có nút copy, ngày giao dự kiến, tóm tắt.
Nếu chuyển khoản/QR chưa thanh toán: hiện QR + đếm ngược hạn thanh toán.
Nút: Theo dõi đơn hàng · Tiếp tục mua sắm. Gợi ý "Tạo tài khoản để tích điểm" với khách vãng lai.
14.4 /checkout/failed
Icon cảnh báo rose, nêu lý do (hết hạn, bị từ chối, hủy bởi người dùng), giữ nguyên giỏ hàng, nút Thử thanh toán lại · Đổi phương thức · Liên hệ hỗ trợ.


👤 15. Khu Vực Tài Khoản /account/*
Layout: Sidebar trái (Hồ sơ · Đơn hàng · Địa chỉ · Thú cưng · Voucher & Điểm · Đánh giá · Bảo mật · Thông báo) + nội dung. Mobile: danh sách menu dạng trang → vào chi tiết (kiểu iOS Settings).
Phần đầu sidebar: VIP Pet Member Card thu nhỏ (hạng thành viên + điểm + thanh tiến độ lên hạng).

Route
Nội dung chính
/account
Avatar upload, lastName/firstName, email (read-only + trạng thái xác thực), SĐT, ngày sinh, giới tính. Nút Lưu thay đổi chỉ bật khi form dirty.
/account/orders
Tabs trạng thái: Tất cả · Chờ xác nhận · Đang giao · Hoàn tất · Đã hủy. Mỗi đơn là card: mã, ngày, ảnh SP thu nhỏ, tổng tiền, badge trạng thái, nút Xem chi tiết / Mua lại. Có ô tìm theo mã đơn.
/account/orders/[id]
Order Timeline (9.10), thông tin giao hàng, mã vận đơn + link tra cứu, danh sách SP, chi tiết thanh toán, nút Hủy đơn (chỉ khi chờ xác nhận), Mua lại, Viết đánh giá, Yêu cầu đổi trả, In hóa đơn.
/account/addresses
Danh sách thẻ địa chỉ, badge Mặc định, thêm/sửa trong Modal, xóa có xác nhận.
/account/security
Đổi mật khẩu (mật khẩu cũ + mới + Strength Meter), danh sách thiết bị đăng nhập + Đăng xuất khỏi thiết bị khác, xóa tài khoản (vùng nguy hiểm).



⚠️ 16. Trang Hệ Thống
Trang
Spec
404
Số 404 cỡ lớn font serif màu amber nhạt, tiêu đề "Bé cưng đi lạc rồi 🐾", ô tìm kiếm + nút Về trang chủ + danh mục gợi ý.
500 / error.tsx
"Có gì đó trục trặc", nút Thử lại (reset()), Về trang chủ; ghi log lỗi (Sentry) kèm digest.
403 / forbidden
"Bạn không có quyền truy cập", nút Đăng nhập / Về trang chủ.
Bảo trì
Trang toàn màn hình: thông báo, thời gian dự kiến quay lại, link mạng xã hội. HTTP 503 + Retry-After.
Offline (tùy chọn PWA)
Thông báo mất kết nối + nút thử lại.



🟠 17. Các Trang P1 (Vận Hành Thật)
Route
Spec ngắn gọn
/wishlist
Lưới Product Card + nút Thêm tất cả vào giỏ; chưa đăng nhập lưu local, khi đăng nhập thì đồng bộ. Empty state riêng.
/track-order
Form Mã đơn + SĐT/Email → hiển thị Order Timeline, không cần đăng nhập. Giới hạn tần suất chống dò.
/account/vouchers
Tabs: Khả dụng · Đã dùng · Hết hạn. Voucher dạng ticket (khoét tròn 2 bên, đường đứt nét), mã + điều kiện + HSD + nút Sao chép / Dùng ngay. Khu điểm thành viên + lịch sử điểm + quyền lợi từng hạng.
/account/reviews
Tab Chờ đánh giá (đơn đã giao chưa review) và Đã đánh giá. Form: chọn sao, nội dung, upload tối đa 5 ảnh, chọn thú cưng (tùy chọn).
/brands
Bảng chữ cái A–Z (sticky), lưới logo thương hiệu, ô tìm.
/brands/[slug]
Banner + mô tả thương hiệu + lưới sản phẩm (dùng chung layout 13.1).
/promotions
Banner chiến dịch, Flash sale, voucher đang chạy, lưới SP giảm giá, đếm ngược tabular-nums.
/about
Câu chuyện thương hiệu (serif editorial), cam kết, đội ngũ, số liệu nổi bật.
/contact
Form liên hệ (Họ tên, Email, SĐT, Chủ đề, Nội dung), thông tin cửa hàng, bản đồ, giờ làm việc, hotline/Zalo.
/faq
Accordion theo nhóm (Đặt hàng, Thanh toán, Vận chuyển, Đổi trả), ô tìm nhanh. Thêm JSON-LD FAQPage.
/policies/[slug]
Dùng 1 template chung cho: đổi trả, vận chuyển, bảo mật, điều khoản, hướng dẫn mua hàng, thanh toán. Layout max-w-3xl, mục lục sticky bên trái, typography prose prose-stone, ngày cập nhật cuối.



🟡 18. Các Trang P2 (Đặc Thù Thú Cưng)
18.1 /account/pets — Hồ sơ thú cưng
Danh sách thẻ thú cưng (<Bezel> + ảnh tròn + tên + giống + tuổi). Nút + Thêm thú cưng.
Form: Tên, Loài (chó/mèo/…), Giống (Select tìm kiếm), Ngày sinh, Giới tính, Cân nặng (kg), Đã triệt sản, Dị ứng (multi-tag), Ảnh.
Ứng dụng: gợi ý sản phẩm theo tuổi/cân nặng, cảnh báo thành phần dị ứng (13.2), nhắc tái mua thức ăn, Dynamic Pet Avatar ở cột Showcase trang Auth (mục 5).
18.2 /blog và /blog/[slug]
Danh sách: bài nổi bật cỡ lớn + lưới 3 cột, lọc theo chủ đề (Dinh dưỡng, Huấn luyện, Sức khỏe, Review).
Chi tiết: ảnh cover, tác giả, thời gian đọc, mục lục sticky, prose, thẻ sản phẩm nhúng trong bài, bài liên quan, chia sẻ. SEO: JSON-LD Article.
18.3 /services — Dịch vụ
Thẻ dịch vụ: Spa/Grooming · Thú y · Trông giữ · Huấn luyện — mỗi thẻ có giá từ, thời lượng.
Luồng đặt lịch (Stepper): chọn dịch vụ → chọn thú cưng → chọn ngày/giờ (lịch AntD, ô giờ dạng chip) → xác nhận. Trang quản lý lịch hẹn trong /account/appointments.
18.4 /subscriptions — Đặt hàng định kỳ
Tùy chọn "Giao định kỳ — giảm thêm 5%" ngay trên trang chi tiết sản phẩm (Radio Card: Mua 1 lần / Mỗi 2 tuần / Mỗi tháng / Mỗi 2 tháng).
Trang quản lý: danh sách gói, ngày giao tiếp theo, nút Tạm dừng · Bỏ qua kỳ này · Đổi tần suất · Hủy.
18.5 /compare
Thanh nổi dưới cùng khi chọn ≥ 2 SP (tối đa 4); bảng so sánh: ảnh, giá, thương hiệu, thành phần, trọng lượng, độ tuổi, đánh giá; hàng khác biệt được highlight bg-amber-50. Mobile: cuộn ngang, cột đầu cố định.
18.6 /account/notifications & Chat hỗ trợ
Danh sách thông báo (đơn hàng, khuyến mãi, hệ thống), chấm đỏ chưa đọc, Đánh dấu đã đọc tất cả; chuông trên header hiển thị badge.
Chat widget: nút nổi góc dưới phải (không che nút sticky Add-to-cart mobile → đẩy lên bottom-24), mở khung chat <Bezel>; ngoài giờ làm việc hiển thị form để lại lời nhắn.
18.7 /stores
Danh sách cửa hàng + bản đồ, lọc theo tỉnh/thành, giờ mở cửa, nút Chỉ đường, Gọi.


🛠️ 19. Admin /admin/* (Ưu Tiên AntD, Giữ Token Amber)
Layout: AntD Layout + Sider thu gọn được (nền #1C1917, mục active #D97706), Header có search, thông báo, avatar.
Bảng dữ liệu dùng AntD Table + ProTable-style: lọc cột, tìm kiếm, phân trang server-side, chọn nhiều + hành động hàng loạt, xuất CSV.

Module
Chức năng chính
Dashboard
KPI (Doanh thu, Đơn mới, Khách mới, Tỉ lệ chuyển đổi), biểu đồ doanh thu theo ngày/tuần, top sản phẩm, đơn cần xử lý, cảnh báo sắp hết hàng.
Sản phẩm
CRUD, biến thể (kích cỡ/hương vị, giá, SKU, tồn), upload nhiều ảnh kéo-thả sắp xếp, SEO fields, trạng thái Nháp/Hiển thị.
Danh mục & Thương hiệu
Cây danh mục kéo-thả, banner, slug.
Tồn kho
Nhập/xuất, lịch sử, ngưỡng cảnh báo.
Đơn hàng
Bộ lọc trạng thái, đổi trạng thái (kèm timeline), in phiếu giao, hoàn tiền, ghi chú nội bộ.
Khách hàng
Hồ sơ, lịch sử mua, hạng thành viên, khóa tài khoản.
Voucher & Khuyến mãi
Tạo mã (% / số tiền / freeship), điều kiện, giới hạn lượt, thời gian; cấu hình Flash sale.
Nội dung
Banner trang chủ, bài blog (editor), trang chính sách, FAQ.
Đánh giá & Hỏi đáp
Duyệt/ẩn/trả lời.
Báo cáo
Doanh thu, sản phẩm, khách hàng, xuất Excel.
Phân quyền
Vai trò (Admin, Quản lý, Nhân viên kho, CSKH) + RBAC theo route.



📱 20. Responsive, Dark Mode & Hiệu Năng
A. Breakpoints
Tên
Rộng
Ghi chú
sm
≥ 640px
Lưới sản phẩm 2 → 3 cột
md
≥ 768px
Hiện cột Showcase Auth rút gọn, sidebar tài khoản
lg
≥ 1024px
Hiện Filter sidebar, Mega menu, 4 cột sản phẩm
xl
≥ 1280px
Container max-w-7xl


Mobile-first: viết class cho mobile trước. Vùng chạm tối thiểu 44×44px. Dùng 100dvh thay 100vh, env(safe-area-inset-*) cho thanh cố định.
B. Dark Mode
Dùng class strategy (dark:), tôn trọng prefers-color-scheme + nút chuyển ở footer/header; lưu lựa chọn, tránh nháy sáng khi tải bằng script inline đặt class sớm.
Ảnh sản phẩm trong dark mode đặt trên nền bg-stone-100 (giữ nền sáng cho ảnh nền trắng) thay vì đảo màu.
AntD dark: algorithm: theme.darkAlgorithm kèm token màu mục 2.
C. Hiệu năng
Ảnh next/image (AVIF/WebP), priority cho ảnh LCP, lazy cho phần còn lại; font dùng next/font với display: swap.
Cache: danh mục/trang chủ revalidate, chi tiết sản phẩm ISR + revalidateTag khi admin sửa.
Mục tiêu Core Web Vitals: LCP < 2.5s · INP < 200ms · CLS < 0.1.
AntD: import theo từng component (tree-shaking), dùng @ant-design/nextjs-registry để tránh FOUC.


♿ 21. Accessibility & SEO
Accessibility
Contrast: #D97706 trên nền trắng chỉ ~3.2:1 → chỉ dùng cho nút nền (chữ trắng đậm ≥ 16px/600), icon, viền. Chữ amber cỡ nhỏ trên nền sáng dùng #B45309 (amber-700, ~5:1).
Focus ring: mọi phần tử tương tác có focus-visible:ring-4 ring-amber-500/30 outline-none, không bao giờ outline: none mà thiếu thay thế.
Điều hướng bàn phím đầy đủ (Mega menu, Drawer có focus trap, Esc để đóng); icon-only button luôn có aria-label.
Form: label gắn htmlFor, lỗi gắn aria-describedby, vùng thông báo aria-live="polite" (toast, cập nhật giỏ).
@media (prefers-reduced-motion: reduce): tắt translate/scale, giữ fade ngắn.
Không truyền đạt trạng thái chỉ bằng màu (luôn kèm icon/chữ).
SEO
generateMetadata cho mọi trang động, title mẫu: %s | Tên Shop; Open Graph + Twitter card.
sitemap.ts (sản phẩm, danh mục, thương hiệu, blog), robots.ts (chặn /cart, /checkout, /account, /admin, URL có tham số lọc).
Structured data: Product, BreadcrumbList, FAQPage, Article, Organization.
URL thân thiện tiếng Việt không dấu: /products/hat-royal-canin-mini-puppy-2kg.
Hỗ trợ hreflang nếu có bản EN/JP.


🔒 22. Bảo Mật & UX Chống Lỗi (Frontend)
Token lưu httpOnly cookie, không để trong localStorage; xử lý 401 → refresh token → thất bại thì chuyển /login?redirect=....
Middleware Next.js bảo vệ /account/*, /admin/* (kiểm tra role).
Chống double-submit mọi form thanh toán/đặt hàng; validate bằng Zod + react-hook-form/AntD Form rules, thông điệp lỗi tiếng Việt cụ thể.
Chuẩn hóa mã lỗi từ Backend → map sang thông báo thân thiện (như cơ chế chuyển /verify-email ở mục 5.3).
Mọi nội dung người dùng nhập (review, hỏi đáp) hiển thị dạng text đã escape; nội dung blog HTML phải sanitize.


🗺️ 23. Bản Đồ Route Tổng Hợp & Thứ Tự Triển Khai
Ưu tiên
Route
P0
/ · /products · /categories/[slug] · /products/[slug] · /search · /cart · /checkout · /checkout/success · /checkout/failed · /login · /register · /verify-email · /forgot-password · /reset-password · /account · /account/orders · /account/orders/[id] · /account/addresses · /account/security · 404 · 500 · 403 · bảo trì
P1
/wishlist · /track-order · /account/vouchers · /account/reviews · /brands · /brands/[slug] · /promotions · /about · /contact · /faq · /policies/[slug] · Cookie banner
P2
/account/pets · /blog · /blog/[slug] · /services · /account/appointments · /subscriptions · /compare · /account/notifications · chat · /stores
P3
/admin/*


Thứ tự làm đề xuất:

Tokens bổ sung (mục 8) + Bezel, Button, Input theo AntD theme.
Component dùng chung (mục 9): Product Card, Price, Stepper, Rating, Skeleton/Empty/Error.
Layout toàn cục (mục 10): Header, Footer, Mini-cart, Cookie banner.
Trang chủ → Danh sách → Chi tiết → Tìm kiếm.
Giỏ hàng → Checkout → Success/Failed.
Forgot/Reset password → Account + Orders + Addresses + Security.
Trang hệ thống (404/500...), rồi P1 → P2 → Admin.


✅ 24. Danh Mục Kiểm Tra Pre-flight (Toàn Dự Án)
Không có gradient tím/blob 3D; ảnh minh họa đều là ảnh thật hoặc line-art thú cưng.
Mọi Card/Container dùng cấu trúc Double-Bezel.
Mọi số tiền, số lượng, đồng hồ đếm ngược dùng font-mono tabular-nums.
Mọi nút chính có active:scale-[0.98] và ease-[cubic-bezier(0.16,1,0.3,1)].
Mọi danh sách đều có đủ 4 trạng thái: Loading (Skeleton), Empty, Error, Có dữ liệu.
Bộ lọc/sắp xếp/phân trang đồng bộ với URL.
Checkout chống đặt trùng, giữ giỏ khi thanh toán thất bại.
Chữ amber nhỏ trên nền sáng dùng #B45309, không dùng #D97706.
Focus ring hiển thị rõ trên mọi phần tử tương tác; dùng được hoàn toàn bằng bàn phím.
Mobile: vùng chạm ≥ 44px, thanh cố định đáy tôn trọng safe-area, không tràn ngang.
Dark mode kiểm tra đủ mọi component, không nháy sáng khi tải.
Mọi trang động có metadata + JSON-LD phù hợp; trang riêng tư noindex.
Core Web Vitals đạt: LCP < 2.5s, INP < 200ms, CLS < 0.1.
Form khớp chính xác DTO Backend; lỗi Backend được map sang thông báo tiếng Việt.

