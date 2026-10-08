import type { TimelineEvent } from '@/features/checkout/types/checkout.types';

export interface TrackingOrderResult {
  orderCode: string;
  customerName: string;
  phoneMasked: string;
  shippingAddress: string;
  carrierName: string;
  trackingNumber: string;
  status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  statusText: string;
  estimatedDelivery: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  timeline: TimelineEvent[];
}
