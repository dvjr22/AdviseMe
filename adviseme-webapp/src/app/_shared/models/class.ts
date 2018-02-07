import { Injectable } from '@angular/core';

/**
  Class class
*/
@Injectable()
export class Class {
  _id: string;
  deapartment: string;
  title: string;
  class: {
    title: string;
    courseNo: string;
    prefix: string;
  };
  prerequisites: string[];
  curriculum: string[][];
}
