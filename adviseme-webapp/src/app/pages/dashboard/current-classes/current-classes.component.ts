import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User, CurrentClasses } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

/**
  Component:
    For the current classes that the user is in
*/
@Component({
  selector: 'ngx-current-classes',
  styleUrls: ['./current-classes.component.scss'],
  templateUrl: './current-classes.component.html',
})

export class CurrentClassesComponent implements OnInit {

  /**
    Getting the current user
  */
  currentUser: User;
  /**
    Array of courses
  */
  courses: any = [];
  /**
    Configuration for the table
  */
  settings = {
    actions: false,
    columns: {
      department: {
        title: 'Department',
      },
      coNum: {
        title: 'Course Number',
      },
    },
  };

  /**
    The data that will go into the table
  */
  source: LocalDataSource = new LocalDataSource();

  /**
    Initializes new names for the imports
  */
  constructor(private userService: UserService) {
  }

  /**
    Gets the currents users classes they are currently taking

    TODO: Use the real current users current class data
  */
  ngOnInit() {
    this.source.load(CurrentClasses);
  }
}
