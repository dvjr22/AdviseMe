import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateAdmin } from '../../_shared/services/authentication.service';
import { AdministratorComponent } from './administrator.component';
import { EditcoursesComponent } from './editcourses/editcourses.component';
import { PermissionComponent } from './permission/permission.component';
import { CartResetComponent } from './cart-reset/cart-reset.component';
import { BlockchainRequestsComponent } from './blockchain-requests/blockchain-requests.component';

const routes: Routes = [{
  path: '',
  canActivate: [
    CanActivateAdmin,
  ],
  component: AdministratorComponent,
  children: [{
    path: 'permission',
    component: PermissionComponent,
  },
  {
    path: 'editcourses',
    component: EditcoursesComponent,
  },
  {
    path: 'cartreset',
    component: CartResetComponent,
  },
  {
    path: 'approved-carts',
    component: BlockchainRequestsComponent,
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
  CartResetComponent,
  BlockchainRequestsComponent,
];
