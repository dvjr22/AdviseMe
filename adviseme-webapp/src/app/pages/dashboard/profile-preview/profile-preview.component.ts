import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-profile-preview',
  styleUrls: ['./profile-preview.component.scss'],
  templateUrl: './profile-preview.component.html',
})

export class ProfilePreviewComponent implements OnInit {

  user: any;

  constructor(private userService: UserService,) {
  }

  ngOnInit() {

    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.joe);
  }
}
