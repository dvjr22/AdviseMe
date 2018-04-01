import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';
import { LocalDataSource } from 'ng2-smart-table';

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
    },
  };

  source: LocalDataSource = new LocalDataSource();
  /**
    Initializes new names for the imports
  */
  constructor(private appointmentService: AppointmentService) {
  }
  /**
    Calling the appointment api gets all the appointments
    TODO: Get only appointments for the advisor, still being able to sort
    @returns {none}
  */
  ngOnInit() {
    this.appointmentService.getAll().subscribe( res => {
      this.source.load(res.data);
    });
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.delete(event.data._id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
