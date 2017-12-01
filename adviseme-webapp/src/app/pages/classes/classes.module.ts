import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ClassesRoutingModule, routedComponents } from './classes-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ClassesRoutingModule,
    CKEditorModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ClassesModule { }
