import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { Class } from '../models/class';
import 'rxjs/add/operator/map';

<<<<<<< HEAD
import { Class } from '../models/class';

=======
>>>>>>> tbhall-Profile
@Injectable()
export class ClassService {

  api_url = 'http://localhost:3000';
  classUrl = `${this.api_url}/classes`;
  constructor(private http: HttpClient) { }

<<<<<<< HEAD
    getAll() {
      return this.http.get('/classes');
    }

    create(classes: Class) {
        return this.http.post('/classes', classes);
    }
=======
  // Don't ask why x it just works that way
  createClass(x: Class): Observable<any> {
    return this.http.post(`${this.classUrl}`, x);
  }
getClasses(): Observable<Class[]> {
  return this.http.get(this.classUrl)
  .map(res  => {
    return res['data'].docs as Class[];
  });
}
>>>>>>> tbhall-Profile

editTodo(todo: Class) {
    const editUrl = `${this.classUrl}`;
    return this.http.put(editUrl, todo);
  }

  deleteTodo(id: string): any {
    const deleteUrl = `${this.classUrl}/${id}`;
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    });
  }
}
