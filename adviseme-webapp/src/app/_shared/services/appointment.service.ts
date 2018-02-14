import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

 import { Appointment } from '../models/appointment';

 /**
   Service that makes calls to the api appointment service
 */
@Injectable()
export class AppointmentService {

  /**
    Initializes new names for the imports
  */
  constructor(private http: Http) { }
  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  headerDict = {
    'Authorization': `Bearer ` + this.currentUser.token,
    'Issuer': this.currentUser._id,
  };

  requestOptions = {
    headers: new Headers(this.headerDict),
  };

    /**
      Gat all appointments

      @returns {json}
    */
    getAll() {
       return this.http.get('/api/appointments/', this.requestOptions).map((response: Response) => response.json());
    }

    /**
      Create a new Appointment

      @param {Appointment} appointment
      @returns {none}
    */
    create(appointment: Appointment) {
        return this.http.post('/api/appointments', appointment, this.requestOptions);
    }

    /**
      Update appointment

      @param {Appointment} appointment
      @returns {none}
    */
    update(appointment: Appointment) {
        return this.http.put('/api/appointments/' + appointment, appointment, this.requestOptions);
    }

    /**
      Delete appointment by id

      TODO: LOOK INTO THIS.... Do not think that this works

      @param {string} _id
      @returns {none}
    */
    delete(_id: string) {
        return this.http.delete('/api/appointments/' + _id, this.requestOptions);
    }
}

interface AppointmentResponse {
  results: string[];
}
