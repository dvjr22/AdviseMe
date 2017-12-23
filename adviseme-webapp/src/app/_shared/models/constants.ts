/**
  Role of the User. This will be used for privilages of the application.
*/
export enum Role {
  None,
  Student, // 0
  Advisor, // 1
  Admin,   // 2
}

/**
  All of the current Universities we have available
*/
export const Universities = ['University of South Carolina', 'Clemsux'];

/**
  All of the letter grades that a student can recieve
*/
export const Grades = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];

/**
  The status of a student in the University
*/
export enum Status {
  None,
  freshman, // 0
  sophomore, // 1
  junior,   // 2
  senior,   // 3
  sSenior,  // 4 Super Senior
}

/**
  All of the majors that are currently in our system
*/
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
