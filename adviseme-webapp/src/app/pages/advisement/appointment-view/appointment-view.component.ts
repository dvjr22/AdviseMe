import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../_shared/models/appointment';
import { AppointmentService } from '../../../_shared/services/appointment.service';

@Component({
  selector: 'ngx-app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss'],
})
export class AppointmentViewComponent implements OnInit {
  appointment: any;

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.appointmentService.getAll().subscribe( res => {
      this.appointment = res['data']['docs'];
    });
  }

}
