import { Component, OnInit } from '@angular/core';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

/**
  Component:
    Allows a user to look at an overview of their profile
*/
@Component({
  selector: 'ngx-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  /**
    Getting the current user
  */
  currentUser: User;
  /**
    Array to split email by @
  */
  emailArray: any;
  /**
    Email before the @
  */
  emailBegin: string;
  /**
    Email starting at the @
  */
  emailEnding: string;

  /**
    Initializes new names for the imports
  */
  constructor(private userService: UserService) {
  }

  /**
    Gets the currents users id from the local cache then uses the user service
    to get the users information
  */
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe(res => {
          this.currentUser = res;
          this.emailArray = this.currentUser.email.split('@');
          this.emailBegin = this.emailArray[0];
          this.emailEnding = '@' + this.emailArray[1];
  });
  }
}
