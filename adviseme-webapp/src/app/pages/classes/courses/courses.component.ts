import { Component, OnInit } from '@angular/core';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

@Component({
  selector: 'ngx-courses-list-page',
  templateUrl: './courses.component.html',
  //styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
    classes: Class[];

    constructor(private classService: ClassService) {
    }

    ngOnInit() {
      this.classService.getAll().subscribe(res => this.classes = res);
      console.log(this.classes);
    }
}
