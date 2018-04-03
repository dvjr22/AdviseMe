import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapitalizePipe } from '../../../@theme/pipes/capitalize.pipe';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

import { Router } from '@angular/router';

/**
  Component:
    Allows a user to look at an overview of their class
*/
@Component({
  selector: 'ngx-class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.scss'],
})
export class ClassViewComponent implements OnInit {
  /**
    Initializes new names for the imports
  */

  _id;
  Class;
  constructor(protected route: ActivatedRoute, private classService: ClassService, protected router: Router) {
  }

  /**
    Gets the currents users id from the local cache then uses the user service
    to get the users information
  */
  ngOnInit() {
    this._id = this.route.snapshot.params['id'];

    this.classService.getClass(this._id)
      .subscribe((res: Class) => {
        this.Class = res;
      });
  }

  goClassTableView() {
    this.router.navigate(['/pages/student/request-classes']);
  }
}
