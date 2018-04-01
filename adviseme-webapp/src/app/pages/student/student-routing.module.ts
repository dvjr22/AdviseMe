import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import { CartProgressComponent } from './cart-progress/cart-progress.component';
import { CartComponent } from './cart/cart.component';
import { AppointmentViewComponent } from './view-appointment/appointment-view.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [{
  path: '',
  component: StudentComponent,
  children: [{
    path: 'cart-progress',
    component: CartProgressComponent,
  }, {
    path: 'cart',
    component: CartComponent,
  }, {
    path: 'view-appointment',
    component: AppointmentViewComponent,
  }, {
    path: 'appointment',
    component: AppointmentComponent,
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
];
