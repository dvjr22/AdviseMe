import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
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
import { AuthenticationService, CanActivateUser } from './_shared/services/authentication.service';
import { AlertService } from './_shared/services/alert.service';

// Models
import { User } from './_shared/models/user';

@NgModule({
  declarations: [
    AppComponent,
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
        }
      }
    }),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    UserService,
    AuthenticationService,
    CanActivateUser,
    User,
    AlertService,
    NbAuthService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
