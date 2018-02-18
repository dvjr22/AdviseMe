import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';
import { flattenObject } from './flattenObject';

/**
  Complete course catalog
*/
@Component({
  selector: 'ngx-app-request-classes',
  templateUrl: './request-classes.component.html',
  styleUrls: ['./request-classes.component.scss'],
})

export class RequestClassesComponent implements OnInit {
    /**
      Configuration for the table
    */
    settings = {
      selectMode: 'multi',
      actions: {
        delete: false,
        add: false,
        edit: false,
        select: true,
      },
      columns: {
        class_prefix: {
          title: 'Department',
        },
        class_courseNo: {
          title: 'Course Number',
        },
        class_title: {
          title: 'Course Title',
        },
        request: {
          title: 'Request',
          type: 'html',
          valuePrepareFunction:(cell,row)=>{
            return `<input id="checkBox" type="checkbox" checked>`
          },
          filter: false
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
    constructor(private classService: ClassService) {
    }

    /**
        Gets all the classes flattens the object to add to the table
        @returns {none}
    */
    ngOnInit() {

      this.classService.getClasses()
        .subscribe((res: Class[]) => {
          this.source.load(flattenObject(res));
        });
    }
}
