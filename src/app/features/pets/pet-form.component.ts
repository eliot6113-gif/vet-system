import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VetService } from '../../core/services/vet.service';
import { Owner, Pet } from '../../core/models/vet.model';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div style="max-width: 800px; margin: 20px auto; padding: 25px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; font-family: sans-serif;">
      <h2 style="margin-top: 0; color: #1e293b;">🐾 {{ isEditing ? 'Editar Paciente' : 'Registro de Nuevo Paciente' }}</h2>
      
      <form [formGroup]="vetForm" (ngSubmit)="onSubmit()">
        <fieldset style="margin-bottom: 20px; padding: 15px; border: 1px solid #cbd5e1; border-radius: 8px;">
          <legend style="font-weight: bold; color: #0284c7;">1. Datos del Dueño</legend>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Nombre Completo:</label>
            <input type="text" formControlName="fullName" placeholder="Ej. Juan Pérez" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Teléfono:</label>
            <input type="text" formControlName="phone" placeholder="Ej. 987654321" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Correo:</label>
            <input type="email" formControlName="email" placeholder="Ej. juan@correo.com" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>
        </fieldset>

        <fieldset style="margin-bottom: 20px; padding: 15px; border: 1px solid #cbd5e1; border-radius: 8px;">
          <legend style="font-weight: bold; color: #0284c7;">2. Datos de la Mascota</legend>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Nombre de la Mascota:</label>
            <input type="text" formControlName="petName" placeholder="Ej. Luna" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Especie:</label>
            <select formControlName="species" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Raza:</label>
            <input type="text" formControlName="breed" placeholder="Ej. Golden Retriever" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Edad (años):</label>
            <input type="number" formControlName="age" placeholder="Ej. 3" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>
        </fieldset>

        <div style="display: flex; gap: 10px;">
          <button type="submit" [disabled]="vetForm.invalid" style="background: #10b981; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; flex: 1;">
            {{ isEditing ? 'Actualizar Registro' : 'Guardar Registro en el Sistema' }}
          </button>
          <button *ngIf="isEditing" type="button" (click)="resetForm()" style="background: #cbd5e1; color: #334155; padding: 10px 15px; border: none; border-radius: 6px; cursor: pointer;">
            Cancelar
          </button>
        </div>
      </form>

      <hr style="margin: 40px 0; border: 1px solid #e2e8f0;" />

      <!-- LISTADO DE PACIENTES REGISTRADOS ABAJO -->
      <div>
        <h3 style="color: #1e293b;">📋 Pacientes Registrados</h3>
        
        <div *ngIf="pets.length === 0" style="color: #64748b; font-style: italic; padding: 10px 0;">
          No hay pacientes registrados todavía. ¡Registra el primero arriba!
        </div>

        <table *ngIf="pets.length > 0" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; text-align: left; color: #64748b; font-size: 13px;">
              <th style="padding: 10px;">MASCOTA</th>
              <th style="padding: 10px;">ESPECIE / RAZA</th>
              <th style="padding: 10px;">EDAD</th>
              <th style="padding: 10px;">DUEÑO</th>
              <th style="padding: 10px; text-align: center;">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let pet of pets" style="border-bottom: 1px solid #f1f5f9; font-size: 14px;">
              <td style="padding: 12px; font-weight: bold; color: #0284c7;">{{ pet.name }}</td>
              <td style="padding: 12px;">{{ pet.species }} ({{ pet.breed }})</td>
              <td style="padding: 12px;">{{ pet.age }} años</td>
              <td style="padding: 12px;">{{ getOwnerName(pet.ownerId) }}</td>
              <td style="padding: 12px; text-align: center;">
                <button (click)="editPet(pet)" style="background: #e0f2fe; color: #0284c7; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Editar</button>
                <button (click)="deletePet(pet.id)" style="background: #fee2e2; color: #dc2626; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer;">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class PetFormComponent implements OnInit {
  vetForm: FormGroup;
  pets: Pet[] = [];
  owners: Owner[] = [];
  isEditing = false;
  editingPetId: string | null = null;
  editingOwnerId: string | null = null;

  constructor(private fb: FormBuilder, private vetService: VetService) {
    this.vetForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      petName: ['', Validators.required],
      species: ['Perro', Validators.required],
      breed: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.pets = this.vetService.getPets();
    this.owners = this.vetService.getOwners();
  }

  getOwnerName(ownerId: string): string {
    const owner = this.owners.find(o => o.id === ownerId);
    return owner ? owner.fullName + ' (' + owner.phone + ')' : 'Desconocido';
  }

  onSubmit() {
    if (this.vetForm.valid) {
      const formVal = this.vetForm.value;

      if (this.isEditing && this.editingPetId && this.editingOwnerId) {
        // Actualizar registro existente
        const updatedOwner: Owner = {
          id: this.editingOwnerId,
          fullName: formVal.fullName,
          phone: formVal.phone,
          email: formVal.email
        };

        const updatedPet: Pet = {
          id: this.editingPetId,
          name: formVal.petName,
          species: formVal.species,
          breed: formVal.breed,
          age: formVal.age,
          ownerId: this.editingOwnerId
        };

        this.vetService.updatePet(updatedPet, updatedOwner);
        alert('¡Paciente actualizado correctamente!');
      } else {
        // Crear nuevo registro
        const ownerId = 'own_' + Date.now();
        const petId = 'pet_' + Date.now();

        const newOwner: Owner = {
          id: ownerId,
          fullName: formVal.fullName,
          phone: formVal.phone,
          email: formVal.email
        };

        const newPet: Pet = {
          id: petId,
          name: formVal.petName,
          species: formVal.species,
          breed: formVal.breed,
          age: formVal.age,
          ownerId: ownerId
        };

        this.vetService.addPet(newPet, newOwner);
        alert('¡Mascota y dueño registrados y guardados exitosamente!');
      }

      this.resetForm();
      this.loadData();
    }
  }

  editPet(pet: Pet) {
    this.isEditing = true;
    this.editingPetId = pet.id;
    this.editingOwnerId = pet.ownerId;

    const owner = this.owners.find(o => o.id === pet.ownerId);

    this.vetForm.patchValue({
      fullName: owner ? owner.fullName : '',
      phone: owner ? owner.phone : '',
      email: owner ? owner.email : '',
      petName: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age
    });
  }

  deletePet(petId: string) {
    if (confirm('¿Estás seguro de eliminar este paciente de la clínica?')) {
      this.vetService.deletePet(petId);
      this.loadData();
    }
  }

  resetForm() {
    this.isEditing = false;
    this.editingPetId = null;
    this.editingOwnerId = null;
    this.vetForm.reset({ species: 'Perro' });
  }
}