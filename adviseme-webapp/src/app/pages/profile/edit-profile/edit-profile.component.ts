import { Component, OnInit } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../_shared/models/user';
import { Status, Universities } from '../../../_shared/models/constants';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

@Component({
  selector: 'ngx-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})


export class EditProfileComponent implements OnInit {
  universities = Universities;
  status = Status;
  keys: any;
  currentUser: User;
  emailArray: any;
  emailBegin: string;
  emailEnding: string;

  constructor(private userService: UserService,
              protected router: Router) {
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
  onUniversityChange(university) {
    this.currentUser.university = university;
  }

  update() {
    this.currentUser.email = this.emailBegin + this.emailEnding;
    this.userService.update(this.currentUser).subscribe();
    this.router.navigate(['pages/profile/profile-view']);
  }
}
