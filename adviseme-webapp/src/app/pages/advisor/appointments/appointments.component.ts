import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';

@Component({
  selector: 'ngx-app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  /**
   Variable to store all the appointments for the user collected from the api
  */
  appointment: any;

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
      this.appointment = res['data'];
    });
  }

}
