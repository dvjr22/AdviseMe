import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';
import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})

export class AppointmentComponent implements OnInit {
  currentUser: User;
  appointment: Appointment;
  model; // variable to hold ISO date format from date picker

  constructor(private userService: UserService,
              private appointmentService: AppointmentService,
              private ngbDateParserFormatter: NgbDateParserFormatter,
              protected router: Router) { }

  public newAppointment: Appointment = new Appointment();

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe(res => this.currentUser = res);
  }

  onSubmit() {
    this.newAppointment.studentID = this.currentUser.studentID;
    this.newAppointment.firstName = this.currentUser.firstName;
    this.newAppointment.lastName = this.currentUser.lastName;
    this.newAppointment.major = this.currentUser.major.toString();
    this.newAppointment.status = this.currentUser.status.toString();
    // have to use a formatter because ng date picker uses ISO format instead of the standard date format
    this.newAppointment.date = new Date(this.ngbDateParserFormatter.format(this.model));
    this.appointmentService.create(this.newAppointment).subscribe();
    this.router.navigate(['pages/advisement/view-appointment']);
  }

}
