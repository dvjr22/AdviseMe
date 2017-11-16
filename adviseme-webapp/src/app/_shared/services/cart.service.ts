import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Cart } from '../models/cart';

@Injectable()
export class CartService {

  constructor(private http: Http) { }

    getById(_id: string) {
        return this.http.get('/cart/' + _id).map((response: Response) => response.json());
    }

    create(cart: Cart) {
        return this.http.post('/cart', cart);
    }

    update(cart: Cart) {
        return this.http.put('/cart/' + cart._id, cart);
    }

    delete(_id: string) {
        return this.http.delete('/cart/' + _id);
    }
}
