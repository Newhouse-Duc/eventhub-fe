export type OrderStatus = 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';

export interface TimelineEvent {
  status: OrderStatus;
  title: string;
  description?: string;
  timestamp?: string;
  isCurrent?: boolean;
  isCompleted?: boolean;
}

export interface OrderTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export interface CheckoutStep {
  id: string;
  title: string;
  number: number;
}

export interface CheckoutStepperProps {
  steps: CheckoutStep[];
  currentStepId: string;
  onStepClick?: (stepId: string) => void;
  className?: string;
}

export interface ShippingAddress {
  id: string;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
  note?: string;
  isDefault?: boolean;
}

export type ShippingMethodId = 'standard' | 'fast' | 'express_2h';

export interface ShippingMethod {
  id: ShippingMethodId;
  name: string;
  estimatedTime: string;
  fee: number;
  badge?: string;
  description: string;
}

export type PaymentMethodId = 'cod' | 'vietqr' | 'vnpay' | 'momo' | 'card';

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface CheckoutFormValues {
  email?: string;
  createAccount?: boolean;
  selectedAddressId?: string;
  newAddress?: Omit<ShippingAddress, 'id'>;
  shippingMethodId: ShippingMethodId;
  paymentMethodId: PaymentMethodId;
  orderNote?: string;
  termsAgreed: boolean;
}

export interface OrderResult {
  orderCode: string;
  totalAmount: number;
  paymentMethod: PaymentMethodId;
  shippingMethod: ShippingMethodId;
  estimatedDeliveryDate: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
  qrCodeUrl?: string;
  bankInfo?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    transferContent: string;
  };
}
