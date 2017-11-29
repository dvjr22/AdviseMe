import { Injectable } from '@angular/core';

export enum Role {
  None,
  Student, // 0
  Advisor, // 1
  Admin,   // 2
}

export enum Status {
  None,
  freshman, // 0
  sophomore, // 1
  junior,   // 2
  senior,   // 3
  sSenior,  // 4 Super Senior
}

export enum Major {
  None,
  AerospaceEng,     // 0
  BiomedicalEng,    // 1
  ChemicalEng,      // 2
  CivilEng,         // 3
  EnvironmentalEng, // 4
  ComputerScience,  // 5
  ComputerEng,      // 6
  ElectricalEng,    // 7
  InfoTech,         // 8
  MechanicalEng,    // 9
  NuclearEng,       // 10
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

  // Student Role
  status: Status;
  major: Major;
}
