import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import { CartProgressComponent } from './cart-progress/cart-progress.component';
import { CartComponent } from './cart/cart.component';
import { AppointmentViewComponent, CustomRenderComponent } from './view-appointment/appointment-view.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RequestClassesComponent } from './request-classes/request-classes.component';

import { CanActivateAdvisement } from '../../_shared/services/advisement.service';

const routes: Routes = [{
  path: '',
  component: StudentComponent,
  children: [{
    path: 'cart-progress',
    component: CartProgressComponent,
  }, {
    path: 'cart',
    canActivate: [CanActivateAdvisement],
    component: CartComponent,
  }, {
    path: 'view-appointment',
    component: AppointmentViewComponent,
  }, {
    path: 'appointment',
    component: AppointmentComponent,
  }, {
    path: 'request-classes',
    canActivate: [CanActivateAdvisement],
    component: RequestClassesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class StudentRoutingModule { }

export const routedComponents = [
  StudentComponent,
  CartProgressComponent,
  CartComponent,
  AppointmentViewComponent,
  AppointmentComponent,
  RequestClassesComponent,
  CustomRenderComponent,
];
