import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvisorComponent } from './advisor.component';
import { AllRequestsComponent } from './all-requests/all-requests.component';
import { AdvisorAppointmentsComponent } from './advisor-appointments/advisor-appointments.component';
import { CanActivateAdvisor } from '../../_shared/services/authentication.service';
import { StudentRequestComponent } from './student-requests/student-requests.component';
import { AdvisorChatListComponent } from './advisor-chat-list/advisor-chat-list.component';
import { CoursesComponent } from './courses/courses.component';


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
  } , {
    path: 'advisor-chat-list',
    component: AdvisorChatListComponent,
  } , {
    path: 'courses',
    component: CoursesComponent,
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
