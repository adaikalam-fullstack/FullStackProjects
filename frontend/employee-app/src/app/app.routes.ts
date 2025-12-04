import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeComponent }
];
