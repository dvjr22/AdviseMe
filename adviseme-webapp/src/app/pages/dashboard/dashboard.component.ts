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
    Content for the tutorial cards
  */
  items = [
    {
      'header': 'Welcome',
      'content': `Welcome to AdviseMe! A web app that
                  will assists college students through
                  the majority of advising requirements
                  while in pursuit of a degree.`,
    },
    {
      'header': 'Class Requests',
      'content': `The Class Requests system allows you to
                  add classes to your cart. After you get
                  all the classes you want to take
                  submit the cart to your advisor for their
                  approval. They may send back recommendations
                  for changes so check back until you hear
                  from them. To get started click on the requests
                  section of the menu or the 'Full Course List'
                  button on the dashboard`,
    },
    {
      'header': 'Advisor Communication',
      'content': `If you need to communicate with your advisor
                  you can schedule an appointment or instant message
                  on the Advisement tab`,
    },
    {
      'header': 'SMS Notifications',
      'content': `On the profile view screen you can opt in to get
                  SMS notifications to help keep you up to date on
                  your advisement status`,
    },
  ];
  // Index of which of the items above is shown
  index = 0;
  // Flag for if the tutorial will show up or not
  tutorialEnabled = true;

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

          if (this.currentUser.tutorialEnabled !== undefined) {
            this.tutorialEnabled = this.currentUser.tutorialEnabled;
          }
        },
        );
  }


  /**
    Cycles the tutorial text
  */
  openNext() {
        this.index ++;
    }


  /**
    Closes the tutorial
  */
  finish() {
    this.tutorialEnabled = false;

    this.currentUser.tutorialEnabled = false;
    this.userService.update(this.currentUser).subscribe();
  }

  }
