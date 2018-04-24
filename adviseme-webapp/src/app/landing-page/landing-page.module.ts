import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';

import { LandingPageRoutingModule, routedComponents } from './landing-page-routing.module';

import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ThemeModule,
    LandingPageRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  exports: [
    RouterModule,
  ],
})
export class LandingPageModule { }
