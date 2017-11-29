import { Injectable } from '@angular/core';

@Injectable()
export class Appointment {
  studentID: number; // ObjectId
  name: string;
  major: string;
  year: string;
  advisor: string;
  roomNumber: string;
  date: Date;
}
