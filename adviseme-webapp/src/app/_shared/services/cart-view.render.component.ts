import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

/**
  Component that renders a button that allows advisors to view requested classes
**/
@Component({
  template: `
    <div class="btn-group btn-group-full-width" role="group">
          <button  (click)="goClassView()" type="button" class="btn btn-info btn-group-icon btn-group-divider btn-fixed">
            <i class="ion-information-circled"></i>
          </button>
          <button (click)="goClassView()" id="requestClassButton" type="button" class="btn btn-info">View Requested Classes</button>
  </div>
  `,
})
export class CartViewRenderComponent implements OnInit {

  public renderValue;
  html: any;

  @Input() value;

  constructor(protected router: Router) {  }

  ngOnInit() {
    this.renderValue = this.value;
  }

  /**
    Go to the students request
  **/
  goClassView() {
    this.router.navigate(['/pages/advisor/student-request', this.value]);
  }


}
