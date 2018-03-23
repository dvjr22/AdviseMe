import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GrowlModule } from 'primeng/growl';
import { CartProgressComponent } from './cart-progress/cart-progress.component';
import { StudentRoutingModule, routedComponents } from './student-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    GrowlModule,
    StudentRoutingModule,
  ],
  declarations: [
    ...routedComponents,
    CartProgressComponent,
  ],
})

export class StudentModule { }
