import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

import { flattenObject } from '../../../_shared/scripts/flattenObject';

import { AdvisorChatListRenderComponent } from '../../../_shared/services/advisor-chat-view.render.component';

/**
  List of all students with a button to go to their chat room
**/
@Component({
  selector: 'ngx-advisor-chat-list',
  templateUrl: './advisor-chat-list.component.html',
  styleUrls: ['./advisor-chat-list.component.scss'],
})
export class AdvisorChatListComponent implements OnInit {

  /**
    Configuration for the table
  */
  settings = {
    actions: false,
    columns: {
      studentName: {
        title: 'Student',
      },
      index: {
        title: '',
        type: 'custom',
        filter: false,
        renderComponent: AdvisorChatListRenderComponent,
      },
    },
  };

  /**
    The data that will go into the table
  */
  source: LocalDataSource = new LocalDataSource();

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Load the list of students
    const currentAdvisor = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userService.getById(currentAdvisor._id)
      .subscribe((res: User) => {
        const data = [];
        for ( let i = 0; i < res.students.length; i++) {
            const ob = {};
            const studentID = res.students[i];
            this.userService.getById(studentID).subscribe((studentRes) => {
              ob['studentName'] = studentRes.firstName + ' ' + studentRes.lastName;
              ob['index'] = i;
              data.push(ob);
            });

        }
        this.source.load(data);
      });
  }

}
