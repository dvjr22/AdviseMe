import { Component, OnInit } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../_shared/models/user';
import { Status, Universities } from '../../../_shared/models/constants';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

/**
  Component:
    For the future classes that the user is in
*/
@Component({
  selector: 'ngx-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})


export class EditProfileComponent implements OnInit {
  /**
    Const Array of universities
  */
  universities = Universities;
  /**
    Const Enum of Status
  */
  status = Status;
  /**
    keys from status enum
  */
  keys: any;
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
  constructor(private userService: UserService,
              protected router: Router) {
    this.keys = Object.keys(this.status).filter(Number);
  }

  /**
    Gets the currents users id from the local cache then uses the user service
    to get the users information
  */
  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe((res: any) => {
          this.currentUser = res;
          this.emailArray = this.currentUser.email.split('@');
          this.emailBegin = this.emailArray[0];
          this.emailEnding = '@' + this.emailArray[1];
  });
  }

  /**
    When the users selects a new status it changes

    TODO: Alow only Advisors or Admins to change
  */
  onStatusChange(status) {
    this.currentUser.status = status;
  }

  /**
    When the users selects a new university it changes

    TODO: Allow only Advisors or Admins to change
  */
  onUniversityChange(university) {
    this.currentUser.university = university;
  }

  /**
    Updates the user upon the button click
  */
  update() {
    this.currentUser.email = this.emailBegin + this.emailEnding;
    this.userService.update(this.currentUser).subscribe();
    this.router.navigate(['pages/profile/profile-view']);
  }
}
