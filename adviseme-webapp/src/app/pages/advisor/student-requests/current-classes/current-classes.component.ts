import { Component, Input, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../../_shared/models/user';
import { ClassService } from '../../../../_shared/services/class.service';
import {CapitalizePipe} from '../../../../@theme/pipes/capitalize.pipe';

/**
  Component:
    For the current classes that the user is in
*/
@Component({
  selector: 'ngx-student-current-classes',
  styleUrls: ['./current-classes.component.scss'],
  templateUrl: './current-classes.component.html',
})

export class CurrentClassesComponent implements OnInit {

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
        title: 'Status',
        filter: false,
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
  ngOnInit() {
    this.classService.getCurrentClassesById(this.student_id)
      .subscribe((res: User['course']) => {
         this.source.load(res);
     });
  }
}
