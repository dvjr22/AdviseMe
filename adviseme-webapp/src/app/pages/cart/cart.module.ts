import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { CartComponent } from './cart.component';
import { CartService } from '../../_shared/services/cart.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule, ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule,
  ],
  declarations: [CartComponent],
  providers: [
    CartService,
    ToasterService,
  ],
})
export class CartModule { }
