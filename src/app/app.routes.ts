import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PetFormComponent } from './features/pets/pet-form.component';
import { AppointmentsComponent } from './features/appointments/appointments.component';
import { HistoryComponent } from './features/history/history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'mascotas/nuevo', component: PetFormComponent },
  { path: 'citas', component: AppointmentsComponent },
  { path: 'historial', component: HistoryComponent },
  { path: '**', redirectTo: 'inicio' }
];