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

    classes: Class[];
    Class: any;
    courses: any = [{}];
    settings = {
      actions: false,
      columns: {
        prefix: {
          title: 'Department',
        },
        courseNo: {
          title: 'Course Number',
        },
        title: {
          title: 'Title',
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
      //this.classService.getAll().subscribe(res => this.classes = res);
      this.classService.getClasses()
        .subscribe(res => {
          this.classes = res;
          for (let i = 0; i < this.classes.class.length; i++) {
            const prefix = this.classes.class[i].prefix;
            const title = this.classes.class[i].title;
            const courseNo = this.classes.class[i].courseNo;
            this.class.push({prefix: prefix, title: title, courseNo: courseNo});
          }
          this.source.load(this.class);
        });
    }
}
