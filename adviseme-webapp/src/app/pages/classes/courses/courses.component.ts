import { Component, OnInit } from '@angular/core';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

@Component({
  selector: 'ngx-courses-list-page',
  templateUrl: './courses.component.html',
  //styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
    classes: any;

    constructor(private classService: ClassService) {
    }

    ngOnInit() {
      //this.classService.getAll().subscribe(res => this.classes = res);
      this.classService.getAll().subscribe(data => {
        this.classes = data["data"]
      });
      console.log(this.classes);
    }
}
