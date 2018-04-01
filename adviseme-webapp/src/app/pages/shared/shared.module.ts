import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { ProfileRoutingModule, routedComponents } from './shared-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { FileSelectDirective } from 'ng2-file-upload';
import { ChatComponent } from './chat/chat.component';

import { ChatService } from '../../_shared/services/chat.service';

@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    FileSelectDirective,
    ChatComponent,
  ],
  providers: [
    ChatService,
  ],
})
export class SharedModule { }
