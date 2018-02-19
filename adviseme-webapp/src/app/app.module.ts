import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbAuthService, NbAuthResult  } from '@nebular/auth';

import { NbAuthModule } from './@theme/components/auth/auth.module';
import { NbEmailPassAuthProvider } from './@theme/components/auth/providers/email-pass-auth.provider';

import { NbAuthComponent } from './@theme/components/auth/components/auth.component';
import { NbAuthBlockComponent } from './@theme/components/auth/components/auth-block/auth-block.component';
import { NbLoginComponent } from './@theme/components/auth/components/login/login.component';
import { NbRegisterComponent } from './@theme/components/auth/components/register/register.component';
import { NbLogoutComponent } from './@theme/components/auth/components/logout/logout.component';
import { NbRequestPasswordComponent } from './@theme/components/auth/components/request-password/request-password.component';
import { NbResetPasswordComponent } from './@theme/components/auth/components/reset-password/reset-password.component';

// Services
import { UserService } from './_shared/services/user.service';
import { RegisterService } from './_shared/services/register.service';
import { ClassService } from './_shared/services/class.service';
import { AppointmentService } from './_shared/services/appointment.service';
import { AuthenticationService, CanActivateUser } from './_shared/services/authentication.service';
import { AlertService } from './_shared/services/alert.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { NotificationService } from './_shared/services/notification.service';
import { ClassViewRenderComponent } from './_shared/services/class-view.render.component';

// Models
import { User } from './_shared/models/user';
import { Class } from './_shared/models/class';

// Import images

@NgModule({
  declarations: [
    AppComponent,
    ClassViewRenderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {},
        },
      },
    }),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

  ],
  bootstrap: [AppComponent],
  providers: [
    RegisterService,
    UserService,
    ClassService,
    AppointmentService,
    AuthenticationService,
    CanActivateUser,
    User,
    Class,
    AlertService,
    NbAuthService,
    ToasterService,
    NotificationService,
  ],
  entryComponents: [ClassViewRenderComponent ] ,
})
export class AppModule {
}
