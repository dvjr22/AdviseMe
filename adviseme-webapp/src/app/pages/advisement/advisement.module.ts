import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AdvisementRoutingModule, routedComponents } from './advisement-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GrowlModule } from 'primeng/growl';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdvisementRoutingModule,
    Ng2SmartTableModule,
    GrowlModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdvisementModule { }
