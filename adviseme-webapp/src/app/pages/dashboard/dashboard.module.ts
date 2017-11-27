import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';
@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ProfilePreviewComponent,
  ],
})
export class DashboardModule { }
