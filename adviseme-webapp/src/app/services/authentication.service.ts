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

  login(username: string, password: string) {
    return this.http.post('/users/authenticate', { username: username, password: password})
      .map((response: Response) => {
        // login successful if there is a jwt token in the response
        const user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}

@Injectable()
class CanActivateUser implements CanActivate {
  constructor(private permissions: Permissions, private currentUser: User) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return this.permissions.canActivate(this.currentUser);
  }
}

class Permissions {
  canActivate(user: User): boolean {
    return true;
  }
}
