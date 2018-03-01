import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvisorComponent } from './advisor.component';
import { RequestsComponent } from './requests/requests.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [{
  path: '',
  component: AdvisorComponent,
  children: [{
    path: 'requests',
    component: RequestsComponent,
  } , {
    path: 'appointments',
    component: AppointmentsComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdvisorRoutingModule { }

export const routedComponents = [
  AdvisorComponent,
  RequestsComponent,
  AppointmentsComponent,
];
