import { Component, OnInit } from '@angular/core';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

@Component({
  selector: 'ngx-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  currentUser: User;
  user: any = {};
  emailBegin: string;
  emailEnding: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var emailArray = this.currentUser.email.split("@");

    this.emailBegin = emailArray[0];
    this.emailEnding = "@" + emailArray[1];
  }

  update() {
    this.currentUser.fullName = this.currentUser.firstName + " " + this.currentUser.lastName;
    this.currentUser.email = this.emailBegin + this.emailEnding;
    this.userService.update(this.currentUser).subscribe();
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    //router to Profile
  }
}
