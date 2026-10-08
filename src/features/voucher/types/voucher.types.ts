export type VoucherStatus = 'available' | 'used' | 'expired';

export interface VoucherItem {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'shipping';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiresAt: string;
  status: VoucherStatus;
}

export interface LoyaltyPointHistory {
  id: string;
  date: string;
  description: string;
  points: number; // positive for earn, negative for spend
  type: 'earn' | 'redeem' | 'bonus';
}
