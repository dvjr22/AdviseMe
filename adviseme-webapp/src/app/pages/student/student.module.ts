import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GrowlModule } from 'primeng/growl';
import { CartProgressComponent } from './cart-progress/cart-progress.component';
import { StudentRoutingModule, routedComponents } from './student-routing.module';
import { CartService } from '../../_shared/services/cart.service';
import { ServiceComponentModule } from '../../_shared/services/components/service-components.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    GrowlModule,
    StudentRoutingModule,
    ServiceComponentModule,
  ],
  declarations: [
    ...routedComponents,
    CartProgressComponent,
  ],
  providers: [
    CartService,
  ],
})

export class StudentModule { }
