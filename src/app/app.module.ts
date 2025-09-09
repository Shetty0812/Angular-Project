import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Needed for ngModel and ngForm
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';  // Move here
import { RegisterComponent } from './components/register/register.component';
import { ApplyLoanComponent } from './components/apply-loan/apply-loan.component';
import { AcknowledgementComponent } from './components/acknowledgement/acknowledgement.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';

 
 
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ApplyLoanComponent,
    AcknowledgementComponent,
    DashboardComponent,
    HomeComponent,
    ManagerLoginComponent,
    ManagerDashboardComponent,
    
       // <-- Add LoginComponent here (NOT in imports)
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule       // <-- Import FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }