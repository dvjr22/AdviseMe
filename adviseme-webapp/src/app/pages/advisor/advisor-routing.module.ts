import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvisorComponent } from './advisor.component';
import { RequestsComponent } from './requests/requests.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CanActivateAdvisor } from '../../_shared/services/authentication.service';
import { RequestsClassComponent } from './requests-class/requests-class.component';

const routes: Routes = [{
  path: '',
  canActivate: [
    CanActivateAdvisor,
  ],
  component: AdvisorComponent,
  children: [{
    path: 'requests',
    component: RequestsComponent,
  } , {
    path: 'appointments',
    component: AppointmentsComponent,
  } , {
    path: 'requests-class/:id',
    component: RequestsClassComponent,
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
