import { Injectable } from '@angular/core';

@Injectable()
export class Class {
  _id: string;
  prefix: string; //ObjectId
  course_num: string;//ObjectId
  title: string; //not sure how this will be formated
  semsester: string;
  preReqs: string[];
  description: string;
  department: string;
}
