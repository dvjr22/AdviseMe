import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdvisementSignupComponent } from './pages/advisement-signup/advisement-signup.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { ClassInfoComponent } from './pages/class-info/class-info.component';
import { ClassListComponent } from './pages/class-list/class-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AdvisementSignupComponent,
    AppointmentComponent,
    ClassInfoComponent,
    ClassListComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
