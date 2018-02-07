import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';

 import { Appointment } from '../models/appointment';

@Injectable()
export class AppointmentService {

  constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get('/appointments/').map((response: Response) => response.json());
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
