import { Component, OnInit } from '@angular/core';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

@Component({
  selector: 'ngx-profile-preview',
  styleUrls: ['./profile-preview.component.scss'],
  templateUrl: './profile-preview.component.html',
})

export class ProfilePreviewComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe(res => this.currentUser = res);
  }
}
