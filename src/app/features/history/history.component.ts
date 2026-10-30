import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1 style="margin: 0 0 15px 0; color: #1e293b;">Historial Clínico del Paciente</h1>

      <!-- Información General -->
      <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="margin: 0 0 10px 0; color: #0284c7;">Max (Golden Retriever)</h2>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Dueño: <strong>John Doe</strong> · Edad: 5 años · Peso: 30 kg</p>
        </div>
        <div style="background: #e0f2fe; padding: 12px 20px; border-radius: 8px; color: #0369a1; font-weight: bold;">
          🐶 Perro / Macho
        </div>
      </div>

      <!-- Línea de Tiempo del Historial -->
      <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 25px; padding: 20px;">
        <h3 style="margin-top: 0; color: #1e293b;">Línea de Tiempo Médica</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="border-bottom: 2px solid #f1f5f9; text-align: left; color: #64748b; font-size: 13px;">
              <th style="padding: 10px;">FECHA</th>
              <th style="padding: 10px;">TIPO / RAZÓN</th>
              <th style="padding: 10px;">DIAGNÓSTICO</th>
              <th style="padding: 10px;">VETERINARIO</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f1f5f9; font-size: 14px;">
              <td style="padding: 12px;">12 OCT 2026</td>
              <td style="padding: 12px;">💉 Vacunación</td>
              <td style="padding: 12px;">Revisión rutinaria</td>
              <td style="padding: 12px;">Dr. Miller</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; font-size: 14px;">
              <td style="padding: 12px;">05 SEP 2026</td>
              <td style="padding: 12px;">🩺 Enfermedad</td>
              <td style="padding: 12px;">Alergia en la piel</td>
              <td style="padding: 12px;">Dr. Lee</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class HistoryComponent {}