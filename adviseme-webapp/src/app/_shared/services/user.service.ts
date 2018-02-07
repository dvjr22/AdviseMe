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
export class UserService {
  /**
    Initializes new names for the imports
  */
  constructor(private http: Http) {}
  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  headerDict = {
    'Authorization': `Bearer ` + this.currentUser.token,
    'Issuer': this.currentUser._id,
  };

  requestOptions = {
    headers: new Headers(this.headerDict),
  };

    /**
      Calls api users service to get all users

      @return {json}
    */
    getAll() {
        return this.http.get('/api/users', this.requestOptions).map((response: Response) => response.json());
    }

    /**
      Calls api users service to get a user by id

      @param {string} id
      @return {json}
    */
    getById(_id: string) {
        return this.http.get('/api/users/' + _id, this.requestOptions).map((response: Response) => response.json());
    }

    /**
      Calls api users service to create user
      @param {User} user
      @return {none}
    */
    create(user: User) {
        return this.http.post('/api/users/register', user);
    }

    /**
      Calls api users service to update a user
      @param {User} user
      @return {none}
    */
    update(user: User) {
        return this.http.put('/api/users/' + user._id, user);
    }

    /**
      Calls api users service to delete a user by id
      @param {string} id
      @return {none}
    */
    delete(_id: string) {
        return this.http.delete('/api/users/' + _id);
    }
}
