
import { Component } from '@angular/core';
import { UserService } from '../_shared/services/user.service';
import { AdvisementService, CanActivateAdvisement } from '../_shared/services/advisement.service';

import { MENU_ITEMS, ADMIN_ITEMS, ADVISOR_ITEMS, ADVISED_STUDENTS_ITEMS } from './pages-menu';

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
  constructor(private userService: UserService,
              private advisementService: AdvisementService,
              private canActivateAdvisement: CanActivateAdvisement) {
    // Change the menu based off the role of the user
      this.userService.getCurrentUser().subscribe((res) => {
        switch (res.role) {
          case 'admin':
            // User is an admin
            this.menu = ADMIN_ITEMS;
            break;
          case 'advisor':
            // User is an advisor
            this.menu = ADVISOR_ITEMS;
            break;
          default:
            // User is anything that isn't defined above
          this.advisementService.checkAdvisedSemester().subscribe(unAdvised => {
            if (unAdvised === false) {
              this.menu = ADVISED_STUDENTS_ITEMS;
            } else {
              this.menu = MENU_ITEMS;
            }
          });

        }
      });
  }
}
