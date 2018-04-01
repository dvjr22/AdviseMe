import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AdvisementRoutingModule, routedComponents } from './advisement-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GrowlModule } from 'primeng/growl';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from '../../_shared/services/chat.service';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdvisementRoutingModule,
    Ng2SmartTableModule,
    GrowlModule,
  ],
  providers: [
    ChatService,
  ],
  declarations: [
    ...routedComponents,
    ChatComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AdvisementModule { }
