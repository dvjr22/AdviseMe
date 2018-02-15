import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AdministratorRoutingModule, routedComponents } from './administrator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdministratorRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdministratorModule { }
