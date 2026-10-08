export interface PetServiceItem {
  id: string;
  name: string;
  category: 'spa' | 'veterinary' | 'hotel' | 'training';
  categoryLabel: string;
  priceFrom: number;
  durationMinutes: number;
  description: string;
  image: string;
  perks: string[];
}

export interface AppointmentRecord {
  id: string;
  serviceName: string;
  petName: string;
  petBreed: string;
  appointmentDate: string;
  timeSlot: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
}
