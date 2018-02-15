import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

import { flattenObject } from '../../classes/courses/flattenObject';

@Component({
  selector: 'ngx-app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
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

  source: LocalDataSource = new LocalDataSource();
  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.classService.getClasses()
      .subscribe((res: Class[]) => {
        this.source.load(flattenObject(res));
      });
  }

}
