import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';
import { RequestClasses } from '../../../_shared/models/requestclasses';
import { RequestClassesService } from '../../../_shared/services/requestclasses.service';
import { NotificationService } from '../../../_shared/services/notification.service';
import { CapitalizePipe } from '../../../@theme/pipes/capitalize.pipe';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

/**
 Component:
    For the requestclasses Creation Screen
*/
@Component({
  selector: 'ngx-app-requestclasses',
  templateUrl: './requestclasses.component.html',
  styleUrls: ['./requestclasses.component.scss'],
})

export class requestclassesComponent implements OnInit {
  /**
    User initialized from ngOnInit
  */
  currentUser: User;
  /**
    Blank requestclasses
  */
  newrequestclasses: requestclasses = new requestclasses();
  /**
    Variable to hold ISO date format from date picker
  */
  model;

  /**
    Initializes new names for the imports
  */
  constructor(private userService: UserService,
              private requestclassesService: requestclassesService,
              private ngbDateParserFormatter: NgbDateParserFormatter,
              protected router: Router,
              private notificationService: NotificationService) { }


  /**
      Get the current user from the local cache
      then calls api to get the users info
      @returns {none}
  */
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe(res => this.currentUser = res);
  }

  /**
    Calls requestclasses api to create new requestclasses
    @returns {none}
  */
  onSubmit() {
    this.newrequestclasses.studentID = this.currentUser.studentID;
    this.newrequestclasses.firstName = this.currentUser.firstName;
    this.newrequestclasses.lastName = this.currentUser.lastName;
    this.newrequestclasses.major = this.currentUser.major.toString();
    this.newrequestclasses.status = this.currentUser.status.toString();
    // have to use a formatter because ng date picker uses ISO format instead of the standard date format
    this.newrequestclasses.date = new Date(this.ngbDateParserFormatter.format(this.model));
    this.requestclassesService.create(this.newrequestclasses).subscribe();
    this.notificationService.sendNotification(JSON.stringify(this.newrequestclasses));
    this.router.navigate(['pages/advisement/view-requestclasses']);
  }

}
