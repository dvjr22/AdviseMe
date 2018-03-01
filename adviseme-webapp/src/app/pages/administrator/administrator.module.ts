import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CanActivateAdmin } from '../../_shared/services/authentication.service';

import { AdministratorRoutingModule, routedComponents } from './administrator-routing.module';
import { EditcoursesComponent } from './editcourses/editcourses.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdministratorRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    EditcoursesComponent,
  ],
  providers: [
    CanActivateAdmin,
  ],
})
export class AdministratorModule { }
