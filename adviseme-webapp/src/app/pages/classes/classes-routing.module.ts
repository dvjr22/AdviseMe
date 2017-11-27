import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassesComponent } from './classes.component';
import { TinyMCEComponent } from './tiny-mce/tiny-mce.component';
import { CKEditorComponent } from './ckeditor/ckeditor.component';

const routes: Routes = [{
  path: '',
  component: ClassesComponent,
  children: [{
    path: 'tinymce',
    component: TinyMCEComponent,
  }, {
    path: 'ckeditor',
    component: CKEditorComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule { }

export const routedComponents = [
  ClassesComponent,
  TinyMCEComponent,
  CKEditorComponent,
];
