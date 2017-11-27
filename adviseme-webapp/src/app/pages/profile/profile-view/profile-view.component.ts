import { Component, OnInit } from '@angular/core';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

@Component({
  selector: 'ngx-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  currentUser: User;
  signedIn: boolean;
  pic: any = '';
  user: any = {};
  emailBegin: string;
  emailEnding: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.signedIn = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser) {
      this.signedIn = true;
    }

    var emailArray = this.currentUser.email.split("@");

    this.emailBegin = emailArray[0];
    this.emailEnding = "@" + emailArray[1];
  }
}
