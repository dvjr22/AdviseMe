import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';
import { ClassViewRenderComponent } from '../../../_shared/services/class-view.render.component';
import { flattenObject } from '../../../_shared/scripts/flattenObject';
import { CacheService, CacheKeys } from '../../../_shared/services/cache.service';

/**
  Complete course catalog
*/
@Component({
  selector: 'ngx-courses-list-page',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {

    description = `Provides a list of all the classes offered at the university.`;

    /**
      Configuration for the table
    */
    settings = {
      actions: false,
      pager: {
        display: false,
      },
      columns: {
        class__prefix: {
          title: 'Department',
        },
        class__courseNo: {
          title: 'Course Number',
        },
        class__title: {
          title: 'Course Title',
        },
        _id: {
          title: 'Class Info',
          type: 'custom',
          filter: false,
          renderComponent: ClassViewRenderComponent,
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
    constructor(private classService: ClassService, private cacheService: CacheService) {
    }

    /**
        Gets all the classes flattens the object to add to the table
        @returns {none}
    */
    ngOnInit() {

      this.cacheService.get(CacheKeys.allClasses, this.classService.getClasses())
        .subscribe((res: Class[]) => {
          this.source.load(flattenObject(res));
        });
    }
}
