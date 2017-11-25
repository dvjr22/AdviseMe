import { Injectable } from '@angular/core';
import { Class } from './class';

@Injectable()
export class Cart {
  _id: string;
  classes: Class[];
}
