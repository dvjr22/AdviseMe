import { Component, OnInit } from '@angular/core';

import { User } from '../../../_shared/models/user';
import { Class } from '../../../_shared/models/class';
import { UserService } from '../../../_shared/services/user.service';
import { ClassService } from '../../../_shared/services/class.service';

@Component({
  selector: 'ngx-profile-preview',
  styleUrls: ['./profile-preview.component.scss'],
  templateUrl: './profile-preview.component.html',
})

export class ProfilePreviewComponent implements OnInit {

  currentUser: User;
  classes: any;

  constructor(private userService: UserService,
              private classService: ClassService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe(res => this.currentUser = res);
    this.classService.getClasses()
      .subscribe(res => {
        this.classes = res;
      });
  }
}
