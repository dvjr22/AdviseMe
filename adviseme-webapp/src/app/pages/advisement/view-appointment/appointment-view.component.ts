import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';

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

  /**
    Initializes new names for the imports
  */
  constructor(private appointmentService: AppointmentService) {
  }
  /**
    Calling the appointment api gets all the appointments
    TODO: Get only appointments for the user, still being able to sort
    @returns {none}
  */
  ngOnInit() {
    this.appointmentService.getAll().subscribe( res => {
      this.appointment = res['data'];
    });
  }

}
