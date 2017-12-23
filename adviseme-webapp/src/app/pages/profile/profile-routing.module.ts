import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

// Children Routes of the Profile

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [{
    path: 'profile-view',
    component: ProfileViewComponent,
  }, {
    path: 'edit-profile',
    component: EditProfileComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }

export const routedComponents = [
  ProfileComponent,
  EditProfileComponent,
  ProfileViewComponent,
];
