import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PetFormComponent } from './features/pets/pet-form.component';
import { AppointmentsComponent } from './features/appointments/appointments.component';
import { HistoryComponent } from './features/history/history.component';
import { ClientPortalComponent } from './features/client/client-portal.component';
import { DoctorPortalComponent } from './features/doctor/doctor-portal.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: DashboardComponent },
  { path: 'citas', component: AppointmentsComponent },
  { path: 'mascotas/nuevo', component: PetFormComponent },
  { path: 'historial', component: HistoryComponent },
  { path: 'client-portal', component: ClientPortalComponent },
  { path: 'doctor-portal', component: DoctorPortalComponent },
  { path: '**', redirectTo: 'login' }
];