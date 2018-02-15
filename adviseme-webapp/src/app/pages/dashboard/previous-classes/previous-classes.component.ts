import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

/**
  Component:
    For the past classes that the user is in
*/
@Component({
  selector: 'ngx-previous-classes',
  styleUrls: ['./previous-classes.component.scss'],
  templateUrl: './previous-classes.component.html',
})

export class PreviousClassesComponent implements OnInit {
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
      grade: {
        title: 'Grade',
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
      Gets the currents users classes they have took
    */
  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe(res => {
          this.currentUser = res;
          for (let i = 0; i < this.currentUser.course.length; i++) {
            if (this.currentUser.course[i].classID != null) {
              const department = this.currentUser.course[i].classID.slice(0, 4);
              const coNum = this.currentUser.course[i].classID.slice(4);
              const grade = this.currentUser.course[i].grade;
              this.courses.push({department: department, coNum: coNum, grade: grade});
            }
          }
          this.source.load(this.courses);
        });
  }
}
