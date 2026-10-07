import type React from 'react';
import type { TimelineEvent, OrderStatus } from '@/features/checkout/types/checkout.types';

export interface VipMemberCardProps {
  tier: 'Silver' | 'Gold' | 'Diamond';
  points: number;
  nextTierPoints: number;
  memberCode: string;
}

export interface AccountNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
}

export interface UserProfileFormData {
  avatarUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  phone?: string;
  birthday?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface OrderItemSummary {
  id: string;
  slug?: string;
  name: string;
  variant?: string;
  quantity: number;
  price: number;
  image: string;
}

export interface AccountOrder {
  id: string;
  orderCode: string;
  date: string;
  status: OrderStatus;
  statusText: string;
  items: OrderItemSummary[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  trackingCode?: string;
  trackingUrl?: string;
  paymentMethod: string;
  shippingMethod: string;
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  events: TimelineEvent[];
}

export interface UserAddress {
  id: string;
  recipientName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
  isDefault: boolean;
  tag: 'home' | 'office';
}

export interface LoginDevice {
  id: string;
  deviceName: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}
