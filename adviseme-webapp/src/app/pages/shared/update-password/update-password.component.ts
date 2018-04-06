import { Component, OnInit } from '@angular/core';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'ngx-profile-view',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  password: string;
  confirmPassword: string;

  disableButton = true;
  showText = false;

  sessionUser: string;
  currentUser: User;

  constructor( private userService: UserService,
              private messageService: MessageService) {

  }
  ngOnInit() {
    this.sessionUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userService.getCurrentUser()
        .subscribe(res => {
          this.currentUser = res;
        });

  }

  submit() {
    this.currentUser.password = this.password;
    try {
      this.userService.update(this.currentUser).subscribe();
    } catch (e) {
      this.messageService.add({severity: 'error', summary: 'Failed Password Change', detail: 'Error changing password'});
    } finally {
      this.messageService.add({severity: 'success', summary: 'Changed Password', detail: 'Successfully changed your password'});
    }
  }

  compare() {
    if (this.password === this.confirmPassword) {
      this.disableButton = false;
      this.showText = false;
    } else {
      this.disableButton = true;
      if (this.confirmPassword.length > 0) {
        this.showText = true;
      }
    }
  }
}
