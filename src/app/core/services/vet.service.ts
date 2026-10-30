import { Injectable } from '@angular/core';
import { Pet, Owner, Appointment } from '../models/vet.model';

@Injectable({
  providedIn: 'root'
})
export class VetService {
  private petsKey = 'vet_pets';
  private ownersKey = 'vet_owners';
  private appointmentsKey = 'vet_appointments';

  getPets(): Pet[] {
    const data = localStorage.getItem(this.petsKey);
    return data ? JSON.parse(data) : [];
  }

  getOwners(): Owner[] {
    const data = localStorage.getItem(this.ownersKey);
    return data ? JSON.parse(data) : [];
  }

  addPet(pet: Pet, owner: Owner): void {
    const pets = this.getPets();
    const owners = this.getOwners();
    pets.push(pet);
    owners.push(owner);
    localStorage.setItem(this.petsKey, JSON.stringify(pets));
    localStorage.setItem(this.ownersKey, JSON.stringify(owners));
  }

  updatePet(pet: Pet, owner: Owner): void {
    let pets = this.getPets();
    let owners = this.getOwners();

    pets = pets.map(p => p.id === pet.id ? pet : p);
    owners = owners.map(o => o.id === owner.id ? owner : o);

    localStorage.setItem(this.petsKey, JSON.stringify(pets));
    localStorage.setItem(this.ownersKey, JSON.stringify(owners));
  }

  deletePet(petId: string): void {
    let pets = this.getPets();
    const petToDelete = pets.find(p => p.id === petId);
    
    if (petToDelete) {
      let owners = this.getOwners();
      pets = pets.filter(p => p.id !== petId);
      owners = owners.filter(o => o.id !== petToDelete.ownerId);

      localStorage.setItem(this.petsKey, JSON.stringify(pets));
      localStorage.setItem(this.ownersKey, JSON.stringify(owners));
    }
  }

  getAppointments(): Appointment[] {
    const data = localStorage.getItem(this.appointmentsKey);
    return data ? JSON.parse(data) : [];
  }

  saveAppointment(appointment: Appointment): void {
    const appointments = this.getAppointments();
    if (appointment.id) {
      const index = appointments.findIndex(a => a.id === appointment.id);
      if (index !== -1) {
        appointments[index] = appointment;
      }
    } else {
      appointment.id = 'apt_' + Date.now();
      appointments.push(appointment);
    }
    localStorage.setItem(this.appointmentsKey, JSON.stringify(appointments));
  }

  deleteAppointment(id: string): void {
    let appointments = this.getAppointments();
    appointments = appointments.filter(a => a.id !== id);
    localStorage.setItem(this.appointmentsKey, JSON.stringify(appointments));
  }
}