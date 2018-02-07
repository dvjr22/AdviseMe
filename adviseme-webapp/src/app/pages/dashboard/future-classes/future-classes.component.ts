import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User, FutureClasses } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

/**
  Component:
    For the future classes that the user is in
*/
@Component({
  selector: 'ngx-future-classes',
  styleUrls: ['./future-classes.component.scss'],
  templateUrl: './future-classes.component.html',
})

export class FutureClassesComponent implements OnInit {
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
    Gets the currents users classes they will be taking

    TODO: Use the real current users future class data
  */
  ngOnInit() {
    this.source.load(FutureClasses);
  }
}
