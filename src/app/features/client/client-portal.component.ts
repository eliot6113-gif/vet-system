import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VetService } from '../../core/services/vet.service';
import { Appointment } from '../../core/models/vet.model';

@Component({
  selector: 'app-client-portal',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div style="max-width: 900px; margin: 30px auto; padding: 25px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; font-family: sans-serif;">
      
      <!-- CABECERA -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h2 style="margin: 0; color: #1e293b;">👤 Portal del Cliente</h2>
          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Consultando y gestionando citas para el DNI: <strong>{{ dni }}</strong></p>
        </div>
        <a routerLink="/login" style="background: #e2e8f0; color: #334155; padding: 8px 15px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">← Volver al Login</a>
      </div>

      <hr style="border: 1px solid #f1f5f9; margin-bottom: 20px;" />

      <!-- BOTÓN PARA AGREGAR CITA -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #1e293b;">Mis Citas Agendadas</h3>
        <button (click)="openAddModal()" style="background: #0284c7; color: white; border: none; padding: 10px 16px; border-radius: 8px; font-weight: bold; cursor: pointer;">
          + Agendar Nueva Cita
        </button>
      </div>
      
      <div *ngIf="clientAppointments.length === 0" style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; color: #64748b; margin-top: 15px;">
        No tienes citas registradas actualmente. Haz clic en "Agendar Nueva Cita" para programar una.
      </div>

      <table *ngIf="clientAppointments.length > 0" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; text-align: left; color: #64748b; font-size: 13px;">
            <th style="padding: 10px;">HORA</th>
            <th style="padding: 10px;">MASCOTA</th>
            <th style="padding: 10px;">CONSULTORIO</th>
            <th style="padding: 10px;">DOCTOR ASIGNADO</th>
            <th style="padding: 10px;">MOTIVO</th>
            <th style="padding: 10px; text-align: center;">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let apt of clientAppointments" style="border-bottom: 1px solid #f1f5f9; font-size: 14px;">
            <td style="padding: 12px; font-weight: bold;">{{ apt.time }}</td>
            <td style="padding: 12px;">{{ apt.petName }}</td>
            <td style="padding: 12px;">{{ apt.room }}</td>
            <td style="padding: 12px; font-weight: bold; color: #0284c7;">{{ apt.doctorName || 'Por asignar' }}</td>
            <td style="padding: 12px;">{{ apt.reason }}</td>
            <td style="padding: 12px; text-align: center;">
              <button (click)="openEditModal(apt)" style="background: #e0f2fe; color: #0284c7; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Editar</button>
              <button (click)="deleteAppointment(apt.id)" style="background: #fee2e2; color: #dc2626; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer;">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- MODAL PARA AGREGAR / EDITAR CITA -->
      <div *ngIf="showModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
        <div style="background: white; padding: 25px; border-radius: 12px; width: 420px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <h3 style="margin-top: 0; color: #1e293b;">{{ isEditing ? 'Editar Cita' : 'Agendar Nueva Cita' }}</h3>
          
          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Hora de la cita:</label>
            <input type="text" [(ngModel)]="currentApt.time" placeholder="Ej. 11:00 AM" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Nombre de tu Mascota:</label>
            <input type="text" [(ngModel)]="currentApt.petName" placeholder="Ej. Firulais" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Consultorio:</label>
            <select [(ngModel)]="currentApt.room" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
              <option value="Room 1">Room 1</option>
              <option value="Room 2">Room 2</option>
              <option value="Room 3">Room 3</option>
            </select>
          </div>

          <div style="margin-bottom: 15px;">
            <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 4px;">Motivo de la consulta:</label>
            <input type="text" [(ngModel)]="currentApt.reason" placeholder="Ej. Vacuna anual" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button (click)="showModal = false" style="background: #e2e8f0; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer;">Cancelar</button>
            <button (click)="saveAppointment()" style="background: #10b981; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">Guardar Cita</button>
          </div>
        </div>
      </div>

    </div>
  `
})
export class ClientPortalComponent implements OnInit {
  dni = '';
  clientAppointments: Appointment[] = [];
  showModal = false;
  isEditing = false;

  currentApt: Appointment = {
    id: '',
    time: '',
    petName: '',
    ownerName: 'Cliente (DNI: ' + this.dni + ')',
    ownerDni: '',
    reason: '',
    status: 'Confirmada',
    room: 'Room 1',
    doctorName: 'Dr. Sánchez' // Doctor predeterminado o por asignar
  };

  constructor(private route: ActivatedRoute, private vetService: VetService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dni = params['dni'] || '';
      this.loadAppointments();
    });
  }

  loadAppointments() {
    const allAppointments = this.vetService.getAppointments();
    this.clientAppointments = allAppointments.filter(a => a.ownerDni === this.dni);
  }

  openAddModal() {
    this.isEditing = false;
    this.currentApt = {
      id: '',
      time: '',
      petName: '',
      ownerName: 'Dueño (DNI: ' + this.dni + ')',
      ownerDni: this.dni, // Se asigna automáticamente el DNI actual del cliente
      reason: '',
      status: 'Confirmada',
      room: 'Room 1',
      doctorName: 'Dr. Sánchez'
    };
    this.showModal = true;
  }

  openEditModal(apt: Appointment) {
    this.isEditing = true;
    this.currentApt = { ...apt };
    this.showModal = true;
  }

  saveAppointment() {
    if (!this.currentApt.time || !this.currentApt.petName || !this.currentApt.reason) {
      alert('Por favor completa la hora, el nombre de tu mascota y el motivo.');
      return;
    }
    // Aseguramos que conserve el DNI del cliente actual
    this.currentApt.ownerDni = this.dni;
    
    this.vetService.saveAppointment(this.currentApt);
    this.loadAppointments();
    this.showModal = false;
  }

  deleteAppointment(id: string) {
    if (confirm('¿Estás seguro de que deseas cancelar/eliminar esta cita?')) {
      this.vetService.deleteAppointment(id);
      this.loadAppointments();
    }
  }
}