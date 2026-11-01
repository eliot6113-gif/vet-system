import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VetService } from '../../core/services/vet.service';
import { Appointment } from '../../core/models/vet.model';

@Component({
  selector: 'app-doctor-portal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="max-width: 900px; margin: 30px auto; padding: 25px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; font-family: sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h2 style="margin: 0; color: #1e293b;">👨‍⚕️ Panel Médico - Asignaciones</h2>
          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Bienvenido, <strong>{{ doctorName }}</strong></p>
        </div>
        <a routerLink="/login" style="color: #0284c7; text-decoration: none; font-weight: bold; font-size: 14px;">← Cerrar Sesión</a>
      </div>

      <hr style="border: 1px solid #f1f5f9; margin-bottom: 20px;" />

      <h3 style="color: #1e293b;">Mis Citas y Pacientes Asignados</h3>
      
      <div *ngIf="doctorAppointments.length === 0" style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; color: #64748b;">
        No tienes citas o fichas asignadas en este momento.
      </div>

      <table *ngIf="doctorAppointments.length > 0" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; text-align: left; color: #64748b; font-size: 13px;">
            <th style="padding: 10px;">HORA</th>
            <th style="padding: 10px;">CONSULTORIO</th>
            <th style="padding: 10px;">MASCOTA</th>
            <th style="padding: 10px;">DUEÑO (DNI)</th>
            <th style="padding: 10px;">MOTIVO / DIAGNÓSTICO</th>
            <th style="padding: 10px;">ESTADO</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let apt of doctorAppointments" style="border-bottom: 1px solid #f1f5f9; font-size: 14px;">
            <td style="padding: 12px; font-weight: bold;">{{ apt.time }}</td>
            <td style="padding: 12px;">{{ apt.room }}</td>
            <td style="padding: 12px; font-weight: bold; color: #0284c7;">{{ apt.petName }}</td>
            <td style="padding: 12px;">{{ apt.ownerName }} <br><small style="color: #64748b;">DNI: {{ apt.ownerDni }}</small></td>
            <td style="padding: 12px;">{{ apt.reason }}</td>
            <td style="padding: 12px;">
              <span style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 12px; font-size: 12px;">
                {{ apt.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DoctorPortalComponent implements OnInit {
  doctorName = '';
  doctorAppointments: Appointment[] = [];

  constructor(private route: ActivatedRoute, private vetService: VetService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.doctorName = params['doctor'] || 'Dr. Sánchez';
      const allAppointments = this.vetService.getAppointments();
      this.doctorAppointments = allAppointments.filter(a => a.doctorName === this.doctorName);
    });
  }
}