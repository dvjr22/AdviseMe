import { Injectable } from '@angular/core';
import { Cart } from './cart';

/**
  Cart class
*/
@Injectable()
export class Blockchain {
  _id: string;
  previousHash: string;
  timestamp: string;
  data: Cart;
  hash: string;
  nonce: number;
}
