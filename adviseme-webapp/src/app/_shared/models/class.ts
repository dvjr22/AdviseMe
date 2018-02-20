import { Injectable } from '@angular/core';

/**
  Class class
*/
@Injectable()
export class Class {
  _id: string;
  department: string;
  title: string;
  class: {
    title: string;
    courseNo: string;
    prefix: string;
  };
  prerequisites: string[];
  curriculum: string[][];
  hrs: string;
  description: string;
}
