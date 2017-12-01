import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { AdvisementRoutingModule, routedComponents } from './advisement-routing.module';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdvisementRoutingModule,
  ],
  declarations: [
    ...routedComponents,
    AppointmentViewComponent,
  ],
})
export class AdvisementModule { }
