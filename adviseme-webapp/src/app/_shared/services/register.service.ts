/*
 * user.service.ts
 * The user service contains a standard set of CRUD methods for managing users via the api.
*/
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

/**
  Service that makes calls to the api user service
*/
@Injectable()
export class RegisterService {
  /**
    Initializes new names for the imports
  */
  constructor(private http: Http) {}

    /**
      Calls api users service to create user
      @param {User} user
      @return {none}
    */
    create(user: User) {
        return this.http.post('/api/users/register', user);
    }

}
