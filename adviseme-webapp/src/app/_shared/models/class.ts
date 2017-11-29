import { Injectable } from '@angular/core';

@Injectable()
export class Class {
  _id: string;
  prefix: string;
  courseNo: string;
  title: string;
  requiredFor: string[];
  department: string;
  curriculum: string[];
}
