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
import { AdvisorChatListComponent } from './advisor-chat-list/advisor-chat-list.component';

import { ServiceComponentModule } from '../../_shared/services/components/service-components.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    AdvisorRoutingModule,
    GrowlModule,
    ServiceComponentModule,
  ],
  declarations: [
    ...routedComponents,
    StudentRequestComponent,
    AdvisorChatListComponent,
  ],
  providers: [
    CanActivateAdvisor,
  ],
})
export class AdvisorModule { }
