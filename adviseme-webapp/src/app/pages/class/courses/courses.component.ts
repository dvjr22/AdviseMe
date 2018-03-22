import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

import { flattenObject } from '../../../_shared/scripts/flattenObject';

/**
  Complete course catalog
*/
@Component({
  selector: 'ngx-courses-list-page',
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {
    /**
      Configuration for the table
    */
    settings = {
      actions: false,
      columns: {
        class_prefix: {
          title: 'Department',
        },
        class_courseNo: {
          title: 'Course Number',
        },
        class_title: {
          title: 'Course Title',
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
        Gets all the classes flattens the object to add to the table
        @returns {none}
    */
    ngOnInit() {

      this.classService.getClasses()
        .subscribe((res: Class[]) => {
          this.source.load(flattenObject(res));
          console.log(flattenObject(res));
        });
    }
}
