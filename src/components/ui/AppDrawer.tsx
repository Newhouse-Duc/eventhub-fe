'use client';

import React from 'react';
import { Drawer } from 'antd';
import { X } from 'lucide-react';
import type { AppDrawerProps } from '@/components/ui/types/ui.types';

export function AppDrawer({
  isOpen,
  onClose,
  title,
  children,
  placement = 'right',
  width = 400,
  className = '',
  footer,
}: AppDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      placement={placement}
      size={width}
      closeIcon={<X className="w-5 h-5 text-stone-500 hover:text-stone-900 transition-colors" />}
      title={
        title ? (
          <h3 className="text-lg font-semibold text-stone-900 tracking-tight">
            {title}
          </h3>
        ) : null
      }
      footer={footer}
      className={`custom-app-drawer ${className}`}
      styles={{
        header: { borderBottom: '1px solid var(--color-hairline)', padding: '20px 24px' },
        body: { padding: 0, backgroundColor: 'var(--background)' },
        footer: { borderTop: '1px solid var(--color-hairline)', padding: '20px 24px' },
      }}
    >
      {children}
    </Drawer>
  );
}
