import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 400px; margin: 60px auto; padding: 30px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); font-family: sans-serif;">
      <h2 style="text-align: center; color: #1e293b; margin-top: 0;">🐾 VetCare Accesos</h2>
      <p style="text-align: center; color: #64748b; font-size: 14px; margin-bottom: 25px;">Selecciona tu rol de ingreso al sistema</p>

      <div style="margin-bottom: 15px;">
        <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 5px;">Seleccionar Rol:</label>
        <select [(ngModel)]="selectedRole" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">
          <option value="worker">Trabajador / Recepción</option>
          <option value="doctor">Doctor (Ej. Dr. Sánchez)</option>
          <option value="client">Cliente / Dueño de Mascota</option>
        </select>
      </div>

      <!-- CAMPOS EXCLUSIVOS PARA CLIENTE (DNI) -->
      <div *ngIf="selectedRole === 'client'" style="margin-bottom: 15px;">
        <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 5px;">Ingrese su DNI:</label>
        <input type="text" [(ngModel)]="clientDni" placeholder="Ej. 12345678" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;" />
      </div>

      <!-- CAMPOS EXCLUSIVOS PARA DOCTOR -->
      <div *ngIf="selectedRole === 'doctor'" style="margin-bottom: 15px;">
        <label style="display: block; font-size: 13px; color: #64748b; margin-bottom: 5px;">Seleccione su Usuario:</label>
        <select [(ngModel)]="selectedDoctor" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">
          <option value="Dr. Sánchez">Dr. Sánchez</option>
          <option value="Dr. López">Dr. López</option>
          <option value="Dr. García">Dr. García</option>
        </select>
      </div>

      <button (click)="login()" style="width: 100%; background: #0284c7; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px;">
        Ingresar al Sistema
      </button>
    </div>
  `
})
export class LoginComponent {
  selectedRole = 'worker';
  clientDni = '';
  selectedDoctor = 'Dr. Sánchez';

  constructor(private router: Router) {}

  login() {
    if (this.selectedRole === 'worker') {
      this.router.navigate(['/inicio']);
    } else if (this.selectedRole === 'doctor') {
      this.router.navigate(['/doctor-portal'], { queryParams: { doctor: this.selectedDoctor } });
    } else if (this.selectedRole === 'client') {
      if (!this.clientDni) {
        alert('Por favor ingrese su DNI.');
        return;
      }
      this.router.navigate(['/client-portal'], { queryParams: { dni: this.clientDni } });
    }
  }
}