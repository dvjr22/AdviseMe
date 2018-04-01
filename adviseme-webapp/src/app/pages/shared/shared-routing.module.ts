import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ChatComponent } from './chat/chat.component';
import { SharedComponent } from './shared.component';
// Children Routes of the Profile

const routes: Routes = [{
  path: '',
  component: SharedComponent,
  children: [{
    path: 'profile-view',
    component: ProfileViewComponent,
  }, {
    path: 'chat',
    component: ChatComponent,
  }, {
    path: 'chat/:index',
    component: ChatComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }

/**
  Profile and Children Components
*/
export const routedComponents = [
  SharedComponent,
  ProfileViewComponent,
];
