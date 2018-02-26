import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateAdmin } from '../../_shared/services/authentication.service';
import { AdministratorComponent } from './administrator.component';
import { PermissionComponent } from './permission/permission.component';

const routes: Routes = [{
  path: '',
  canActivate: [
    CanActivateAdmin,
  ],
  component: AdministratorComponent,
  children: [{
    path: 'permission',
    component: PermissionComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdministratorRoutingModule { }

export const routedComponents = [
  AdministratorComponent,
  PermissionComponent,
];
