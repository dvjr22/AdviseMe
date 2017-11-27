import { Injectable } from '@angular/core';

@Injectable()
export class Cart {
  _id: string;
  prefix: string;
  courseNo: number;
  title: string;
  semester: string;
  requirement: number[];
  preReqs: number[];
  department: string;
}
