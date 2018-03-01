import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorComponent } from './advisor.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

import { AdvisorRoutingModule, routedComponents } from './advisor-routing.module';
import { RequestsComponent } from './requests/requests.component';
import { AppointmentsComponent } from './appointments/appointments.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    AdvisorRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdvisorModule { }
