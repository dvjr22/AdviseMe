import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { CartComponent } from './cart.component';
import { CartService } from '../../_shared/services/cart.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GrowlModule } from 'primeng/growl';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    GrowlModule,
  ],
  declarations: [CartComponent],
  providers: [
    CartService,
  ],
})
export class CartModule { }
