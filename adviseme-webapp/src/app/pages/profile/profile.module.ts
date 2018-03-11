import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { ProfileRoutingModule, routedComponents } from './profile-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { GrowlModule } from 'primeng/growl';

@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    Ng2SmartTableModule,
    GrowlModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ProfileModule { }
