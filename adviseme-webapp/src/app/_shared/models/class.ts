import { Injectable } from '@angular/core';

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
