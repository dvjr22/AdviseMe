import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { ClassRoutingModule, routedComponents } from './class-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    ThemeModule,
    ClassRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ClassModule { }
