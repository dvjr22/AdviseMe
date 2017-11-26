import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';

import { ClassesRoutingModule, routedComponents } from './classes-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ClassesRoutingModule,
    CKEditorModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ClassesModule { }
