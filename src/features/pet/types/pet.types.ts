export type PetSpecies = 'dog' | 'cat' | 'bird' | 'small_pet';
export type PetGender = 'male' | 'female';

export interface PetProfile {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  gender: PetGender;
  birthDate: string;
  weightKg: number;
  isNeutered: boolean;
  avatar: string;
  allergens: string[]; // e.g. ['Thịt gà', 'Ngô']
  dietaryNotes?: string;
}
