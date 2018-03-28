import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';
import { NotificationService } from '../../../_shared/services/notification.service';
import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/components/common/messageservice';

/**
 Component:
    For the Appointment Creation Screen
*/
@Component({
  selector: 'ngx-app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})

export class AppointmentComponent implements OnInit {
  /**
    User initialized from ngOnInit
  */
  currentUser: User;
  /**
    Blank appointment
  */
  newAppointment: Appointment = new Appointment();
  /**
    Variable to hold ISO date format from date picker
  */
  model;

  /**
    Initializes new names for the imports
  */
  constructor(private userService: UserService,
              private appointmentService: AppointmentService,
              private ngbDateParserFormatter: NgbDateParserFormatter,
              protected router: Router,
              private notificationService: NotificationService,
              private messageService: MessageService) { }


  /**
      Get the current user from the local cache
      then calls api to get the users info
      @returns {none}
  */
  ngOnInit() {
    this.userService.getCurrentUser()
        .subscribe(res => this.currentUser = res);
  }

  /**
    Calls appointment api to create new appointment
    @returns {none}
  */
  onSubmit() {
    this.newAppointment.studentID = this.currentUser.studentID;
    this.newAppointment.firstName = this.currentUser.firstName;
    this.newAppointment.lastName = this.currentUser.lastName;
    this.newAppointment.major = this.currentUser.major.toString();
    this.newAppointment.status = this.currentUser.status.toString();
    this.newAppointment.advisor = this.currentUser.advisor;
    this.newAppointment.roomNumber = 'TODO';
    // have to use a formatter because ng date picker uses ISO format instead of the standard date format
    this.newAppointment.date = new Date(this.ngbDateParserFormatter.format(this.model));

    try {
      this.appointmentService.create(this.newAppointment).subscribe();
    } catch (e) {
      this.messageService.add({severity: 'error',
      summary: 'Error Sending Appointment',
      detail: 'An error has occured while sending your appointment'});
    } finally {
      this.messageService.add({severity: 'success',
      summary: 'Successfully Submitted Appointment',
      detail: 'Appointment was sent to your advisor'});
    }
    if (this.currentUser.phoneNumber !== null || this.currentUser.phoneNumber !== '' ) {
      this.notificationService.sendNotification(JSON.stringify(this.newAppointment), this.currentUser.phoneNumber);
    }
    // this.router.navigate(['pages/advisement/view-appointment']);
  }

}
