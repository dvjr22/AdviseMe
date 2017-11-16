import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

 import { Appointment } from '../models/appointment';

@Injectable()
export class AppointmentService {

  constructor(private http: Http) { }

    getById(_id: string) {
        return this.http.get('/appointment/' + _id).map((response: Response) => response.json());
    }

    create(appointment: Appointment) {
        return this.http.post('/appointment', appointment);
    }

    update(appointment: Appointment) {
        return this.http.put('/appointment/' + appointment._id, appointment);
    }

    delete(_id: Appointment) {
        return this.http.delete('/appointment/' + _id);
    }
}
