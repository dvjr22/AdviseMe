
import { Component } from '@angular/core';
import { UserService } from '../_shared/services/user.service';

import { MENU_ITEMS, ADMIN_ITEMS } from './pages-menu';

/**
  Component:
    For base pages layout mainly for naviagation menu
*/
@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  /**
    Navigation bar menu
  */
  menu = MENU_ITEMS;
  constructor(private userService: UserService) {
    // Change the menu based off the role of the user
    if (sessionStorage.getItem('currentUser') !== null) {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.userService.getById(currentUser._id).subscribe((res) => {
        switch (res.role) {
          case 'admin':
            // User is an admin
            this.menu = ADMIN_ITEMS;
            break;
          default:
            // User is anything that isn't defined above
            this.menu = MENU_ITEMS;
        }
      });
    }
  }
}
