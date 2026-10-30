import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1 style="margin: 0 0 5px 0; color: #1e293b;">Dashboard</h1>
      <p style="color: #64748b; margin-top: 0;">¡Hola, Martín! Aquí tienes un resumen de la clínica.</p>

      <!-- Tarjetas de Resumen -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
        <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="margin: 0; color: #64748b; font-size: 14px;">Citas de hoy</h3>
          <p style="font-size: 32px; font-weight: bold; margin: 10px 0; color: #1e293b;">8</p>
          <small style="color: #0284c7;">2 en espera · 6 atendidas</small>
        </div>
        <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="margin: 0; color: #64748b; font-size: 14px;">Mascotas registradas</h3>
          <p style="font-size: 32px; font-weight: bold; margin: 10px 0; color: #1e293b;">243</p>
          <small style="color: #64748b;">Perros: 158 · Gatos: 85</small>
        </div>
      </div>

      <!-- Tabla de Próximas Citas -->
      <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 30px; padding: 20px;">
        <h3 style="margin-top: 0; color: #1e293b;">Próximas citas médicas</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="border-bottom: 2px solid #f1f5f9; text-align: left; color: #64748b; font-size: 13px;">
              <th style="padding: 10px;">HORA</th>
              <th style="padding: 10px;">MASCOTA</th>
              <th style="padding: 10px;">DUEÑO</th>
              <th style="padding: 10px;">MOTIVO</th>
              <th style="padding: 10px;">ESTADO</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f1f5f9; font-size: 14px;">
              <td style="padding: 12px;">08:00</td>
              <td style="padding: 12px; font-weight: bold;">Max (Perro)</td>
              <td style="padding: 12px;">Carlos Mendez</td>
              <td style="padding: 12px;">Control general</td>
              <td style="padding: 12px;"><span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 12px; font-size: 12px;">Confirmada</span></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; font-size: 14px;">
              <td style="padding: 12px;">09:30</td>
              <td style="padding: 12px; font-weight: bold;">Luna (Gato)</td>
              <td style="padding: 12px;">Ana Torres</td>
              <td style="padding: 12px;">Vacunación</td>
              <td style="padding: 12px;"><span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 12px; font-size: 12px;">Confirmada</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DashboardComponent {}