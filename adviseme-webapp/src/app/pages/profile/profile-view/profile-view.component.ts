import { Component, OnInit } from '@angular/core';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

@Component({
  selector: 'ngx-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  currentUser: User;
  emailArray: any;
  emailBegin: string;
  emailEnding: string;

  constructor(private userService: UserService) {
  }

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
