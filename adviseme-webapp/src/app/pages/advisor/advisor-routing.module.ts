import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvisorComponent } from './advisor.component';
import { AllRequestsComponent } from './all-requests/all-requests.component';
import { AdvisorAppointmentsComponent } from './advisor-appointments/advisor-appointments.component';
import { CanActivateAdvisor } from '../../_shared/services/authentication.service';
import { StudentRequestComponent } from './student-requests/student-requests.component';

const routes: Routes = [{
  path: '',
  canActivate: [
    CanActivateAdvisor,
  ],
  component: AdvisorComponent,
  children: [{
    path: 'requests',
    component: AllRequestsComponent,
  } , {
    path: 'appointments',
    component: AdvisorAppointmentsComponent,
  } , {
    path: 'student-request/:id',
    component: StudentRequestComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdvisorRoutingModule { }

export const routedComponents = [
  AdvisorComponent,
  AllRequestsComponent,
  StudentRequestComponent,
  AdvisorAppointmentsComponent,
];
