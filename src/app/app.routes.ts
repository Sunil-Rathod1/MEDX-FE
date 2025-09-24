import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/sidebar/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FeaturesComponent } from './components/features/features.component';
import { CareunitComponent } from './components/careunit/careunit.component';
import { BedsComponent } from './components/beds/beds.component';
import { StafComponent } from './components/staff/staf.component';
import { FluidsComponent } from './components/fluids/fluids.component';
import { MedicationsComponent } from './components/medications/medications.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { routeGaurdGuard } from './routegaurds/route-gaurd.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'registration', component: RegistrationComponent },
  {
    path: 'features',
    component: FeaturesComponent,
    canActivate: [routeGaurdGuard],
  },
  {
    path: 'careunit',
    component: CareunitComponent,
    canActivate: [routeGaurdGuard],
  },
  { path: 'beds', component: BedsComponent, canActivate: [routeGaurdGuard] },
  { path: 'staff', component: StafComponent, canActivate: [routeGaurdGuard] },
  {
    path: 'fluids',
    component: FluidsComponent,
    canActivate: [routeGaurdGuard],
  },
  {
    path: 'medications',
    component: MedicationsComponent,
    canActivate: [routeGaurdGuard],
  },
  {
    path: 'hospital',
    component: HospitalComponent,
    canActivate: [routeGaurdGuard],
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
