import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassesComponent } from './classes.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [{
  path: '',
  component: ClassesComponent,
  children: [{
    path: 'courses',
    component: CoursesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule { }

/**
  Classes and Children Components
*/
export const routedComponents = [
  ClassesComponent,
  CoursesComponent,
];
