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
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  temp;
  constructor(private http: Http) { }

  // Method for logging in a user by posting the username and password
  // to the rest api
  login(username: string, password: string) {
    return this.http.post('/api/users/authenticate', { username: username, password: password})
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

  checkToken(token: string) {
    return this.http.post('/api/token/valid', { token: token})
      .map((response: Response) => {
        const token2 = response.json();
        return token2;
      }).subscribe(val => {
        if (val.return === 'true' && val.status === '200') {
          this.temp = true;
        } else {
          this.temp = false;
        }
      });
  }

    // This method is used by components wanting to know if the
    // user is currently logged in or not
  checkForLocalUser(): boolean {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const apiReturn = '';
    if (currentUser !== null && apiReturn === '') {
      const anytemp = this.checkToken(currentUser.token);
      return this.temp;
    } else {
      return false;
    }
  }
}

// This class restricts the router to only allowing login and registration
// when there is not a valid user logged in
@Injectable()
export class CanActivateUser implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (this.authenticationService.checkForLocalUser()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
