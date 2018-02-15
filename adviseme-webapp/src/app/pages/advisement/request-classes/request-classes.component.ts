import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';


/**
 Component:
    For the requestclasses Creation Screen
*/
@Component({
  selector: 'ngx-app-request-classes',
  templateUrl: './request-classes.component.html',
  styleUrls: ['./request-classes.component.scss'],
})

export class RequestClassesComponent implements OnInit {
  /**
    User initialized from ngOnInit
  */
  currentUser: User;
  /**
    Variable to hold ISO date format from date picker
  */

  /**
    Initializes new names for the imports
  */
  constructor(private userService: UserService,
              protected router: Router) { }


  /**
      Get the current user from the local cache
      then calls api to get the users info
      @returns {none}
  */
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe(res => this.currentUser = res);
  }

}
