import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { flattenObject } from '../../../../_shared/scripts/flattenObject';
import { User } from '../../../../_shared/models/user';
import { UserService } from '../../../../_shared/services/user.service';

/**
  List all of the advisors students
**/
@Component({
  selector: 'ngx-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentlistComponent implements OnInit {


  // Config for the table
  settings= {
  actions: false,
  columns: {
    _id: {
      title: 'Student ID',
    },
    firstName: {
      title: 'First Name',
    },
    lastName: {
      title: 'Last Name',
    },
  },
};

source: LocalDataSource = new LocalDataSource();

constructor(private userService: UserService) { }

ngOnInit() {
  this.userService.getCurrentUser().subscribe(res => {
    const students = [];
    if (res['role'] === 'advisor') {
      for (let i = 0; i < res['students'].length; i++) {
        this.userService.getById(res['students'][i]).subscribe(res2 => {
          students.push({
            _id: res2['_id'],
            firstName: res2['firstName'],
            lastName: res2['lastName'],
          });
        });
      }
      this.source.load(students);
    } else {
      // do nothing
    }
  });
}

}
