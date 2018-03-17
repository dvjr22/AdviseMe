import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';
import { UserService } from '../../../_shared/services/user.service';
import { LocalDataSource } from 'ng2-smart-table';

/**
  Component that allows the user to see their appointments
*/
@Component({
  selector: 'ngx-app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss'],
})
export class AppointmentViewComponent implements OnInit {
  /**
   Variable to store all the appointments for the user collected from the api
  */
  appointment: any;

  settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      studentID: {
        title: 'Student ID',
      },
      firstName: {
        title: 'First Name',
      },
      lastName: {
        title: 'Last Name',
      },
      advisor: {
        title: 'Advisor',
      },
      roomNumber: {
        title: 'Room Number',
      },
      date: {
        title: 'Date',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  /**
    Initializes new names for the imports
  */
  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService,
             ) { }
  /**
    Calling the appointment api gets all the appointments
    TODO: Get only appointments for the user, still being able to sort
    @returns {none}
  */
  ngOnInit() {
    let userID = ''; // Initializes Variable
    this.userService.getCurrentUser().subscribe( res => { // gets current users studentID
      userID = res['studentID'];
      this.appointmentService.getById(userID).subscribe( res2 => {
        this.source.load(res2.data);
      });
    });
  }
}
