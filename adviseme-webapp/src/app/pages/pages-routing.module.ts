import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CanActivateAdmin } from '../_shared/services/authentication.service';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Routing for the Pages

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
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
    path: 'advisor',
    loadChildren: './advisor/advisor.module#AdvisorModule',
  },
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule',
  },
  {
    path: 'shared',
    loadChildren: './shared/shared.module#SharedModule',
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
