/*
 * authentication.service.ts
 * The authentication service is used to login and logout of the application and
 * if successful store the current user in local storage.
*/
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  // Method for logging in a user by posting the username and password
  // to the rest api
  login(username: string, password: string) {
    return this.http.post('/users/authenticate', { username: username, password: password})
      .map((response: Response) => {
        // login successful if there is a jwt token in the response
        const user = response.json();
        if (user && user.token) {
          // Store the token in the sessionStorage so that other
          // components can check the logged in user
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    // Remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }

    // This method is used by components wanting to know if the
    // user is currently logged in or not
  checkForLocalUser(): boolean {
    if (sessionStorage.getItem('currentUser') !== null) {
      return true;
    } else {
      return false;
    }
  }
}

// This class restricts the router to only allowing login and registration
// when there is not a valid user logged in
@Injectable()
export class CanActivateUser implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean>|Promise<boolean>|boolean {
    return this.authenticationService.checkForLocalUser();
  }
}
