import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User, CurrentClasses } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

@Component({
  selector: 'ngx-current-classes',
  styleUrls: ['./current-classes.component.scss'],
  templateUrl: './current-classes.component.html',
})

export class CurrentClassesComponent implements OnInit {

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
    this.source.load(CurrentClasses);
  }
}
