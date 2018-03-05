import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  template: `
    <div class="btn-group btn-group-full-width" role="group">
          <button  (click)="goClassView()" type="button" class="btn btn-success btn-group-icon btn-group-divider btn-fixed">
            <i class="ion-information-circled"></i>
          </button>
          <button (click)="goClassView()" type="button" class="btn btn-success">Class Request Information</button>
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

  goClassView() {
    console.log(this.renderValue);
    this.router.navigate(['/pages/advisor/requests-class', this.value]);
  }


}
