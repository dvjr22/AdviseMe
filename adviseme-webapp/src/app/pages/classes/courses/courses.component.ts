import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

@Component({
  selector: 'ngx-courses-list-page',
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {
    classes: any = [];
    settings = {
      actions: false,
      columns: {
        _id: {
          title: '_id',
        },
        department: {
          title: 'Department',
        },
      },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private classService: ClassService) {
    }

    ngOnInit() {
      this.classService.getClasses()
        .subscribe(res => {
          this.classes = res;
          this.source.load(this.classes);
        });
    }
}
