import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';
import { UserService } from '../../../_shared/services/user.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { flattenObject } from '../../../_shared/scripts/flattenObject';

/**
  Component that allows the user to see their appointments
*/
@Component({
  selector: 'ngx-app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss'],
})
export class AppointmentViewComponent implements OnInit {
  description = `Shows all scheduled appointments between a student and advisor.`;
  /**
   Variable to store all the appointments for the user collected from the api
  */
  appointment: any;
  noAppointment = false;

  settings = {
    actions: {
      add: false,
      edit: false,
    },
    hideSubHeader: true,
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
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
        if ( res2.data.length === 0) {
          this.noAppointment = true;
        } else {
          this.source.load(res2.data);
        }
        this.source.load(flattenObject(res2.data));
      });
    });
  }

  goToMakeAppointment() {
    this.router.navigate(['/pages/advisement/appointment']);
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.appointmentService.delete(event.data._id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    this.checkNoAppointment();
  }

  checkNoAppointment() {
    let userID = '';
    this.userService.getCurrentUser().subscribe( res => { // gets current users studentID
      userID = res['studentID'];
      this.appointmentService.getById(userID).subscribe( res2 => {
        if ( res2.data.length === 0) {
          this.noAppointment = true;
        } else {
          this.noAppointment = false;
        }
      });
    });
  }
}
