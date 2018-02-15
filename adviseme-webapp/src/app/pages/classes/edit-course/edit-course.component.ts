import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';


/**
  Complete course catalog
*/
@Component({
  selector: 'ngx-edit-course-list-page',
  templateUrl: './edit-course.component.html',
})

export class EditCourseComponent implements OnInit {

    /**
      The data that will go into the table
    */
    source: LocalDataSource = new LocalDataSource();

    /**
      Initializes new names for the imports
    */
    constructor() {
    }

    /**
        Gets all the classes flattens the object to add to the table
        @returns {none}
    */
    ngOnInit() {

    }
}
