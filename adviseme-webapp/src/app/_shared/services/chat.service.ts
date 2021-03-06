import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
  Cart Service
**/
@Injectable()
export class ChatService {

  constructor(private http: Http) { }
  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  headerDict = {
    'Authorization': `Bearer ` + this.currentUser.token,
    'Issuer': this.currentUser._id,
  };

  requestOptions = {
    headers: new Headers(this.headerDict),
  };

  /**
    Gets the chat by the room id
  **/
  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/chat/room/' + room, this.requestOptions)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res.data);
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
    Displays the chat
  **/
  showChat(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/api/chat/' + id, this.requestOptions)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
    Saves the message
  **/
  saveChat(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/api/chat', data, this.requestOptions)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  /**
    Updates the chat
  **/
  updateChat(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put('/api/chat/' + id, data, this.requestOptions)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  /**
    Deletes the chat
  **/
  deleteChat(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/api/chat/' + id, this.requestOptions)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
