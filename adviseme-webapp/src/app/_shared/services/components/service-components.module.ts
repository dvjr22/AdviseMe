import { NgModule } from '@angular/core';
import { RefreshButtonComponent } from './refresh/refresh.component';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    RefreshButtonComponent,
  ],
  exports: [
    RefreshButtonComponent,
  ],
})
export class ServiceComponentModule { }
