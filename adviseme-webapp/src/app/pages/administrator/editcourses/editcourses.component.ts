import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

import {flattenObject } from '../../../_shared/scripts/flattenObject';

import { MessageService } from 'primeng/components/common/messageservice';

/**
  Complete course catalog
*/
@Component({
  selector: 'ngx-editcourses-list-page',
  templateUrl: './editcourses.component.html',
  styleUrls: ['./editcourses.component.scss'],
})

export class EditcoursesComponent implements OnInit {

    prerequisites: string[];
    curriculum_one: string[];
    curriculum_two: string[][];

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
      pager: {
        display: false,
      },
      columns: {
        class__prefix: {
          title: 'Department',
        },
        class__courseNo: {
          title: 'Course Number',
        },
        class__title: {
          title: 'Course Title',
        },
        hrs: {
          title: 'Credit Hours',
        },
        description: {
          title: 'Description',
          editor: {
            type: 'textarea',
          },
        },
        prerequisites__0: {
          title: 'Prerequisite 1',
        },
        prerequisites__1: {
          title: 'Prerequisite 2',
        },
        prerequisites__2: {
          title: 'Prerequisite 3',
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
    constructor(private classService: ClassService,
      private selectedClass: Class,
      private messageService: MessageService) {
      this.prerequisites = [];
      this.curriculum_one = [];
      this.curriculum_two = [];
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

    /**
      Creates a new course
      @param {$event} event
    **/
    onCreateConfirm(event): void {
      if (event.newData._id !== '' && event.newData.class__prefix !== '' && event.newData.hrs !== '' && event.newData.description !== '') {
        console.log(event.newData)
        this.selectedClass._id = (event.newData.class__prefix + event.newData.class__courseNo);
        this.selectedClass.department = event.newData.class__prefix;
        this.selectedClass.hrs = event.newData.hrs;
        this.selectedClass.description = event.newData.description;
      } else {
        this.messageService.add({severity: 'Failed',
          summary: 'Failed to Create Class',
          detail: 'One or more fields was left blank.'});
        event.confirm.reject();
        return;
      }

      if (event.newData.class__title !== '' && event.newData.class__courseNo && event.newData.class__prefix) {
        this.selectedClass.class = {
          title: String(event.newData.class__title),
          courseNo: String(event.newData.class__courseNo),
          prefix: String(event.newData.class__prefix),
        };
      } else {
        this.messageService.add({severity: 'Failed',
          summary: 'Failed to Create Class',
          detail: 'One or more fields was left blank.'});
        event.confirm.reject();
        return;
      }

      Object.entries(event.newData).forEach(([key, value]) => {

        if (key.startsWith('prerequisites_')) {
          this.prerequisites.push(value);
        }


      });
      this.selectedClass.prerequisites = this.prerequisites;
      this.selectedClass.curriculum = [[]];
      this.classService.createClass(this.selectedClass).subscribe();
      this.messageService.add({severity: 'success',
        summary: 'Success Created Class',
        detail: 'Successfully created class ' + event.newData.class__title});
      event.confirm.resolve();
    }

    /**
      Deletes a course
      @param {$event} event
    **/
    onDeleteConfirm(event): void {
      if (window.confirm('Are you sure you want to delete ' + event.data.class__title + ' ?')) {
        this.classService.deleteClass(event.data._id).subscribe();
        this.messageService.add({severity: 'success',
          summary: 'Success Deleted Class',
          detail: 'Successfully deleted class ' + event.data.class__title});
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }

    /**
      Updates a course
      @param {$event} event
    **/
    onSaveConfirm(event): void {

      if (event.newData._id !== '' && event.newData.class__prefix !== '' && event.newData.hrs !== '' && event.newData.description !== '') {
        this.selectedClass._id = event.newData._id;
        this.selectedClass.department = event.newData.class__prefix;
        this.selectedClass.hrs = event.newData.hrs;
        this.selectedClass.description = event.newData.description;
      } else {
        this.messageService.add({severity: 'Failed',
          summary: 'Failed to Update Class',
          detail: 'Failed to update class ' + event.newData.class__title + '. One or more fields was left blank.'});
        event.confirm.reject();
        return;
      }

      if (event.newData.class__title !== '' && event.newData.class__courseNo && event.newData.class__prefix) {
        this.selectedClass.class = {
          title: String(event.newData.class__title),
          courseNo: String(event.newData.class__courseNo),
          prefix: String(event.newData.class__prefix),
        };
      } else {
        this.messageService.add({severity: 'Failed',
          summary: 'Failed to Update Class',
          detail: 'Failed to update class ' + event.newData.class__title + '. One or more fields was left blank.'});
        event.confirm.reject();
        return;
      }

      Object.entries(event.newData).forEach(([key, value]) => {

        if (key.startsWith('prerequisites_')) {
          if (value !== '') {
            this.prerequisites.push(value);
          }
        }

        if (key.startsWith('curriculum_')) {
          if (value !== '') {
            this.curriculum_one.push(value);
          } else {
            this.messageService.add({severity: 'Failed',
              summary: 'Failed to Update Class',
              detail: 'Failed to update class ' + event.newData.class__title + '. One or more fields was left blank.'});
            return;
          }

          if (this.curriculum_one.length === 2) {
            this.curriculum_two.push([this.curriculum_one[0], this.curriculum_one[1]]);
            this.curriculum_one.pop();
            this.curriculum_one.pop();
          }

        }

      });
      this.selectedClass.prerequisites = this.prerequisites;
      this.selectedClass.curriculum = this.curriculum_two;

      if (window.confirm('Are you sure you want to edit ' + event.data.class__title + ' ?')) {
        this.classService.editClass(this.selectedClass).subscribe();
        this.messageService.add({severity: 'success',
          summary: 'Success Updating Class',
          detail: 'Successfully updated class ' + event.newData.class__title});
        event.confirm.resolve();
        return;
      } else {
        event.confirm.reject();
        return;
      }
    }
  }
