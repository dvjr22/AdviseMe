import { Component, OnInit } from '@angular/core';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';
import { CacheService, CacheKeys } from '../../../_shared/services/cache.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

import { MessageService } from 'primeng/components/common/messageservice';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Router } from '@angular/router';

const URL = '/upload';
/**
  Component:
    Allows a user to look at an overview of their profile
*/
@Component({
  selector: 'ngx-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  /**
    Getting the current user
  */
  currentUser: User;
  /**
    Array to split email by @
  */
  emailArray: any;
  /**
    Email before the @
  */
  emailBegin: string;
  /**
    Email starting at the @
  */
  emailEnding: string;
  /**
    Phone Number
  */
  phoneNumber: string;

  /**
    SMS Opt In Flag
  */
  smsChecked = false;


  /**
    Flag for if the screen is a phone
  */
  isMobile = false;

  advisorName: string;


  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo' });

  /**
    Initializes new names for the imports
  */
  constructor(private userService: UserService,
    private messageService: MessageService,
    private cacheService: CacheService,
    private router: Router) {
  }
  /**
    Gets the currents users id from the local cache then uses the user service
    to get the users information
  */
  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.cacheService.get(CacheKeys.currentUser, this.userService.getCurrentUser())
        .subscribe(res => {
          this.currentUser = res;
          this.emailArray = this.currentUser.email.split('@');
          this.emailBegin = this.emailArray[0];
          this.emailEnding = '@' + this.emailArray[1];
          this.userService.getById(this.currentUser.advisor).subscribe((user) => {
            this.advisorName = user.firstName + ' ' + user.lastName;
          });
        });

    // File Upload stuff
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const r = response.split('/')[1];

      this.currentUser.profilePicture = r;
      this.userService.update(this.currentUser).subscribe(() => {});
      this.messageService.add({severity: 'success',
        summary: 'Succesful Upload',
        detail: 'Successfully uploaded a new profile picture'});
    };

    if (window.screen.width <= 360) {
      this.isMobile = true;
    }
  }

  /**
    Updates the phone number of the user
  **/
  updatePhoneNumber(event) {
    this.phoneNumber = this.values;
    for (let i = 0; i < this.values.length; i++) {
      this.values = this.values.replace('-', '');
    }
    if (this.values !== '' && this.values.length === 10) {
      this.currentUser.phoneNumber = this.values;
      this.userService.update(this.currentUser).subscribe(() => {});
      this.messageService.add({severity: 'success',
        summary: 'Successful Update',
        detail: 'Successfully updated your phone number to ' + this.phoneNumber});
    } else {
      this.messageService.add({severity: 'error',
        summary: 'Failed to Update',
        detail: 'Failed to update your phone number to ' + this.phoneNumber});
    }
  }
  values = '';
  onKey(event: any) { // without type info
    this.values = event.target.value;
  }

  redoTutorial(event) {
    this.currentUser.tutorialEnabled = true;
    this.userService.update(this.currentUser).subscribe(() => {});
    this.router.navigate(['/']);
  }

}
