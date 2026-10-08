'use client';

import React, { useState } from 'react';
import { Plus, PawPrint } from 'lucide-react';
import { App, Modal } from 'antd';
import { PetCard } from './PetCard';
import type { PetProfile, PetSpecies, PetGender } from '../types/pet.types';

const INITIAL_PETS: PetProfile[] = [
  {
    id: 'pet-1',
    name: 'Bông',
    species: 'dog',
    breed: 'Poodle Toy',
    gender: 'female',
    birthDate: '15/03/2024',
    weightKg: 3.8,
    isNeutered: true,
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400',
    allergens: ['Ngô', 'Phụ phẩm gia cầm'],
  },
  {
    id: 'pet-2',
    name: 'Mochi',
    species: 'cat',
    breed: 'Mèo Anh lông ngắn (British Shorthair)',
    gender: 'male',
    birthDate: '20/11/2023',
    weightKg: 4.5,
    isNeutered: true,
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    allergens: [],
  },
];

export function AccountPetsView() {
  const { message } = App.useApp();
  const [pets, setPets] = useState<PetProfile[]>(INITIAL_PETS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<PetProfile | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formSpecies, setFormSpecies] = useState<PetSpecies>('dog');
  const [formBreed, setFormBreed] = useState('');
  const [formGender, setFormGender] = useState<PetGender>('male');
  const [formBirthDate, setFormBirthDate] = useState('');
  const [formWeight, setFormWeight] = useState(3.0);
  const [formNeutered, setFormNeutered] = useState(true);
  const [formAllergens, setFormAllergens] = useState('');

  const handleOpenAdd = () => {
    setEditingPet(null);
    setFormName('');
    setFormSpecies('dog');
    setFormBreed('');
    setFormGender('male');
    setFormBirthDate('01/01/2024');
    setFormWeight(3.5);
    setFormNeutered(true);
    setFormAllergens('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pet: PetProfile) => {
    setEditingPet(pet);
    setFormName(pet.name);
    setFormSpecies(pet.species);
    setFormBreed(pet.breed);
    setFormGender(pet.gender);
    setFormBirthDate(pet.birthDate);
    setFormWeight(pet.weightKg);
    setFormNeutered(pet.isNeutered);
    setFormAllergens(pet.allergens.join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPets(pets.filter((p) => p.id !== id));
    message.success('Đã xóa hồ sơ bé cưng.');
  };

  const handleSavePet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formBreed.trim()) {
      message.error('Vui lòng nhập tên và giống của bé cưng.');
      return;
    }

    const allergensList = formAllergens
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingPet) {
      setPets(
        pets.map((p) =>
          p.id === editingPet.id
            ? {
                ...p,
                name: formName,
                species: formSpecies,
                breed: formBreed,
                gender: formGender,
                birthDate: formBirthDate,
                weightKg: formWeight,
                isNeutered: formNeutered,
                allergens: allergensList,
              }
            : p
        )
      );
      message.success('Đã cập nhật thông tin bé cưng thành công!');
    } else {
      const newPet: PetProfile = {
        id: `pet-${Date.now()}`,
        name: formName,
        species: formSpecies,
        breed: formBreed,
        gender: formGender,
        birthDate: formBirthDate,
        weightKg: formWeight,
        isNeutered: formNeutered,
        avatar:
          formSpecies === 'dog'
            ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400'
            : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
        allergens: allergensList,
      };
      setPets([...pets, newPet]);
      message.success('Đã thêm hồ sơ bé cưng mới!');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top action */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Hồ sơ thú cưng của bạn ({pets.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Giúp Pet Luxury gợi ý thức ăn chuẩn thể trạng và cảnh báo thành phần dị ứng khi mua hàng.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="h-10 px-5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          Thêm bé cưng
        </button>
      </div>

      {/* Pet Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal Add / Edit Pet */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden"
      >
        <form onSubmit={handleSavePet} className="p-4 space-y-4">
          <div className="text-center pb-2 border-b border-stone-100">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto mb-2">
              <PawPrint className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              {editingPet ? 'Cập nhật hồ sơ bé cưng' : 'Thêm hồ sơ bé cưng mới'}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Tên bé *</label>
              <input
                type="text"
                required
                placeholder="VD: Bông, Mochi..."
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Loài</label>
              <select
                value={formSpecies}
                onChange={(e) => setFormSpecies(e.target.value as PetSpecies)}
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 bg-white"
              >
                <option value="dog">🐶 Chó</option>
                <option value="cat">🐱 Mèo</option>
                <option value="bird">🐦 Chim</option>
                <option value="small_pet">🐹 Thú nhỏ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Giống loài *</label>
              <input
                type="text"
                required
                placeholder="VD: Poodle, Corgi, Mèo Mướp..."
                value={formBreed}
                onChange={(e) => setFormBreed(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Giới tính</label>
              <select
                value={formGender}
                onChange={(e) => setFormGender(e.target.value as PetGender)}
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 bg-white"
              >
                <option value="male">Đực</option>
                <option value="female">Cái</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Cân nặng (kg)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={formWeight}
                onChange={(e) => setFormWeight(parseFloat(e.target.value) || 0)}
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Ngày sinh</label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                value={formBirthDate}
                onChange={(e) => setFormBirthDate(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Thành phần dị ứng (cách nhau bởi dấu phẩy)
            </label>
            <input
              type="text"
              placeholder="VD: Thịt gà, Lúa mì, Ngô..."
              value={formAllergens}
              onChange={(e) => setFormAllergens(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="neuteredCheck"
              checked={formNeutered}
              onChange={(e) => setFormNeutered(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded"
            />
            <label htmlFor="neuteredCheck" className="text-xs text-stone-700">
              Bé đã được triệt sản
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="h-10 px-4 rounded-full border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all"
            >
              Lưu hồ sơ
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
