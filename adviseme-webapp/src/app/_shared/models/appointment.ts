import { Injectable } from '@angular/core';

/**
  Appointment class
*/
@Injectable()
export class Appointment {
  _id: string;
  studentID: string; // ObjectId
  firstName: string;
  lastName: string;
  major: string;
  status: string;
  advisor: string;
  roomNumber: string;
  date: Date;
  time: {
    hour: string;
    minute: string;
    second: string;
  };
}
