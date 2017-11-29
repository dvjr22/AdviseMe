import { Component, OnInit } from '@angular/core';

import { User, Status } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

@Component({
  selector: 'ngx-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})


export class EditProfileComponent implements OnInit {
  status = Status;
  keys: any;
  currentUser: User;
  emailArray: any;
  emailBegin: string;
  emailEnding: string;

  constructor(private userService: UserService) {
    this.keys = Object.keys(this.status).filter(Number);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe((res: any) => {
          this.currentUser = res;
          this.emailArray = this.currentUser.email.split('@');
          this.emailBegin = this.emailArray[0];
          this.emailEnding = '@' + this.emailArray[1];
  });
  }

  onStatusChange(status) {
    this.currentUser.status = status;
  }

  update() {
    console.log(this.currentUser);
    this.currentUser.fullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    this.currentUser.email = this.emailBegin + this.emailEnding;
    this.userService.update(this.currentUser).subscribe();
    // router to Profile
  }
}
