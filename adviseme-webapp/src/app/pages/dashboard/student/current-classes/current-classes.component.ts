import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../../_shared/models/user';
import { ClassService } from '../../../../_shared/services/class.service';
import { CacheService, CacheKeys } from '../../../../_shared/services/cache.service';
import {CapitalizePipe} from '../../../../@theme/pipes/capitalize.pipe';

/**
Component:
For the current classes that the user is in
*/
@Component({
  selector: 'ngx-current-classes',
  styleUrls: ['./current-classes.component.scss'],
  templateUrl: './current-classes.component.html',
})

export class CurrentClassesComponent implements OnInit {
  noCurrentClasses = false;
  /**
  Configuration for the table
  */
  settings = {
    actions: false,
    columns: {
      classID: {
        title: 'Class',
      },
      title: {
        title: 'Course title',
      },
      grade: {
        title: 'Status',
        filter: false,
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
  ngOnInit() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.cacheService.get(CacheKeys.currentClasses, this.classService.getCurrentClasses()).subscribe((res: User['course']) => {
      if ( res.length === 0) {
        this.noCurrentClasses = true;
      } else {
        this.noCurrentClasses = false;
        for (const c of res) {
          this.cacheService.get(c['classID'], this.classService.getClass(c['classID'])).subscribe((classRes) => {
            c['title'] = classRes['class'].title;
            this.source.load(res);
          });
        }
      }
    });
  }
}
