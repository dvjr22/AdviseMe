import { Injectable } from '@angular/core';

/**
  Cart class
*/
@Injectable()
export class Cart {
  _id: string;
  classes: [{
    _id: string;
    prerequisites: [string];
    department: string;
    curriculum: [[string]];
    class: {
      title: string;
      courseNo: string;
      prefix: string;
    };
  }];
}
