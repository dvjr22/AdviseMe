import { Injectable } from '@angular/core';

enum Role {
  Student, //0
  Advisor, //1
  Admin,   //2
}
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
}
