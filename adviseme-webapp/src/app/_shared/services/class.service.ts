import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  classUrl = `/classes`;

  /**
    Initializes new names for the imports
  */
  constructor(private http: HttpClient) { }

  /**
    Creates a new class

    @param {Class} x
    @returns {any}
  */
  createClass(x: Class): Observable<any> {
    return this.http.post(`${this.classUrl}`, x);
  }

  /**
    Get all the classes

    @returns {Class[]}
  */
  getClasses(): Observable<Class[]> {
    return this.http.get(this.classUrl)
    .map(res  => {
    return res['data'].docs as Class[];
    });
  }

  /**
    Edit Class

    @param {Class} class
    @returns {any}
  */
  editClass(class: Class): Observable <any> {
    return this.http.put(`${this.classUrl}`, class);
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
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    });
  }
}
