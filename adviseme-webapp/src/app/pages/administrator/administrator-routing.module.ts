import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorComponent } from './administrator.component';
import { PermissionComponent } from './permission/permission.component';

const routes: Routes = [{
  path: '',
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
