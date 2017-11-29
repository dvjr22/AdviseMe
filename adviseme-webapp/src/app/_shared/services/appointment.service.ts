import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

 import { Appointment } from '../models/appointment';

@Injectable()
export class AppointmentService {

  constructor(private http: Http) { }

    get(appointment: Appointment) {
      return this.http.get('/appointments/', appointment);
    }

    create(appointment: Appointment) {
        return this.http.post('/appointments', appointment);
    }

    update(appointment: Appointment) {
        return this.http.put('/appointments/' + appointment, appointment);
    }

    delete(_id: Appointment) {
        return this.http.delete('/appointments/' + _id);
    }
}
