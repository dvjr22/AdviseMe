import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../_shared/models/user';
import { ClassService } from '../../../_shared/services/class.service';
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
    Configuration for the table
  */
  settings = {
    actions: false,
    columns: {
      classID: {
        title: 'Class',
      },
      grade: {
        title: 'Status',
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
    Gets the currents users classes they are currently taking

    TODO: Use the real current users current class data
  */
  ngOnInit() {
    this.classService.getCurrentClasses()
      .subscribe((res: User['course']) => {
         this.source.load(res);
     });
  }
}
