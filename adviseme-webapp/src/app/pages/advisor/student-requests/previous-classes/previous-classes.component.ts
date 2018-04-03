import { Component, Input, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../../_shared/models/user';
import { ClassService } from '../../../../_shared/services/class.service';
import {CapitalizePipe} from '../../../../@theme/pipes/capitalize.pipe';

/**
  Component:
    For the past classes that the user is in
*/
@Component({
  selector: 'ngx-student-previous-classes',
  styleUrls: ['./previous-classes.component.scss'],
  templateUrl: './previous-classes.component.html',
})

export class PreviousClassesComponent implements OnInit {

  @Input() student_id: string;

  /**
    Configuration for the table
  */
  settings = {
    actions: false,
    pager: {
      display: true,
      perPage: 5,
    },
    columns: {
      classID: {
        title: 'Class',
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
    this.classService.getGradedClassesById(this.student_id)
      .subscribe((res: User['course']) => {
         this.source.load(res);
     });
  }
}
