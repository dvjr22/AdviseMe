import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Services
import { UserService } from './_shared/services/user.service';
import { AuthenticationService, CanActivateUser } from './_shared/services/authentication.service';
import { AlertService } from './_shared/services/alert.service';

// Models
import { User } from './_shared/models/user';

// Components
import { AppComponent } from './app.component';
import { AdvisementSignupComponent } from './pages/advisement-signup/advisement-signup.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { ClassInfoComponent } from './pages/class-info/class-info.component';
import { ClassListComponent } from './pages/class-list/class-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';

//Nebular
import { NbThemeModule } from '@nebular/theme';
import { AlertComponent } from './_shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvisementSignupComponent,
    AppointmentComponent,
    ClassInfoComponent,
    ClassListComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    LogoutComponent,
    AlertComponent
  ],
  imports: [
    NbThemeModule.forRoot({ name: 'default' }),
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
  ],
  providers: [
    UserService,
    AuthenticationService,
    CanActivateUser,
    User,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
