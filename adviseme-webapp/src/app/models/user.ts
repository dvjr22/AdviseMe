import { Injectable } from '@angular/core';

// authentication user profile
@Injectable()
export class User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
