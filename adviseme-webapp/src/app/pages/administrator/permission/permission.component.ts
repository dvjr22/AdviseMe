import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import { flattenObject } from '../../classes/courses/flattenObject';

@Component({
  selector: 'ngx-app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  /**
      Configuration for the table
    */
    settings = {
      edit: {
        confirmSave: true,
      },
      columns: {
        firstName: {
          title: 'First Name',
        },
        lastName: {
          title: 'Last Name',
        },
        major: {
          title: 'Major',
        },
        email: {
          title: 'Email',
        },
        status: {
          title: 'Status',
        },
      },
    };

  source: LocalDataSource = new LocalDataSource();
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll()
      .subscribe((res: Class[]) => {
        console.log(JSON.stringify(res));
        this.source.load(flattenObject(res));
      });
  }

  onSaveConfirm(event){
    if (window.confirm('Are you sure you want to save?')) {
      console.log('New Data: ' + JSON.stringify(event.newData));
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

}
