import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VetService } from '../../core/services/vet.service';
import { Appointment } from '../../core/models/vet.model';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h1 style="margin: 0; color: #1e293b;">Gestión de Citas</h1>
        <button (click)="openModal()" style="background: #0284c7; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer;">
          + Nueva Cita
        </button>
      </div>

      <!-- Listado con Opciones de Editar y Eliminar -->
      <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 20px;">
        <h3 style="margin-top: 0; color: #1e293b;">Citas Programadas</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="border-bottom: 2px solid #f1f5f9; text-align: left; color: #64748b; font-size: 13px;">
              <th style="padding: 10px;">HORA</th>
              <th style="padding: 10px;">CONSULTORIO</th>
              <th style="padding: 10px;">MASCOTA</th>
              <th style="padding: 10px;">DUEÑO</th>
              <th style="padding: 10px;">MOTIVO</th>
              <th style="padding: 10px;">ESTADO</th>
              <th style="padding: 10px; text-align: center;">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let apt of appointments" style="border-bottom: 1px solid #f1f5f9; font-size: 14px;">
              <td style="padding: 12px; font-weight: bold;">{{ apt.time }}</td>
              <td style="padding: 12px;">{{ apt.room }}</td>
              <td style="padding: 12px;">{{ apt.petName }} ({{ apt.species }})</td>
              <td style="padding: 12px;">{{ apt.ownerName }}</td>
              <td style="padding: 12px;">{{ apt.reason }}</td>
              <td style="padding: 12px;">{{ apt.status }}</td>
              <td style="padding: 12px; text-align: center;">
                <button (click)="editAppointment(apt)" style="background: #e0f2fe; color: #0284c7; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Editar</button>
                <button (click)="deleteAppointment(apt.id)" style="background: #fee2e2; color: #dc2626; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer;">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- MODAL PARA CREAR / EDITAR -->
      <div *ngIf="showModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 25px; border-radius: 12px; width: 450px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <h2 style="margin-top: 0; color: #1e293b;">{{ isEditing ? 'Editar Cita' : 'Nueva Cita Médica' }}</h2>
          
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Hora:</label>
            <input type="text" [(ngModel)]="currentAppointment.time" placeholder="Ej. 10:00 AM" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Consultorio:</label>
            <select [(ngModel)]="currentAppointment.room" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
              <option value="Room 1">Room 1</option>
              <option value="Room 2">Room 2</option>
              <option value="Room 3">Room 3</option>
            </select>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Nombre de la Mascota:</label>
            <input type="text" [(ngModel)]="currentAppointment.petName" placeholder="Ej. Max" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Especie:</label>
            <input type="text" [(ngModel)]="currentAppointment.species" placeholder="Ej. Perro / Gato" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Nombre del Dueño:</label>
            <input type="text" [(ngModel)]="currentAppointment.ownerName" placeholder="Ej. Juan Pérez" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Motivo:</label>
            <input type="text" [(ngModel)]="currentAppointment.reason" placeholder="Ej. Vacunación" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Estado:</label>
            <select [(ngModel)]="currentAppointment.status" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
              <option value="Confirmada">Confirmada</option>
              <option value="En espera">En espera</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button (click)="closeModal()" style="background: #e2e8f0; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer;">Cancelar</button>
            <button (click)="save()" style="background: #10b981; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  showModal = false;
  isEditing = false;

  currentAppointment: Appointment = {
    id: '',
    time: '',
    petName: '',
    species: '',
    ownerName: '',
    reason: '',
    status: 'Confirmada',
    room: 'Room 1'
  };

  constructor(private vetService: VetService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointments = this.vetService.getAppointments();
  }

  openModal() {
    this.isEditing = false;
    this.currentAppointment = { id: '', time: '', petName: '', species: '', ownerName: '', reason: '', status: 'Confirmada', room: 'Room 1' };
    this.showModal = true;
  }

  editAppointment(apt: Appointment) {
    this.isEditing = true;
    this.currentAppointment = { ...apt };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (!this.currentAppointment.time || !this.currentAppointment.petName) {
      alert('Por favor completa al menos la hora y el nombre de la mascota.');
      return;
    }
    this.vetService.saveAppointment(this.currentAppointment);
    this.loadAppointments();
    this.closeModal();
  }

  deleteAppointment(id: string) {
    if (confirm('¿Estás seguro de eliminar esta cita?')) {
      this.vetService.deleteAppointment(id);
      this.loadAppointments();
    }
  }
}