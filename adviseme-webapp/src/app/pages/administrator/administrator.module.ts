import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AdministratorRoutingModule, routedComponents } from './administrator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdministratorRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdministratorModule { }
