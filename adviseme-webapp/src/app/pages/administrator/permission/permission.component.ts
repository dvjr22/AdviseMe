import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import { flattenObject } from '../../../_shared/scripts/flattenObject';

import { MessageService } from 'primeng/components/common/messageservice';

import { AdvisorViewRenderComponent } from '../../../_shared/services/render/advisor-view.render.component';

/**
  This holds a table with all users for the admin to edit/create/delete
**/
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
        _id: {
          title: 'ID',
        },
        username: {
          title: 'Username',
        },
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
      },
    };

  source: LocalDataSource = new LocalDataSource();
  constructor(private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit() {
    // Get the advisor names for each student
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

  /**
    Updates a user
    @param {$event} event
  **/
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      // Map the event object to a user model and save it
      const u = new User();
      if (event.newData._id !== '' &&
          event.newData.username !== '' &&
          event.newData.firstName !== '' &&
          event.newData.lastName !== '' &&
          event.newData.email !== '' &&
          event.newData.role.toLowerCase() === 'student' &&
          event.newData.status !== '' &&
          event.newData.major !== '' &&
          event.newData.advisor !== '') {
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
      } else if (event.newData._id !== '' &&
          event.newData.username !== '' &&
          event.newData.firstName !== '' &&
          event.newData.lastName !== '' &&
          event.newData.email !== '' &&
          (event.newData.role.toLowerCase() == 'advisor' || event.newData.role.toLowerCase() == 'admin')) {
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
      } else {
        this.messageService.add({severity: 'Failed',
          summary: 'Failed to Edit User',
          detail: 'One or more fields was left blank.'});
        event.confirm.reject();
        return;
      }

      // Update with the new model
      this.userService.update(u).subscribe();

      // Resolve the event
      event.confirm.resolve(event.newData);

      // Alert the user to the successful event
      this.messageService.add({severity: 'success',
        summary: 'Success Updating User',
        detail: 'Successfully updated user ' + event.newData.firstName + ' ' + event.newData.lastName + ' '});
    } else {
      event.confirm.reject();
    }
  }

  /**
    Creates a new user
    @param {$event} event
  **/
  onCreateConfirm(event) {
    // Map the event object to a user model and create it
    const u = new User();
    if (event.newData._id !== '' &&
        event.newData.username !== '' &&
        event.newData.firstName !== '' &&
        event.newData.lastName !== '' &&
        event.newData.email !== '' &&
        event.newData.role.toLowerCase() === 'student' &&
        event.newData.status !== '' &&
        event.newData.major !== '' &&
        event.newData.advisor !== '') {
      u._id = event.newData._id;
      u.username = event.newData.username;
      u.studentID = event.newData._id;
      u.password = 'password'; // HACK: Figure out a better way to do this
      u.firstName = event.newData.firstName;
      u.lastName = event.newData.lastName;
      u.email = event.newData.email;
      u.role = event.newData.role;
      u.status = event.newData.status;
      u.major = event.newData.major;
    } else if (event.newData._id !== '' &&
        event.newData.username !== '' &&
        event.newData.firstName !== '' &&
        event.newData.lastName !== '' &&
        event.newData.email !== '' &&
        (event.newData.role.toLowerCase() === 'advisor' || event.newData.role.toLowerCase() === 'admin')) {
      u._id = event.newData._id;
      u.username = event.newData.username;
      u.studentID = event.newData._id;
      u.password = 'password'; // HACK: Figure out a better way to do this
      u.firstName = event.newData.firstName;
      u.lastName = event.newData.lastName;
      u.email = event.newData.email;
      u.role = event.newData.role;
      u.status = event.newData.status;
      u.major = event.newData.major;
    } else {
      this.messageService.add({severity: 'Failed',
        summary: 'Failed to Create User',
        detail: 'One or more fields was left blank.'});
      event.confirm.reject();
      return;
    }

    // Create the new object from the  model
    this.userService.create(u).subscribe();

    event.confirm.resolve(event.newData);

    // Notify the user
    this.messageService.add({severity: 'success',
      summary: 'Success Creating User',
      detail: 'Successfully created a new user: ' + event.newData.firstName + ' ' + event.newData.lastName + ' '});
  }

  /**
    Deletes a user
    @param {$event} event
  **/
  onDeleteConfirm(event) {
    if (window.confirm('Are you user you want to delete this user?')) {
      // Delete the user
      this.userService.delete(event.data._id).subscribe();
      this.messageService.add({severity: 'Success',
        summary: 'Success Deleted User',
        detail: 'Successfully deleted user with id of' + event.data._id});
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

}
