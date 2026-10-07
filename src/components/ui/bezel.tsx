import React from 'react';

export function Bezel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] p-1.5 bg-stone-900/[0.03] ring-1 ring-[color:var(--color-hairline)] dark:bg-white/[0.04] ${className}`}>
      <div className="rounded-[22px] bg-white dark:bg-[#111827] shadow-[var(--shadow-soft)] overflow-hidden h-full">
        {children}
      </div>
    </div>
  );
}
