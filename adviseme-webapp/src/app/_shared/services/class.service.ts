import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Class } from '../models/class';
import 'rxjs/add/operator/map';

/**
  Service that makes calls to the api class service
*/
@Injectable()
export class ClassService {
  /**
    Class Url for the api
  */
  classUrl = `/api/classes`;

  /**
    Initializes new names for the imports
  */
  constructor(private http: HttpClient) { }
  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + this.currentUser.token );
  /**
    Creates a new class

    @param {Class} x
    @returns {any}
  */
  createClass(x: Class): Observable<any> {
    return this.http.post(`${this.classUrl}`,
      x,
      {
          headers: this.headers,
      },
    );
  }

  /**
    Get all the classes

    @returns {Class[]}
  */
  getClasses(): Observable<Class[]> {
    return this.http.get(this.classUrl,
      {
          headers: this.headers,
      },
    )
    .map(res  => {
    return res['data'].docs as Class[];
    });
  }

  /**
    Edit Class

    @param {Class} class
    @returns {any}
  */
  editClass(c: Class): Observable <any> {
    return this.http.put(`${this.classUrl}`,
      c,
      {
          headers: this.headers,
      },
    );
  }

  /**
    Delete Class by id

    @param {string} id
    @returns {any}
  */
  deleteClass(id: string): any {
    /**
      url to delete the user by id
    */
    const deleteUrl = `${this.classUrl}/${id}`;
    return this.http.delete(deleteUrl,
      {
          headers: this.headers,
      },
    )
    .map(res  => {
      return res;
    });
  }
}
