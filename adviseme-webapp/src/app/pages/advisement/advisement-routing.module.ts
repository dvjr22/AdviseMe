import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvisementComponent } from './advisement.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [{
  path: '',
  component: AdvisementComponent,
  children: [{
    path: 'appointment',
    component: AppointmentComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvisementRoutingModule { }

export const routedComponents = [
  AdvisementComponent,
  AppointmentComponent,
];
