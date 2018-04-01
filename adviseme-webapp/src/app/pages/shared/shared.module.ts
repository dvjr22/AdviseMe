import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { ProfileRoutingModule, routedComponents } from './shared-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    FileSelectDirective,
  ],
})
export class SharedModule { }
