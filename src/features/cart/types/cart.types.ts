export interface CartItem {
  id: string;
  slug?: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  variant?: string;
  stock?: number;
  selected?: boolean;
}

export interface MiniCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FreeshipProgressProps {
  currentSubtotal: number;
  threshold?: number;
}

export interface VoucherItem {
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 15 for 15%, or 50000 for 50k
  minOrderValue: number;
  description: string;
  expiryDate: string;
}

export interface CartSummary {
  subtotal: number;
  voucherDiscount: number;
  shippingFee: number;
  total: number;
  appliedVoucher?: VoucherItem;
}

export interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVoucher: (voucher: VoucherItem) => void;
  currentSubtotal: number;
  selectedCode?: string;
}
