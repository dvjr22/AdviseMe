/*
 * authentication.service.ts
 * The authentication service is used to login and logout of the application and
 * if successful store the current user in local storage.
*/
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subscription} from 'rxjs/Subscription';
import { User } from '../models/user';
import { UserService } from './user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  validToken;
  allow: Observable<boolean>;
  private _userSub: Subscription;
  private _adminSub: Subscription;
//  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  // isAdmin: boolean;
  constructor(private http: Http, private router: Router, private userService: UserService) {}

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

  /**
    Logout of application. Removes user from sessionStorage
  **/
  logout() {
    // Remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }

  /**
    Gets the user that is currently logged in
  **/
  getUser() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.allow) {
      this.allow = new Observable(observer => {
          observer.next(true);
          observer.complete();
      });
      return this.allow;
    }
    this.allow = new Observable( observer => {
      if (this._userSub) {
        this._userSub.unsubscribe();
      }
      this._userSub = this.checkToken(currentUser.token).subscribe(val => {
          if (val === true) {
            observer.next(true);
          } else {
            this.router.navigate(['/auth/login']);
            observer.next(false);
          }
        },
        () => {
        observer.complete();
        });
    });
    return this.allow;
  }

  /**
    Checks to see if the token is valid
  **/
  checkToken(token: string) {
    return this.http.post('/api/token/valid', { token: token})
      .map((response: Response) => {
        const token2 = response.json();
        if (token2.return === 'true') {
          return true;
        } else {
          return false;
        }
      });
  }

    // This method is used by components wanting to know if the
    // user is currently logged in or not
  checkForLocalUser(): boolean {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const apiReturn = '';
    if (currentUser !== null && apiReturn === '') {
      return true;
    } else {
      return false;
    }
  }

  /**
    Checks to see if the user's role is an admin
  **/
  checkForAdminUser() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.allow = new Observable( observer => {
      this._adminSub = this.userService.getCurrentUser().subscribe(val => {
        if (val.role === 'admin') {
          observer.next(true);
        } else {
          this.router.navigate(['/auth/login']);
          observer.next(false);
        }
      },
      () => {
        observer.complete();
      });
    });
    return this.allow;
  }

  /**
    Checks to see if the user's role is an advisor
  **/
  checkForAdvisorUser() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.allow = new Observable( observer => {
      this._adminSub = this.userService.getCurrentUser().subscribe(val => {
        if (val.role === 'advisor') {
          observer.next(true);
        } else {
          this.router.navigate(['/auth/login']);
          observer.next(false);
        }
      },
      () => {
        observer.complete();
      });
    });
    return this.allow;
  }
}

/**
This class restricts the router to only allowing login and registration
 when there is not a valid user logged in
 **/
@Injectable()
export class CanActivateUser implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (this.authenticationService.checkForLocalUser()) {
      return this.authenticationService.getUser();
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
/**
  Tells if you can activate the Admin routes
**/
@Injectable()
export class CanActivateAdmin implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean>|Promise<boolean>|boolean {
    return this.authenticationService.checkForAdminUser();
  }
}

/**
  Tells if you can activate the advisor routes
**/
@Injectable()
export class CanActivateAdvisor implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean>|Promise<boolean>|boolean {
    return this.authenticationService.checkForAdvisorUser();
  }
}
