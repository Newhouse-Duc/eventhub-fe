# 🚀 Enterprise Next.js Standard - Tech Stack & Strict Code Guidelines

> **Mục đích tài liệu**: Đây là **bộ quy chuẩn kỹ thuật và quy tắc viết code bắt buộc (Strict Engineering Guidelines)** của dự án. Tài liệu này được thiết kế nhằm **ngăn chặn triệt để code rác, code lan man (spaghetti code), code trùng lặp (duplicate logic), rò rỉ bộ nhớ (memory leak)** và đảm bảo khả năng mở rộng (scalability) khi dự án phát triển lớn.

---

## 📑 MỤC LỤC
1. [Tech Stack Tổng Quan](#1-tech-stack-tổng-quan)
2. [Kiến Trúc Thư Mục & Phân Chia Ranh Giới Module](#2-kiến-trúc-thư-mục--ranh-giới-module-boundaries)
3. [Quy Chuẩn React 19 & Next.js App Router Chống Rác Code](#3-quy-chuẩn-react-19--nextjs-app-router)
4. [Quy Chuẩn TypeScript & Type-Safety Tuyệt Đối](#4-quy-chuẩn-typescript--type-safety-tuyệt-đối)
5. [Quy Chuẩn Redux Toolkit (RTK) & RTK Query](#5-quy-chuẩn-redux-toolkit-rtk--rtk-query)
6. [Quy Chuẩn Quản Lý Lỗi & Loading States (Error & Boundary Handling)](#6-quy-chuẩn-quản-lý-lỗi--loading-states)
7. [Quy Chuẩn CSS & Styling (Tailwind CSS v4 + Semantic Tokens)](#7-quy-chuẩn-css--styling)
8. [Quy Chuẩn Clean Code, Import & Giới Hạn File](#8-quy-chuẩn-clean-code-import--giới-hạn-file)
9. [Hiệu Năng & Tối Ưu Bộ Nhớ (Performance & Memory Leak Prevention)](#9-hiệu-năng--tối-ưu-bộ-nhớ)

---

## 🛠️ 1. Tech Stack Tổng Quan

| Phân tầng | Công nghệ chuẩn | Vai trò & Mục đích |
| :--- | :--- | :--- |
| **Core Framework** | **Next.js 16+ (App Router)** | Fullstack Framework: SSR, SSG, Server Actions, Route Handlers |
| **UI Library** | **React 19** + **TypeScript** | Strict typing, React Server Components, Actions, `use()` hook |
| **Styling** | **Tailwind CSS v4** + **`cva`** | Utility-first CSS, CSS variables semantic tokens, component variants |
| **UI Component Kit** | **Shadcn UI** / **Radix UI** | Accessible headless primitives, copy trực tiếp mã nguồn |
| **Icons** | **Lucide React** | Hệ thống icon chuẩn SVG nhẹ, đồng bộ |
| **State & API Cache** | **Redux Toolkit & RTK Query** | Centralized client state & server-cache with Tag Invalidation |
| **URL State** | **nuqs** / `useSearchParams` | Đồng bộ bộ lọc (filter, search, page) lên URL query string |
| **Form & Validation** | **React Hook Form** + **Zod** | Validate schema type-safe, không re-render thừa |
| **Notification** | **Sonner** | Toasts popup phản hồi trạng thái Promise |
| **Animation** | **Framer Motion / Motion** | Micro-interactions, transitions layout mượt mà |

---

## 📁 2. Kiến Trúc Thư Mục & Ranh Giới (Module Boundaries)

Áp dụng mô hình **Feature-First Architecture (Screaming Architecture)**. Code của nghiệp vụ nào nằm gọn trong module của nghiệp vụ đó, không để code văng lung tung:

```text
src/
├── app/                          # Chỉ chứa Routing & Layouts (Mỏng nhất có thể)
│   ├── (auth)/                   # Route group: login, register...
│   ├── (dashboard)/              # Route group: admin, events, volunteers...
│   │   ├── events/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx      # RSC: Fetch params, gọi Feature View
│   │   │   │   └── loading.tsx   # Skeleton UI riêng cho event detail
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx         # Error boundary riêng cho module
│   │   └── layout.tsx
│   ├── api/                      # Route handlers (BFF)
│   ├── globals.css               # Global tokens
│   └── layout.tsx                # Root layout
│
├── features/                     # TRÁI TIM NGHIỆP VỤ (Chia theo Feature)
│   ├── events/
│   │   ├── components/           # UI riêng của Event (EventCard, EventFilter, EventModal)
│   │   ├── hooks/                # Custom hooks riêng (useEventFilter, useEventCalendar)
│   │   ├── services/             # RTK Query endpoints riêng (eventApi.ts)
│   │   ├── types/                # Types/Interfaces riêng (event.types.ts)
│   │   ├── schemas/              # Zod schemas riêng (event.schema.ts)
│   │   └── index.ts              # Public API của feature (chỉ export những gì bên ngoài cần)
│   └── volunteers/
│
├── components/                   # UI DÙNG CHUNG TOÀN ỨNG DỤNG (Không chứa business logic)
│   ├── ui/                       # Primitives (Button, Input, Dialog, Card, Badge...)
│   ├── common/                   # Global components (Header, Sidebar, Breadcrumb, Footer)
│   ├── feedback/                 # LoadingSpinner, EmptyState, ConfirmDialog
│   └── providers/                # StoreProvider, ThemeProvider, ToastProvider
│
├── store/                        # Redux Toolkit cấu hình tập trung
│   ├── store.ts                  # makeStore() factory per-request
│   ├── hooks.ts                  # useAppDispatch, useAppSelector
│   ├── slices/                   # UI/Auth client slices (authSlice.ts, uiSlice.ts)
│   └── services/
│       └── api.ts                # baseApi (createApi + fetchBaseQuery + tagTypes)
│
├── lib/                          # Tiện ích nền tảng (`utils.ts`, `axios-client.ts`, `formatters.ts`)
├── hooks/                        # Custom React Hooks dùng chung (`useDebounce`, `useMediaQuery`)
├── types/                        # Types hệ thống (API response generic, pagination, user role)
├── constants/                    # Hằng số, config menu, enum hệ thống (routes.ts, storage.ts)
└── middleware.ts                 # Next.js Edge Middleware (Auth guard)
```

> 🛑 **NGUYÊN TẮC VÀNG VỀ RANH GIỚI MODULE**:
> 1. `components/ui/` **tuyệt đối không** import code từ `features/` hay `store/`.
> 2. Feature `A` muốn dùng component của Feature `B` phải import thông qua `src/features/B/index.ts` (Public API), không được import sâu vào ruột của nhau.

---

## ⚛️ 3. Quy Chuẩn React 19 & Next.js App Router

### 3.1. Phân định Server Component (RSC) vs Client Component (`'use client'`)
* **Mặc định:** 100% component là **Server Component**.
* **Chỉ gắn `'use client'` khi và chỉ khi:**
  * Cần dùng React Hooks: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`.
  * Cần gắn sự kiện Browser: `onClick`, `onChange`, `onSubmit`, `onKeyDown`.
  * Cần dùng Redux/RTK Query Hooks (`useAppSelector`, `useGetEventsQuery`).
  * Cần truy cập Web API: `window`, `document`, `localStorage`.
* **Nguyên tắc "Đẩy Client Component xuống lá cây" (Leaf Pattern):**
  * ❌ **Cấm:** Đặt `'use client'` ở file `page.tsx` hoặc `layout.tsx` chỉ vì bên trong có 1 nút bấm.
  * ✅ **Đúng:** Giữ `page.tsx` là Server Component, tách nút bấm thành `<EventActionButton />` có `'use client'` và import vào.

### 3.2. Quy chuẩn Next.js Image & Link (Chống lag trang & vỡ SEO)
* ❌ **Tuyệt đối không** dùng thẻ `<img>` trần. Luôn dùng `import Image from "next/image"` với đầy đủ `alt`, `width`, `height` hoặc `fill` để tự động tối ưu WebP/AVIF và Lazy-loading.
* ❌ **Tuyệt đối không** dùng thẻ `<a href="...">` cho chuyển trang nội bộ. Luôn dùng `import Link from "next/link"`.

### 3.3. Quy chuẩn Data Fetching
* Không viết `useEffect` để fetch dữ liệu khởi tạo trang (Anti-pattern gây giật layout).
* Dữ liệu ban đầu trang: Fetch trực tiếp trong **Server Component** hoặc dùng **RTK Query** có cache.

---

## 🛡️ 4. Quy Chuẩn TypeScript & Type-Safety Tuyệt Đối

### 4.1. Cấm hoàn toàn kiểu `any` (Zero `any` Policy)
* ❌ **Cấm:** `const data: any = ...;` hoặc `(item: any) => ...`
* ✅ **Đúng:** Khai báo kiểu tường minh, hoặc dùng `unknown` kết hợp type narrowing (kiểm tra kiểu):
  ```ts
  // Kiểm tra kiểu an toàn
  function processData(value: unknown) {
    if (typeof value === "string") {
      return value.trim();
    }
  }
  ```

### 4.2. Khai báo Trạng Thái (State) bằng Discriminated Unions (Chống trạng thái mâu thuẫn)
* ❌ **Tránh (Code rác):**
  ```ts
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Event | null>(null);
  // Dẫn đến tình trạng vô lý: vừa isLoading = true vừa isError = true!
  ```
* ✅ **Chuẩn:**
  ```ts
  type FetchState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: string };
  ```

### 4.3. Zod Schema là Single Source of Truth
Không định nghĩa interface thủ công trùng lặp với schema validation. Dùng `z.infer`:
```ts
// src/features/auth/schemas/login.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  rememberMe: z.boolean().optional(),
});

// Tự sinh Type từ Schema:
export type LoginFormInput = z.infer<typeof loginSchema>;
```

---

## 🔄 5. Quy Chuẩn Redux Toolkit (RTK) & RTK Query

### 5.1. Phân loại State rõ ràng (Tránh đưa mọi thứ vào Redux)
1. **URL State (Query Params):** Filter, Search keyword, Tab index, Page index $\rightarrow$ Lưu trên URL (`useSearchParams`, `nuqs`).
2. **Local Component State:** Mở/đóng Dialog, Hover state, Dropdown mở $\rightarrow$ `useState` cục bộ.
3. **Server Cache State:** Dữ liệu API (Danh sách sự kiện, chi tiết user) $\rightarrow$ **RTK Query**.
4. **Global Client State:** Thông tin User đăng nhập, Quyền (Permissions), Theme, Global Sidebar status $\rightarrow$ **Redux Slices**.

### 5.2. Quản lý Cache RTK Query theo Tag chi tiết (Tag Invalidation)
Không bao giờ invalidate toàn bộ store một cách vô tội vạ. Hãy gắn Tag định danh:
```ts
// Gắn Tag cho danh sách và từng item cụ thể
providesTags: (result) =>
  result
    ? [
        ...result.map(({ id }) => ({ type: 'Events' as const, id })),
        { type: 'Events', id: 'LIST' },
      ]
    : [{ type: 'Events', id: 'LIST' }],

// Khi cập nhật 1 event -> chỉ invalidate đúng event đó:
invalidatesTags: (result, error, { id }) => [{ type: 'Events', id }],
```

---

## 🚨 6. Quy Chuẩn Quản Lý Lỗi & Loading States

### 6.1. Cấm nuốt lỗi (No Silent Catch)
* ❌ **Nghiêm cấm tuyệt đối:**
  ```ts
  try {
    doSomething();
  } catch (error) {
    // Để trống hoặc chỉ console.log không xử lý!
  }
  ```
* ✅ **Chuẩn:** Luôn hiển thị Toast thông báo cho user (qua `sonner`) hoặc ném lỗi lên Error Boundary:
  ```ts
  try {
    await updateEvent(payload).unwrap();
    toast.success("Cập nhật sự kiện thành công!");
  } catch (err: unknown) {
    const message = getErrorMessage(err);
    toast.error(message || "Đã có lỗi xảy ra, vui lòng thử lại!");
  }
  ```

### 6.2. Cấu trúc File Xử Lý Giao Diện Đặc Biệt trong App Router
Mỗi thư mục route chức năng chính **bắt buộc** phải có:
- `page.tsx`: Giao diện chính.
- `loading.tsx`: Skeleton UI hiển thị ngay lập tức khi đang tải dữ liệu từ server.
- `error.tsx`: Giao diện báo lỗi kèm nút "Thử lại" (`reset()`) khi xảy ra sự cố.
- `not-found.tsx`: Giao diện 404 thân thiện khi dữ liệu không tồn tại.

---

## 🎨 7. Quy Chuẩn CSS & Styling

### 7.1. Cấm Magic Values & Inline Styles
* ❌ **Cấm:** `<div style={{ width: 347, marginTop: 13 }}>` hoặc `<div className="w-[347px] mt-[13px]">`
* ✅ **Đúng:** Sử dụng hệ thống spacing/sizing chuẩn của Tailwind: `className="w-80 mt-3"`.
* ❌ **Cấm:** Hardcode mã màu rải rác: `text-[#222]` hay `bg-[#f4f5f7]`.
* ✅ **Đúng:** Dùng Semantic Color Tokens: `text-foreground`, `bg-muted`, `bg-card`, `border-border`.

### 7.2. Chuẩn viết UI Reusable với `cva` (Class Variance Authority)
Tất cả UI component dùng chung có biến thể (`variant`, `size`) phải viết bằng `cva` + `cn()` như định nghĩa tại `src/components/ui/Button.tsx`.

---

## 🧹 8. Quy Chuẩn Clean Code, Import & Giới Hạn File

### 8.1. Giới hạn độ dài File & Function (File Length Limits)
* **File Component:** Tối đa **150 - 200 dòng**. Nếu dài hơn, bắt buộc tách các Sub-component ra thư mục `components/` cùng cấp.
* **Hàm / Hook:** Mỗi hàm chỉ làm **duy nhất 1 nhiệm vụ** (Single Responsibility), không quá **30 - 40 dòng**.

### 8.2. Thứ tự Import Chuẩn (Import Ordering)
File code phải sắp xếp import theo 5 tầng phân cách rõ ràng:
```tsx
// 1. React & Core Framework
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 2. Third-party Libraries
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Calendar, ChevronRight } from "lucide-react";

// 3. Absolute Project Imports (@/*)
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// 4. Feature-specific Imports
import { useGetEventsQuery } from "../services/eventApi";
import type { EventItem } from "../types/event.types";

// 5. Relative / Sub-components / Styles
import { EventCardSkeleton } from "./EventCardSkeleton";
```

### 8.3. Nguyên tắc Early Return (Giảm độ lồng if/else)
* ❌ **Tránh:**
  ```tsx
  if (user) {
    if (isAdmin) {
      return <AdminDashboard />;
    } else {
      return <UserDashboard />;
    }
  } else {
    return <LoginForm />;
  }
  ```
* ✅ **Chuẩn:**
  ```tsx
  if (!user) return <LoginForm />;
  if (!isAdmin) return <UserDashboard />;
  return <AdminDashboard />;
  ```

---

## ⚡ 9. Hiệu Năng & Tối Ưu Bộ Nhớ (Memory Leak Prevention)

1. **Dọn dẹp (Cleanup) trong `useEffect`**: Bắt buộc clear `setTimeout`, `setInterval`, `addEventListener`, và dùng `AbortController` khi fetch thủ công để tránh rò rỉ bộ nhớ.
2. **Debounce cho Search / Filter Input**: Mọi ô tìm kiếm realtime phải qua `useDebounce` (tối thiểu 300ms - 500ms) trước khi trigger gọi API / filter.
3. **Dynamic Import (`next/dynamic`)**: Các thư viện nặng (ChartJS, Rich Text Editor, Date Range Picker lớn) bắt buộc dùng `dynamic(() => import(...), { ssr: false })` để không làm nặng bundle trang ban đầu.
4. **Không lạm dụng `useCallback` / `useMemo` bừa bãi**: Chỉ dùng khi dependency truyền vào component con được bọc `React.memo` hoặc phép tính toán thực sự nặng (xử lý mảng hàng nghìn phần tử).

---

## ✅ 10. Check List Kiểm Tra Code Trước Khi Commit (Review Checklist)

- [ ] File không chứa bất kỳ type `any` nào.
- [ ] Không có `console.log` thừa trong code logic.
- [ ] Không có khối `catch` rỗng (đã gắn toast thông báo hoặc throw error).
- [ ] Các thẻ ảnh đều dùng `next/image`, link dùng `next/link`.
- [ ] Các class Tailwind đã tuân theo thứ tự và dùng semantic tokens.
- [ ] Form đã có Zod schema validation và type inference.
- [ ] Không có file component nào vượt quá 200 dòng.
- [ ] Đã chạy `npm run lint` và không có bất kỳ warning/error nào.
