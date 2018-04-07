import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../../_shared/models/user';
import { ClassService } from '../../../../_shared/services/class.service';
import {CapitalizePipe} from '../../../../@theme/pipes/capitalize.pipe';

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
  Configuration for the table
  */
  settings = {
    actions: false,
    columns: {
      classID: {
        title: 'Class',
      },
      title: {
        title: 'Course title',
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
  constructor(private classService: ClassService) {
  }

  /**
  Gets the currents users classes they have took
  */
  ngOnInit() {
    this.classService.getGradedClasses()
    .subscribe((res: User['course']) => {
      for(const c of res) {
        this.classService.getClass(c['classID']).subscribe((classRes) => {
          c['title'] = classRes['class'].title
        });
      }
      this.source.load(res);
    });
  }
}
