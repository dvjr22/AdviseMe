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
    /**
      Get a cart by id

      @param {string} _id
      @returns {json}
    */
    getById(_id: string) {
        return this.http.get('/api/cart/' + _id).map((response: Response) => response.json());
    }

    /**
      Create a new cart

      @param {Cart} cart
      @returns {none}
    */
    create(cart: Cart) {
        return this.http.post('/api/cart', cart);
    }

    /**
      Update cart

      @param {Cart} cart
      @returns {none}
    */
    update(cart: Cart) {
        return this.http.put('/api/cart/' + cart._id, cart);
    }

    /**
      Delete cart by id

      @param {string} _id
      @returns {none}
    */
    delete(_id: string) {
        return this.http.delete('/api/cart/' + _id);
    }
}
