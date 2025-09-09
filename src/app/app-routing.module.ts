import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ApplyLoanComponent } from './components/apply-loan/apply-loan.component';
import { AcknowledgementComponent } from './components/acknowledgement/acknowledgement.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ManagerGuard } from './guards/manager.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },  // Fixed duplicate empty path
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manager-login', component: ManagerLoginComponent },  // ✅ Added manager login route
  { path: 'apply-loan', component: ApplyLoanComponent },
  { path: 'acknowledgement', component: AcknowledgementComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manager-dashboard', component: ManagerDashboardComponent },
   // ✅ Protected routes:
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
   { path: 'apply-loan', component: ApplyLoanComponent, canActivate: [AuthGuard] },
   { path: 'manager-dashboard', component: ManagerDashboardComponent, canActivate: [ManagerGuard] },
 
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
