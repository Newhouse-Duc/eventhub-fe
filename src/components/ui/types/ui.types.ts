export interface PriceDisplayProps {
  price?: number;
  originalPrice?: number;
  minPrice?: number;
  maxPrice?: number;
  isContact?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  debounceMs?: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

export interface FilterChipProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

export interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}
export interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  width?: number | string;
  className?: string;
  footer?: React.ReactNode;
}

export interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  className?: string;
  footer?: React.ReactNode;
}

export interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export interface FormItemProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  description?: string;
}
