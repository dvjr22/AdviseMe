import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

@Component({
  selector: 'ngx-courses-list-page',
  templateUrl: './courses.component.html',
  //styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
    classes: any = [];
    class: any = classes.class;
    settings = {
      actions: false,
      columns: {
        department: {
          title: 'Department',
        },
        class.courseNo: {
          title: 'Course Number',
        },
        class.title: {
          title: 'Title'
        },
        prerequisites: {
          title: 'Prerequisites'
        }
      },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private classService: ClassService) {
    }

    ngOnInit() {
      //this.classService.getAll().subscribe(res => this.classes = res);
      this.classService.getClasses()
        .subscribe(res => {
          this.classes = res;
          this.source.load(this.classes);
        });
    }
}
