import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { Class } from '../../../_shared/models/class';
import { ClassService } from '../../../_shared/services/class.service';

import { flattenObject } from '../courses/flattenObject';


/**
  Complete course catalog
*/
@Component({
  selector: 'ngx-edit-course-list-page',
  templateUrl: './edit-course.component.html',
})

export class EditCourseComponent implements OnInit {

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
    columns: {
      class_prefix: {
        title: 'Department',
      },
      class_courseNo: {
        title: 'Course Number',
      },
      class_title: {
        title: 'Course Title',
      },
      prerequisites_0: {
        title: 'Prerequisite 1',
      },
      prerequisites_1: {
        title: 'Prerequisite 2',
      },
      prerequisites_2: {
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
  constructor(private classService: ClassService, private selectedClass: Class) {
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

  onCreateConfirm(event): void {
    this.selectedClass._id = (event.newData.class_prefix + event.newData.class_courseNo);
    this.selectedClass.department = event.newData.class_prefix;

    this.selectedClass.class = {
      title: String(event.newData.class_title),
      courseNo: String(event.newData.class_courseNo),
      prefix: String(event.newData.class_prefix),
    };

    Object.entries(event.newData).forEach(([key, value]) => {

      if (key.startsWith('prerequisites_')) {
        this.prerequisites.push(value);
      }

      // if (key.startsWith('curriculum_')) {
      //   this.curriculum_one.push(value);
      //
      //   if (this.curriculum_one.length === 2) {
      //     this.curriculum_two.push([this.curriculum_one[0], this.curriculum_one[1]]);
      //     this.curriculum_one.pop();
      //     this.curriculum_one.pop();
      //   }
      //
      // }

    });
    this.selectedClass.prerequisites = this.prerequisites;
    this.selectedClass.curriculum = [[]];
    console.log(this.selectedClass);
    this.classService.createClass(this.selectedClass).subscribe();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete' + event.data.class_title + ' ?')) {
      this.classService.deleteClass(event.data._id).subscribe();
      alert('Deleted' + event.data.class_title);
      event.confirm.resolve();
    } else {
      alert('Aborted delete');
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {

    this.selectedClass._id = event.newData._id;
    this.selectedClass.department = event.newData.class_prefix;

    this.selectedClass.class = {
      title: String(event.newData.class_title),
      courseNo: String(event.newData.class_courseNo),
      prefix: String(event.newData.class_prefix),
    };

    Object.entries(event.newData).forEach(([key, value]) => {

      if (key.startsWith('prerequisites_')) {
        this.prerequisites.push(value);
      }

      if (key.startsWith('curriculum_')) {
        this.curriculum_one.push(value);

        if (this.curriculum_one.length === 2) {
          this.curriculum_two.push([this.curriculum_one[0], this.curriculum_one[1]]);
          this.curriculum_one.pop();
          this.curriculum_one.pop();
        }

      }

    });
    this.selectedClass.prerequisites = this.prerequisites;
    this.selectedClass.curriculum = this.curriculum_two;

    if (window.confirm('Are you sure you want to edit ' + event.data.class_title + ' ?')) {
      alert('Changes made');
      event.confirm.resolve();
    } else {
      alert('Aborted changes');
      event.confirm.reject();
    }
  }
}
