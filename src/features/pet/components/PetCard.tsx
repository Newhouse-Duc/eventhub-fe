'use client';

import React from 'react';
import Image from 'next/image';
import { PawPrint, AlertCircle, Edit2, Trash2, Calendar, Scale } from 'lucide-react';
import { Bezel } from '@/components/ui/bezel';
import type { PetProfile } from '../types/pet.types';

interface PetCardProps {
  pet: PetProfile;
  onEdit: (pet: PetProfile) => void;
  onDelete: (id: string) => void;
}

export function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
  return (
    <Bezel className="p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Avatar + Main info */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-300 overflow-hidden shrink-0 shadow-xs bg-stone-100">
            <Image
              src={pet.avatar}
              alt={pet.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-stone-900">{pet.name}</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700">
                {pet.species === 'dog' ? '🐶 Cún' : '🐱 Mèo'}
              </span>
              <span className="text-xs text-stone-500">
                {pet.gender === 'male' ? '♂ Đực' : '♀ Cái'}
              </span>
            </div>

            <p className="text-xs text-stone-600 font-medium mt-0.5">{pet.breed}</p>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 mt-2 font-mono tabular-nums">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                Sinh: {pet.birthDate}
              </span>
              <span className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-stone-400" />
                {pet.weightKg} kg
              </span>
              {pet.isNeutered && (
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-sans text-[10px] font-semibold">
                  ✓ Đã triệt sản
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={() => onEdit(pet)}
            className="w-8 h-8 rounded-full border border-stone-200 hover:border-amber-400 hover:bg-amber-50 text-stone-600 hover:text-amber-700 flex items-center justify-center transition-colors"
            title="Chỉnh sửa hồ sơ"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(pet.id)}
            className="w-8 h-8 rounded-full border border-stone-200 hover:border-rose-300 hover:bg-rose-50 text-stone-600 hover:text-rose-600 flex items-center justify-center transition-colors"
            title="Xóa bé cưng"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Allergens & Dietary note warning */}
      {pet.allergens.length > 0 && (
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-rose-700 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            Dị ứng thành phần:
          </span>
          {pet.allergens.map((alg, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/80 px-2 py-0.5 rounded-full"
            >
              {alg}
            </span>
          ))}
        </div>
      )}
    </Bezel>
  );
}
