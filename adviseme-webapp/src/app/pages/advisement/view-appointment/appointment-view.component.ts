import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';
import { UserService } from '../../../_shared/services/user.service';
import { LocalDataSource } from 'ng2-smart-table';
<<<<<<< HEAD
<<<<<<< 820954739b5e2e8aee7fdcf88b34be0a6d7c69ce
import { Router } from '@angular/router';
=======
import { flattenObject } from '../../../_shared/scripts/flattenObject';
>>>>>>> added time picker, displayed room number
=======
import { flattenObject } from '../../../_shared/scripts/flattenObject';
>>>>>>> bba8244b394544197ec50adc9949df31cc02a48f

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
  noAppointment = false;

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
      timefull: {
        title: 'Time',
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
    private router: Router,
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
<<<<<<< HEAD
<<<<<<< 820954739b5e2e8aee7fdcf88b34be0a6d7c69ce
        if ( res2.data.length === 0) {
          this.noAppointment = true;
        } else {
          this.source.load(res2.data);
        }
=======
        this.source.load(flattenObject(res2.data));
>>>>>>> added time picker, displayed room number
=======
        this.source.load(flattenObject(res2.data));
>>>>>>> bba8244b394544197ec50adc9949df31cc02a48f
      });
    });
  }

  goToMakeAppointment() {
    this.router.navigate(['/pages/advisement/appointment']);
  }

}
