import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

/**
  SMS Notification service that calls api notification service
*/
@Injectable()
export class NotificationService {

  /**
    Initializes new names for the imports
  */
  constructor(private http: Http) { }


  /**
    Calls the api notification service to send a user a Notification
    TODO: When a user signs up, he has his phone number as well. Phone number
      Will be another param that will be sent.

    @param {string} msg
    @returns {none}
  */
  sendNotification(msg: string, phoneNumber: string) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const headerDict = {
      'Authorization': `Bearer ` + currentUser.token,
      'Issuer': currentUser._id,
    };

    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post('/api/notify/sendnotification',
      { message: JSON.parse(msg), phoneNumber: phoneNumber },
      requestOptions).subscribe();
  }
}
