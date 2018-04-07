import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ViewCell, Cell, DefaultEditor } from 'ng2-smart-table';

import { User } from '../../../_shared/models/user';
import { UserService } from '../../../_shared/services/user.service';

/**

  @Input = advisor _id

  Will take the input and create a button with the text of the input.
  You are then able to click the button and get a modal with the advisors info.

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
      <h4 class="modal-title">Advisor Preview</h4>
      <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><span style="font-weight: bold;" >Name:</span>  {{ this.advisor?.firstName }} {{ this.advisor?.lastName }}</p>
      <p><span style="font-weight: bold;" >Email:</span>  {{ this.advisor?.email }} </p>
      <p><span style="font-weight: bold;" ># of Students:</span> {{ this.advisor?.students.length }} </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-outline-secondary" (click)="c('Close click')">Close</button>
    </div>
    </ng-template>

    <button class="btn btn-md btn-outline-info" (click)="open(content)" *ngIf="renderValue.length !== 0">{{this.renderValue}}</button>
  `,
})
export class AdvisorViewRenderComponent extends DefaultEditor implements ViewCell, OnInit {

  renderValue: string;
  closeResult: string;
  advisor: User;



  @Input() value: string | number;

  constructor(private modalService: NgbModal, private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  /**
    Opens the modal
  **/
  open(content) {
    if (this.renderValue.length !== 0) {
      this.userService.getById(this.renderValue)
        .subscribe((res: User) => {
          this.advisor = Object.assign({}, res);
        });

      this.modalService.open(content, {windowClass: 'center-modal'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
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
