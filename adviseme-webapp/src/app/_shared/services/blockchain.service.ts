import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Cart } from '../models/cart';

/**
  Blockchain Service
**/
@Injectable()
export class BlockchainService {

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
  getChain() {
      return this.http.get('/api/blockchain/', this.requestOptions).map((response: Response) => response.json());
  }

  newBlock(cart: Cart) {
      return this.http.post('/api/blockchain/', cart, this.requestOptions).subscribe();
  }


  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
