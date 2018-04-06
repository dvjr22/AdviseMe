import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import { flattenObject } from '../../../_shared/scripts/flattenObject';

import { MessageService } from 'primeng/components/common/messageservice';

import { AdvisorViewRenderComponent } from '../../../_shared/services/render/advisor-view.render.component';

@Component({
  selector: 'ngx-app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {

  description = `Provides a list of all the users on the AdviseMe system and allows edits to be made to displayed fields.`;

  /**
      Configuration for the table
    */
    settings = {
      mode: 'inline',
      pager: {
        display: false,
      },
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
        advisor: {
          title: 'Advisor',
          type: 'custom',
          renderComponent: AdvisorViewRenderComponent,
        },
        email: {
          title: 'Email',
        },
        status: {
          title: 'Status',
        },
        _id: {
          title: 'id',
        },
      },
    };

  source: LocalDataSource = new LocalDataSource();
  constructor(private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getAll()
      .subscribe((res: User[]) => {
        for (let i = 0; i < res.length; i++ ) {
          if (res[i].advisor !== undefined) {
            this.userService.getById(res[i].advisor).subscribe((advisorRes) => {
              res[i].advisor = advisorRes.firstName + ' ' + advisorRes.lastName;
            });
          }
        }
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
      u.studentID = event.newData._id;
      u.status = event.newData.status;
      u.major = event.newData.major;
      u.course = event.newData.course;
      u.students = event.newData.students;
      u.advisor = event.newData.advisor;
      u.registered = { semester: event.newData.registered__semester, year: event.newData.registered__year};
      u.profilePicture = event.newData.profilePicture;
      this.userService.update(u).subscribe();
      event.confirm.resolve(event.newData);
      this.messageService.add({severity: 'success',
        summary: 'Success Updating User',
        detail: 'Successfully updated user ' + event.newData.firstName + ' ' + event.newData.lastName + ' '});
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    const u = new User();
    u._id = event.newData._id;
    u.studentID = event.newData._id;
    u.password = 'password'; // HACK: Figure out a better way to do this
    u.firstName = event.newData.firstName;
    u.lastName = event.newData.lastName;
    u.email = event.newData.email;
    u.role = event.newData.role;
    u.status = event.newData.status;
    u.major = event.newData.major;
    this.userService.create(u).subscribe();
    event.confirm.resolve(event.newData);
    this.messageService.add({severity: 'success',
      summary: 'Success Creating User',
      detail: 'Successfully created a new user ' + event.newData.firstName + ' ' + event.newData.lastName + ' '});
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you user you want to delete this user?')) {
      this.userService.delete(event.data._id).subscribe();
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

}
