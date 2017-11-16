import { Injectable } from '@angular/core';

// authentication user profile
@Injectable()
export class User {
  _id: string;
  prefix: string;
  courseNo: number;
  title: string;
  semester: string;
  requirements: number[];
   //what is the difference between two ^ v
  preReqs: number[];
  department: string;
}
