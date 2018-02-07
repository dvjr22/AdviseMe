import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvisementComponent } from './advisement.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentViewComponent } from './view-appointment/appointment-view.component';

const routes: Routes = [{
  path: '',
  component: AdvisementComponent,
  children: [{
    path: 'appointment',
    component: AppointmentComponent,
  }, {
    path: 'view-appointment',
    component: AppointmentViewComponent,
  }],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdvisementRoutingModule { }

/**
  Advisment and Children Components
*/
export const routedComponents = [
  AdvisementComponent,
  AppointmentComponent,
  AppointmentViewComponent,
];
