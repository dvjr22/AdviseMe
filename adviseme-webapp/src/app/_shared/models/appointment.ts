import { Injectable } from '@angular/core';

@Injectable()
export class Appointment {
  studentID: string; // ObjectId
  firstName: string;
  lastName: string;
  major: string;
  status: string;
  advisor: string;
  roomNumber: string;
  date: Date;
}
