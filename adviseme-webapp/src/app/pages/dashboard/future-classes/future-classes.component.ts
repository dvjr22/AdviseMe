import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User, FutureClasses } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

@Component({
  selector: 'ngx-future-classes',
  styleUrls: ['./future-classes.component.scss'],
  templateUrl: './future-classes.component.html',
})

export class FutureClassesComponent implements OnInit {

  currentUser: User;
  temp: any;
  courses: any = [];
  settings = {
    actions: false,
    columns: {
      department: {
        title: 'Department',
      },
      coNum: {
        title: 'Course Number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.source.load(FutureClasses);
  }
}
