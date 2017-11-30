import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Class } from '../models/class';

@Injectable()
export class ClassService {

  constructor(private http: Http) { }

    get(classes: Class) {
      return this.http.get('/classes/', classes);
    }

    getAll() {
      return this.http.get('/classes');
    }

    create(classes: Class) {
        return this.http.post('/classes', classes);
    }

    update(classes: Class) {
        return this.http.put('/classes/' + classes, classes);
    }

    delete(_id: Class) {
        return this.http.delete('/classes/' + _id);
    }
}
