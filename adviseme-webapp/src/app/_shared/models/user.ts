import { Injectable } from '@angular/core';
import { Role, Status, Major } from './constants';

/**
  User class
*/
@Injectable()
export class User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  university: string;
  appointments: string[];
  role: Role;

  // Student Role
  studentID: string;
  status: Status;
  major: Major;
  course: [{
    classID: string;
    grade: string;
  }];

  // Advisor Role
  students: string[];

  // Admin Role

}
