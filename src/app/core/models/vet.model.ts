export interface Owner {
  id: string;
  fullName: string;
  phone: string;
  email: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  ownerId: string;
}

export interface Appointment {
  id: string;
  time: string;
  petName: string;
  species: string;
  ownerName: string;
  reason: string;
  status: string; // Confirmada, En espera, Pendiente
  room: string;   // Room 1, Room 2, Room 3
}