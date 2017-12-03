import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

import { flattenObject } from './flattenObject';

@Component({
  selector: 'ngx-courses-list-page',
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {
    settings = {
      actions: false,
      columns: {
        _id: {
          title: 'Course Code',
        },
        class: {
          title: 'Course Title',
          valuePrepareFunction: (cell, row) => {
            //return row.class.title;
          },
        },
        prerequisites: {
          title: 'Prerequisites',
        },
      },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private classService: ClassService) {
    }

    ngOnInit() {

      this.classService.getClasses()
        .subscribe((res: Class[]) => {
          this.source.load(flattenObject(res));
        });
      console.log(this.source);
    }
}
