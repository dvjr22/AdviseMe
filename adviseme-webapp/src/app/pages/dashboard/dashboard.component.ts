import { Component, OnInit } from '@angular/core';

import { User } from '../../_shared/models/user';
import { UserService } from '../../_shared/services/user.service';

/**
  Component:
    Dashboard for the user
*/
@Component({
  selector: 'ngx-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {
  /**
    Getting the current user
  */
  currentUser: User;
  role: any;

  /**
    Initializes new names for the imports
  */
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser()
        .subscribe(res => {
          this.currentUser = res;
          this.role = this.currentUser.role;
        },
        );
  }

  }
