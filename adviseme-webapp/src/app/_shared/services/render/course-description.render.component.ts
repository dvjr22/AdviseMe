import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ViewCell, Cell, DefaultEditor } from 'ng2-smart-table';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

/**

  @Input = course description

  takes the course description and when you click the description button it opens
  a modal with a text area filled with the description.

  POC_CURRENTLY


**/

@Component({
  template: `
    <style>
    .modal {
  text-align: center;
}

@media screen and (min-width: 768px) {
  .modal:before {
    display: inline-block;
    vertical-align: middle;
    content: " ";
    height: 100%;
  }
}

.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
    </style>
    <ng-template #content let-c="close" let-d="dismiss">
    <div class="modal-header">
      <h4 class="modal-title">Course Description</h4>
      <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <textarea class="form-control" style="min-width: 100%" placeholder="{{this.renderValue}}"></textarea>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-outline-secondary" (click)="c('Close click')">Close</button>
    </div>
    </ng-template>

    <button class="btn btn-md btn-outline-info" (click)="open(content)">Description</button>
  `,
})
export class CourseDescriptionRenderComponent extends DefaultEditor implements ViewCell, OnInit {

  renderValue: string;
  closeResult: string;
  advisor: User;



  @Input() value: string | number;

  constructor(private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    this.renderValue = this.value.toString();

  }

  /**
    Opens modal
  **/
  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
    Gets the reason for the modal being dismissed. Debug gold
  **/
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
