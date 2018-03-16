import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { ProfileRoutingModule, routedComponents } from './profile-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { GrowlModule } from 'primeng/growl';

import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    Ng2SmartTableModule,
    GrowlModule,
  ],
  declarations: [
    ...routedComponents,
    FileSelectDirective,
  ],
})
export class ProfileModule { }
