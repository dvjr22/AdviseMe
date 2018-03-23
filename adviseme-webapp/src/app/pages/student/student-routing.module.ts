import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import { CartProgressComponent } from './cart-progress/cart-progress.component';

const routes: Routes = [{
  path: '',
  component: StudentComponent,
  children: [{
    path: 'cart-progress',
    component: CartProgressComponent,
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
];
