import { Injectable } from '@angular/core';

@Injectable()
export class Appointment {
  _id: string;
  createdBy: string; //ObjectId
  createdFor: string;//ObjectId
  dateCreated: Date; //not sure how this will be formated
  dateFor: Date;
  roomNumber: string;
}
