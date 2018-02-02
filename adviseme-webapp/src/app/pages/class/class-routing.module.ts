import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassComponent } from './class.component';
import { ClassViewComponent } from './class-view/class-view.component';

// Children Routes of the class

const routes: Routes = [{
  path: '',
  component: ClassComponent,
  children: [{
    path: 'class-view',
    component: ClassViewComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassRoutingModule { }

/**
  class and Children Components
*/
export const routedComponents = [
  ClassComponent,
  ClassViewComponent,
];
