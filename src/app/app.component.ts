import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div style="display: flex; height: 100vh; font-family: sans-serif; background: #f4f6f9; margin: -8px;">
      
      <!-- SIDEBAR LATERAL -->
      <aside style="width: 260px; background: #ffffff; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column;">
        <!-- Logo -->
        <div style="padding: 20px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #e2e8f0;">
          <span style="font-size: 24px;">🐾</span>
          <div>
            <h2 style="margin: 0; font-size: 18px; color: #1e293b;">VetCare</h2>
            <small style="color: #64748b; font-size: 11px;">Clínica Veterinaria</small>
          </div>
        </div>

        <!-- Menú de Navegación -->
        <nav style="padding: 15px; display: flex; flex-direction: column; gap: 5px; flex: 1;">
          <a routerLink="/inicio" routerLinkActive="active-link" style="display: flex; align-items: center; gap: 12px; padding: 12px 15px; text-decoration: none; color: #475569; border-radius: 8px; font-weight: 500;">
            🏠 Inicio
          </a>
          <a routerLink="/citas" routerLinkActive="active-link" style="display: flex; align-items: center; gap: 12px; padding: 12px 15px; text-decoration: none; color: #475569; border-radius: 8px; font-weight: 500;">
            📅 Citas
          </a>
          <a routerLink="/mascotas/nuevo" routerLinkActive="active-link" style="display: flex; align-items: center; gap: 12px; padding: 12px 15px; text-decoration: none; color: #475569; border-radius: 8px; font-weight: 500;">
            🐶 Mascotas
          </a>
          <a routerLink="/historial" routerLinkActive="active-link" style="display: flex; align-items: center; gap: 12px; padding: 12px 15px; text-decoration: none; color: #475569; border-radius: 8px; font-weight: 500;">
            📋 Historial Clínico
          </a>
        </nav>
      </aside>

      <!-- CONTENEDOR PRINCIPAL -->
      <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
        
        <!-- HEADER SUPERIOR -->
        <header style="height: 70px; background: #ffffff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 30px;">
          <div style="position: relative; width: 400px;">
            <input type="text" placeholder="🔍 Buscar paciente, mascota o dueño..." style="width: 100%; padding: 10px 15px 10px 35px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; background: #f8fafc;" />
          </div>
          <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 18px; cursor: pointer;">🔔</span>
            <div style="display: flex; align-items: center; gap: 8px; background: #f1f5f9; padding: 6px 12px; border-radius: 20px;">
              <span style="background: #cbd5e1; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">M</span>
              <span style="font-weight: 600; color: #334155; font-size: 14px;">Martín</span>
            </div>
          </div>
        </header>

        <!-- VISTA DINÁMICA (Router Outlet) -->
        <main style="flex: 1; overflow-y: auto; padding: 30px;">
          <router-outlet></router-outlet>
        </main>

      </div>
    </div>
  `,
  styles: [`
    .active-link {
      background: #e0f2fe !important;
      color: #0284c7 !important;
    }
  `]
})
export class AppComponent {}