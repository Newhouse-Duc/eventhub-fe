'use client';

import React from 'react';
import { Modal } from 'antd';
import { X } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import type { AppModalProps } from '@/components/ui/types/ui.types';

export function AppModal({
  isOpen,
  onClose,
  title,
  children,
  width = 520,
  className = '',
  footer = null,
}: AppModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={footer}
      width={width}
      closeIcon={<X className="w-5 h-5 text-stone-500 hover:text-stone-900 transition-colors" />}
      className={`custom-app-modal ${className}`}
      centered
      // Loại bỏ padding/bg mặc định của AntD để inject Bezel
      styles={{
        header: { padding: '24px 24px 0', borderBottom: 'none', backgroundColor: 'transparent' },
        body: { padding: '24px', backgroundColor: 'transparent' },
      }}
      modalRender={(modalNode) => (
        <Bezel className="w-full">
          {modalNode}
        </Bezel>
      )}
    >
      {title && (
        <h3 className="text-xl font-semibold text-stone-900 tracking-tight mb-2">
          {title}
        </h3>
      )}
      {children}
    </Modal>
  );
}
