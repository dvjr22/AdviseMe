import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NbAuthComponent } from '@nebular/auth';
import { NbAuthBlockComponent } from './@theme/components/auth/components/auth-block/auth-block.component';
import { NbLoginComponent } from './@theme/components/auth/components/login/login.component';
import { NbRegisterComponent } from './@theme/components/auth/components/register/register.component';
import { NbLogoutComponent } from './@theme/components/auth/components/logout/logout.component';
import { NbRequestPasswordComponent } from './@theme/components/auth/components/request-password/request-password.component';
import { NbResetPasswordComponent } from './@theme/components/auth/components/reset-password/reset-password.component';

// Services
import { UserService } from './_shared/services/user.service';
import { CanActivateUser } from './_shared/services/authentication.service';
import { CanActivateAdmin } from './_shared/services/authentication.service';
import { AlertService } from './_shared/services/alert.service';

// Main Routes

const routes: Routes = [
    {
      path: 'auth',
      component: NbAuthComponent,
      children: [
        {
          path: 'login',
          component: NbLoginComponent,
        },
        {
          path: 'register',
          component: NbRegisterComponent,
        },
        {
          path: 'logout',
          component: NbLogoutComponent,
        },
        {
          path: 'request-password',
          component: NbRequestPasswordComponent,
        },
        {
          path: 'reset-password',
          component: NbResetPasswordComponent,
        },
      ],
    },
  { path: 'pages', canActivate: [CanActivateUser], loadChildren: 'app/pages/pages.module#PagesModule'},
  { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: '/pages/dashboard' },
];

/**
  Extra configuration options for the Router
*/
const config: ExtraOptions = {
  /**
    Do not use the hashtag in the url
  */
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
