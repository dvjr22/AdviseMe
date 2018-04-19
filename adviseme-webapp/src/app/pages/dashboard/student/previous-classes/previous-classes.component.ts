import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../../_shared/models/user';
import { ClassService } from '../../../../_shared/services/class.service';
import { CacheService } from '../../../../_shared/services/cache.service';
import {CapitalizePipe} from '../../../../@theme/pipes/capitalize.pipe';

/**
Component:
For the past classes that the user is in
*/
@Component({
  selector: 'ngx-previous-classes',
  styleUrls: ['./previous-classes.component.scss'],
  templateUrl: './previous-classes.component.html',
})

export class PreviousClassesComponent implements OnInit {
  noPreviousClasses = false;
  /**
  Configuration for the table
  */
  settings = {
    pager: false,
    actions: false,
    columns: {
      classID: {
        title: 'Class',
      },
      title: {
        title: 'Course title',
      },
      grade: {
        title: 'Grade',
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
  constructor(private classService: ClassService,
              private cacheService: CacheService) {
  }

  /**
  Gets the currents users classes they have took
  */
  ngOnInit() {
  this.cacheService.get('gradedClasses', this.classService.getGradedClasses()).subscribe((res: User['course']) => {
        if ( res.length === 0) {
          this.noPreviousClasses = true;
        } else {
          this.noPreviousClasses = false;
          for (const c of res) {
            this.cacheService.get(c['classID'], this.classService.getClass(c['classID'])).subscribe((classRes) => {
              c['title'] = classRes['class'].title;
            });
          }
          this.source.load(res);
        }
      });
  }
}
