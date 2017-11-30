import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';
import { PreviousClassesComponent } from './previous-classes/previous-classes.component';
@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ProfilePreviewComponent,
    PreviousClassesComponent,
  ],
})
export class DashboardModule { }
