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
  advisor: string;
  advisorRoom: string;
  token: string;
  // Student Role
  studentID: string;
  status: Status;
  major: Major;
  course: [{
    classID: string;
    grade: string;
  }];
  registered: {
    semester: string;
    year: string;
  };
  phoneNumber: string;
  profilePicture: string;
  // Advisor Role
  students: string[];
  // Admin Role

}

/**
  Temp current user classes

  TODO: Remove
*/
export const CurrentClasses = [
  {department: 'CSCE', coNum: '490'},
  {department: 'CSCE', coNum: '355'},
  {department: 'CSCE', coNum: '518'},
  {department: 'MATH', coNum: '526'},
  {department: 'CRJU', coNum: '340'}];

/**
  Temp future uer classes

  TODO: Remove
*/
export const FutureClasses = [
  {department: 'CSCE', coNum: '492'},
  {department: 'CSCE', coNum: '522'},
  {department: 'CSCE', coNum: '480'},
  {department: 'CRJU', coNum: '101'}];
