import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CanActivateAdmin } from '../_shared/services/authentication.service';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AdvisementComponent } from './advisement/advisement.component';

// Routing for the Pages

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
  },
  {
      path: 'classes',
      loadChildren: './classes/classes.module#ClassesModule',
  },
  {
    path: 'advisement',
    loadChildren: './advisement/advisement.module#AdvisementModule',
  },
  {
    path: 'class',
    loadChildren: './class/class.module#ClassModule',
  },
  {
    path: 'administrator',
    loadChildren: './administrator/administrator.module#AdministratorModule',
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
