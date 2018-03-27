import { Component, OnInit } from '@angular/core';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

import { MessageService } from 'primeng/components/common/messageservice';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

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


  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo' });

  /**
    Initializes new names for the imports
  */
  constructor(private userService: UserService,
    private messageService: MessageService) {
  }
  /**
    Gets the currents users id from the local cache then uses the user service
    to get the users information
  */
  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userService.getCurrentUser()
        .subscribe(res => {
          this.currentUser = res;
          this.emailArray = this.currentUser.email.split('@');
          this.emailBegin = this.emailArray[0];
          this.emailEnding = '@' + this.emailArray[1];
  });

    // File Upload stuff
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const r = response.split('/')[1];
      this.currentUser.profilePicture = r;
      this.userService.update(this.currentUser);
      this.messageService.add({severity: 'success',
        summary: 'Succesful Upload',
        detail: 'Successfully uploaded a new profile picture'});
    };
  }

  updatePhoneNumber(event) {
    this.currentUser.phoneNumber = this.values;
    this.userService.update(this.currentUser);
    this.messageService.add({severity: 'success',
      summary: 'Successful Update',
      detail: 'Successfully updated your phone number to ' + this.values});
  }
  values = '';
  onKey(event: any) { // without type info
    this.values = event.target.value;
  }

}
