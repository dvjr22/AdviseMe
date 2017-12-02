import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassesComponent } from './classes.component';

const routes: Routes = [{
  path: '',
  component: ClassesComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule { }

export const routedComponents = [
  ClassesComponent,

];
