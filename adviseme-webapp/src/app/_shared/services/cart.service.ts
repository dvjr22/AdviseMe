import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Cart } from '../models/cart';

/**
  Service that makes calls to the api cart service
*/
@Injectable()
export class CartService {

  /**
    Initializes new names for the imports
  */
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
      Get a cart by id

      @param {string} _id
      @returns {json}
    */
    getById(_id: string) {
        return this.http.get('/api/carts/' + _id, this.requestOptions).map((response: Response) => response.json());
    }

    /**
      Get all carts
    */
    get() {
      return this.http.get('/api/carts/', this.requestOptions).map((response: Response) => response.json());
    }

    /**
      Create a new cart

      @param {Cart} cart
      @returns {none}
    */
    create(cart: Cart) {
        return this.http.post('/api/carts/', cart, this.requestOptions).subscribe();
    }

    /**
      Update cart

      @param {Cart} cart
      @returns {none}
    */
    update(cart: Cart) {
      console.log('in update')
      console.log(cart);
        return this.http.put('/api/carts/' /*+ cart._id*/, cart, this.requestOptions).subscribe();
    }

    /**
      Delete cart by id

      @param {string} _id
      @returns {none}
    */
    delete(_id: string) {
        return this.http.delete('/api/carts/' + _id, this.requestOptions).subscribe();
    }
}
