import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvisementSignupComponent } from './pages/advisement-signup/advisement-signup.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { ClassInfoComponent } from './pages/class-info/class-info.component';
import { ClassListComponent } from './pages/class-list/class-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { CanActivateUser } from './services/authentication.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [CanActivateUser]},
  { path: 'advisement-signup', component: AdvisementSignupComponent, canActivate: [CanActivateUser]},
  { path: 'appointment', component: AppointmentComponent, canActivate: [CanActivateUser]},
  { path: 'class-info/:id:', component: ClassInfoComponent, canActivate: [CanActivateUser]},
  { path: 'class-list', component: ClassListComponent, canActivate: [CanActivateUser]},
  { path: 'dashboard',  component: DashboardComponent, canActivate: [CanActivateUser]},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [CanActivateUser]},
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
