import React from 'react';
import { Check } from 'lucide-react';
import type { OrderTimelineProps } from '@/features/checkout/types/checkout.types';

export function OrderTimeline({ events, className = '' }: OrderTimelineProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1;

        return (
          <div key={index} className="flex gap-4">
            {/* Trục dọc & Node */}
            <div className="flex flex-col items-center">
              <div
                className={`relative w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-500 ${
                  event.isCompleted
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : event.isCurrent
                    ? 'bg-amber-500 ring-4 ring-amber-500/20 animate-pulse text-white'
                    : 'bg-stone-200 border-2 border-white'
                }`}
              >
                {event.isCompleted && <Check className="w-3.5 h-3.5" />}
                {event.isCurrent && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>

              {!isLast && (
                <div
                  className={`w-0.5 flex-1 my-1 transition-colors duration-500 ${
                    event.isCompleted ? 'bg-emerald-500' : 'bg-stone-200'
                  }`}
                />
              )}
            </div>

            {/* Nội dung */}
            <div className={`pb-8 ${!isLast ? 'pt-0.5' : 'pt-0.5'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                <h4
                  className={`text-sm font-semibold ${
                    event.isCurrent ? 'text-amber-700' : 'text-stone-900'
                  }`}
                >
                  {event.title}
                </h4>
                {event.timestamp && (
                  <span className="text-xs text-stone-500 font-mono tabular-nums">
                    {event.timestamp}
                  </span>
                )}
              </div>
              {event.description && (
                <p className="text-sm text-stone-600 mt-0.5 max-w-md leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
