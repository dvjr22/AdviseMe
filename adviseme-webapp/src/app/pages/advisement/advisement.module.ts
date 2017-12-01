import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AdvisementRoutingModule, routedComponents } from './advisement-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdvisementRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdvisementModule { }
