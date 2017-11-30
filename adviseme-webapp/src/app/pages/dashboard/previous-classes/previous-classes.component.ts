import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import {CapitalizePipe} from '../../../@theme/pipes/capitalize.pipe';

@Component({
  selector: 'ngx-previous-classes',
  styleUrls: ['./previous-classes.component.scss'],
  templateUrl: './previous-classes.component.html',
})

export class PreviousClassesComponent implements OnInit {

  currentUser: User;
  data: any;
  settings = {
    actions: false,
    columns: {
      prefix: {
        title: 'Prefix',
      },
      coNum: {
        title: 'Course Num',
      },
      grade: {
        title: 'Grade',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(this.currentUser._id)
        .subscribe(res => {
          this.currentUser = res;
          this.data = this.currentUser.course;
          this.source.load(this.data);
        });
  }
}
