'use client';

import React from 'react';
import { Check } from 'lucide-react';
import type { CheckoutStepperProps } from '@/features/checkout/types/checkout.types';

export function CheckoutStepper({
  steps,
  currentStepId,
  onStepClick,
  className = '',
}: CheckoutStepperProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStepId);

  return (
    <div className={`flex items-center justify-between w-full relative ${className}`}>
      {/* Background Line */}
      <div className="absolute top-4 left-0 w-full h-1 bg-stone-200 -z-10 rounded-full" />
      
      {/* Active Line (Progress) */}
      <div 
        className="absolute top-4 left-0 h-1 bg-amber-500 -z-10 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: `${currentIndex > 0 ? (currentIndex / (steps.length - 1)) * 100 : 0}%` }}
      />

      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div
            key={step.id}
            onClick={() => isCompleted && onStepClick?.(step.id)}
            className={`flex flex-col items-center gap-2 bg-[#FDFBF7] px-2 select-none ${
              isCompleted && onStepClick ? 'cursor-pointer hover:opacity-80' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : isCurrent
                  ? 'bg-amber-600 text-white ring-4 ring-amber-500/20 shadow-xs'
                  : 'bg-white text-stone-400 ring-2 ring-stone-200'
              }`}
            >
              {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : index + 1}
            </div>
            <span
              className={`text-xs font-semibold ${
                isCurrent ? 'text-amber-800' : isCompleted ? 'text-stone-900' : 'text-stone-400'
              }`}
            >
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
