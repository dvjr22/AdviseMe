import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule, routedComponents } from './administrator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdministratorRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AdministratorModule { }
