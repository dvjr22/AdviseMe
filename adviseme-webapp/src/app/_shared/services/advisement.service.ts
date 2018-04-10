/*
 * advisement.service.ts
 * The advisement service is used to tell if a user has already been advised this semester
 *
*/
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import { User } from '../models/user';
import { UserService } from './user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

/*
 * advisement.service.ts
 * The advisement service is used to tell if a user has already been advised this semester
 *
*/
@Injectable()
export class AdvisementService {

  allow: Observable<boolean>;
  private _semesterSub: Subscription;
  constructor(private userService: UserService) {}


  /**
    Gets the current semester
  **/
  getCurrentSemester() {
    const today = new Date();
    const x = today.getUTCMonth() + 1;

    switch (true) {
     case (x <= 5): {
        return {semester: 'Spring', year: '' + today.getUTCFullYear()};
     }
     case (x < 5 && x <= 7): {
        return {semester: 'Summer', year: '' + today.getUTCFullYear()};
     }
     case (x < 8 && x <= 12): {
        return {semester: 'Fall', year: '' + today.getUTCFullYear()};
     }
     default: {
        return {semester: '', year: '0'};
     }
   }
  }

  /**
    Checks to see if a user has already been approved
  **/
  checkAdvisedSemester() {

    const thisSemester = this.getCurrentSemester();

    this.allow = new Observable( observer => {

      this._semesterSub = this.userService.getCurrentUser().subscribe(val => {
        if ( val.registered !== undefined) {
          if (val.registered.semester === thisSemester.semester && val.registered.year === thisSemester.year) {
            observer.next(false);
          } else {
            observer.next(true);
          }
        } else {
          observer.next(true);
        }

      });


    });
    return this.allow;

  }

}

/**

  returns: if the user has already been approved this semester

**/

@Injectable()
export class CanActivateAdvisement implements CanActivate {
  constructor(private advisementService: AdvisementService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean>|Promise<boolean>|boolean {
    return this.advisementService.checkAdvisedSemester();
  }
}
