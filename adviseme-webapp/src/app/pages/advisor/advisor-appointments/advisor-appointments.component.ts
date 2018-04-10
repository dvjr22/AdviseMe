import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';
import { UserService } from '../../../_shared/services/user.service';
import { LocalDataSource } from 'ng2-smart-table';
import { flattenObject } from '../../../_shared/scripts/flattenObject';


/**
  Component to see Advisors appointments
**/
@Component({
  selector: 'ngx-app-appointments',
  templateUrl: './advisor-appointments.component.html',
  styleUrls: ['./advisor-appointments.component.scss'],
})
export class AdvisorAppointmentsComponent implements OnInit {
  /**
   Variable to store all the appointments for the user collected from the api
  */
  appointment: any;
  noAppointment = false;

  settings = {
    mode: 'inline',
    actions: {
      add: false,
      edit: false,
    },
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
  constructor(private appointmentService: AppointmentService, private userService: UserService) {
  }
  /**
    Calling the appointment api gets all the appointments
    TODO: Get only appointments for the advisor, still being able to sort
    @returns {none}
  */
  ngOnInit() {
    this.checkNoAppointment();
    let userID = ''; // Initializes Variable
    this.userService.getCurrentUser().subscribe( res => { // gets current users studentID
      userID = res['studentID'];
      this.appointmentService.getByAdvisorId(userID).subscribe( res2 => {
        if ( res2.data.length === 0) {
          this.noAppointment = true;
        } else {
          this.source.load(res2.data);
        }
        this.source.load(flattenObject(res2.data));
      });
    });
  }

  /**
    Deletes appointment
  **/
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.delete(event.data._id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    this.checkNoAppointment();
  }

  /**
    Checks to see if there are any appointments
  **/
  checkNoAppointment() {
      this.appointmentService.getAll().subscribe( res => {
        if ( res.data.length === 0) {
          this.noAppointment = true;
        } else {
          this.noAppointment = false;
        }
      });
  }
}
