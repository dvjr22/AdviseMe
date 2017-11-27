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
  signedIn: boolean;
  pic: any = '';
  user: any = {};
  emailBegin: string;
  emailEnding: string;

  fileToUpload: File;

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

  update() {
    this.currentUser.email = this.emailBegin + this.emailEnding;
    this.userService.update(this.currentUser).subscribe();
  }
}
