import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import { flattenObject } from '../../classes/courses/flattenObject';

import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'ngx-app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  /**
      Configuration for the table
    */
    settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        firstName: {
          title: 'First Name',
        },
        lastName: {
          title: 'Last Name',
        },
        role: {
          title: 'Role',
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
  constructor(private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getAll()
      .subscribe((res: User[]) => {
        this.source.load(flattenObject(res));
      });
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {

      // HACK: TODO: Move this to a pipe or something
      const u = new User();
      u._id = event.newData._id;
      u.username = event.newData.username;
      u.password = event.newData.password;
      u.firstName = event.newData.firstName;
      u.lastName = event.newData.lastName;
      u.fullName = event.newData.fullName;
      u.email = event.newData.email;
      u.university = event.newData.university;
      u.appointments = event.newData.appointments;
      u.role = event.newData.role;
      u.studentID = event.newData.studentID;
      u.status = event.newData.status;
      u.major = event.newData.major;
      u.course = event.newData.course;
      u.students = event.newData.students;
      this.userService.update(u).subscribe();
      event.confirm.resolve(event.newData);
      this.messageService.add({severity: 'success',
        summary: 'Success Updating User',
        detail: 'Successfully updated user ' + event.newData.firstName + ' ' + event.newData.lastName + ' '});
    } else {
      event.confirm.reject();
    }
  }

}
