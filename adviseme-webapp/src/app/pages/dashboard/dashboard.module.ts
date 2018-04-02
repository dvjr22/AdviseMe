import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';

import { PreviousClassesComponent } from './student/previous-classes/previous-classes.component';
import { CurrentClassesComponent } from './student/current-classes/current-classes.component';
import { FutureClassesComponent } from './student/future-classes/future-classes.component';

import { UnderlingsComponent } from './advisor/underlings/underlings.component';
import { StudentlistComponent } from './advisor/student-list/student-list.component';

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
    CurrentClassesComponent,
    FutureClassesComponent,
    UnderlingsComponent,
    StudentlistComponent,
  ],
})
export class DashboardModule { }
