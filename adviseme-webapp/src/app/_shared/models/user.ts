import { Injectable } from '@angular/core';
import { Role, Status, Major } from './constants';
// authentication user profile
@Injectable()
export class User {
  _id: string;
  username: string;
  password: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  role: Role;

  // Student Role
  status: Status;
  major: Major;
}
