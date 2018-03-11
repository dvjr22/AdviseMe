import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorComponent } from './advisor.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

import { AdvisorRoutingModule, routedComponents } from './advisor-routing.module';
import { AllRequestsComponent } from './all-requests/all-requests.component';
import { AdvisorAppointmentsComponent } from './advisor-appointments/advisor-appointments.component';

import { CanActivateAdvisor } from '../../_shared/services/authentication.service';
import { StudentRequestComponent } from './student-requests/student-requests.component';

import { GrowlModule } from 'primeng/growl';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    AdvisorRoutingModule,
    GrowlModule,
  ],
  declarations: [
    ...routedComponents,
    StudentRequestComponent,
  ],
  providers: [
    CanActivateAdvisor,
  ],
})
export class AdvisorModule { }
