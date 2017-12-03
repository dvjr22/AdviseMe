import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class NotificationService {

  constructor(private http: Http) { }
  sendNotification(msg: string) {
    return this.http.post('/notify/sendnotification', { message: msg }).subscribe();
  }
}
